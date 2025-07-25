// Copyright 2025 The Perses Authors
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
// Forked from https://github.com/prometheus/prometheus/blob/65f610353919b1c7b42d3776c3a95b68046a6bba/web/ui/mantine-ui/src/promql/serialize.ts
import { formatDuration, msToPrometheusDuration } from '@perses-dev/core';
import { matchType, vectorMatchCardinality, nodeType } from './ast';
import { aggregatorsWithParam, maybeParenthesizeBinopChild, escapeString } from './utils';
const serializeAtAndOffset = (timestamp, startOrEnd, offset)=>`${timestamp !== null ? ` @ ${(timestamp / 1000).toFixed(3)}` : startOrEnd !== null ? ` @ ${startOrEnd}()` : ''}${offset === 0 ? '' : offset > 0 ? ` offset ${formatDuration(msToPrometheusDuration(offset))}` : ` offset -${formatDuration(msToPrometheusDuration(-offset))}`}`;
const serializeSelector = (node)=>{
    const matchers = node.matchers.filter((m)=>!(m.name === '__name__' && m.type === matchType.equal && m.value === node.name)).map((m)=>`${m.name}${m.type}"${escapeString(m.value)}"`);
    const range = node.type === nodeType.matrixSelector ? `[${formatDuration(msToPrometheusDuration(node.range))}]` : '';
    const atAndOffset = serializeAtAndOffset(node.timestamp, node.startOrEnd, node.offset);
    return `${node.name}${matchers.length > 0 ? `{${matchers.join(',')}}` : ''}${range}${atAndOffset}`;
};
const serializeNode = (node, indent = 0, pretty = false, initialIndent = true)=>{
    const childListSeparator = pretty ? '\n' : '';
    const childSeparator = pretty ? '\n' : ' ';
    const childIndent = indent + 2;
    const ind = pretty ? ' '.repeat(indent) : '';
    // Needed for unary operators.
    const initialInd = initialIndent ? ind : '';
    switch(node.type){
        case nodeType.aggregation:
            return `${initialInd}${node.op}${node.without ? ` without(${node.grouping.join(', ')}) ` : node.grouping.length > 0 ? ` by(${node.grouping.join(', ')}) ` : ''}(${childListSeparator}${aggregatorsWithParam.includes(node.op) && node.param !== null ? `${serializeNode(node.param, childIndent, pretty)},${childSeparator}` : ''}${serializeNode(node.expr, childIndent, pretty)}${childListSeparator}${ind})`;
        case nodeType.subquery:
            return `${initialInd}${serializeNode(node.expr, indent, pretty)}[${formatDuration(msToPrometheusDuration(node.range))}:${node.step !== 0 ? formatDuration(msToPrometheusDuration(node.step)) : ''}]${serializeAtAndOffset(node.timestamp, node.startOrEnd, node.offset)}`;
        case nodeType.parenExpr:
            return `${initialInd}(${childListSeparator}${serializeNode(node.expr, childIndent, pretty)}${childListSeparator}${ind})`;
        case nodeType.call:
            {
                const sep = node.args.length > 0 ? childListSeparator : '';
                return `${initialInd}${node.func.name}(${sep}${node.args.map((arg)=>serializeNode(arg, childIndent, pretty)).join(',' + childSeparator)}${sep}${node.args.length > 0 ? ind : ''})`;
            }
        case nodeType.matrixSelector:
            return `${initialInd}${serializeSelector(node)}`;
        case nodeType.vectorSelector:
            return `${initialInd}${serializeSelector(node)}`;
        case nodeType.numberLiteral:
            return `${initialInd}${node.val}`;
        case nodeType.stringLiteral:
            return `${initialInd}"${escapeString(node.val)}"`;
        case nodeType.unaryExpr:
            return `${initialInd}${node.op}${serializeNode(node.expr, indent, pretty, false)}`;
        case nodeType.binaryExpr:
            {
                let matching = '';
                let grouping = '';
                const vm = node.matching;
                if (vm !== null && (vm.labels.length > 0 || vm.on)) {
                    if (vm.on) {
                        matching = ` on(${vm.labels.join(', ')})`;
                    } else {
                        matching = ` ignoring(${vm.labels.join(', ')})`;
                    }
                    if (vm.card === vectorMatchCardinality.manyToOne || vm.card === vectorMatchCardinality.oneToMany) {
                        grouping = ` group_${vm.card === vectorMatchCardinality.manyToOne ? 'left' : 'right'}(${vm.include.join(',')})`;
                    }
                }
                return `${serializeNode(maybeParenthesizeBinopChild(node.op, node.lhs), childIndent, pretty)}${childSeparator}${ind}${node.op}${node.bool ? ' bool' : ''}${matching}${grouping}${childSeparator}${serializeNode(maybeParenthesizeBinopChild(node.op, node.rhs), childIndent, pretty)}`;
            }
        case nodeType.placeholder:
            // TODO: Should we just throw an error when trying to serialize an AST containing a placeholder node?
            // (that would currently break editing-as-text of ASTs that contain placeholders)
            return `${initialInd}…${node.children.length > 0 ? `(${childListSeparator}${node.children.map((child)=>serializeNode(child, childIndent, pretty)).join(',' + childSeparator)}${childListSeparator}${ind})` : ''}`;
        default:
            throw new Error('unsupported node type');
    }
};
export default serializeNode;

//# sourceMappingURL=serialize.js.map