import { test, expect } from '@playwright/test';
const ProductsPage = require('../pages/ProductsPage');

test.describe('[Gestao de Produtos] Busca Dinamica', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await page.goto('/');
    await page.getByTestId('email-input').fill(process.env.USER_EMAIL);
    await page.getByTestId('password-input').fill(process.env.USER_PASSWORD);
    await page.getByTestId('login-button').click();
    await page.locator('table tbody tr').first()
      .waitFor({ state: 'visible', timeout: 15000 });
  });

  test('Deve filtrar produtos pelo termo buscado', async ({ page }) => {
    const rows = page.locator('table tbody tr');
    const nomeProduto = (await rows.first().locator('td').nth(1).textContent()).trim();

    await productsPage.searchInput.fill(nomeProduto);

    await expect(rows.first().locator('td').nth(1)).toHaveText(nomeProduto, {
      timeout: 10000,
    });

    await expect
      .poll(
        async () => {
          const nomesFiltrados = await rows
            .locator('td:nth-child(2)')
            .allTextContents();
          return (
            nomesFiltrados.length > 0 &&
            nomesFiltrados.every(nome =>
              nome.toLowerCase().includes(nomeProduto.toLowerCase()),
            )
          );
        },
        { timeout: 10000 },
      )
      .toBe(true);
  });

  test('Deve exibir lista vazia quando nenhum produto for encontrado', async ({ page }) => {
    const rows = page.locator('table tbody tr');
    const totalAntes = await rows.count();

    await productsPage.searchInput.fill('zzzzz_inexistente');

    // aguarda a tabela mudar
    await expect(rows).not.toHaveCount(totalAntes, { timeout: 10000 });

    expect(await rows.count()).toBe(0);
  });
});
