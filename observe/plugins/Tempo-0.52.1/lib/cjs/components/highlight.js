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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "traceQLHighlight", {
    enumerable: true,
    get: function() {
        return traceQLHighlight;
    }
});
const _highlight = require("@lezer/highlight");
const traceQLHighlight = (0, _highlight.styleTags)({
    LineComment: _highlight.tags.comment,
    'Parent Resource Span Identifier': _highlight.tags.labelName,
    IntrinsicField: _highlight.tags.labelName,
    String: _highlight.tags.string,
    'Integer Float Duration': _highlight.tags.number,
    Static: _highlight.tags.literal,
    'Aggregate AggregateExpression': _highlight.tags.function(_highlight.tags.keyword),
    'And Or': _highlight.tags.logicOperator,
    'Gt Lt Desc Anc tilde ExperimentalOp': _highlight.tags.bitwiseOperator,
    ComparisonOp: _highlight.tags.compareOperator,
    Pipe: _highlight.tags.operator,
    ScalarOp: _highlight.tags.arithmeticOperator,
    '( )': _highlight.tags.paren,
    '[ ]': _highlight.tags.squareBracket,
    '{ }': _highlight.tags.brace,
    '⚠': _highlight.tags.invalid
});
