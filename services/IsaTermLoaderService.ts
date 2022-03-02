import { Term } from "../model/Term";
import { TreeNode } from "../model/TreeNode";
import { EdgeLoaderService } from "./EdgeLoaderService";

export class IsATermLoaderService {
    private edgeLoaderService: EdgeLoaderService;

    constructor(edgeLoaderService = new EdgeLoaderService()) {
        this.edgeLoaderService = edgeLoaderService;
    }

    public async loadTermTree(term: Term, maximumDepth: number, maximumEdges: number) {
        const root = new TreeNode(term);
        await this._loadTermTree(term, root, 0, maximumDepth, maximumEdges);
        return root;
    }

    private async _loadTermTree(term: Term, parent: TreeNode, currentDepth: number, maximumDepth: number, maximumEdges: number) {
        if (currentDepth > maximumDepth) {
            console.log("Not exploring any further")
            return;
        }
        const edges = await this.edgeLoaderService.findEdgesForTerm(term, maximumEdges);
        for (const edge of edges) {
            const term = Term.from(edge.end.term, edge.end.label);
            const edgeResult = new TreeNode(term)
            // Odly the data seems to have examples of things referencing themselves
            if (!parent.term.isEqualTo(edgeResult.term))
                parent.addChildNode(edgeResult);
            // Assuming that we can use this label to determine whether it is worth loading the parents
            if (edge.end.sense_label) {
                await this._loadTermTree(term, edgeResult, currentDepth + 1, maximumDepth, maximumEdges);
            }
        }
    }
}
