import * as React from 'react';
import { Component } from 'react';

import { ITodo, ITodoList } from '../../todo-lib/dto';
import { FilterType } from '../../todo-lib/filters';

import { EditableList } from './editable-list';
import { TodoListHeader } from './todo-list-header';

interface IListOfListsProps {
    currentId: string;
    filter: FilterType;
    lists: ITodoList[];
}

export class ListOfLists extends Component<IListOfListsProps, {}> {

    private listClassName(list: ITodoList): string {
        return `todo-lists-list-item ${ list.id === this.props.currentId ? 'active' : '' }`;
    }

    private todoClassName(todo: ITodo): string {
        return `todo-preview ${ todo.completed ? 'done' : '' }`;
    }

    public render(): JSX.Element {
        return (
            <ul className="todo-lists-list">
                {this.props.lists.map(list => (
                <li key={list.id}
                    className={this.listClassName(list)}>
                    <TodoListHeader todoList={list}/>
                    {list.id !== this.props.currentId ? (
                    <ul className="todo-list">
                        {list.todos.map(todo => (
                            <li key={todo.id}
                                className={this.todoClassName(todo)}>
                                {todo.text}
                            </li>
                        ))}
                    </ul>
                    ) : (
                    <EditableList
                        todoList={list}
                        filter={this.props.filter}/>
                    )}
                </li>
                ))}
            </ul>
        );
    }

}