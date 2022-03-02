import axios, { Axios } from "axios"
import { Term } from "../model/Term";
import { ConceptApiResult } from "../types/ConceptApiResult";
import { ConceptEdge } from "../types/ConceptEdge";
import { EdgeRelationShip } from "../Types/EdgeRelationship";

export class EdgeLoaderService {

    private axios: Axios;
    private baseUrl: string;
    private relationship: EdgeRelationShip;

    constructor(pBaseUrl = 'http://api.conceptnet.io/', pAxios = axios as Axios, relationship = EdgeRelationShip.IsA) {
        this.baseUrl = pBaseUrl;
        this.axios = pAxios;
        this.relationship = relationship;
    }

    // Not sure if this is the best criteria, would have preferred to at least make this as part of the query to the HTTP API.
    private filterOutGroups(edge: ConceptEdge) {
        return !edge.end.sense_label || edge.end.sense_label == 'n';
    }

    public async findEdgesForTerm(term: Term, limit: number) {
        console.log(`find edges ${term} - limit: ${limit}`)
        if (!term)
            return [];
        const result = await this.axios.get<ConceptApiResult>(`${this.baseUrl}query?rel=/r/${this.relationship}&start=${term.path}&limit=${limit}`);
        const edges = result.data.edges;
        return edges.filter(this.filterOutGroups);
    }
}