import { test, expect } from "@playwright/test";

test.describe("Calculator E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("realiza operaciones matemáticas básicas", async ({ page }) => {
    // Suma: 2 + 3 = 5
    await page.click('[data-testid="btn-2"]');
    await page.click('[data-testid="btn-add"]');
    await page.click('[data-testid="btn-3"]');
    await page.click('[data-testid="btn-equals"]');

    await expect(page.locator('[data-testid="calculator-display"]')).toHaveText(
      "5"
    );
  });

  test("maneja errores de división por cero", async ({ page }) => {
    await page.click('[data-testid="btn-5"]');
    await page.click('[data-testid="btn-divide"]');
    await page.click('[data-testid="btn-0"]');
    await page.click('[data-testid="btn-equals"]');

    await expect(page.locator('[data-testid="error-display"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-display"]')).toContainText(
      "No se puede dividir por cero"
    );
  });

  test("funciona el historial de operaciones", async ({ page }) => {
    // Realizar operación
    await page.click('[data-testid="btn-2"]');
    await page.click('[data-testid="btn-multiply"]');
    await page.click('[data-testid="btn-4"]');
    await page.click('[data-testid="btn-equals"]');

    // Mostrar historial
    await page.click('[data-testid="btn-history"]');

    // Verificar que aparece en historial
    await expect(
      page.locator('[data-testid="history-item"]').first()
    ).toContainText("2 × 4 = 8");
  });

  test("limpia la calculadora correctamente", async ({ page }) => {
    // Ingresar algunos números
    await page.click('[data-testid="btn-9"]');
    await page.click('[data-testid="btn-9"]');
    await page.click('[data-testid="btn-9"]');

    // Limpiar
    await page.click('[data-testid="btn-clear"]');

    await expect(page.locator('[data-testid="calculator-display"]')).toHaveText(
      "0"
    );
  });

  test("calcula raíz cuadrada", async ({ page }) => {
    await page.click('[data-testid="btn-9"]');
    await page.click('[data-testid="btn-sqrt"]');

    await expect(page.locator('[data-testid="calculator-display"]')).toHaveText(
      "3"
    );
  });
});
