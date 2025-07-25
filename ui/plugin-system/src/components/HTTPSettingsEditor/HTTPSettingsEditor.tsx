

import { RequestHeaders, HTTPDatasourceSpec } from '@perses-dev/core';
import { Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import React, { Fragment, ReactElement, useState } from 'react';
import { produce } from 'immer';
import { Controller } from 'react-hook-form';
import MinusIcon from 'mdi-material-ui/Minus';
import PlusIcon from 'mdi-material-ui/Plus';
import { OptionsEditorRadios } from '../OptionsEditorRadios';

export interface HTTPSettingsEditor {
  value: HTTPDatasourceSpec;
  onChange: (next: HTTPDatasourceSpec) => void;
  isReadonly?: boolean;
  initialSpecDirect: HTTPDatasourceSpec;
  initialSpecProxy: HTTPDatasourceSpec;
}

export function HTTPSettingsEditor(props: HTTPSettingsEditor): ReactElement {
  const { value, onChange, isReadonly, initialSpecDirect, initialSpecProxy } = props;
  const strDirect = 'Direct access';
  const strProxy = 'Proxy';

  // Initialize Proxy mode by default, if neither direct nor proxy mode is selected.
  if (value.directUrl === undefined && value.proxy === undefined) {
    Object.assign(value, initialSpecProxy);
  }

  // utilitary function used for headers when renaming a property
  // -> TODO it would be cleaner to manipulate headers as an intermediary list instead, to avoid doing this.
  const buildNewHeaders = (
    oldHeaders: RequestHeaders | undefined,
    oldName: string,
    newName: string
  ): RequestHeaders | undefined => {
    if (oldHeaders === undefined) return oldHeaders;
    const keys = Object.keys(oldHeaders);
    const newHeaders = keys.reduce<Record<string, string>>((acc, val) => {
      if (val === oldName) {
        acc[newName] = oldHeaders[oldName] || '';
      } else {
        acc[val] = oldHeaders[val] || '';
      }
      return acc;
    }, {});

    return { ...newHeaders };
  };

  const tabs = [
    {
      label: strProxy,
      content: (
        <>
          <Controller
            name="URL"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="URL"
                value={value.proxy?.spec.url || ''}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  readOnly: isReadonly,
                }}
                InputLabelProps={{ shrink: isReadonly ? true : undefined }}
                onChange={(e) => {
                  field.onChange(e);
                  onChange(
                    produce(value, (draft) => {
                      if (draft.proxy !== undefined) {
                        draft.proxy.spec.url = e.target.value;
                      }
                    })
                  );
                }}
                sx={{ mb: 2 }}
              />
            )}
          />
          <Typography variant="h4" mb={2}>
            Allowed endpoints
          </Typography>
          <Grid container spacing={2} mb={2}>
            {value.proxy?.spec.allowedEndpoints && value.proxy?.spec.allowedEndpoints.length !== 0 ? (
              value.proxy.spec.allowedEndpoints.map(({ endpointPattern, method }, i) => {
                return (
                  <Fragment key={i}>
                    <Grid item xs={8}>
                      <Controller
                        name={`Endpoint pattern ${i}`}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Endpoint pattern"
                            value={endpointPattern}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                              readOnly: isReadonly,
                            }}
                            InputLabelProps={{ shrink: isReadonly ? true : undefined }}
                            onChange={(e) => {
                              field.onChange(e);
                              onChange(
                                produce(value, (draft) => {
                                  if (draft.proxy !== undefined) {
                                    draft.proxy.spec.allowedEndpoints = draft.proxy.spec.allowedEndpoints?.map(
                                      (item, itemIndex) => {
                                        if (i === itemIndex) {
                                          return {
                                            endpointPattern: e.target.value,
                                            method: item.method,
                                          };
                                        } else {
                                          return item;
                                        }
                                      }
                                    );
                                  }
                                })
                              );
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Controller
                        name={`Method ${i}`}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            label="Method"
                            value={method}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                              readOnly: isReadonly,
                            }}
                            InputLabelProps={{ shrink: isReadonly ? true : undefined }}
                            onChange={(e) => {
                              field.onChange(e);
                              onChange(
                                produce(value, (draft) => {
                                  if (draft.proxy !== undefined) {
                                    draft.proxy.spec.allowedEndpoints = draft.proxy.spec.allowedEndpoints?.map(
                                      (item, itemIndex) => {
                                        if (i === itemIndex) {
                                          return {
                                            endpointPattern: item.endpointPattern,
                                            method: e.target.value,
                                          };
                                        } else {
                                          return item;
                                        }
                                      }
                                    );
                                  }
                                })
                              );
                            }}
                          >
                            <MenuItem value="GET">GET</MenuItem>
                            <MenuItem value="POST">POST</MenuItem>
                            <MenuItem value="PUT">PUT</MenuItem>
                            <MenuItem value="PATCH">PATCH</MenuItem>
                            <MenuItem value="DELETE">DELETE</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Controller
                        name={`Remove Endpoint ${i}`}
                        render={({ field }) => (
                          <IconButton
                            {...field}
                            disabled={isReadonly}
                            // Remove the given allowed endpoint from the list
                            onClick={(e) => {
                              field.onChange(e);
                              onChange(
                                produce(value, (draft) => {
                                  if (draft.proxy !== undefined) {
                                    draft.proxy.spec.allowedEndpoints = [
                                      ...(draft.proxy.spec.allowedEndpoints?.filter((item, itemIndex) => {
                                        return itemIndex !== i;
                                      }) || []),
                                    ];
                                  }
                                })
                              );
                            }}
                          >
                            <MinusIcon />
                          </IconButton>
                        )}
                      />
                    </Grid>
                  </Fragment>
                );
              })
            ) : (
              <Grid item xs={4}>
                <Typography sx={{ fontStyle: 'italic' }}>None</Typography>
              </Grid>
            )}
            <Grid item xs={12} sx={{ paddingTop: '0px !important', paddingLeft: '5px !important' }}>
              <IconButton
                disabled={isReadonly}
                // Add a new (empty) allowed endpoint to the list
                onClick={() =>
                  onChange(
                    produce(value, (draft) => {
                      if (draft.proxy !== undefined) {
                        draft.proxy.spec.allowedEndpoints = [
                          ...(draft.proxy.spec.allowedEndpoints ?? []),
                          { endpointPattern: '', method: '' },
                        ];
                      }
                    })
                  )
                }
              >
                <PlusIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="h4" mb={2}>
            Request Headers
          </Typography>
          <Grid container spacing={2} mb={2}>
            {value.proxy?.spec.headers &&
              Object.keys(value.proxy.spec.headers).map((headerName, i) => {
                return (
                  <Fragment key={i}>
                    <Grid item xs={4}>
                      <Controller
                        name={`Header name ${i}`}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Header name"
                            value={headerName}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                              readOnly: isReadonly,
                            }}
                            InputLabelProps={{ shrink: isReadonly ? true : undefined }}
                            onChange={(e) => {
                              field.onChange(e);
                              onChange(
                                produce(value, (draft) => {
                                  if (draft.proxy !== undefined) {
                                    draft.proxy.spec.headers = buildNewHeaders(
                                      draft.proxy.spec.headers,
                                      headerName,
                                      e.target.value
                                    );
                                  }
                                })
                              );
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <Controller
                        name={`Header value ${i}`}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Header value"
                            value={value.proxy?.spec.headers?.[headerName]}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                              readOnly: isReadonly,
                            }}
                            InputLabelProps={{ shrink: isReadonly ? true : undefined }}
                            onChange={(e) => {
                              field.onChange(e);
                              onChange(
                                produce(value, (draft) => {
                                  if (draft.proxy !== undefined) {
                                    draft.proxy.spec.headers = {
                                      ...draft.proxy.spec.headers,
                                      [headerName]: e.target.value,
                                    };
                                  }
                                })
                              );
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Controller
                        name={`Remove Header ${i}`}
                        render={({ field }) => (
                          <IconButton
                            {...field}
                            disabled={isReadonly}
                            // Remove the given header from the list
                            onClick={(e) => {
                              field.onChange(e);
                              const newHeaders = { ...value.proxy?.spec.headers };
                              delete newHeaders[headerName];
                              onChange(
                                produce(value, (draft) => {
                                  if (draft.proxy !== undefined) {
                                    draft.proxy.spec.headers = newHeaders;
                                  }
                                })
                              );
                            }}
                          >
                            <MinusIcon />
                          </IconButton>
                        )}
                      />
                    </Grid>
                  </Fragment>
                );
              })}
            <Grid item xs={12} sx={{ paddingTop: '0px !important', paddingLeft: '5px !important' }}>
              <IconButton
                disabled={isReadonly}
                // Add a new (empty) header to the list
                onClick={() =>
                  onChange(
                    produce(value, (draft) => {
                      if (draft.proxy !== undefined) {
                        draft.proxy.spec.headers = { ...draft.proxy.spec.headers, '': '' };
                      }
                    })
                  )
                }
              >
                <PlusIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Controller
            name="Secret"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Secret"
                value={value.proxy?.spec.secret || ''}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  readOnly: isReadonly,
                }}
                InputLabelProps={{ shrink: isReadonly ? true : undefined }}
                onChange={(e) => {
                  field.onChange(e);
                  onChange(
                    produce(value, (draft) => {
                      if (draft.proxy !== undefined) {
                        draft.proxy.spec.secret = e.target.value;
                      }
                    })
                  );
                }}
              />
            )}
          />
        </>
      ),
    },
    {
      label: strDirect,
      content: (
        <Controller
          name="URL"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="URL"
              value={value.directUrl || ''}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                readOnly: isReadonly,
              }}
              InputLabelProps={{ shrink: isReadonly ? true : undefined }}
              onChange={(e) => {
                field.onChange(e);
                onChange(
                  produce(value, (draft) => {
                    draft.directUrl = e.target.value;
                  })
                );
              }}
            />
          )}
        />
      ),
    },
  ];

  // Use of findIndex instead of providing hardcoded values to avoid desynchronisatio or
  // bug in case the tabs get eventually swapped in the future.
  const directModeId = tabs.findIndex((tab) => tab.label === strDirect);
  const proxyModeId = tabs.findIndex((tab) => tab.label === strProxy);

  // Set defaultTab to the mode that this datasource is currently relying on.
  const defaultTab = value.proxy ? proxyModeId : directModeId;

  // For better user experience, save previous states in mind for both mode.
  // This avoids losing everything when the user changes their mind back.
  const [previousSpecDirect, setPreviousSpecDirect] = useState(initialSpecDirect);
  const [previousSpecProxy, setPreviousSpecProxy] = useState(initialSpecProxy);

  // When changing mode, remove previous mode's config + append default values for the new mode.
  const handleModeChange = (v: number): void => {
    if (tabs[v]?.label === strDirect) {
      setPreviousSpecProxy(value);

      // Copy all settings (for example, scrapeInterval), except 'proxy'
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { proxy, ...newValue } = value;
      onChange({ ...newValue, directUrl: previousSpecDirect.directUrl });
    } else if (tabs[v]?.label === strProxy) {
      setPreviousSpecDirect(value);

      // Copy all settings (for example, scrapeInterval), except 'directUrl'
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { directUrl, ...newValue } = value;
      onChange({ ...newValue, proxy: previousSpecProxy.proxy });
    }
  };

  return (
    <>
      <Typography variant="h4" mt={2}>
        HTTP Settings
      </Typography>
      <OptionsEditorRadios
        isReadonly={isReadonly}
        tabs={tabs}
        defaultTab={defaultTab}
        onModeChange={handleModeChange}
      />
    </>
  );
}
