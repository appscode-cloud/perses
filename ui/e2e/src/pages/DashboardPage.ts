

import { expect, Locator, Page } from '@playwright/test';
import { PanelEditor } from './PanelEditor';
import { VariableEditor } from './VariableEditor';
import { PanelGroup } from './PanelGroup';
import { Panel } from './Panel';

type PanelGroupConfig = {
  name: string;
};

type ThemeName = 'light' | 'dark';

type PanelNameOrPanel = string | Panel;

type GetPanelOpts = {
  /**
   * Name of the panel.
   */
  name?: string;

  /**
   * The parent to look inside for panels. If not specified, defaults to the
   * page. Useful for filtering panels down to a specific group.
   */
  group?: PanelGroup;

  /**
   * The index of the panel. Useful for locating panels with names that change
   * or when multiple panels have the same name.
   */
  nth?: number;
};

/**
 * Perses App dashboard page.
 */
export class DashboardPage {
  readonly page: Page;

  readonly root: Locator;

  readonly themeToggle: Locator;

  readonly toolbar: Locator;
  readonly timePicker: Locator;
  readonly refreshIntervalPicker: Locator;
  readonly editButton: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;
  readonly addPanelGroupButton: Locator;
  readonly addPanelButton: Locator;
  readonly editVariablesButton: Locator;

  readonly panelGroups: Locator;
  readonly panelGroupHeadings: Locator;

  readonly variableList: Locator;

  readonly panelEditor: Locator;
  readonly variableEditor: Locator;

  readonly alert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.root = page.locator('#root');

    this.themeToggle = page.getByRole('button', { name: 'Theme' });

    this.toolbar = page.getByTestId('dashboard-toolbar');
    this.timePicker = page.getByRole('combobox', { name: 'Select time range' });
    this.refreshIntervalPicker = page.getByRole('combobox', { name: 'Select refresh interval' });
    this.editButton = this.toolbar.getByRole('button', { name: /Edit$/ });
    this.cancelButton = this.toolbar.getByRole('button', { name: 'Cancel' });
    this.saveButton = this.toolbar.getByRole('button', { name: 'Save' });
    this.addPanelGroupButton = this.toolbar.getByRole('button', { name: 'Add Panel Group' });
    this.editVariablesButton = this.toolbar.getByRole('button', { name: 'Edit variables' });

    // Needed to select "Add Panel" group button and NOT "Add Panel Group."
    // Exact match on "Add Panel" does not work in some situations, possibly
    // because of other content like icons inside the button.
    this.addPanelButton = this.toolbar.getByRole('button', { name: /Add panel$/ });

    this.panelGroups = page.getByTestId('panel-group');
    this.panelGroupHeadings = this.panelGroups.getByTestId('panel-group-header').getByRole('heading', { level: 2 });

    this.variableList = page.getByTestId('variable-list');

    this.panelEditor = page.getByTestId('panel-editor');
    this.variableEditor = page.getByTestId('variable-editor');

