import { test, expect } from '@playwright/test';

test.describe('Barra de Navegação', () => {
    test('deve exibir todos os links de navegação', async ({ page }) => {
        await page.goto('/');

        // Verificar presença de todos os links
        const codexLink = page.locator('nav a[href="/codex"]');
        const grimoireLink = page.locator('nav a[href="/grimoire"]');
        const advenaeLink = page.locator('nav a[href="/advenae"]');
        const charactersLink = page.locator('nav a[href="/characters"]');
        const galleryLink = page.locator('nav a[href="/gallery"]');

        await expect(codexLink).toBeVisible();
        await expect(grimoireLink).toBeVisible();
        await expect(advenaeLink).toBeVisible();
        await expect(charactersLink).toBeVisible();
        await expect(galleryLink).toBeVisible();
    });

    test('deve ter link do logo correto para a página inicial', async ({ page }) => {
        await page.goto('/codex');

        const logoLink = page.locator('nav a[href="/"]');
        await logoLink.click();

        await expect(page).toHaveURL('/');
    });

    test('deve navegar para o Codex', async ({ page }) => {
        await page.goto('/');

        await page.click('nav a[href="/codex"]');
        await expect(page).toHaveURL('/codex');
    });

    test('deve navegar para o Grimório', async ({ page }) => {
        await page.goto('/');

        await page.click('nav a[href="/grimoire"]');
        await expect(page).toHaveURL('/grimoire');
    });

    test('deve navegar para o Advenae', async ({ page }) => {
        await page.goto('/');

        await page.click('nav a[href="/advenae"]');
        await expect(page).toHaveURL('/advenae');
    });

    test('deve navegar para Personagens', async ({ page }) => {
        await page.goto('/');

        await page.click('nav a[href="/characters"]');
        await expect(page).toHaveURL('/characters');
    });

    test('deve ter botão de busca', async ({ page }) => {
        await page.goto('/');

        const searchButton = page.locator('button[aria-label="Buscar"]');
        await expect(searchButton).toBeVisible();
    });
});
