
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendReport() {
    const status = process.argv[2]; // 'success' or 'failure'
    const emailTo = process.env.EMAIL_TO;
    const repo = process.env.GITHUB_REPOSITORY;
    const runId = process.env.GITHUB_RUN_ID;
    const serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com';

    if (!emailTo) {
        console.error('EMAIL_TO environment variable is not set.');
        process.exit(1);
    }

    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY environment variable is not set.');
        process.exit(1);
    }

    const runUrl = `${serverUrl}/${repo}/actions/runs/${runId}`;
    const subject = `[${status === 'success' ? 'SUCCESS' : 'FAILURE'}] E2E Test Report - ${repo}`;

    const html = `
        <h1>E2E Test Report</h1>
        <p><strong>Status:</strong> <span style="color: ${status === 'success' ? 'green' : 'red'}">${status.toUpperCase()}</span></p>
        <p><strong>Repository:</strong> ${repo}</p>
        <p><strong>Run ID:</strong> ${runId}</p>
        <p>
            <a href="${runUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                View Run Details
            </a>
        </p>
    `;

    try {
        const data = await resend.emails.send({
            from: 'Codex Aeternum CI <onboarding@resend.dev>',
            to: emailTo,
            subject: subject,
            html: html,
        });

        console.log('Email sent successfully:', data);
    } catch (error) {
        console.error('Error sending email:', error);
        process.exit(1);
    }
}

sendReport();
