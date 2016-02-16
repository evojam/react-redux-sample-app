import * as React from 'react';
import { Component } from 'react';
import { Store } from 'redux';
import { IAppState } from '../todo-lib/redux/core';

interface IAppComponentProps {
    store: Store<IAppState>
}

export class App extends Component<IAppComponentProps, {}> {

    public props: IAppComponentProps;

    public render(): JSX.Element {
        return (
            <div>
                <header>
                    <h1>TODO LIST<br/><small>REACT+REDUX</small></h1>
                </header>
                <pre>{JSON.stringify(this.props.store.getState(), null, 2)}</pre>
            </div>
        );
    }
}