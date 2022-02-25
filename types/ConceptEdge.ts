import { ConceptNode } from "./ConceptNode";

export interface ConceptEdge {
    end: ConceptNode;
    start: ConceptNode;
}