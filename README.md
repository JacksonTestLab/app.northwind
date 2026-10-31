<div align="center">



# 🎭 app-northwind
### Projeto de Automação de Testes E2E com Playwright

[![Playwright Tests](https://github.com/cursosgotasdetecnologia/app-northwind/actions/workflows/playwright.yml/badge.svg)](https://github.com/cursosgotasdetecnologia/app-northwind/actions/workflows/playwright.yml)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Playwright](https://img.shields.io/badge/Playwright-1.x-45ba4b?style=flat&logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat&logo=node.js&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat&logo=githubactions&logoColor=white)


> **Automação de testes End-to-End completa e escalável em uma aplicação real (Northwind).**  
> Projeto de estudo profissional focado em entregar qualidade, velocidade e confiabilidade utilizando as melhores práticas do mercado.

## 📋 Sobre o Projeto

O **app-northwind** é um repositório de automação de testes E2E desenvolvido com **Playwright + JavaScript puro**.  

O objetivo é criar uma suíte de testes robusta, mantível e pronta para ambientes de CI/CD, simulando cenários reais de uma aplicação corporativa (Northwind).  

Aqui você encontrará:
- Testes E2E completos (UI + API)
- Configuração avançada de Playwright (parallel, trace, reporting)
- Integração nativa com GitHub Actions
- Uso exclusivo de SSH para Git
- Boas práticas de Clean Code, Page Object Model e Data-Driven Testing


> **Este é um documento vivo.**  
Ele evoluirá junto com o projeto à medida que novos testes, relatórios, pipelines e melhorias forem implementados.  

Vamos construir algo profissional e impactante! 💪

## 🛠️ Tecnologias Utilizadas

| Ferramenta          | Finalidade |
|---------------------|------------|
| **Playwright**      | Framework principal para automação de testes E2E (browser, API e mobile) |
| **JavaScript (puro)** | Linguagem de programação (sem TypeScript por enquanto) |
| **Node.js**         | Runtime para execução dos testes |
| **Git**             | Controle de versão com commits semânticos |
| **GitHub (SSH)**    | Hospedagem do repositório com autenticação segura via chave SSH |
| **GitHub Actions**  | CI/CD completo (execução paralela, relatórios e notificação) |

## 🏗️ Arquitetura do Projeto

```
app-northwind/
├── .github/
│   └── workflows/
│       └── playwright.yml        # Pipeline CI/CD
├── components/
│   └── products/
│       ├── createProductModal.js
│       ├── EditProductModal.js
│       ├── DeleteConfirmationDialog.js
│       ├── ProductDetailModal.js
├── fixtures/
│   ├── products-data.json        # Dados de cadastro e validação
│   ├── products-mass.json        # Massa JSON para loop
│   ├── combo-fornecedores.json   # Lista esperada de fornecedores
│   ├── combo-categorias.json     # Lista esperada de categorias
│   └── csv/
│       └── products-mass.csv    # Massa CSV
├── pages/
│   ├── ProductsPage.js
│   ├── LoginPage.js
│   └── CadastroPage.js
├── tests/
│   ├── createProductModal.spec.js
│   ├── editProductModal.spec.js
│   ├── deleteProduct.spec.js
│   ├── detailProduct.spec.js
│   ├── combos.spec.js
│   ├── busca.spec.js
│   └── reset-filtros.spec.js
└── playwright.config.ts
```
---

## ✅ Checklist de Implementação

- [x] Page Object Model — locators e ações encapsulados por responsabilidade
- [x] CRUD completo automatizado — cadastro, edição, exclusão e detalhes
- [x] Validação de campos obrigatórios e mensagens de erro
- [x] Validação de combos — fornecedores e categorias (existência + contagem exata)
- [x] Busca dinâmica — validação linha a linha dos resultados
- [x] Reset de filtros — validação de estado antes e depois
- [x] Data Driven Testing com JSON e CSV
- [x] Massa de dados dinâmica com Faker.js
- [x] Evidências automáticas — screenshots e vídeos em falhas
- [x] Trace Viewer — investigação de falhas com timeline
- [x] Allure Report — relatórios com severity, epic e feature
- [x] CI/CD com GitHub Actions — pipeline automático a cada push e PR
- [x] Playwright Report como artifact no GitHub Actions

---

## 📥 Instalação

### 1. Clone o repositório via SSH

```bash
git clone git@github.com:JacksonTestLab/app.northwind.git
cd app-northwind
npm install
```

Configure `BASE_URL`, `USER_EMAIL` e `USER_PASSWORD` no arquivo local `.env` (os nomes usam sublinhado).

## 📊 Relatórios Allure

Os resultados do Allure são gravados em `allure-results/`; o relatório HTML é criado em `allure-report/`. Esses arquivos são locais e ignorados pelo Git.

```bash
# Executa os testes e inicia uma coleta nova de resultados Allure
npm run test:allure

# Gera o relatório HTML e abre no navegador
npm run allure:generate
npm run allure:open

# Alternativa: gera e serve os resultados diretamente
npm run allure:serve
```

Para executar os testes sem limpar os resultados anteriores, use `npm test`. O comando `npm run allure:clean` remove os resultados e relatórios locais existentes.

## 👨‍💻 Sobre o analista de QA

Os testes deste projeto estão sendo realizados pelo analista de QA **Jackson Mendes**, utilizando a plataforma **Northwind Test Platform** como ambiente para prática e validação de testes automatizados.

### 🎓 Formação

**Playwright Web — Do Agile ao CI/CD**

### 🌐 Plataforma

[Northwind Test Platform](https://northwind-test-platform.vercel.app/)

### 🔗 Conecte-se

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/jackson-mendes-a4731a2b3/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge\&logo=github\&logoColor=white)](https://github.com/JacksonTestLab)
