import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model para a página de um capítulo do Codex
 */
export class CodexChapterPage {
    readonly page: Page;
    readonly article: Locator;
    readonly chapterTitle: Locator;
    readonly backButton: Locator;
    readonly breadcrumbNav: Locator;
    readonly tocHeading: Locator;
    readonly tocNav: Locator;
    readonly prevButton: Locator;
    readonly nextButton: Locator;
    readonly navigationSection: Locator;

    constructor(page: Page) {
        this.page = page;

        // Elementos principais
        this.article = page.getByRole('article');
        this.chapterTitle = this.article.getByRole('heading', { level: 1 });
        this.backButton = page.getByRole('link', { name: /Voltar ao Codex/i });

        // Breadcrumbs
        this.breadcrumbNav = page.getByRole('navigation', { name: /breadcrumb/i });

        // Table of Contents
        this.tocHeading = page.getByRole('heading', { name: /Neste Capítulo/i });
        this.tocNav = page.getByRole('complementary').or(page.locator('aside')).first();

        // Navegação entre capítulos
        this.navigationSection = page.locator('div.border-t.border-gold-500\\/20');
        this.prevButton = page.getByRole('link').filter({ hasText: /Anterior/i });
        this.nextButton = page.getByRole('link').filter({ hasText: /Próximo/i });
    }

    /**
     * Configura viewport se necessário (para TOC)
     */
    async init(viewportSize?: { width: number; height: number }) {
        if (viewportSize) {
            await this.page.setViewportSize(viewportSize);
        }
    }

    /**
     * Valida que a página do capítulo está carregada
     */
    async validatePageLoaded() {
        await expect(this.article).toBeVisible();
        await expect(this.chapterTitle).toBeVisible();
    }

    /**
     * Valida que os breadcrumbs estão visíveis
     */
    async validateBreadcrumbs() {
        await expect(this.breadcrumbNav).toBeVisible();
        const codexBreadcrumb = this.breadcrumbNav.getByRole('link', { name: /codex/i });
        await expect(codexBreadcrumb).toBeVisible();
    }

    /**
     * Valida que o conteúdo do capítulo está vis

ível
     */
    async validateContent() {
        await expect(this.article).toBeVisible();

        const articleText = await this.article.textContent();
        expect(articleText).toBeTruthy();
        expect(articleText!.length).toBeGreaterThan(100);
    }

    /**
     * Valida que o botão "Voltar ao Codex" está visível
     */
    async validateBackButton() {
        await expect(this.backButton).toBeVisible();
    }

    /**
     * Valida que o Table of Contents está visível e tem links
     */
    async validateTOC() {
        await expect(this.tocHeading).toBeVisible();

        const tocLinks = this.tocNav.getByRole('link');
        const linkCount = await tocLinks.count();
        expect(linkCount).toBeGreaterThan(0);

        // Validar que links têm href com #
        const firstLink = tocLinks.first();
        const href = await firstLink.getAttribute('href');
        expect(href).toMatch(/^#/);

        return { tocLinks, linkCount };
    }

    /**
     * Clica em um link do TOC e valida o scroll
     */
    async clickTOCLink(index: number = 0) {
        const tocLinks = this.tocNav.getByRole('link');
        const link = tocLinks.nth(index);

        await expect(link).toBeVisible();

        const href = await link.getAttribute('href');
        expect(href).toMatch(/^#/);

        const targetId = href!.replace('#', '');
        await link.click();

        // Aguardar scroll suave
        await this.page.waitForTimeout(1000);

        // Validar que elemento está na viewport
        const targetElement = this.page.locator(`#${targetId}`);
        await expect(targetElement).toBeInViewport();
    }

    /**
     * Valida navegação entre capítulos (Anterior/Próximo)
     */
    async validateChapterNavigation() {
        await expect(this.navigationSection).toBeVisible();

        const hasPrev = (await this.prevButton.count()) > 0;
        const hasNext = (await this.nextButton.count()) > 0;

        expect(hasPrev || hasNext).toBeTruthy();

        // Validar que botões visíveis estão habilitados
        if (hasPrev) {
            await expect(this.prevButton.first()).toBeVisible();
            await expect(this.prevButton.first()).toBeEnabled();
        }

        if (hasNext) {
            await expect(this.nextButton.first()).toBeVisible();
            await expect(this.nextButton.first()).toBeEnabled();
        }

        return { hasPrev, hasNext };
    }
}
