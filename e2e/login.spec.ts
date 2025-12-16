import { test, expect } from "@playwright/test";

test.describe("Login E2E", () => {
  test("Deve permitir que um usuário faça login com credenciais válidas", async ({ page}) => {
    // Navega até a página de login
    await page.goto("/login");
    // Preenche o formulário de login
    await page.fill('input[name="email"]', process.env.USER_EMAIL || "");
    await page.fill('input[name="password"]', process.env.USER_PASSWORD || "");
    // Clica no botão de login
    await page.click('button[type="submit"]');
    // Verifica redirecionamento para a home após login bem-sucedido
    await expect(page).toHaveURL(/\/$/);
  });
});