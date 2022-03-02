import { IsATermLoaderService } from "./IsaTermLoaderService";
import { EdgeLoaderService } from "./EdgeLoaderService";
import { ConceptEdge } from "../types/ConceptEdge";
import { Matcher, MatcherCreator, mock, mockReset } from "jest-mock-extended";
import { Term } from "../model/Term";

export const termMatcher: MatcherCreator<Term> = (expectedValue) => new Matcher((actualValue) => {
    return (expectedValue.path === actualValue.path);
}, 'Term path matcher');

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

    const mockEdgeLoaderService = mock<EdgeLoaderService>();

    beforeEach(() => {
        mockReset(mockEdgeLoaderService); // or mockClear(mock)
        mockEdgeLoaderService.findEdgesForTerm.calledWith(termMatcher(Term.from('/c/en/supreme_court', 'supreme court')), 3).mockResolvedValueOnce(edges_supremecourt);
        mockEdgeLoaderService.findEdgesForTerm.calledWith(termMatcher(Term.from('/c/en/court', 'court')), 3).mockResolvedValueOnce(edges_court);
    });

    test('should return appeals court', async () => {

        const isaTermLoaderService = new IsATermLoaderService(mockEdgeLoaderService);
        const rootNode = await isaTermLoaderService.loadTermTree(Term.from('/c/en/supreme_court', 'supreme court'), 2, 3);

        expect(rootNode.term.path).toEqual('/c/en/supreme_court');
        expect(rootNode.children.length).toEqual(2);
        const child1 = rootNode.children[0];
        expect(child1.term.path).toBe('eterm1')
        expect(child1.parent).toBe(rootNode)
        expect(child1.children.length).toBe(0)

        const child2 = rootNode.children[1];
        expect(child2.term.path).toBe('/c/en/court')
        expect(child2.parent).toBe(rootNode)
        expect(child2.children.length).toBe(1)

        const child2child = child2.children[0];
        expect(child2child.term.path).toBe('eterm3')
        expect(child2child.parent).toBe(child2)
        expect(child2child.children.length).toBe(0)

    });
})