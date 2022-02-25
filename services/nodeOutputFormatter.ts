import { ResultNode } from "../types/ResultNode";

export const nodeOutputFormatter = (node: ResultNode, result: {}, dictionary: {}) => {
    if(!dictionary[node.label])
        dictionary[node.label] = {};
    if (node.children.length > 0) {
        node.children.forEach(child => {
            nodeOutputFormatter(child, result, dictionary)
            dictionary[child.label][node.label] = dictionary[node.label]
        });
    } else {
        result[node.label] = dictionary[node.label];
    }
}