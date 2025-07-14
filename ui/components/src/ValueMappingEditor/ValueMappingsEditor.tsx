

import { Button, Divider, Stack, Typography, Grid2 as Grid } from '@mui/material';

import { FC, useState } from 'react';
import AddIcon from 'mdi-material-ui/Plus';
import { ValueMapping } from '@perses-dev/core';
import { ValueMappingEditor } from './ValueMappingEditor';

export interface ValueMappingsEditorProps {
  mappings: ValueMapping[];
  onChange: (valueMappings: ValueMapping[]) => void;
}

export const ValueMappingsEditor: FC<ValueMappingsEditorProps> = ({ mappings, onChange }) => {
  const [valueMappings, setValueMappings] = useState<ValueMapping[]>(mappings);

  function handleValueMappingChange(index: number, mapping: ValueMapping): void {
    const updatedValueMapings = [...valueMappings];
    updatedValueMapings[index] = mapping;
    setValueMappings(updatedValueMapings);
    onChange(updatedValueMapings);
  }

  function handleAddValueMappingEditor(): void {
    const updatedValueMapings = [...valueMappings];
    updatedValueMapings.push({ kind: 'Value', spec: { result: { value: '' } } } as ValueMapping);
    setValueMappings(updatedValueMapings);
    onChange(updatedValueMapings);
  }

  function handleValueMappingDelete(index: number): void {
    const updatedValueMapings = [...valueMappings];
    updatedValueMapings.splice(index, 1);
    setValueMappings(updatedValueMapings);
    onChange(updatedValueMapings);
  }

  return (
    <Stack spacing={1}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 5 }}>
          <Typography variant="subtitle1">Condition</Typography>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography variant="subtitle1">Display Text</Typography>
        </Grid>
        <Grid size={{ xs: 1 }} textAlign="center">
          <Typography variant="subtitle1">Color</Typography>
        </Grid>
        <Grid size={{ xs: 1 }}></Grid>
      </Grid>
      <Stack gap={1.5} divider={<Divider flexItem orientation="horizontal" />}>
        {valueMappings.map((mapping, i) => (
          <ValueMappingEditor
            key={i}
            mapping={mapping}
            onChange={(updatedMapping: ValueMapping) => handleValueMappingChange(i, updatedMapping)}
            onDelete={() => handleValueMappingDelete(i)}
          />
        ))}
      </Stack>

      <Button variant="contained" startIcon={<AddIcon />} sx={{ marginTop: 1 }} onClick={handleAddValueMappingEditor}>
        Add value mappings
      </Button>
    </Stack>
  );
};
