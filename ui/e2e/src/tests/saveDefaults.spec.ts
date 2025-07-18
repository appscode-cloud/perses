

import { SAVE_DEFAULTS_DIALOG_TEXT } from '@perses-dev/core';
import { test, expect } from '../fixtures/dashboardTest';

const TEXT_VARIABLE_UPDATED_VALUE = 'new';

test.use({
  dashboardName: 'Defaults',
  modifiesDashboard: true,
});

test.describe('Dashboard: Defaults', () => {
  test('can default to stored duration', async ({ page, dashboardPage }) => {
    await expect(dashboardPage.timePicker).toContainText('Last 1 hour');
    await expect(page.url()).toContain('start=1h');
  });

  test('can update default dashboard duration', async ({ page, dashboardPage }) => {
    // Change selected relative time range
    await dashboardPage.timePicker.click();
    await page.getByRole('option', { name: 'Last 6 hours' }).click();
    await expect(page.url()).toContain('start=6h');

    // Changed selected interval variable
    await expect(dashboardPage.getVariable('interval')).toHaveValue('1m');
    await dashboardPage.getVariable('interval').click();
    await page.getByRole('option', { name: '5m' }).click();

    // Change text variable
    const textVariableInput = await page.getByRole('textbox', { name: 'Text variable' });
    await textVariableInput.clear();
    await textVariableInput.type(TEXT_VARIABLE_UPDATED_VALUE, { delay: 100 });

    // Switch to edit mode and click save
    await dashboardPage.startEditing();
    const toolbarSaveButton = await page.getByRole('button', { name: 'Save' });
    await toolbarSaveButton.click();

    // Save defaults confirmation dialog should open, click btn to save
    const saveChangesConfirmationDialog = dashboardPage.getDialog('Save Dashboard');
    await expect(saveChangesConfirmationDialog).toBeVisible();
    const dialogText = await saveChangesConfirmationDialog.getByText(SAVE_DEFAULTS_DIALOG_TEXT);
    await expect(dialogText).toBeVisible();
    const dialogSaveButton = await saveChangesConfirmationDialog.getByRole('button', { name: 'Save Changes' });
    await dialogSaveButton.click();

    // Confirm correct duration and default list variable value are persisted
    await page.evaluate(() => {
      window.location.search = '';
    });
    await page.getByRole('button', { name: 'Refresh', exact: true }).click();
    await expect(page.url()).toContain('start=6h');
    await expect(dashboardPage.timePicker).toContainText('Last 6 hours');
    await expect(dashboardPage.getVariable('interval')).toHaveValue('5m');

    // Confirm text variable value is persisted
    const newTextVariableInput = await page.getByRole('textbox', { name: 'Text variable' });
    const inputValue = await newTextVariableInput.inputValue();
    await expect(inputValue).toContain(TEXT_VARIABLE_UPDATED_VALUE);
  });
});
