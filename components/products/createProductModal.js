
const { expect } = require('@playwright/test');


class CreateProductModal {
  constructor(page) {
    this.page = page;

    // botões visíveis na página principal/modal
    this.addProductButton = page.getByRole('button', { name: 'Adicionar Produto' });
    this.modalHeading = page.getByRole('heading', { name: 'Adicionar Produto' });


    this.nameInput = page.getByTestId("add-product-name");
    this.priceInput = page.getByTestId("add-product-price");
    this.stockInput = page.getByTestId("add-product-stock");
    this.skuInput = page.getByTestId("add-product-sku");
    this.categoryDropdown = page.getByRole("button", {
      name: "Selecione a Categoria",
    });
    this.supplierDropdown = page.getByRole("button", {
      name: "Selecione o Fornecedor",
    });
    this.submitButton = page.getByTestId("add-product-submit");
    this.cancelButton = page.getByTestId("add-product-cancel");

  }
  // métdos de preenchimento
  async open() {
    await this.addProductButton.click();
    await expect(this.modalHeading).toBeVisible();
    await expect(this.nameInput).toBeVisible();
  }

  async fillName(value) {
    await this.nameInput.fill(value);
  }

  async fillPrice(value) {
    await this.priceInput.fill(value);
  }

  async fillStock(value) {
    await this.stockInput.fill(value);
  }

  async fillSku(value) {
    await this.skuInput.fill(value);
  }

  async selectCategory(name) {
    await this.categoryDropdown.click();
    const categoryOption = this.page.getByRole("button", { name, exact: true });
    await expect(
      categoryOption,
      `Categoria "${name}" indisponível no formulário`,
    ).toBeVisible();
    await categoryOption.click();
  }

  async selectFirstAvailableCategory() {
    await this.categoryDropdown.click();
    const categoryOption = this.page
      .locator('[data-testid^="add-product-category-option-"]')
      .first();
    await expect(
      categoryOption,
      "Nenhuma categoria disponível para cadastro",
    ).toBeVisible();
    await categoryOption.click();
  }

  async selectSupplier(name) {
    await this.supplierDropdown.click();
    await this.page.getByRole("button", { name }).click();
  }

  // ações do modal
  async submit() {
    await this.submitButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getError(message) {
    return this.page.getByText(message, { exact: true });
  }
}

module.exports = CreateProductModal;
