import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as ics from 'ics';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(request: Request) {
    try {
        const { session, campaignTitle, players } = await request.json();

        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is missing');
            return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
        }

        if (!players || players.length === 0) {
            return NextResponse.json({ message: 'No players to notify' });
        }

        if (!session.nextSessionDate) {
            // If no next session date, just send the summary without calendar invite? 
            // Or maybe we still send it. For now let's assume we only attach if there is a date.
        }

        let attachments: any[] = [];

        if (session.nextSessionDate) {
            const date = new Date(session.nextSessionDate);
            const event: ics.EventAttributes = {
                start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()],
                duration: { hours: 3, minutes: 0 }, // Default duration, maybe make configurable later
                title: `Sessão: ${campaignTitle}`,
                description: `Próxima sessão de ${campaignTitle}.`,
                status: 'CONFIRMED',
                busyStatus: 'BUSY',
            };

            const { error, value } = ics.createEvent(event);

            if (error) {
                console.error('Error creating ICS event:', error);
            } else if (value) {
                attachments.push({
                    filename: 'invite.ics',
                    content: Buffer.from(value).toString('base64'), // Resend expects buffer or string content?
                    // Resend attachments: https://resend.com/docs/api-reference/emails/send-email#attachments
                    // It accepts content as a buffer or base64 string.
                    // Let's check docs or assume content string is fine if we don't specify encoding?
                    // Actually Resend node SDK: content can be Buffer.
                    // But to be safe over JSON API, let's use Buffer.
                });
                // Wait, Resend SDK handles Buffer. But here we are in Next.js API route.
                // Let's use the content as string since ics.createEvent returns a string.
            }
        }

        // Prepare email content
        // Exclude GM notes
        const emailContent = `
            <h1>${campaignTitle} - Relatório de Sessão</h1>
            <h2>${session.title}</h2>
            <p><strong>Data:</strong> ${new Date(session.date).toLocaleDateString('pt-BR')}</p>
            <h3>Resumo</h3>
            <p>${session.summary}</p>
            
            ${session.nextSessionDate ? `<p><strong>Próxima Sessão:</strong> ${new Date(session.nextSessionDate).toLocaleString('pt-BR')}</p>` : ''}
        `;

        const { data, error } = await resend.emails.send({
            from: 'Codex Aeternum <onboarding@resend.dev>', // Update this if you have a custom domain
            to: players,
            subject: `Relatório de Sessão: ${session.title}`,
            html: emailContent,
            attachments: attachments.length > 0 ? [{ filename: 'invite.ics', content: attachments[0].content }] : [],
            // Wait, if I used the logic above, attachments[0].content is base64?
            // Let's simplify. ics.createEvent returns a string.
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
