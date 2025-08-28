import ASTNode, { binaryOperatorType } from './ast';
export declare const maybeParenthesizeBinopChild: (op: binaryOperatorType, child: ASTNode) => ASTNode;
export declare const getNodeChildren: (node: ASTNode) => ASTNode[];
export declare const aggregatorsWithParam: string[];
export declare const escapeString: (str: string) => string;
//# sourceMappingURL=utils.d.ts.map