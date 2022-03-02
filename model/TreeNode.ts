import { Term } from "./Term";

export class TreeNode {
    constructor(term: Term) {
        this.term = term;
        this._children = [];
    }

    readonly term: Term;
    private _parent: TreeNode;
    private _children:TreeNode[];

    public get children() {
        return this._children;
    }

    public addChildNode(child : TreeNode) {
        this._children.push(child);
        child._parent = this;
        return child;
    }

    public get parent() {
        return this._parent;
    }

    public get label() {
        return this.term.label;
    }

    public isEqualTo(other: TreeNode) {
        return other && other.term.isEqualTo(this.term);
    }
}