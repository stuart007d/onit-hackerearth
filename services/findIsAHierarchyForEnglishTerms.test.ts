import { findIsAHierarchyForEnglishTerm } from "./findIsAHierarchyForEnglishTerms";
import { findIsAEdgesForEnglishTerm } from "./findIsAEdgesForEnglishTerm";
import { ConceptEdge } from "../types/ConceptEdge";

jest.mock("./findIsAEdgesForEnglishTerm");

describe('Build Hierarchy For English Terms', () => {

    const edges_supremecourt: ConceptEdge[] = [{
        end: {
            label: 'elabel1',
            term: 'eterm1'
        },
        start: {
            label: 'slabel1',
            term: 'sterm1'
        }
    }, {
        end: {
            label: 'court',
            term: '/c/en/court',
            sense_label: 'n'
        },
        start: {
            label: 'slabel2',
            term: 'sterm2'
        }
    }];
    const edges_court: ConceptEdge[] = [{
        end: {
            label: 'elabel3',
            term: 'eterm3'
        },
        start: {
            label: 'slabel3',
            term: 'sterm3'
        }
    }];

    test('should return appeals court', async () => {

        (findIsAEdgesForEnglishTerm as any).mockResolvedValueOnce(edges_supremecourt);
        (findIsAEdgesForEnglishTerm as any).mockResolvedValueOnce(edges_court);

        const rootNode = {
            children: [],
            parent: null,
            label: 'root',
            term: ''
        }
        await findIsAHierarchyForEnglishTerm(`/c/en/supreme_court`, rootNode, 0, { maximumDepth: 2, maximumEdges: 3 });

        expect(findIsAEdgesForEnglishTerm).toHaveBeenCalledWith(`/c/en/supreme_court`, 3);
        expect(findIsAEdgesForEnglishTerm).toHaveBeenCalledWith(`/c/en/court`, 3);
        expect(rootNode).toEqual({
            "children": [
                {
                    "term": "eterm1",
                    "label": "elabel1",
                    "children": []
                },
                {
                    "term": "/c/en/court",
                    "label": "court",
                    "children": [
                        {
                            "term": "eterm3",
                            "label": "elabel3",
                            "children": []
                        }
                    ]
                }
            ],
            "parent": null,
            "label": "root",
            "term": ""
        })
    });
})