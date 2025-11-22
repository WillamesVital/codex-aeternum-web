import { test, expect } from '@playwright/test';

test.describe('Página Inicial', () => {
    test('deve carregar a página inicial e exibir o título principal', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/Codex Aeternum/);
        const heading = page.locator('h1:has-text("Codex Aeternum")');
        await expect(heading).toBeVisible();
    });

    test('deve exibir todos os cards de navegação', async ({ page }) => {
        await page.goto('/');

        const codexCard = page.getByRole('link', { name: 'O Codex Mergulhe na história' });
        const grimoireCard = page.getByRole('link', { name: 'O Grimório Consulte as regras' });
        const advenaeCard = page.getByRole('link', { name: 'Liber Advenae O Livro do' });
        const forjaCard = page.getByRole('link', { name: 'A Forja Crie seus heróis,' });

        await page.waitForTimeout(5000);
        await expect(codexCard).toBeVisible();
        await expect(grimoireCard).toBeVisible();
        await expect(advenaeCard).toBeVisible();
        await expect(forjaCard).toBeVisible();
    });

    test('deve ter botões CTA funcionais', async ({ page }) => {
        await page.goto('/');

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
