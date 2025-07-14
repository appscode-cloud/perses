

import { render, screen, fireEvent } from '@testing-library/react';
import { TransformsEditor } from '@perses-dev/components';
import { Transform } from '@perses-dev/core';

describe('TransformsEditor', () => {
  function renderTableColumnsEditor(value: Transform[], onChange = jest.fn()): void {
    render(<TransformsEditor value={value} onChange={onChange} />);
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('can add a new transformation', () => {
    const onChange = jest.fn();
    renderTableColumnsEditor([], onChange);
    const addColumnButton = screen.getByRole('button', { name: /Add Transformation/i });
    fireEvent.click(addColumnButton);
    expect(onChange).toHaveBeenCalledWith([{ kind: '', spec: {} }]);
  });

  it('can collapse and update a transformation', () => {
    const onChange = jest.fn();
    renderTableColumnsEditor([{ kind: 'MergeIndexedColumns', spec: { column: 'env' } }], onChange);

    // Expand the transform editor for the first transform
    const collapseIcon = screen.getByTestId('transform-toggle#0');
    fireEvent.click(collapseIcon);

    const columnInput = screen.getByRole('textbox', { name: /Column/i });
    fireEvent.change(columnInput, { target: { value: 'MySuperName' } });
    jest.advanceTimersByTime(500);
    expect(onChange).toHaveBeenCalledWith([{ kind: 'MergeIndexedColumns', spec: { column: 'MySuperName' } }]);
  });
});
