import { test, expect } from '@playwright/test';

test.describe('Navegação do Grimório', () => {
    test('deve exibir página de índice de capítulos', async ({ page }) => {
        await page.goto('/grimoire');

        // Verificar título
        const heading = page.locator('h1:has-text("Grimoire")');
        await expect(heading).toBeVisible();

        // Verificar presença de capítulos
        const chapterCards = page.locator('a[href^="/grimoire/"]');
        await expect(chapterCards.first()).toBeVisible();
    });

    test('deve mostrar "Ler Capítulo" ao passar o mouse no card', async ({ page }) => {
        await page.goto('/grimoire');

        const firstChapter = page.locator('a[href^="/grimoire/"]').first();
        await firstChapter.hover();

        const readLink = firstChapter.locator('text=Ler Capítulo');
        await expect(readLink).toBeVisible();
    });

    test('deve navegar para página do capítulo', async ({ page }) => {
        await page.goto('/grimoire');

        const firstChapter = page.locator('a[href^="/grimoire/"]').first();
        await firstChapter.click();

        await expect(page).toHaveURL(/\/grimoire\/.+/);

        // Verificar breadcrumbs
        const breadcrumbs = page.locator('a:has-text("Grimório")');
        await expect(breadcrumbs.first()).toBeVisible();
    });

    test('deve exibir conteúdo do capítulo', async ({ page }) => {
        await page.goto('/grimoire');

        const firstChapter = page.locator('a[href^="/grimoire/"]').first();
        await firstChapter.click();

        const content = page.locator('.codex-content, article');
        await expect(content).toBeVisible();
    });

    test('deve ter navegação entre capítulos', async ({ page }) => {
        await page.goto('/grimoire');

        const chapters = page.locator('a[href^="/grimoire/"]');
        const chapterCount = await chapters.count();

        if (chapterCount > 1) {
            await chapters.nth(1).click();

            const hasNavigation = page.locator('a:has-text("Anterior"), a:has-text("Próximo")');
            expect(await hasNavigation.count()).toBeGreaterThan(0);
        }
    });
});
