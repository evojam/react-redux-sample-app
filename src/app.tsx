import * as React from 'react';
import { Component } from 'react';
import { OnWillUnmount, OnDidMount } from 'react-implementables'
import { Store, IUnsubscribe } from 'redux';
import { IAppState } from '../todo-lib/redux/core';
import { ITodo, ITodoList } from '../todo-lib/dto';
import { FilterType } from '../todo-lib/filters';
import { TodoListHeader, FilterLink, TodoList } from './components';

interface IAppComponentProps {
    store: Store<IAppState>
}

export class App extends Component<IAppComponentProps, {}> implements OnDidMount, OnWillUnmount {

    public props: IAppComponentProps;

    private get lists(): ITodoList[] {
        return this.props.store.getState().todoLists;
    }

    private get filter(): FilterType {
        return this.props.store.getState().currentFilter;
    }

    private get currentId(): string {
        return this.props.store.getState().currentListId;
    }

    private listClassName(list: ITodoList, id: string): string {
        return `todo-lists-list-item ${ list.id === id ? 'active' : '' }`;
    }

    private todoClassName(todo: ITodo): string {
        return `todo-preview ${ todo.completed ? 'done' : '' }`;
    }

    public render(): JSX.Element {
        console.log('App RENDER');
        return (
            <div>
                <header>
                    <h1>TODO LIST<br/><small>REACT+REDUX</small></h1>
                </header>
                <main>
                    <ul className="todo-lists-list">
                        {this.lists.map(list => (
                            <li className={this.listClassName(list, this.currentId)} key={list.id}>
                                <TodoListHeader todoList={list} />
                                {list.id !== this.currentId ? (
                                    <ul className="todo-list">
                                        {list.todos.map(todo => (
                                        <li className={this.todoClassName(todo)} key={todo.id}>
                                                {todo.text}
                                        </li>
                                        ))}
                                    </ul>
                                    ) : (
                                    <div>
                                        <filters>
                                            Show:
                                            <FilterLink filterType="All"/>
                                            <FilterLink filterType="Active"/>
                                            <FilterLink filterType="Completed"/>
                                        </filters>
                                        <p> current filter is {this.filter}</p>
                                        <TodoList todos={list.todos} filter={this.filter} />
                                    </div>
                                    )}
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        );
    }

    private unsubscribe: IUnsubscribe;

    public componentDidMount(): void {
        this.forceUpdate();
        this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
    }

    public componentWillUnmount(): void {
        this.unsubscribe();
    }
}