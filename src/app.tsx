import * as React from 'react';
import { Component } from 'react';
import { OnWillUnmount, OnDidMount } from 'react-implementables'
import { Store, IUnsubscribe } from 'redux';
import { IAppState, syncStorage } from '../todo-lib/redux/core';
import { ITodo, ITodoList } from '../todo-lib/dto';
import { FilterType } from '../todo-lib/filters';
import { TodoListHeader, FilterLink, TodoList, AddItem } from './components';

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

    private listClassName(list: ITodoList): string {
        return `todo-lists-list-item ${ list.id === this.currentId ? 'active' : '' }`;
    }

    private todoClassName(todo: ITodo): string {
        return `todo-preview ${ todo.completed ? 'done' : '' }`;
    }

    public render(): JSX.Element {
        return (
            <div>
                <header>
                    <h1>TODO LIST<br/><small>REACT+REDUX</small></h1>
                </header>
                <main>
                    <AddItem itemType="TodoList" />
                    <ul className="todo-lists-list">
                        {this.lists.map(list => (
                            <li className={this.listClassName(list)} key={list.id}>
                                <TodoListHeader todoList={list} />
                                {list.id !== this.currentId ? (
                                    <ul className="todo-list">
                                        {list.todos.map(todo => (
                                        <li className={this.todoClassName(todo)} key={todo.id}>{todo.text}</li>
                                        ))}
                                    </ul>
                                    ) : (
                                    <editable-list>
                                        <filters>
                                            Show:
                                            <FilterLink filterType="All"/>
                                            <FilterLink filterType="Active"/>
                                            <FilterLink filterType="Completed"/>
                                        </filters>
                                        <AddItem itemType="Todo" />
                                        <TodoList todos={list.todos} filter={this.filter} />
                                    </editable-list>
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
        this.unsubscribe = this.props.store.subscribe(() => {
            this.forceUpdate();
            syncStorage(this.props.store.getState());
        });
    }

    public componentWillUnmount(): void {
        this.unsubscribe();
    }
}