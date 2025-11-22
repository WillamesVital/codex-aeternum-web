import { test, expect } from '@playwright/test';

test.describe('Navegação do Codex', () => {
    test('deve exibir página de índice de capítulos', async ({ page }) => {
        await page.goto('/codex');

        // Verificar título
        const heading = page.locator('h1:has-text("O Codex Aeternum")');
        await expect(heading).toBeVisible();

        // Verificar presença de pelo menos um capítulo
        const chapterCards = page.locator('a[href^="/codex/"]');
        await expect(chapterCards.first()).toBeVisible();
    });

    test('deve mostrar "Ler Capítulo" ao passar o mouse no card', async ({ page }) => {
        await page.goto('/codex');

        const firstChapter = page.locator('a[href^="/codex/"]').first();
        await firstChapter.hover();

        // Verificar se o texto aparece
        const readLink = firstChapter.locator('text=Ler Capítulo');
        await expect(readLink).toBeVisible();
    });

    test('deve navegar para página do capítulo', async ({ page }) => {
        await page.goto('/codex');

        const firstChapter = page.locator('a[href^="/codex/"]').first();
        await firstChapter.click();

        // Verificar URL mudou
        await expect(page).toHaveURL(/\/codex\/.+/);

        // Verificar breadcrumbs
        const breadcrumbs = page.locator('nav[aria-label="Breadcrumb"], a:has-text("Codex")');
        await expect(breadcrumbs.first()).toBeVisible();
    });

    test('deve exibir conteúdo do capítulo', async ({ page }) => {
        await page.goto('/codex');

        const firstChapter = page.locator('a[href^="/codex/"]').first();
        await firstChapter.click();

        // Verificar presença de conteúdo
        const content = page.locator('.codex-content, article');
        await expect(content).toBeVisible();
    });

    test('deve ter Sumário (Table of Contents) funcional', async ({ page }) => {
        await page.goto('/codex');

        const firstChapter = page.locator('a[href^="/codex/"]').first();
        await firstChapter.click();

        // Verificar presença do TOC
        const toc = page.locator('text=Sumário, nav');
        const tocLinks = page.locator('a[href^="#"]');

        // Deve ter pelo menos um link
        expect(await tocLinks.count()).toBeGreaterThan(0);
    });

    test('deve ter navegação entre capítulos (Anterior/Próximo)', async ({ page }) => {
        await page.goto('/codex');

        // Clicar no segundo capítulo (para ter anterior e próximo)
        const chapters = page.locator('a[href^="/codex/"]');
        const chapterCount = await chapters.count();

        if (chapterCount > 1) {
            await chapters.nth(1).click();

            // Verificar botões de navegação
            const prevButton = page.locator('a:has-text("Anterior"), a:has-text("Capítulo Anterior")');
            const nextButton = page.locator('a:has-text("Próximo"), a:has-text("Próximo Capítulo")');

            // Pelo menos um deve estar visível
            const hasPrev = await prevButton.count() > 0;
            const hasNext = await nextButton.count() > 0;
            expect(hasPrev || hasNext).toBeTruthy();
        }
    });
});
