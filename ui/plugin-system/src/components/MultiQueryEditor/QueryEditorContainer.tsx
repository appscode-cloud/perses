

import { produce } from 'immer';
import { QueryDefinition, QueryPluginType } from '@perses-dev/core';
import { Stack, IconButton, Typography, BoxProps, Box } from '@mui/material';
import DeleteIcon from 'mdi-material-ui/DeleteOutline';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import { ReactElement } from 'react';
import { PluginEditor, PluginEditorProps } from '../PluginEditor';

/**
 * Properties for {@link QueryEditorContainer}
 */
interface QueryEditorContainerProps {
  queryTypes: QueryPluginType[];
  index: number;
  query: QueryDefinition;
  onChange: (index: number, query: QueryDefinition) => void;
  onCollapseExpand: (index: number) => void;
  isCollapsed?: boolean;
  onDelete?: (index: number) => void;
}

/**
 * Container for a query editor. This component is responsible for rendering the query editor, and make it collapsible
 * to not take too much space.
 * @param queryTypes the supported query types
 * @param index the index of the query in the list
 * @param query the query definition
 * @param isCollapsed whether the query editor is collapsed or not
 * @param onDelete callback when the query is deleted
 * @param onChange callback when the query is changed
 * @param onCollapseExpand callback when the query is collapsed or expanded
 * @constructor
 */
export const QueryEditorContainer = ({
  queryTypes,
  index,
  query,
  isCollapsed,
  onDelete,
  onChange,
  onCollapseExpand,
}: QueryEditorContainerProps): ReactElement => {
  return (
    <Stack key={index} spacing={1}>
      <Stack direction="row" alignItems="center" borderBottom={1} borderColor={(theme) => theme.palette.divider}>
        <IconButton size="small" onClick={() => onCollapseExpand(index)}>
          {isCollapsed ? <ChevronRight /> : <ChevronDown />}
        </IconButton>
        <Typography variant="overline" component="h4">
          Query #{index + 1}
        </Typography>
        <IconButton
          size="small"
          // Use `visibility` to ensure that the row has the same height when delete button is visible or not visible
          sx={{ marginLeft: 'auto', visibility: `${onDelete ? 'visible' : 'hidden'}` }}
          onClick={() => onDelete && onDelete(index)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
      {!isCollapsed && <QueryEditor queryTypes={queryTypes} value={query} onChange={(next) => onChange(index, next)} />}
    </Stack>
  );
};

// Props on MUI Box that we don't want people to pass because we're either redefining them or providing them in
// this component
type OmittedMuiProps = 'children' | 'value' | 'onChange';
interface QueryEditorProps extends Omit<BoxProps, OmittedMuiProps> {
  queryTypes: QueryPluginType[];
  value: QueryDefinition;
  onChange: (next: QueryDefinition) => void;
}

/**
 * Editor for a query definition. This component is responsible for rendering the plugin editor for the given query.
 * This will allow user to select a plugin extending from the given supported query types, and then edit the plugin
 * spec for this plugin.
 * @param props
 * @constructor
 */
function QueryEditor(props: QueryEditorProps): ReactElement {
  const { value, onChange, queryTypes, ...others } = props;

  const handlePluginChange: PluginEditorProps['onChange'] = (next) => {
    onChange(
      produce(value, (draft) => {
        draft.kind = next.selection.type;
        draft.spec.plugin.kind = next.selection.kind;
        draft.spec.plugin.spec = next.spec;
      })
    );
  };

  return (
    <Box {...others}>
      <PluginEditor
        pluginTypes={queryTypes}
        pluginKindLabel="Query Type"
        value={{
          selection: {
            kind: value.spec.plugin.kind,
            type: value.kind,
          },
          spec: value.spec.plugin.spec,
        }}
        onChange={handlePluginChange}
      />
    </Box>
  );
}
