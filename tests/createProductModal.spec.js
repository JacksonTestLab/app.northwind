import { test, expect } from "@playwright/test";
import CreateProductModal from "../components/products/createProductModal";
//import { faker } from "@faker-js/faker/locale/pt_BR";
import { faker } from "@faker-js/faker/locale/en";
import { severity, description, tag } from "allure-js-commons";


// dados de entrada/expectativa semelhantes ao fixture de cadastro
const dados = require("../fixtures/products-data.json");
const ProductsPage = require("../pages/ProductsPage");
const {
  routeCategoryRequestsWithinApiLimit,
} = require("./helpers/categoryApi");

test.describe("Cadastro de Produto", () => {
  let modal;

  test.beforeEach(async ({ page }) => {
    modal = new CreateProductModal(page);

    await routeCategoryRequestsWithinApiLimit(page);
    await page.goto("/");
    await page.getByTestId("email-input").fill(process.env.USER_EMAIL);
    await page.getByTestId("password-input").fill(process.env.USER_PASSWORD);
    await page.getByTestId("login-button").click();
    await page.waitForURL("**/products");
    await page
      .locator("table tbody tr")
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  });

  test.describe("Criação de Produto - Validações de Entrada", () => {
    test("Deve exibir mensagem de erro quando o nome estiver vazio", async () => {
      await severity("critical");
      await tag("validacao");

      const cenario = dados.nomeObrigatorio;

      await modal.open();
      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(
        modal.getError(cenario.esperado.mensagem),
      ).toBeVisible();
    });

    test("Deve exibir mensagem de erro quando o nome tiver menos de 6 caracteres", async () => {
      const cenario = dados.nomeMuitoCurto;

      await modal.open();
      await modal.fillName(cenario.dados.name);
      await modal.submit();
      await expect(
        modal.getError(cenario.esperado.mensagem),
      ).toBeVisible();
    });

    test("Deve exibir mensagem de erro quando o nome contiver números", async ({
      page,
    }) => {
      const cenario = dados.nomeComNumeros;

      await modal.open();
      await modal.fillName(cenario.dados.name);
      await modal.submit();
      //await page.pause(); // para aqui e abre o Inspector
      await expect(
        modal.getError(cenario.esperado.mensagem),
      ).toBeVisible();
    });
  });

  test.describe("Criação de Produto - Fluxo de Sucesso", () => {
    test("Deve criar o produto com sucesso quando os dados forem válidos", async ({
      page,
    }) => {
      const cenario = dados.valido;

      const nomeProduto = `Produto QA ${faker.string.alpha(8)}`;
      const skuProduto = faker.string.alpha(8).toUpperCase();
      await modal.open();
      const firstProductCells = page
        .locator("table tbody tr")
        .first()
        .locator("td");
      const supplier = (await firstProductCells.nth(4).innerText()).trim();

      //await modal.fillName(cenario.dados.name);
      //await modal.fillSku(cenario.dados.sku);
      //uso do faker
      await modal.fillSku(skuProduto);
      await modal.fillName(nomeProduto);

      await modal.fillPrice(cenario.dados.price);
      await modal.fillStock(cenario.dados.stock);

      await modal.selectFirstAvailableCategory();
      await modal.selectSupplier(supplier);
      await modal.submit();
      await expect(modal.modalHeading).toBeHidden();
    });
  });

  test.describe("[Gestão de Produtos] Elementos da Tela de Produtos", () => {
    test("Deve exibir a busca e o filtro de fornecedor", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      // Validação
      await expect(productsPage.searchInput).toBeVisible();
      await expect(productsPage.supplierFilter).toBeVisible();
      //await expect(productsPage.clearFiltersButton).toBeVisible();
    });

    test("Deve exibir ação de edição disponível para o produto", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      // Validação
      await expect(productsPage.editButton).toBeVisible();
    });

    test("Deve exibir ação de exclusão disponível para o produto", async ({
      page,
    }) => {
      await severity('minor');
      await tag('ui');
      const productsPage = new ProductsPage(page);

      // Validação
      await expect(productsPage.deleteButton).toBeVisible();
    });

    test("Deve exibir ação de visualização de detalhes do produto", async ({
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      // Validação
      await expect(productsPage.detailsButton).toBeVisible();
    });

    test("Deve exibir controles de paginação", async ({ page }) => {
      const productsPage = new ProductsPage(page);

      // Validação
      await expect(productsPage.nextPageButton).toBeVisible();
      await expect(productsPage.previousPageButton).toBeVisible();
    });

    test("Não deve permitir criar produto sem categoria", async ({ page }) => {
      await severity('blocker');
      await description('Regra de negócio crítica: produto não pode existir sem categoria');

      const firstProductCells = page
        .locator("table tbody tr")
        .first()
        .locator("td");
      const supplier = (await firstProductCells.nth(4).innerText()).trim();

      await modal.open();
      await modal.fillName("Produto Teste");
      await modal.fillPrice(dados.valido.dados.price);
      await modal.fillStock(dados.valido.dados.stock);
      await modal.fillSku(faker.string.alpha(8).toUpperCase());
      await modal.selectSupplier(supplier);
      await modal.submit();

      await expect(modal.modalHeading).toBeVisible();
    });

    test("Cria produto com sucesso", async ({ page }) => {
      await severity('normal');
      await tag('fluxo-principal');

      const nomeProduto = `Produto QA ${faker.string.alpha(8)}`;
      const skuProduto = faker.string.alpha(8).toUpperCase();
      const firstProductCells = page
        .locator("table tbody tr")
        .first()
        .locator("td");
      const supplier = (await firstProductCells.nth(4).innerText()).trim();

      await modal.open();
      await modal.fillName(nomeProduto);
      await modal.fillSku(skuProduto);
      await modal.fillPrice(dados.valido.dados.price);
      await modal.fillStock(dados.valido.dados.stock);
      await modal.selectFirstAvailableCategory();
      await modal.selectSupplier(supplier);
      await modal.submit();
      await expect(modal.modalHeading).toBeHidden();
    });

    test("Botão editar deve existir", async ({ page }) => {
      await severity('minor');
      await tag('ui');

      const productsPage = new ProductsPage(page);
      await expect(productsPage.editButton).toBeVisible();
    });

    test("Botão detalhes deve existir", async ({ page }) => {
      await severity('trivial');
      await tag('ui');

      const productsPage = new ProductsPage(page);
      await expect(productsPage.detailsButton).toBeVisible();
    });
  });

  test.describe("Demo Severity", () => {
    test("Regra crítica do sistema", async () => {
      await severity("blocker");
      await description("Falha que impede uso do sistema");

      expect(true).toBeTruthy();
    });

    test("Validação importante", async () => {
      await severity("critical");

      expect(true).toBeTruthy();
    });

    test("Fluxo principal", async () => {
      await severity("normal");

      expect(true).toBeTruthy();
    });

    test("Problema visual", async () => {
      await severity("minor");

      expect(true).toBeTruthy();
    });

    test("Texto incorreto", async () => {
      await severity("trivial");

      expect(true).toBeTruthy();
    });
  });

  test.describe('Cadastro em Massa via JSON', () => {
    let modal;
    let productsPage;

    test.beforeEach(async ({ page }) => {
      modal = new CreateProductModal(page);
      productsPage = new ProductsPage(page);

      await page.goto('/');
      await page.getByTestId('email-input').fill(process.env.USER_EMAIL);
      await page.getByTestId('password-input').fill(process.env.USER_PASSWORD);
      await page.getByTestId('login-button').click();

      await page.waitForURL('**/products');
      await page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 15000 });
    });

  });

});
