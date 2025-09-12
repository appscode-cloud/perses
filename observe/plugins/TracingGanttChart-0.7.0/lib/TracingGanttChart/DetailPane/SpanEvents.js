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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from 'mdi-material-ui/ChevronDown';
import { formatDuration } from '../utils';
import { AttributeList } from './Attributes';
export function SpanEventList(props) {
    const { trace, span } = props;
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: span.events.sort((a, b)=>a.timeUnixMs - b.timeUnixMs).map((event, i)=>/*#__PURE__*/ _jsx(SpanEventItem, {
                trace: trace,
                event: event
            }, i))
    });
}
function SpanEventItem(props) {
    const { trace, event } = props;
    const relativeTime = event.timeUnixMs - trace.startTimeUnixMs;
    return /*#__PURE__*/ _jsxs(Accordion, {
        disableGutters: true,
        children: [
            /*#__PURE__*/ _jsx(AccordionSummary, {
                expandIcon: /*#__PURE__*/ _jsx(ExpandMoreIcon, {}),
                children: /*#__PURE__*/ _jsx(Typography, {
                    children: formatDuration(relativeTime)
                })
            }),
            /*#__PURE__*/ _jsxs(AccordionDetails, {
                children: [
                    /*#__PURE__*/ _jsx(Typography, {
                        variant: "subtitle1",
                        children: event.name
                    }),
                    /*#__PURE__*/ _jsx(AttributeList, {
                        attributes: event.attributes
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=SpanEvents.js.map