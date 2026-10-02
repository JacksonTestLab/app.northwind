import { test, expect } from '@playwright/test';

test('deve carregar a página inicial com sucesso', async ({ page }) => {
  await page.goto('https://northwind-test-platform.vercel.app/');
  await expect(page).toHaveTitle('QA Automation Shop');

});