class EditProductModal {
  constructor(page) {
    this.page = page;

    // Locators dos campos do formulário de edição
    this.nameInput = page.getByTestId('edit-product-name');
    this.priceInput = page.getByTestId('edit-product-price');
    this.stockInput = page.getByTestId('edit-product-stock');
    this.skuInput = page.getByTestId('edit-product-sku');

    // Botões do modal
    this.submitButton = page.getByTestId('edit-product-submit');
    this.cancelButton = page.getByTestId('edit-product-cancel');

    // Heading do modal (valida abertura)
    this.modalHeading = page.getByRole('heading', { name: 'Editar Produto' });

  }

  // Métodos de preenchimento
  async fillName(value) {
    await this.nameInput.clear();
    await this.nameInput.fill(value);
  }

  async fillPrice(value) {
    await this.priceInput.clear();
    await this.priceInput.fill(value);
  }

  async fillStock(value) {
    await this.stockInput.clear();
    await this.stockInput.fill(value);
  }

  async fillSku(value) {
    await this.skuInput.clear();
    await this.skuInput.fill(value);
  }

  // Ações do modal
  async save() {
    await this.submitButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getError(message) {
    return this.page.getByText(message, { exact: true });
  }
}

module.exports = EditProductModal;