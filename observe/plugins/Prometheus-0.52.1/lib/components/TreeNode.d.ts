import { ReactElement } from 'react';
import { PrometheusDatasourceSelector } from '../model';
import ASTNode from './promql/ast';
type NodeState = 'waiting' | 'running' | 'error' | 'success';
interface TreeNodeProps {
    node: ASTNode;
    parentEl?: HTMLDivElement | null;
    reverse: boolean;
    datasource: PrometheusDatasourceSelector;
    childIdx: number;
    reportNodeState?: (childIdx: number, state: NodeState) => void;
}
export default function TreeNode({ node, parentEl, reverse, datasource, childIdx, reportNodeState, }: TreeNodeProps): ReactElement;
export {};
//# sourceMappingURL=TreeNode.d.ts.map