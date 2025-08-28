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
// Forked from https://github.com/prometheus/prometheus/blob/65f610353919b1c7b42d3776c3a95b68046a6bba/web/ui/mantine-ui/src/promql/ast.ts
export var nodeType = /*#__PURE__*/ function(nodeType) {
    nodeType["aggregation"] = "aggregation";
    nodeType["binaryExpr"] = "binaryExpr";
    nodeType["call"] = "call";
    nodeType["matrixSelector"] = "matrixSelector";
    nodeType["subquery"] = "subquery";
    nodeType["numberLiteral"] = "numberLiteral";
    nodeType["parenExpr"] = "parenExpr";
    nodeType["stringLiteral"] = "stringLiteral";
    nodeType["unaryExpr"] = "unaryExpr";
    nodeType["vectorSelector"] = "vectorSelector";
    nodeType["placeholder"] = "placeholder";
    return nodeType;
}({});
export var aggregationType = /*#__PURE__*/ function(aggregationType) {
    aggregationType["sum"] = "sum";
    aggregationType["min"] = "min";
    aggregationType["max"] = "max";
    aggregationType["avg"] = "avg";
    aggregationType["stddev"] = "stddev";
    aggregationType["stdvar"] = "stdvar";
    aggregationType["count"] = "count";
    aggregationType["group"] = "group";
    aggregationType["countValues"] = "count_values";
    aggregationType["bottomk"] = "bottomk";
    aggregationType["topk"] = "topk";
    aggregationType["quantile"] = "quantile";
    aggregationType["limitK"] = "limitk";
    aggregationType["limitRatio"] = "limit_ratio";
    return aggregationType;
}({});
export var binaryOperatorType = /*#__PURE__*/ function(binaryOperatorType) {
    binaryOperatorType["add"] = "+";
    binaryOperatorType["sub"] = "-";
    binaryOperatorType["mul"] = "*";
    binaryOperatorType["div"] = "/";
    binaryOperatorType["mod"] = "%";
    binaryOperatorType["pow"] = "^";
    binaryOperatorType["eql"] = "==";
    binaryOperatorType["neq"] = "!=";
    binaryOperatorType["gtr"] = ">";
    binaryOperatorType["lss"] = "<";
    binaryOperatorType["gte"] = ">=";
    binaryOperatorType["lte"] = "<=";
    binaryOperatorType["and"] = "and";
    binaryOperatorType["or"] = "or";
    binaryOperatorType["unless"] = "unless";
    binaryOperatorType["atan2"] = "atan2";
    return binaryOperatorType;
}({});
export const compOperatorTypes = [
    "==",
    "!=",
    ">",
    "<",
    ">=",
    "<="
];
export const setOperatorTypes = [
    "and",
    "or",
    "unless"
];
export var unaryOperatorType = /*#__PURE__*/ function(unaryOperatorType) {
    unaryOperatorType["plus"] = "+";
    unaryOperatorType["minus"] = "-";
    return unaryOperatorType;
}({});
export var vectorMatchCardinality = /*#__PURE__*/ function(vectorMatchCardinality) {
    vectorMatchCardinality["oneToOne"] = "one-to-one";
    vectorMatchCardinality["manyToOne"] = "many-to-one";
    vectorMatchCardinality["oneToMany"] = "one-to-many";
    vectorMatchCardinality["manyToMany"] = "many-to-many";
    return vectorMatchCardinality;
}({});
export var valueType = /*#__PURE__*/ function(valueType) {
    // TODO: 'none' should never make it out of Prometheus. Do we need this here?
    valueType["none"] = "none";
    valueType["vector"] = "vector";
    valueType["scalar"] = "scalar";
    valueType["matrix"] = "matrix";
    valueType["string"] = "string";
    return valueType;
}({});
export var matchType = /*#__PURE__*/ function(matchType) {
    matchType["equal"] = "=";
    matchType["notEqual"] = "!=";
    matchType["matchRegexp"] = "=~";
    matchType["matchNotRegexp"] = "!~";
    return matchType;
}({});

//# sourceMappingURL=ast.js.map