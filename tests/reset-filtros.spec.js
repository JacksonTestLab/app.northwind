import { test, expect } from '@playwright/test';
const ProductsPage = require('../pages/ProductsPage');

test.describe('[Gestao de Produtos] Reset de Filtros', () => {
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

  test('Deve limpar todos os filtros e restaurar a lista completa', async ({ page }) => {
    const rows = page.locator('table tbody tr');

    // Conta os produtos antes de aplicar os filtros.
    const totalInicial = await rows.count();

    // Aplica os filtros disponíveis na tela: busca e fornecedor.
    await productsPage.searchInput.fill('Cinto');
    
    await expect(rows).not.toHaveCount(totalInicial, { timeout: 10000 });

    const primeiraOpcaoFornecedor = productsPage.supplierFilter
      .locator('option:not([value=""])')
      .first();
    const fornecedorSelecionado = await primeiraOpcaoFornecedor.getAttribute('value');

    if (fornecedorSelecionado === null) {
      throw new Error('Nenhum fornecedor disponível para validar o filtro.');
    }

    await productsPage.supplierFilter.selectOption(fornecedorSelecionado);
    await expect(productsPage.supplierFilter).toHaveValue(fornecedorSelecionado);

    // Aguarda a lista estabilizar após aplicar os filtros.
    await page.waitForTimeout(500);

    // Valida que a lista filtrada não excede a lista inicial.
    const totalFiltrado = await rows.count();
    expect(totalFiltrado).toBeLessThanOrEqual(totalInicial);

    // Limpa os filtros.
    await productsPage.clearFilters();

    // Aguarda a lista completa voltar.
    await expect(rows).toHaveCount(totalInicial, { timeout: 10000 });

    // Valida que os campos voltaram vazios.
    await expect(productsPage.searchInput).toHaveValue('');
    await expect(productsPage.supplierFilter).toHaveValue('');
  });
});