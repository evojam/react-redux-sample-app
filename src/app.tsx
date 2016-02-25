import * as React from 'react';
import { Component } from 'react';
import { Store, Unsubscribe } from 'redux';
import { OnWillUnmount, OnDidMount } from 'react-implementables'
import { Maybe } from 'monet';

import { IAppState, syncStorage } from '../todo-lib/redux/core';

import { AddItem, ListOfLists } from './components';

interface IAppComponentProps {
    store: Store<IAppState>
}

export class App extends Component<IAppComponentProps, IAppState> implements OnDidMount, OnWillUnmount {

    private get appState(): Maybe<IAppState> {
        return Maybe.fromNull(this.state);
    }

    private get currentId() {
        return this.appState.cata(() => null, state => state.currentListId);
    }

    private get filter() {
        return this.appState.cata(() => null, state => state.currentFilter);
    }

    private get lists() {
        return this.appState.map(state => state.todoLists).orJust([]);
    }

    public render(): JSX.Element {
        return (
            <div>
                <header>
                    <h1>TODO LIST<br/><small>REACT+REDUX</small></h1>
                </header>
                <main>
                    <AddItem itemType="TodoList" />
                    <ListOfLists
                        currentId={this.currentId}
                        filter={this.filter}
                        lists={this.lists}/>
                </main>
            </div>
        );
    }

    private unsubscribe: Unsubscribe;

    private sync(): void {
        const newState = this.props.store.getState();
        this.setState(newState, () => {
            syncStorage(newState);
        });
    }

    public componentDidMount(): void {
        this.sync();
        this.unsubscribe = this.props.store.subscribe(() => this.sync());
    }

    public componentWillUnmount(): void {
        this.unsubscribe();
    }
}