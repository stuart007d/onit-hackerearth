import axios from "axios";
import { ConceptEdge } from "../types/ConceptEdge";
import { findIsAEdgesForEnglishTerm } from "./findIsAEdgesForEnglishTerm";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Fetch Edge nodes for english terms', () => {

    test('should perform http get for edge nodes', async () => {
        const edges : ConceptEdge[] = [
            {
                end: {
                    label: 'end',
                    term: 'term'
                },
                start:{
                    label: 'start',
                    term: 'term'
                }
            }
        ];
        mockedAxios.get.mockResolvedValueOnce({
            data: {edges}
        });


        const loadedEdges = await findIsAEdgesForEnglishTerm(`/c/en/supreme_court`, 2);
        
        expect(axios.get).toHaveBeenCalledWith(`http://api.conceptnet.io/query?rel=/r/IsA&start=/c/en/supreme_court&limit=2`);
        expect(loadedEdges).toEqual(edges)
    });
})