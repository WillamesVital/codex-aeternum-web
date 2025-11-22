import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model para a página de índice do Codex
 */
export class CodexIndexPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly chapterCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: /O Codex Aeternum/i, level: 1 });
        this.chapterCards = page.getByRole('link').filter({ hasText: /Capítulo/i });
    }

    /**
     * Navega para a página de índice do Codex
     */
    async goto() {
        await this.page.goto('/codex');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Valida que a página está carregada
     */
    async validatePageLoaded() {
        await expect(this.heading).toBeVisible();
        await expect(this.chapterCards.first()).toBeVisible();
    }

    /**
     * Retorna o número de capítulos disponíveis
     */
    async getChapterCount(): Promise<number> {
        return await this.chapterCards.count();
    }

    /**
     * Obtém um card de capítulo por índice
     */
    getChapterCard(index: number = 0): Locator {
        return this.chapterCards.nth(index);
    }

    /**
     * Faz hover sobre um card de capítulo
     */
    async hoverChapterCard(index: number = 0) {
        const card = this.getChapterCard(index);
        await card.hover();
    }

    /**
     * Valida que o texto "Ler Capítulo" aparece ao hover
     */
    async validateReadChapterTextVisible(index: number = 0) {
        const card = this.getChapterCard(index);
        const readText = card.getByText(/Ler Capítulo/i);
        await expect(readText).toBeVisible();
    }

    /**
     * Clica em um capítulo e aguarda a navegação
     */
    async clickChapter(index: number = 0) {
        const card = this.getChapterCard(index);
        await Promise.all([
            this.page.waitForURL(/\/codex\/.+/),
            card.click()
        ]);
        await this.page.waitForLoadState('networkidle');
    }
}
