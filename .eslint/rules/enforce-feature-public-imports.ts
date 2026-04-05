import type { Rule } from 'eslint';
import type { ImportDeclaration } from 'estree';

const rule: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow deep imports from "@/features/*/**"',
        },
        messages: {
            deepImport: 'Deep imports from "@/features/{{feature}}" are not allowed. Use only the public interface.',
        },
        schema: [],
    },
    create(context) {
        return {
            ImportDeclaration(node: ImportDeclaration) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const importPath = (node.source as any).value as string;

                if (!importPath?.startsWith('@/features/')) {
                    return;
                }

                const subPath = importPath.slice('@/features/'.length);
                const parts = subPath.split('/');

                if (parts[0] === '@core' && parts.length <= 2) {
                    return;
                }

                if (parts.length > 1) {
                    context.report({
                        node,
                        messageId: 'deepImport',
                        data: { feature: parts[0] },
                    });
                }
            },
        };
    },
};

export default rule;
