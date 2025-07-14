

import updatedDefaultsDashboard from '../data/updatedDefaultsDashboard.json';
import { test, expect } from '../fixtures/dashboardTest';

test.use({
  dashboardName: 'EditJson',
  modifiesDashboard: true,
});

test.describe('Dashboard: EditJson', () => {
  test('can save new default values from JSON editor', async ({ page, dashboardPage }) => {
    await dashboardPage.startEditing();
    await page.getByRole('button', { name: 'Edit JSON' }).click(); // TODO: move TOOLTIP_TEXT.editJson to @perses-dev/core and share constant here
    const jsonInput = dashboardPage.page.getByRole('textbox');
    await jsonInput.clear();
    await jsonInput.fill(JSON.stringify(updatedDefaultsDashboard));
    await dashboardPage.page.getByRole('button', { name: 'Apply', exact: true }).click();
    await dashboardPage.saveChanges();
    await expect(page.url()).toContain('start=5m');
    await expect(dashboardPage.timePicker).toContainText('Last 5 minutes');
    await expect(dashboardPage.page.getByTestId('variable-interval').getByRole('combobox')).toHaveValue('5m');
  });
});
