import { Request, Response } from 'express';
import { findIsAHierarchyForEnglishTerm, FindIsAHierarchyForEnglishTermConfig } from '../services/findIsAHierarchyForEnglishTerms';
import { nodeOutputFormatter } from '../services/nodeOutputFormatter';
import { ResultNode } from '../types/ResultNode';

export const conceptsApi = async (request: Request, response: Response) => {
    const termLabel = request.query.term as string;
    const edgeLimit = request.query.edgeLimit as string ?? '20';
    const nodeDepth = request.query.nodeDepth as string ?? '3';
    const term = `/c/en/${termLabel.replace(' ', '_')}`;
    const config: FindIsAHierarchyForEnglishTermConfig = {
        maximumDepth: Math.min(parseInt(nodeDepth), 5),
        maximumEdges: Math.min(parseInt(edgeLimit), 100)
    }
    const rootNode: ResultNode = {
        term,
        label: termLabel,
        children: []
    };
    await findIsAHierarchyForEnglishTerm(term, rootNode, 0, config);
    const result = {};
    nodeOutputFormatter(rootNode, result, {});
    response.status(200).json(result);
}