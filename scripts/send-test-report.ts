
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

interface TestResult {
    title: string;
    status: string;
    duration: number;
}

interface TestSuite {
    title: string;
    specs: {
        title: string;
        tests: {
            results: {
                status: string;
                duration: number;
            }[];
        }[];
    }[];
    suites?: TestSuite[];
}

interface JSONReport {
    stats: {
        startTime: string;
        duration: number;
        expected: number;
        unexpected: number;
        skipped: number;
    };
    suites: TestSuite[];
}

async function sendReport() {
    const status = process.argv[2]; // 'success' or 'failure'
    const emailTo = process.env.EMAIL_TO;
    const repo = process.env.GITHUB_REPOSITORY;
    const runId = process.env.GITHUB_RUN_ID;
    const serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com';
    const refName = process.env.GITHUB_REF_NAME;
    const sha = process.env.GITHUB_SHA?.substring(0, 7);
    const actor = process.env.GITHUB_ACTOR;
    const baseUrl = process.env.BASE_URL;

    if (!emailTo || !process.env.RESEND_API_KEY) {
        console.error('Missing required environment variables (EMAIL_TO or RESEND_API_KEY).');
        process.exit(1);
    }

    // Parse JSON Report
    let report: JSONReport | null = null;
    const reportPath = path.join(process.cwd(), 'test-results.json');

    try {
        if (fs.existsSync(reportPath)) {
            const rawData = fs.readFileSync(reportPath, 'utf-8');
            report = JSON.parse(rawData);
        } else {
            console.warn('test-results.json not found. Sending basic report.');
        }
    } catch (error) {
        console.error('Error parsing test-results.json:', error);
    }

    const runUrl = `${serverUrl}/${repo}/actions/runs/${runId}`;
    const subject = `[${status === 'success' ? 'SUCCESS' : 'FAILURE'}] E2E Report - ${repo}`;

    // Extract Failures
    const failures: string[] = [];
    if (report) {
        const traverse = (suite: TestSuite) => {
            suite.specs.forEach(spec => {
                spec.tests.forEach(test => {
                    if (test.results.some(r => r.status === 'failed' || r.status === 'timedOut')) {
                        failures.push(`${suite.title} > ${spec.title}`);
                    }
                });
            });
            if (suite.suites) {
                suite.suites.forEach(traverse);
            }
        };
        report.suites.forEach(traverse);
    }

    // Format Duration
    const durationMs = report?.stats.duration || 0;
    const durationSec = (durationMs / 1000).toFixed(2);

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e4e8; border-radius: 6px; }
            .header { padding-bottom: 20px; border-bottom: 1px solid #e1e4e8; margin-bottom: 20px; }
            .status-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; color: white; font-weight: bold; font-size: 14px; }
            .status-success { background-color: #28a745; }
            .status-failure { background-color: #d73a49; }
            .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; background: #f6f8fa; padding: 15px; border-radius: 6px; }
            .metric-item { text-align: center; }
            .metric-value { font-size: 24px; font-weight: bold; display: block; }
            .metric-label { font-size: 12px; color: #586069; text-transform: uppercase; }
            .context-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; }
            .context-table td { padding: 8px 0; border-bottom: 1px solid #eee; }
            .context-label { font-weight: bold; color: #586069; width: 120px; }
            .failures-section { margin-top: 20px; border: 1px solid #ffdce0; background: #fff5f5; border-radius: 6px; padding: 15px; }
            .failures-title { color: #d73a49; margin-top: 0; font-size: 16px; }
            .failure-list { margin: 0; padding-left: 20px; }
            .failure-item { color: #d73a49; margin-bottom: 5px; }
            .btn { display: inline-block; padding: 10px 20px; background-color: #0366d6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; text-align: center; display: block; margin-top: 20px; }
            .footer { margin-top: 30px; font-size: 12px; color: #6a737d; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <span class="status-badge ${status === 'success' ? 'status-success' : 'status-failure'}">
                    ${status.toUpperCase()}
                </span>
                <h2 style="margin: 10px 0 0 0;">E2E Test Report</h2>
            </div>

            ${report ? `
            <div class="metrics">
                <div class="metric-item">
                    <span class="metric-value" style="color: #28a745">${report.stats.expected}</span>
                    <span class="metric-label">Passed</span>
                </div>
                <div class="metric-item">
                    <span class="metric-value" style="color: #d73a49">${report.stats.unexpected}</span>
                    <span class="metric-label">Failed</span>
                </div>
                <div class="metric-item">
                    <span class="metric-value">${durationSec}s</span>
                    <span class="metric-label">Duration</span>
                </div>
            </div>
            ` : ''}

            <table class="context-table">
                <tr>
                    <td class="context-label">Repository</td>
                    <td>${repo}</td>
                </tr>
                <tr>
                    <td class="context-label">Branch</td>
                    <td>${refName}</td>
                </tr>
                <tr>
                    <td class="context-label">Commit</td>
                    <td><code>${sha}</code></td>
                </tr>
                <tr>
                    <td class="context-label">Triggered By</td>
                    <td>${actor}</td>
                </tr>
                <tr>
                    <td class="context-label">Environment</td>
                    <td><a href="${baseUrl}">${baseUrl}</a></td>
                </tr>
            </table>

            ${failures.length > 0 ? `
            <div class="failures-section">
                <h3 class="failures-title">Top Failures (${failures.length})</h3>
                <ul class="failure-list">
                    ${failures.slice(0, 10).map(f => `<li class="failure-item">${f}</li>`).join('')}
                    ${failures.length > 10 ? `<li>...and ${failures.length - 10} more</li>` : ''}
                </ul>
            </div>
            ` : ''}

            <a href="${runUrl}" class="btn">View Full Report on GitHub</a>

            <div class="footer">
                Run ID: ${runId} | Generated by Codex Aeternum CI
            </div>
        </div>
    </body>
    </html>
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
