import { ResultNode } from "../types/ResultNode";
import { sampleNodeTree } from "../__data/sampleNodeTree";
import { nodeOutputFormatter } from "./nodeOutputFormatter";

describe('Format output of tree', () => {

    test('Should format tree general to specific terms', async () => {
        const tree: ResultNode = {
            children: [
                {
                    term: 'artificial_intelligence',
                    children: [],
                    label: 'artificial_intelligence'
                },
                {
                    term: 'term',
                    children: [],
                    label: 'term'
                },
                {
                    term: 'semisolid',
                    children: [{
                        term: 'container_independent_shape',
                        label: 'container_independent_shape',
                        children: []
                    }, {
                        term: 'non_fluidlike_substance',
                        label: 'non_fluidlike_substance',
                        children: []
                    }],
                    label: 'semisolid'
                }
            ],
            label: 'ai',
            term: 'ai'
        }
        const result = {};
        nodeOutputFormatter(tree, result, {});
        expect(result).toEqual({
            artificial_intelligence: { ai: {} },
            term: { ai: {} },
            container_independent_shape: { semisolid: { ai: {} } },
            non_fluidlike_substance: { semisolid: { ai: {} } }
        })
    });

    test('Should format nested structure', async () => {
        const result = {};
        nodeOutputFormatter(sampleNodeTree, result, {});
        console.log(JSON.stringify(result));
    })
})