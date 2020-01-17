import { isStyledComponent, ThemeConsumer, ThemeProvider } from 'styled-components';

interface Options {
    defaultProps?: boolean;
    aggressive?: boolean;
    themes?: object[];
}

function defaultPropsTest(val: any) {
    return val.node?.type?.defaultProps?.theme === val.props?.theme;
}

function aggressiveTest(val: any) {
    return val.type === 'StyledComponent' ||
        val.node.type.constructor === ThemeProvider.constructor ||
        val.node.type.constructor === ThemeConsumer.constructor ||
        isStyledComponent(val.node.type);
}

function createPredicates({ defaultProps = true, aggressive = true, themes = [] }: Options = {}) {
    const predicates: Array<(val: any) => boolean> = [];
    defaultProps && predicates.push(defaultPropsTest);
    aggressive && predicates.push(aggressiveTest);
    themes.length && predicates.push(val => themes.some(t => val?.props?.theme === t));
    return predicates;
}

export = function createSerializer(options: Options | 'nuclear' = {}): jest.SnapshotSerializerPlugin {
    const predicates = options === 'nuclear' ? [] : createPredicates(options);

    return {
        print(val, serialize) {
            return serialize({
                ...val,
                props: {
                    ...val.props,
                    theme: 'Ignored styled-component theme in snapshots https://github.com/agoda-com/ignore-styled-components-theme',
                },
            });
        },


        test(val) {
            return predicates.some(predicate => predicate(val)) && typeof val?.props?.theme === 'object';
        },
    };
}
