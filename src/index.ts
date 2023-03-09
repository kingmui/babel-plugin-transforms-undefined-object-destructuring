import t from '@babel/types';
import type { NodePath } from '@babel/traverse';

/**
 * Test if a VariableDeclaration's declarations contains any Patterns.
 */
function variableDeclarationHasPattern(node: t.VariableDeclaration) {
  for (const declar of node.declarations) {
    if (t.isPattern(declar.id)) {
      return true;
    }
  }
  return false;
}

export default function({ assertVersion }: any) {
  assertVersion(7);

  return {
    name: "transforms-undefined-object-destructuring",
    visitor: {
      VariableDeclaration(path: NodePath<t.VariableDeclaration>) {
        const { node, parent } = path;
        if (t.isForXStatement(parent)) return;
        if (!parent || !path.container) return;
        if (!variableDeclarationHasPattern(node)) return;

        for (const declar of node.declarations) {
          if (
            t.isVariableDeclarator(declar) &&
            t.isIdentifier(declar.init) &&
            t.isObjectPattern(declar.id)
          ) {
            declar.init = t.logicalExpression(
              '||',
              t.identifier(declar.init.name),
              t.identifier('{}'),
            );
          }
        }
      },
    },
  };
};
