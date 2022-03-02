import { Axios } from "axios";
import { ConceptEdge } from "../types/ConceptEdge";
import { EdgeLoaderService } from "./EdgeLoaderService";
import { mock } from 'jest-mock-extended';
import { Term } from "../model/Term";
import { EdgeRelationShip } from "../Types/EdgeRelationship";


describe('Fetch Edge nodes for english terms', () => {

    test('should perform http get for edge nodes', async () => {
        //Arrange
        const mockedAxios = mock<Axios>();
        const edges: ConceptEdge[] = [
            {
                end: {
                    label: 'end',
                    term: 'term'
                },
                start: {
                    label: 'start',
                    term: 'term'
                }
            }
        ];
        mockedAxios.get.calledWith(`http://api.conceptnet.io/query?rel=/r/IsA&start=/c/en/supreme_court&limit=2`).mockResolvedValueOnce({ data: { edges } });

        //Act
        const edgeLoaderService = new EdgeLoaderService('http://api.conceptnet.io/', mockedAxios, EdgeRelationShip.IsA);
        const loadedEdges = await edgeLoaderService.findEdgesForTerm(Term.from(`/c/en/supreme_court`, 'supreme court'), 2);

        //Assert
        expect(loadedEdges).toEqual(edges)
    });
})