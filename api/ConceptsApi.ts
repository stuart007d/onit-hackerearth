import { Request, Response } from 'express';
import { Term } from '../model/Term';
import { IsATermLoaderService } from '../services/IsaTermLoaderService';
import { ReverseOrderTreeFormatter } from '../services/ReverseOrderTreeFormatter';
import { IExpressApi } from './IExpressApi';

export class ConceptsApi implements IExpressApi {
    treeFormatter: ReverseOrderTreeFormatter;
    termLoaderService: IsATermLoaderService;

    constructor(termLoaderService = new IsATermLoaderService(), treeFormatter = new ReverseOrderTreeFormatter()) {
        this.treeFormatter = treeFormatter;
        this.termLoaderService = termLoaderService;
    }

    private parseParams(request: Request) {
        const term = request.query.term as string;
        const edgeLimit = request.query.edgeLimit as string ?? '20';
        const nodeDepth = request.query.nodeDepth as string ?? '3';
        const maximumDepth = Math.min(parseInt(nodeDepth), 5);
        const maximumEdges = Math.min(parseInt(edgeLimit), 100);
        return {
            term,
            maximumDepth,
            maximumEdges
        }
    }

    async handle(request: Request, response: Response) {
        const { term, maximumDepth, maximumEdges } = this.parseParams(request);
        const rootNode = await this.termLoaderService.loadTermTree(Term.build('en', term), maximumDepth, maximumEdges);
        const formattedResult = this.treeFormatter.format(rootNode);
        response.status(200).json(formattedResult);
    }
}