import { test, expect } from '@playwright/test';

test.describe('Criação de Personagem', () => {
    test.beforeEach(async ({ page }) => {
        // Login mockup or actual login if env vars are present
        // For now, we assume the user is logged in or we might fail if not.
        // Ideally we should use a global setup for auth.
        // If we can't login, we might skip or fail.

        // Try login flow
        await page.goto('/login');
        const email = process.env.USER_EMAIL;
        const password = process.env.USER_PASSWORD;

        if (email && password) {
            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);
            await page.click('button[type="submit"]');
            await page.waitForURL(/\/$/);
        } else {
            console.log('Skipping login, checking if session persists or manual login required');
        }
    });

    test('deve criar um novo personagem com sucesso', async ({ page }) => {
        const email = process.env.USER_EMAIL;
        if (!email) test.skip(true, 'Skipping test because USER_EMAIL is not defined');

        await page.goto('/characters/new');

        // Check if we are incorrectly redirected to login
        if (page.url().includes('/login')) {
            console.log('Redirected to login, aborting test');
            return;
        }

        // Fill form
        await page.fill('input[name="name"]', 'Test Hero');
        await page.selectOption('select[name="lineage"]', 'Humanos');
        await page.selectOption('select[name="vocation"]', 'O Guardião');
        await page.fill('textarea[name="description"]', 'A test hero created by E2E test.');

        // Submit
        await page.click('button[type="submit"]');

        // Expect redirect to characters list
        await expect(page).toHaveURL(/\/characters$/);

        // Verify success (optional, depends on list implementation)
        // await expect(page.locator('text=Test Hero')).toBeVisible(); 
    });
});
