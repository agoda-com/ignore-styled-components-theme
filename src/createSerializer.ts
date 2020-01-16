import { isStyledComponent, ThemeConsumer, ThemeProvider } from 'styled-components';

interface Options {
    defaultProps?: boolean;
    aggressive?: boolean,
    themes?: object[],
}

function defaultPropsTest(val: any) {
    return val.node.type?.defaultProps?.theme === val.props?.theme;
}

function strictTest(val: any) {
    return val.type === 'StyledComponent' ||
        val.node.type.constructor === ThemeProvider.constructor ||
        val.node.type.constructor === ThemeConsumer.constructor ||
        isStyledComponent(val.node.type);
}

export = function createSerializer({ defaultProps = true, aggressive = false, themes = [] }: Options = {}): jest.SnapshotSerializerPlugin {
    return {
        print(val, serialize) {
            return serialize({
                ...val,
                props: {
                    ...val.props,
                    theme: 'Ignored styled-component theme',
                },
            });
        },


        test(val) {
            return val?.node && (
                (defaultProps && defaultPropsTest(val)) ||
                (aggressive && strictTest(val)) ||
                themes.some(t => val.props.theme === t)
            ) && typeof val?.props?.theme === 'object';
        },
    };
}
