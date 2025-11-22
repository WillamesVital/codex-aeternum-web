import { test, expect } from '@playwright/test';
import { CodexIndexPage } from './pages/CodexIndexPage';
import { CodexChapterPage } from './pages/CodexChapterPage';


test.describe('Navegação do Codex', () => {
    test('deve exibir página de índice de capítulos', async ({ page }) => {

        const codexIndex = new CodexIndexPage(page);

        await codexIndex.goto();

        await codexIndex.validatePageLoaded();
        const chapterCount = await codexIndex.getChapterCount();
        expect(chapterCount).toBeGreaterThan(0);
    });

    test('deve mostrar "Ler Capítulo" ao passar o mouse no card', async ({ page }) => {

        const codexIndex = new CodexIndexPage(page);

        await codexIndex.goto();
        await codexIndex.hoverChapterCard(0);

        await codexIndex.validateReadChapterTextVisible(0);
    });

    test('deve navegar para página do capítulo', async ({ page }) => {

        const codexIndex = new CodexIndexPage(page);
        const codexChapter = new CodexChapterPage(page);

        await codexIndex.goto();
        await codexIndex.clickChapter(0);

        expect(page.url()).toMatch(/\/codex\/.+/);
        await codexChapter.validatePageLoaded();
    });

    test('deve exibir conteúdo do capítulo', async ({ page }) => {

        const codexIndex = new CodexIndexPage(page);
        const codexChapter = new CodexChapterPage(page);

        await codexIndex.goto();
        await codexIndex.clickChapter(0);

        await codexChapter.validateContent();
        await codexChapter.validateBackButton();
    });

    test('deve ter Sumário (Table of Contents) funcional', async ({ page }) => {

        const codexIndex = new CodexIndexPage(page);
        const codexChapter = new CodexChapterPage(page);
        await codexChapter.init({ width: 1280, height: 720 });


        await codexIndex.goto();
        await codexIndex.clickChapter(0);

        const { tocLinks, linkCount } = await codexChapter.validateTOC();
        expect(linkCount).toBeGreaterThan(0);
    });

    test('deve ter navegação entre capítulos (Anterior/Próximo)', async ({ page }) => {

        const codexIndex = new CodexIndexPage(page);
        const codexChapter = new CodexChapterPage(page);


        await codexIndex.goto();
        const chapterCount = await codexIndex.getChapterCount();


        if (chapterCount < 2) {
            test.skip();
        }

        await codexIndex.clickChapter(1);

        const { hasPrev, hasNext } = await codexChapter.validateChapterNavigation();
        expect(hasPrev || hasNext).toBeTruthy();
    });

    test('deve permitir clicar em link do TOC e fazer scroll suave', async ({ page }) => {

        const codexIndex = new CodexIndexPage(page);
        const codexChapter = new CodexChapterPage(page);
        await codexChapter.init({ width: 1280, height: 720 });


        await codexIndex.goto();
        await codexIndex.clickChapter(0);


        const { linkCount } = await codexChapter.validateTOC();
        if (linkCount === 0) {
            test.skip();
        }

        await codexChapter.clickTOCLink(0);
    });
});
