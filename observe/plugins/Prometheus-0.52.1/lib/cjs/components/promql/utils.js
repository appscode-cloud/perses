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
// Forked from https://github.com/prometheus/prometheus/blob/65f610353919b1c7b42d3776c3a95b68046a6bba/web/ui/mantine-ui/src/promql/utils.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    aggregatorsWithParam: function() {
        return aggregatorsWithParam;
    },
    escapeString: function() {
        return escapeString;
    },
    getNodeChildren: function() {
        return getNodeChildren;
    },
    maybeParenthesizeBinopChild: function() {
        return maybeParenthesizeBinopChild;
    }
});
const _ast = require("./ast");
const binOpPrecedence = {
    [_ast.binaryOperatorType.add]: 3,
    [_ast.binaryOperatorType.sub]: 3,
    [_ast.binaryOperatorType.mul]: 2,
    [_ast.binaryOperatorType.div]: 2,
    [_ast.binaryOperatorType.mod]: 2,
    [_ast.binaryOperatorType.pow]: 1,
    [_ast.binaryOperatorType.eql]: 4,
    [_ast.binaryOperatorType.neq]: 4,
    [_ast.binaryOperatorType.gtr]: 4,
    [_ast.binaryOperatorType.lss]: 4,
    [_ast.binaryOperatorType.gte]: 4,
    [_ast.binaryOperatorType.lte]: 4,
    [_ast.binaryOperatorType.and]: 5,
    [_ast.binaryOperatorType.or]: 6,
    [_ast.binaryOperatorType.unless]: 5,
    [_ast.binaryOperatorType.atan2]: 2
};
const maybeParenthesizeBinopChild = (op, child)=>{
    if (child.type !== _ast.nodeType.binaryExpr) {
        return child;
    }
    if (binOpPrecedence[op] > binOpPrecedence[child.op]) {
        return child;
    }
    // TODO: Parens aren't necessary for left-associativity within same precedence,
    // or right-associativity between two power operators.
    return {
        type: _ast.nodeType.parenExpr,
        expr: child
    };
};
const getNodeChildren = (node)=>{
    switch(node.type){
        case _ast.nodeType.aggregation:
            return node.param === null ? [
                node.expr
            ] : [
                node.param,
                node.expr
            ];
        case _ast.nodeType.subquery:
            return [
                node.expr
            ];
        case _ast.nodeType.parenExpr:
            return [
                node.expr
            ];
        case _ast.nodeType.call:
            return node.args;
        case _ast.nodeType.matrixSelector:
        case _ast.nodeType.vectorSelector:
        case _ast.nodeType.numberLiteral:
        case _ast.nodeType.stringLiteral:
            return [];
        case _ast.nodeType.placeholder:
            return node.children;
        case _ast.nodeType.unaryExpr:
            return [
                node.expr
            ];
        case _ast.nodeType.binaryExpr:
            return [
                node.lhs,
                node.rhs
            ];
        default:
            throw new Error('unsupported node type');
    }
};
const aggregatorsWithParam = [
    'topk',
    'bottomk',
    'quantile',
    'count_values',
    'limitk',
    'limit_ratio'
];
const escapeString = (str)=>{
    return str.replace(/([\\"])/g, '\\$1');
};
