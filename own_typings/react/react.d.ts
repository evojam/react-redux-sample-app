
declare namespace __React {

    interface IComponentRefs {
        [key: string]: Component<any, any> | Element;
    }

}

declare namespace __ReactImplementables {

    interface OnDidMount {
        componentDidMount(): void;
    }

    interface OnWillMount {
        componentWillMount(): void;
    }

    interface OnWillUnmount {
        componentWillUnmount(): void;
    }

    interface OnDidUpdate<P, S> {
        componentDidUpdate(prevProps: P, prevState: S, prevContext: any): void;
    }

    interface OnWillUpdate<P, S> {
        componentWillUpdate(nextProps: P, nextState: S, nextContext: any): void;
    }

    interface OnWillReceiveProps<P> {
        componentWillReceiveProps(nextProps: P, nextContext: any): void;
    }

    interface ShouldUpdate<P, S> {
        shouldComponentUpdate(nextProps: P, nextState: S, nextContext: any): boolean;
    }

}

declare module "react-implementables" {
    export = __ReactImplementables;
}