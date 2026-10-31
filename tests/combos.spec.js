import { test, expect } from '@playwright/test';
const ProductsPage = require('../pages/ProductsPage');
const CreateProductModal = require('../components/products/createProductModal');
const {
  routeCategoryRequestsWithinApiLimit,
} = require('./helpers/categoryApi');

test.describe('[Gestao de Produtos] Validacao dos Combos', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await routeCategoryRequestsWithinApiLimit(page);
    await page.goto('/');
    await page.getByTestId('email-input').fill(process.env.USER_EMAIL);
    await page.getByTestId('password-input').fill(process.env.USER_PASSWORD);
    await page.getByTestId('login-button').click();
    await page.locator('table tbody tr').first()
      .waitFor({ state: 'visible', timeout: 15000 });
  });

  // ─────────────────────────────────────────────────────────────
  test.describe('Fornecedores', () => {

    test('Deve exibir o combo de fornecedores na tela', async () => {
      await expect(productsPage.supplierFilter).toBeVisible();
    });

    test('Deve exibir a opcao padrao Todos os fornecedores', async () => {
      await expect(productsPage.supplierFilter).toHaveValue('');
    });

    test('Deve conter fornecedores disponíveis no combo', async () => {
      const options = productsPage.supplierFilter.locator('option:not([value=""])');
      expect(await options.count()).toBeGreaterThan(0);
    });

    test('Nao deve conter fornecedores sem rótulo', async () => {
      const options = productsPage.supplierFilter.locator('option:not([value=""])');
      const labels = await options.allTextContents();
      expect(labels.every(label => label.trim().length > 0)).toBe(true);
    });

    test('Deve conter fornecedores além da opção padrão', async () => {
      const options = productsPage.supplierFilter.locator('option:not([value=""])');
      expect(await options.count()).toBeGreaterThan(0);
    });

    test('Listar todos os fornecedores no terminal', async () => {
      const options = productsPage.supplierFilter.locator('option:not([value=""])');
      const count = await options.count();
      console.log(`\n— Fornecedores no combo (${count} itens) —`);
      for (let i = 0; i < Math.min(count, 5); i++) {
        const texto = (await options.nth(i).textContent()).trim();
        console.log(`  ${i + 1}. ${texto}`);
      }
    });

  });

  // ─────────────────────────────────────────────────────────────
  test.describe('Categorias', () => {

    test('Deve exibir as categorias no formulário de produto', async ({ page }) => {
      const modal = new CreateProductModal(page);
      await modal.open();
      await modal.categoryDropdown.click();
      const options = page.locator('[data-testid^="add-product-category-option-"]');
      await expect(options.first()).toBeVisible();
    });

    test('Deve exibir o seletor de categoria no formulário', async ({ page }) => {
      const modal = new CreateProductModal(page);
      await modal.open();
      await expect(modal.categoryDropdown).toBeVisible();
    });

    test('Deve conter ao menos uma categoria selecionável', async ({ page }) => {
      const modal = new CreateProductModal(page);
      await modal.open();
      await modal.categoryDropdown.click();
      const options = page.locator('[data-testid^="add-product-category-option-"]');
      await expect(options.first()).toBeVisible();
      expect(await options.count()).toBeGreaterThan(0);
    });

    test('Nao deve exibir opcoes de categoria sem rótulo', async ({ page }) => {
      const modal = new CreateProductModal(page);
      await modal.open();
      await modal.categoryDropdown.click();
      const options = page.locator('[data-testid^="add-product-category-option-"]');
      await expect(options.first()).toBeVisible();
      const labels = await options.allTextContents();
      expect(labels.length).toBeGreaterThan(0);
      expect(labels.every(label => label.trim().length > 0)).toBe(true);
    });

    test('Deve conter categorias além da opção padrão', async ({ page }) => {
      const modal = new CreateProductModal(page);
      await modal.open();
      await modal.categoryDropdown.click();
      const options = page.locator('[data-testid^="add-product-category-option-"]');
      await expect(options.first()).toBeVisible();
      expect(await options.count()).toBeGreaterThan(0);
    });

    test('Listar categorias disponíveis no terminal', async ({ page }) => {
      const modal = new CreateProductModal(page);
      await modal.open();
      await modal.categoryDropdown.click();
      const options = page.locator('[data-testid^="add-product-category-option-"]');
      await expect(options.first()).toBeVisible();
      const count = await options.count();
      console.log(`\n— Categorias no combo (${count} itens) —`);
      for (let i = 0; i < Math.min(count, 5); i++) {
        const texto = (await options.nth(i).textContent()).trim();
        console.log(`  ${i + 1}. ${texto}`);
      }
    });

  });

});