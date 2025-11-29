import { test, expect } from '@playwright/test';

test.describe('Menu Mobile', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('deve abrir e fechar o menu mobile', async ({ page }) => {
        await page.goto('/');

        // Botão do menu deve estar visível
        const menuButton = page.locator('button[aria-label="Menu"]');
        await expect(menuButton).toBeVisible();

        // Abrir menu
        await menuButton.click();

        // Aguardar menu estar visível
        const mobileMenu = page.getByTestId('mobile-menu');
        await expect(mobileMenu).toBeVisible();

        // Verificar itens do menu (escopado para evitar conflito com menu desktop)
        await expect(mobileMenu.getByText('Navegação')).toBeVisible();
        await expect(mobileMenu.getByRole('link', { name: 'Codex' })).toBeVisible();
        await expect(mobileMenu.getByRole('link', { name: 'Grimoire' })).toBeVisible();
        await expect(mobileMenu.getByRole('link', { name: 'Advenae' })).toBeVisible();
        await expect(mobileMenu.getByRole('link', { name: 'Oráculo' })).toBeVisible();
        await expect(mobileMenu.getByRole('link', { name: 'Personagens' })).toBeVisible();
        await expect(mobileMenu.getByRole('link', { name: 'Galeria' })).toBeVisible();

        // Fechar menu - Usando um seletor mais robusto para o botão de fechar
        // O botão está no topo do menu, ao lado do título "Menu"
        const closeButton = mobileMenu.locator('button').filter({ has: page.locator('svg.lucide-x') });
        await closeButton.click();

        // Verificar que menu fechou
        await expect(mobileMenu).toBeHidden();
    });

    test('deve navegar através do menu mobile', async ({ page }) => {
        await page.goto('/');

        const menuButton = page.locator('button[aria-label="Menu"]');
        await menuButton.click();

        const mobileMenu = page.getByTestId('mobile-menu');
        await expect(mobileMenu).toBeVisible();

        await mobileMenu.getByRole('link', { name: 'Codex' }).click();
        await expect(page).toHaveURL('/codex');

        // Menu deve fechar após navegação
        await expect(page.getByTestId('mobile-menu')).toBeHidden();
    });
});