    this.alert = page.getByRole('alert');
  }

  async startEditing(): Promise<void> {
    await this.editButton.click();
    await this.cancelButton.isVisible();
  }

  async saveChanges(): Promise<void> {
    await this.saveButton.click();
    await this.editButton.isVisible();
    await expect(this.alert).toContainText('success');
  }

  getDialog(name: string): Locator {
    return this.page.getByRole('dialog', {
      name: name,
    });
  }

  getVariable(name: string): Locator {
    return this.page.getByTestId('variable-' + name).getByRole('combobox');
  }

  /**
   * THEME HELPERS
   */
  isDarkMode(): void {
    expect(this.themeToggle.locator('#dark')).toBeDefined();
  }

  isLightMode(): void {
    expect(this.themeToggle.locator('#light')).toBeDefined();
  }

  async toggleTheme(): Promise<void> {
    await this.themeToggle.click();
    await this.page.mouse.move(-200, -200);
  }

  /**
   * Runs the specified callback function for each theme on the page. Useful
   * for taking screenshots. Ensure that the callback includes any setup needed
   * before taking a screenshot because the dashboard reloads on changing the
   * theme.
   */
  async forEachTheme(callback: (themeName: ThemeName) => Promise<void>): Promise<void> {
    this.isLightMode();
    await callback('light');

    await this.toggleTheme();
    this.isDarkMode();
    await callback('dark');
  }

  /**
   * PANEL EDITOR HELPERS
   */

  getPanelEditor(): PanelEditor {
    return new PanelEditor(this.panelEditor);
  }

  /**
   * PANEL GROUP HELPERS
   */

  getPanelGroup(panelGroupName: string): PanelGroup {
    const container = this.panelGroups.filter({ hasText: panelGroupName });
    return new PanelGroup(container);
  }

  async addPanelGroup(panelGrouName: string): Promise<void> {
    await this.addPanelGroupButton.click();
    const dialog = this.getDialog('add panel group');
    const nameInput = dialog.getByLabel('Name');
    await nameInput.type(panelGrouName);
    await dialog.getByRole('button', { name: 'Add' }).click();
  }

  async editPanelGroup(panelGrouName: string, { name }: PanelGroupConfig): Promise<void> {
    const panelGroup = this.getPanelGroup(panelGrouName);
    await panelGroup.startEditing();
    const dialog = this.getDialog('edit panel group');
    const nameInput = dialog.getByLabel('Name');
    await nameInput.clear();
    await nameInput.type(name);
    await dialog.getByRole('button', { name: 'Apply' }).click();
  }

  async deletePanelGroup(panelGroupName: string): Promise<void> {
    const panelGroup = this.getPanelGroup(panelGroupName);
    await panelGroup.delete();
    const dialog = this.getDialog('delete panel group');
    await dialog.getByRole('button', { name: 'Delete' }).click();
  }

  async addPanelToGroup(panelGroupName: string): Promise<void> {
    const panelGroup = this.getPanelGroup(panelGroupName);
    await panelGroup.addPanel();
  }

  /**
   * PANEL HELPERS
   */

  async addPanel(): Promise<void> {
    await this.addPanelButton.click();
  }

  async addMarkdownPanel(panelName: string): Promise<void> {
    await this.editNewPanel(async (panelEditor) => {
      await panelEditor.nameInput.type(panelName);
      await panelEditor.selectType('Markdown');
    });
  }

  /**
   * If the passed value is already a panel, return it. Otherwise, look the panel
   * up by name. Useful for internal helper functions that can support taking
   * a name or a panel.
   */
  private getPanelByNameOrSelf(panelNameOrPanel: PanelNameOrPanel): Panel {
    // If the passed value is already a panel, return it. Useful for internal
    // helper functions that want to support taking a name or a panel.
    if (typeof panelNameOrPanel !== 'string') {
      return panelNameOrPanel;
    }

    return this.getPanelByName(panelNameOrPanel);
  }

  getPanels(group?: PanelGroup): Locator {
    const parent = group ? group.container : this.page;

    return parent.getByTestId('panel');
  }

  /**
   * Get a panel based on specified options.
   */
  getPanel({ group, name, nth }: GetPanelOpts = {}): Panel {
    const panels = this.getPanels(group);
    const panel = panels.filter({
      has: name ? this.page.getByRole('heading', { name }) : undefined,
    });
    if (nth !== undefined) {
      return new Panel(this.page, panel.nth(nth));
    }

    return new Panel(this.page, panel);
  }

  /**
   * Get a panel by name.
   */
  getPanelByName(panelName: Required<GetPanelOpts['name']>, opts: Omit<GetPanelOpts, 'name'> = {}): Panel {
    return this.getPanel({
      name: panelName,
      ...opts,
    });
  }

  getPanelHeadings(group?: PanelGroup): Locator {
    const panels = this.getPanels(group);
    return panels.locator('header').getByRole('heading');
  }

  /**
   * Helper for simplifying panel editing.
   * - Starts the editing process for the specified panel by opening the panel
   *   editor.
   * - Provides the panel editor to a callback function that handles the
   *   steps to edit the panel.
   * - When the callback is fiished, applies the changes and waits for the panel
   *   editor to close.
   * @param panel - Panel to edit.
   * @param callback - Async function that is called after the panel editor is
   * opened and before the changes in the panel editor are applied.
   */
  async editPanel(
    panelNameOrPanel: PanelNameOrPanel,
    callback: (panelEditor: PanelEditor) => Promise<void>
  ): Promise<void> {
    const panel = this.getPanelByNameOrSelf(panelNameOrPanel);

    await panel.startEditing();

    const panelEditor = new PanelEditor(this.panelEditor);
    await panelEditor.isVisible();

    await callback(panelEditor);

    await panelEditor.applyButton.click();
    await panelEditor.isClosed();
  }

  /**
   * Helper for simplifying editing new panel once you open the panel editor.
   * - Provides the panel editor to a callback function that handles the
   *   steps to edit the panel.
   * - When the callback is fiished, applies the changes and waits for the panel
   *   editor to close.
   * @param callback - Async function that is called after the panel editor is
   * opened and before the changes in the panel editor are applied.
   */
  async editNewPanel(callback: (panelEditor: PanelEditor) => Promise<void>): Promise<void> {
    const panelEditor = new PanelEditor(this.panelEditor);
    await panelEditor.isVisible();

    await callback(panelEditor);

    await panelEditor.addButton.click();
    await panelEditor.isClosed();
  }

  async removePanel(panelNameOrPanel: PanelNameOrPanel): Promise<void> {
    const panel = this.getPanelByNameOrSelf(panelNameOrPanel);

    panel.delete();
    const dialog = this.getDialog('delete panel');
    await dialog.getByRole('button', { name: 'Delete' }).click();
  }

  /**
   * VARIABLE HELPERS
   */

  async startEditingVariables(): Promise<void> {
    await this.editVariablesButton.click();
    const variableEditor = this.getVariableEditor();
    await variableEditor.isVisible();
  }

  getVariableEditor(): VariableEditor {
    return new VariableEditor(this.variableEditor);
  }

  /**
   * MOCKING NETWORK REQUESTS
   */

  /**
   * Mock responses from '/api/v1/query_range' by the query parameter in the
   * request. Useful for stabilizing charts when taking screenshots.
   */

  async cleanupMockRequests(): Promise<void> {
    await this.page.unroute('**/api/v1/query_range');
  }

  /**
   * Beadcrumbs Helper
   */
  async goBackToHomePage(): Promise<void> {
    const navigationPromise = this.page.waitForNavigation();
    await this.page.getByRole('link', { name: 'Home' }).click();
    await navigationPromise;
  }

  async goBackToProjectPage(projectName: string): Promise<void> {
    const navigationPromise = this.page.waitForNavigation();
    await this.page.getByRole('link', { name: projectName }).first().click();
    await navigationPromise;
  }
}
