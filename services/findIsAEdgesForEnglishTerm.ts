import axios from "axios"
import { ConceptApiResult } from "../types/ConceptApiResult";
import { ConceptEdge } from "../types/ConceptEdge";

const baseUrl = 'http://api.conceptnet.io/';

// Not sure if this is the best criteria, would have preferred to at least make this as part of the query to the HTTP API.
export const filterOutGroups = (edge: ConceptEdge) => {
    return !edge.end.sense_label || edge.end.sense_label == 'n';
}

export const findIsAEdgesForEnglishTerm = async (term: string, limit: number)=> {
    console.log(`find edges ${term} - limit: ${limit}`)
    if(!term)
        return [];
    const result = await axios.get<ConceptApiResult>(`${baseUrl}query?rel=/r/IsA&start=${term}&limit=${limit}`);
    const edges = result.data.edges;
    return edges.filter(filterOutGroups);
}