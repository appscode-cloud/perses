

import { Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import EyeOffIcon from 'mdi-material-ui/EyeOffOutline';
import EyeIcon from 'mdi-material-ui/EyeOutline';
import DeleteIcon from 'mdi-material-ui/DeleteOutline';
import { Transform, TRANSFORM_TEXT } from '@perses-dev/core';
import { ReactElement } from 'react';
import { TransformEditor, TransformEditorProps } from './TransformEditor';

export interface TransformEditorContainerProps extends TransformEditorProps {
  index?: number;
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  onDelete: () => void;
}

export function TransformEditorContainer({
  index,
  value,
  isCollapsed,
  onChange,
  onCollapse,
  onDelete,
  ...props
}: TransformEditorContainerProps): ReactElement {
  function handleTransformDisable(): void {
    onChange({ ...value, spec: { ...value.spec, disabled: !value.spec?.disabled } } as Transform);
  }

  return (
    <Stack {...props}>
      <Stack
        direction="row"
        alignItems="center"
        borderBottom={1}
        borderColor={(theme) => theme.palette.divider}
        justifyContent="space-between"
        gap={4}
      >
        <Stack direction="row" gap={1}>
          <IconButton data-testid={`transform-toggle#${index}`} size="small" onClick={() => onCollapse(!isCollapsed)}>
            {isCollapsed ? <ChevronRight /> : <ChevronDown />}
          </IconButton>
          <Typography variant="overline" component="h4" sx={{ textTransform: 'none' }}>
            {value.kind ? (
              <span>
                <strong>{TRANSFORM_TEXT[value.kind]}</strong>
              </span>
            ) : (
              <strong>Select a transformation kind</strong>
            )}
          </Typography>
        </Stack>

        <Stack direction="row" gap={1}>
          {isCollapsed && (
            <>
              <Tooltip
                title={value.spec?.disabled ? 'Enable transformation' : 'Disable transformation'}
                placement="top"
              >
                <IconButton size="small" sx={{ marginLeft: 'auto' }} onClick={handleTransformDisable}>
                  {value.spec?.disabled ? <EyeOffIcon /> : <EyeIcon />}
                </IconButton>
              </Tooltip>
              <Divider flexItem orientation="vertical" variant="middle" />
            </>
          )}
          <Tooltip title="Remove transformation" placement="top">
            <IconButton size="small" sx={{ marginLeft: 'auto' }} onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {!isCollapsed && <TransformEditor value={value} onChange={onChange} />}
    </Stack>
  );
}
