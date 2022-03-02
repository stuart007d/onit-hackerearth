import { TreeNode } from "../model/TreeNode";

export class ReverseOrderTreeFormatter {

    public format(rootNode : TreeNode) {
        const dictionary = {};
        const result = {};
        this._format(rootNode, result, dictionary);
        return result;
    }

    private _format(node: TreeNode, result: {}, dictionary: {}) {
        if(!dictionary[node.label])
            dictionary[node.label] = {};
        if (node.children.length > 0) {
            node.children.forEach(child => {
                this._format(child, result, dictionary)
                dictionary[child.label][node.label] = dictionary[node.label]
            });
        } else {
            result[node.label] = dictionary[node.label];
        }
    }
}

