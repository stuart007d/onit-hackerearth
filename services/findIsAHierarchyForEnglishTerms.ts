import { ResultNode } from "../types/ResultNode";
import { findIsAEdgesForEnglishTerm } from "./findIsAEdgesForEnglishTerm";

export interface FindIsAHierarchyForEnglishTermConfig {
    maximumDepth: number;
    maximumEdges: number;
}

export const findIsAHierarchyForEnglishTerm = async (term: string, result: ResultNode, currentDepth: number, config: FindIsAHierarchyForEnglishTermConfig) => {
    if (currentDepth > config.maximumDepth) {
        console.log("Not exploring any further")
        return;
    }
    const edges = await findIsAEdgesForEnglishTerm(term, config.maximumEdges);
    for (const edge of edges) {
        const edgeResult: ResultNode = {
            term: edge.end.term,
            label: edge.end.label,
            children: []
        }
        // Odly the data seems to have examples of things referencing themselves
        if(result.term != edgeResult.term)
            result.children.push(edgeResult);
        // Assuming that we can use this label to determine whether it is worth loading the parents
        if (edge.end.sense_label) {
            await findIsAHierarchyForEnglishTerm(edge.end.term, edgeResult, currentDepth + 1, config);
        }
    }
}