import { test, expect } from '@playwright/test';

test.describe('Página Inicial', () => {
    test('deve carregar a página inicial e exibir o título principal', async ({ page }) => {
        await page.goto('/');

        // Verificar título
        await expect(page).toHaveTitle(/Codex Aeternum/);
        const heading = page.locator('h1:has-text("Codex Aeternum")');
        await expect(heading).toBeVisible();
    });

    test('deve exibir todos os cards de navegação', async ({ page }) => {
        await page.goto('/');

        // Verificar presença dos 4 cards principais
        const codexCard = page.locator('a[href="/codex"]').filter({ hasText: 'O Codex' });
        const grimoireCard = page.locator('a[href="/grimoire"]').filter({ hasText: 'O Grimório' });
        const advenaeCard = page.locator('a[href="/advenae"]').filter({ hasText: 'Liber Advenae' });
        const forjaCard = page.locator('a[href="/characters"]').filter({ hasText: 'A Forja' });

        await expect(codexCard).toBeVisible();
        await expect(grimoireCard).toBeVisible();
        await expect(advenaeCard).toBeVisible();
        await expect(forjaCard).toBeVisible();
    });

    test('deve ter botões CTA funcionais', async ({ page }) => {
        await page.goto('/');

        // Verificar CTAs no Hero
        const codexCTA = page.locator('a[href="/codex"]', { hasText: 'Explorar o Codex' }).first();
        const grimCTA = page.locator('a[href="/grimoire"]', { hasText: 'Abrir Grimório' }).first();

        await expect(codexCTA).toBeVisible();
        await expect(grimCTA).toBeVisible();
    });

    test('deve exibir seção de citação flavor', async ({ page }) => {
        await page.goto('/');

        const quote = page.locator('blockquote:has-text("O que foi criado para durar para sempre")');
        await expect(quote).toBeVisible();
    });

    test('deve navegar para o Codex ao clicar no card', async ({ page }) => {
        await page.goto('/');

        await page.click('a[href="/codex"]');
        await expect(page).toHaveURL('/codex');
    });
});
