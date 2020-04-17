import * as React from 'react';
import PropTypes from 'prop-types';
import { DataNode, IconType, Key, FlattenNode, DataEntity, EventDataNode, NodeInstance, ScrollTo, ExternalDropData } from './interface';
import { NodeListRef } from './NodeList';
interface CheckInfo {
    event: 'check';
    node: EventDataNode;
    checked: boolean;
    nativeEvent: MouseEvent;
    checkedNodes: DataNode[];
    checkedNodesPositions?: {
        node: DataNode;
        pos: string;
    }[];
    halfCheckedKeys?: Key[];
}
export interface TreeProps {
    prefixCls: string;
    className?: string;
    style?: React.CSSProperties;
    focusable?: boolean;
    tabIndex?: number;
    children?: React.ReactNode;
    treeData?: DataNode[];
    showLine?: boolean;
    showIcon?: boolean;
    icon?: IconType;
    selectable?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    checkable?: boolean | React.ReactNode;
    checkStrictly?: boolean;
    draggable?: boolean;
    defaultExpandParent?: boolean;
    autoExpandParent?: boolean;
    defaultExpandAll?: boolean;
    defaultExpandedKeys?: Key[];
    expandedKeys?: Key[];
    defaultCheckedKeys?: Key[];
    checkedKeys?: Key[] | {
        checked: Key[];
        halfChecked: Key[];
    };
    defaultSelectedKeys?: Key[];
    selectedKeys?: Key[];
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onClick?: (e: React.MouseEvent, treeNode: EventDataNode) => void;
    onDoubleClick?: (e: React.MouseEvent, treeNode: EventDataNode) => void;
    onExpand?: (expandedKeys: Key[], info: {
        node: EventDataNode;
        expanded: boolean;
        nativeEvent: MouseEvent;
    }) => void;
    onCheck?: (checked: {
        checked: Key[];
        halfChecked: Key[];
    } | Key[], info: CheckInfo) => void;
    onSelect?: (selectedKeys: Key[], info: {
        event: 'select';
        selected: boolean;
        node: EventDataNode;
        selectedNodes: DataNode[];
        nativeEvent: MouseEvent;
    }) => void;
    onLoad?: (loadedKeys: Key[], info: {
        event: 'load';
        node: EventDataNode;
    }) => void;
    loadData?: (treeNode: EventDataNode) => Promise<void>;
    loadedKeys?: Key[];
    onMouseEnter?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
    }) => void;
    onMouseLeave?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
    }) => void;
    onRightClick?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
    }) => void;
    onDragStart?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
    }) => void;
    onDragEnter?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
        expandedKeys: Key[];
    }) => void;
    onDragOver?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
    }) => void;
    onDragLeave?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
    }) => void;
    onDragEnd?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
    }) => void;
    onDrop?: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
        dragNode: EventDataNode;
        dragNodesKeys: Key[];
        dropPosition: number;
        dropToGap: boolean;
    }) => void;
    onExternalDrop?: (items: {
        event: React.MouseEvent;
        node: EventDataNode;
        dragNode: EventDataNode;
        dragNodesKeys: Key[];
        dropPosition: number;
        dropToGap: boolean;
    }[]) => Promise<void>;
    /**
     * Used for `rc-tree-select` only.
     * Do not use in your production code directly since this will be refactor.
     */
    onActiveChange?: (key: Key) => void;
    filterTreeNode?: (treeNode: EventDataNode) => boolean;
    motion?: any;
    switcherIcon?: IconType;
    height?: number;
    itemHeight?: number;
    virtual?: boolean;
}
interface TreeState {
    keyEntities: Record<Key, DataEntity>;
    selectedKeys: Key[];
    checkedKeys: Key[];
    halfCheckedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    expandedKeys: Key[];
    dragging: boolean;
    dragNodesKeys: Key[];
    dragOverNodeKey: Key;
    dropPosition: number;
    treeData: DataNode[];
    flattenNodes: FlattenNode[];
    focused: boolean;
    activeKey: Key;
    prevProps: TreeProps;
}
declare class Tree extends React.Component<TreeProps, TreeState> {
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        tabIndex: PropTypes.Requireable<string | number>;
        children: PropTypes.Requireable<any>;
        treeData: PropTypes.Requireable<any[]>;
        showLine: PropTypes.Requireable<boolean>;
        showIcon: PropTypes.Requireable<boolean>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        selectable: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        multiple: PropTypes.Requireable<boolean>;
        checkable: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        checkStrictly: PropTypes.Requireable<boolean>;
        draggable: PropTypes.Requireable<boolean>;
        defaultExpandParent: PropTypes.Requireable<boolean>;
        autoExpandParent: PropTypes.Requireable<boolean>;
        defaultExpandAll: PropTypes.Requireable<boolean>;
        defaultExpandedKeys: PropTypes.Requireable<(string | number)[]>;
        expandedKeys: PropTypes.Requireable<(string | number)[]>;
        defaultCheckedKeys: PropTypes.Requireable<(string | number)[]>;
        checkedKeys: PropTypes.Requireable<object>;
        defaultSelectedKeys: PropTypes.Requireable<(string | number)[]>;
        selectedKeys: PropTypes.Requireable<(string | number)[]>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
        onExpand: PropTypes.Requireable<(...args: any[]) => any>;
        onCheck: PropTypes.Requireable<(...args: any[]) => any>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        onLoad: PropTypes.Requireable<(...args: any[]) => any>;
        loadData: PropTypes.Requireable<(...args: any[]) => any>;
        loadedKeys: PropTypes.Requireable<(string | number)[]>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        onRightClick: PropTypes.Requireable<(...args: any[]) => any>;
        onDragStart: PropTypes.Requireable<(...args: any[]) => any>;
        onDragEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onDragOver: PropTypes.Requireable<(...args: any[]) => any>;
        onDragLeave: PropTypes.Requireable<(...args: any[]) => any>;
        onDragEnd: PropTypes.Requireable<(...args: any[]) => any>;
        onDrop: PropTypes.Requireable<(...args: any[]) => any>;
        filterTreeNode: PropTypes.Requireable<(...args: any[]) => any>;
        motion: PropTypes.Requireable<object>;
        switcherIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        prefixCls: string;
        showLine: boolean;
        showIcon: boolean;
        selectable: boolean;
        multiple: boolean;
        checkable: boolean;
        disabled: boolean;
        checkStrictly: boolean;
        draggable: boolean;
        defaultExpandParent: boolean;
        autoExpandParent: boolean;
        defaultExpandAll: boolean;
        defaultExpandedKeys: any[];
        defaultCheckedKeys: any[];
        defaultSelectedKeys: any[];
    };
    static TreeNode: React.FC<import("./TreeNode").TreeNodeProps>;
    delayedDragEnterLogic: Record<Key, number>;
    state: TreeState;
    dragNode: NodeInstance;
    listRef: React.RefObject<NodeListRef>;
    static getDerivedStateFromProps(props: TreeProps, prevState: TreeState): Partial<TreeState>;
    onNodeDragStart: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: NodeInstance) => void;
    /**
     * [Legacy] Select handler is less small than node,
     * so that this will trigger when drag enter node or select handler.
     * This is a little tricky if customize css without padding.
     * Better for use mouse move event to refresh drag state.
     * But let's just keep it to avoid event trigger logic change.
     */
    onNodeDragEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: NodeInstance) => void;
    onNodeDragOver: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: NodeInstance) => void;
    onNodeDragLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: NodeInstance) => void;
    onNodeDragEnd: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: NodeInstance) => void;
    getUniqKey: (s: string) => any;
    createEventNode: (key: string, itemData: ExternalDropData) => EventDataNode;
    handleOutsideDrop: (items: DataTransferItemList, dropResult: any) => void;
    onNodeDrop: (event: React.DragEvent<HTMLDivElement>, node: NodeInstance) => void;
    cleanDragState: () => void;
    onNodeClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, treeNode: EventDataNode) => void;
    onNodeDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, treeNode: EventDataNode) => void;
    onNodeSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, treeNode: EventDataNode) => void;
    onNodeCheck: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, treeNode: EventDataNode, checked: boolean) => void;
    onNodeLoad: (treeNode: EventDataNode) => Promise<unknown>;
    onNodeExpand: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, treeNode: EventDataNode) => Promise<void>;
    onNodeMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: EventDataNode) => void;
    onNodeMouseLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: EventDataNode) => void;
    onNodeContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, node: EventDataNode) => void;
    onFocus: React.FocusEventHandler<HTMLDivElement>;
    onBlur: React.FocusEventHandler<HTMLDivElement>;
    getTreeNodeRequiredProps: () => {
        expandedKeys: (string | number)[];
        selectedKeys: (string | number)[];
        loadedKeys: (string | number)[];
        loadingKeys: (string | number)[];
        checkedKeys: (string | number)[];
        halfCheckedKeys: (string | number)[];
        dragOverNodeKey: string | number;
        dropPosition: number;
        keyEntities: Record<string | number, DataEntity>;
    };
    onActiveChange: (newActiveKey: string | number) => void;
    getActiveItem: () => FlattenNode;
    offsetActiveKey: (offset: number) => void;
    onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
    /**
     * Only update the value which is not in props
     */
    setUncontrolledState: (state: Partial<TreeState>, atomic?: boolean, forceState?: Partial<TreeState>) => void;
    scrollTo: ScrollTo;
    render(): JSX.Element;
}
export default Tree;
