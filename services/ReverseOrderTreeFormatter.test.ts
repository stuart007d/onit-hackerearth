import { Term } from "../model/Term";
import { TreeNode } from "../model/TreeNode";
import { ReverseOrderTreeFormatter } from "./ReverseOrderTreeFormatter";

describe('Format output of tree', () => {

    const reverseOrderTreeFormatter = new ReverseOrderTreeFormatter();

    test('Should format tree general to specific terms', async () => {
        const tree = new TreeNode(Term.build('ai', 'ai'));
        tree.addChildNode(new TreeNode(Term.from('artificial_intelligence', 'artificial_intelligence')))
        tree.addChildNode(new TreeNode(Term.from('term', 'term')))
        const semisolidNode = tree.addChildNode(new TreeNode(Term.from('semisolid', 'semisolid')))
        semisolidNode.addChildNode(new TreeNode(Term.from('container_independent_shape', 'container_independent_shape')))
        semisolidNode.addChildNode(new TreeNode(Term.from('non_fluidlike_substance', 'non_fluidlike_substance')))
        const result = reverseOrderTreeFormatter.format(tree);
        expect(result).toEqual({
            artificial_intelligence: { ai: {} },
            term: { ai: {} },
            container_independent_shape: { semisolid: { ai: {} } },
            non_fluidlike_substance: { semisolid: { ai: {} } }
        })
    });
})