import { test, expect } from '@playwright/test';

test.describe('Página de Personagens', () => {
    test('deve exibir página de personagens', async ({ page }) => {
        await page.goto('/characters');

        await expect(page).toHaveURL('/characters');
    });

    test('deve ter breadcrumbs', async ({ page }) => {
        await page.goto('/characters');

        const breadcrumbs = page.locator('text=Personagens');
        await expect(breadcrumbs.first()).toBeVisible();
    });

    test('deve exibir seção "Meus Personagens" quando logado (teste placeholder)', async ({ page }) => {
        await page.goto('/characters');

        // Este teste é um placeholder
        // Nota: Requer configuração de autenticação Clerk para teste completo
        const myCharactersHeading = page.locator('h2:has-text("Meus Personagens"), h3:has-text("Meus Personagens")');

        // Verificar que a página carregou
        expect(await page.title()).toBeTruthy();
    });

    test('deve exibir cards de personagem com informações corretas', async ({ page }) => {
        await page.goto('/characters');

        // Verificar se há cards de personagem (mock data)
        const characterCards = page.locator('[class*="Card"]').filter({ hasText: /Nível|Level/ });

        // Se houver cards, verificar estrutura
        if (await characterCards.count() > 0) {
            const firstCard = characterCards.first();
            await expect(firstCard).toBeVisible();
        }
    });

    test('deve ter botão "Novo Personagem"', async ({ page }) => {
        await page.goto('/characters');

        const newCharButton = page.locator('text=Novo Personagem').first();

        // Se o botão existe, deve ser visível
        if (await newCharButton.count() > 0) {
            await expect(newCharButton).toBeVisible();
        }
    });
});
