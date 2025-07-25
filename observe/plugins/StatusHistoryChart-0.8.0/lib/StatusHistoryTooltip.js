// Copyright 2024 The Perses Authors
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
import { css } from '@mui/material';
import { getDateAndTime } from '@perses-dev/components';
export function generateTooltipHTML({ data, label, marker, xAxisCategories, yAxisCategories, theme }) {
    const [x, y] = data;
    const xAxisLabel = xAxisCategories[x];
    const { formattedDate, formattedTime } = getDateAndTime(xAxisLabel);
    const tooltipHeader = css`
    border-bottom: 1px solid ${theme.palette.grey[500]};
    padding-bottom: 8px;
  `;
    const tooltipContentStyles = css`
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
  `;
    const labelStyles = css`
    margin-right: 16px;
  `;
    return `
    <div>
      <div style="${tooltipHeader.styles}">${formattedDate} ${formattedTime}</div>
      <div style="${tooltipContentStyles.styles}">
        <div style="${labelStyles.styles}">
          ${marker}
          <strong>${yAxisCategories[y]}</strong>
        </div>
        <div>
          ${label}
        </div>
      </div>
    </div>
  `;
}

//# sourceMappingURL=StatusHistoryTooltip.js.map