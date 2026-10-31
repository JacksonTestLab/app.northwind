# 📊 Relatório de Execução de Testes Automatizados

**Projeto:** Allure Report  
**Data da Execução:** 06/10/2026  
**Período:** 12:50:29 – 10:25:46  
**Duração Total:** 21h 35m  
**Ambiente:** Chromium  
**Ferramenta:** Allure Report  

---

## 1. Resumo Executivo

A suíte de testes automatizados foi executada com **88 casos de teste**, alcançando uma **taxa de sucesso de 81.81%**.

| Status          | Quantidade | Percentual |
|-----------------|------------|------------|
| ✅ Passou       | 72         | 81.81%     |
| ❌ Falhou       | 11         | 12.50%     |
| ⚠️ Quebrado    | 5          | 5.68%      |
| ⏭️ Ignorado    | 0          | 0%         |
| ❓ Desconhecido| 0          | 0%         |

**Conclusão:** A maior parte dos testes passou com sucesso. As falhas concentram-se principalmente em fluxos de **criação e edição de produtos**, relacionadas à indisponibilidade da categoria "Acessórios" no formulário.

---

## 2. Resultados por Suite

| Suite                        | ✅ Passou | ❌ Falhou | ⚠️ Quebrado | Total |
|-----------------------------|-----------|-----------|-------------|-------|
| acessoPagina.spec.js        | 2         | 0         | 0           | 2     |
| cadastroLogin.spec.js       | 7         | 0         | 0           | 7     |
| createProductModal.spec.js  | 10        | 7         | 3           | 20    |
| deleteProduct.spec.js       | 3         | 0         | 0           | 3     |
| detailProduct.spec.js       | 6         | 0         | 2           | 8     |
| editProductModal.spec.js    | 38        | 4         | 0           | 42    |
| login.spec.js               | 6         | 0         | 0           | 6     |
| **Total**                   | **72**    | **11**    | **5**       | **88**|

---

## 3. Bugs Encontrados

### 3.1 Product Defects (11 ocorrências)

| ID | Teste | Severidade | Duração | Descrição do Erro | Status |
|----|-------|------------|---------|-------------------|--------|
| #1 | Deve permitir editar o produto imediatamente após o cadastro | Comum | 7s 773ms | Categoria "Acessórios" indisponível no formulário. `expect(locator).toBeVisible()` failed para o botão `getByRole('button', { name: 'Acessórios', exact: true })` | ❌ Falhou |
| - | Diversos testes de criação/edição de produto | Comum | Variável | Mesmo erro recorrente: elemento da categoria "Acessórios" não encontrado no formulário (timeout 6000ms) | ❌ Falhou |

**Detalhes técnicos do principal erro:**
- **Locator:** `getByRole('button', { name: 'Acessórios', exact: true })`
- **Expected:** visible
- **Timeout:** 6000ms
- **Error:** element(s) not found
- **Evidências disponíveis:** Screenshot, vídeo, error-context e trace

### 3.2 Test Defects (5 ocorrências)

Falhas classificadas como problemas de teste (possível instabilidade ou dependência de dados).

---

## 4. Distribuição por Severidade

| Severidade | Quantidade |
|------------|------------|
| Blocker    | 0          |
| Critical   | 0          |
| Normal     | ~60+       |
| Minor      | Poucos     |
| Trivial    | Poucos     |

A maioria das falhas está classificada como **Normal**.

---

## 5. Análise de Tendência e Duração

- **Taxa de sucesso:** 81.81% (estável em relação à tendência recente).
- **Duração dos testes:** Maioria dos testes executa em menos de 10 segundos. Alguns outliers chegam a ~1 minuto.
- **Tendência de tentativas:** Aumento gradual de tentativas ao longo do tempo.
- **Tendência de categorias:** Crescimento de Product Defects e Test Defects.

---

## 6. Histórico Resumido

| Data       | Total | Passou | Falhou | Quebrado | Taxa de Sucesso |
|------------|-------|--------|--------|----------|-----------------|
| 06/10/2026 | 88    | 72     | 11     | 5        | 81.81%          |

> *Nota: Histórico completo de execuções anteriores pode ser consultado no Allure Report.*

---

## 7. Próximas Ações Recomendadas

| Prioridade | Ação | Responsável | Prazo Sugerido |
|------------|------|-------------|----------------|
| 🔴 Alta    | Investigar e corrigir a indisponibilidade da categoria **"Acessórios"** no formulário de produto (bug de produto) | Time de Desenvolvimento | Imediato |
| 🔴 Alta    | Validar se o problema ocorre apenas em ambiente de teste ou também em produção | QA + Dev | 1-2 dias |
| 🟡 Média   | Revisar e estabilizar os 5 testes classificados como **Test Defects** | QA | 3 dias |
| 🟡 Média   | Adicionar mais robustez nos locators (ex: espera explícita ou fallback de categorias) | QA | 1 semana |
| 🟢 Baixa   | Atualizar dados de teste para garantir que categorias necessárias existam no banco | QA | Próxima sprint |
| 🟢 Baixa   | Incluir variáveis de ambiente no relatório Allure para melhor rastreabilidade | QA | Próxima execução |

---

## 8. Evidências e Anexos

- [Visão Geral](../evidencias-e-anexos/1_visao_geral.png)
- [Categorias / Detalhes do Bug](../evidencias-e-anexos/2_categorias.png)
- [Suítes](../evidencias-e-anexos/3_suites.png)
- [Gráficos e Tendências](../evidencias-e-anexos/4_graficos.png)

---

**Gerado automaticamente a partir do Allure Report**  
**Status Geral:** 🟡 Atenção necessária (bugs de produto identificados)  

---

> Relatório preparado para versionamento no GitHub.  
> Recomenda-se atualizar este documento a cada nova execução da suíte.