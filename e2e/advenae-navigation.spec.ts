import { test, expect } from '@playwright/test';

test.describe('Navegação do Liber Advenae', () => {
    test('deve exibir página de índice do Advenae', async ({ page }) => {
        await page.goto('/advenae');

        const heading = page.locator('h1:has-text("Liber Advenae")');
        await expect(heading).toBeVisible();

        const description = page.locator('text=O Livro do Jogador');
        await expect(description).toBeVisible();
    });

    test('deve exibir ícone da Bússola nos cards', async ({ page }) => {
        await page.goto('/advenae');

        const compassIcon = page.locator('svg').first();
        await expect(compassIcon).toBeVisible();
    });

    test('deve mostrar "Ler Capítulo" ao passar o mouse', async ({ page }) => {
        await page.goto('/advenae');

        const firstChapter = page.locator('a[href^="/advenae/"]').first();
        await firstChapter.hover();

        const readLink = firstChapter.locator('text=Ler Capítulo');
        await expect(readLink).toBeVisible();
    });

    test('deve navegar para o Prólogo', async ({ page }) => {
        await page.goto('/advenae');

        const prologoCard = page.locator('a[href="/advenae/prologo"]');
        await prologoCard.click();

        await expect(page).toHaveURL('/advenae/prologo');

        const heading = page.locator('h1:has-text("Prólogo")');
        await expect(heading).toBeVisible();
    });

    test('deve exibir breadcrumbs na página do capítulo', async ({ page }) => {
        await page.goto('/advenae/prologo');

        const advenaeBreadcrumb = page.locator('a:has-text("Liber Advenae")').first();
        await expect(advenaeBreadcrumb).toBeVisible();
    });

    test('deve exibir conteúdo do capítulo', async ({ page }) => {
        await page.goto('/advenae/prologo');

        const advenaeText = page.locator('text=Advenae');
        await expect(advenaeText.first()).toBeVisible();
    });
});
