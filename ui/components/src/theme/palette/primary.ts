// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { PaletteMode, SimplePaletteColorOptions } from '@mui/material';
import { blue, orange } from './colors';

export const primary = (mode: PaletteMode): SimplePaletteColorOptions => {
  return mode === 'light'
    ? {
        main: orange[500],
        dark: orange[600],
        light: orange[50],
      }
    : {
        main: orange[400],
        dark: orange[800],
        light: orange[200],
      };
};
