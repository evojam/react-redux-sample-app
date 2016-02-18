import * as React from 'react';
import { Component } from 'react';

import { ITodoList } from '../../todo-lib/dto';
import { todoActions } from '../services/todo-actions';

interface ITodoListHeaderProps {
    todoList: ITodoList;
}

export class TodoListHeader extends Component<ITodoListHeaderProps, {}> {

    public props: ITodoListHeaderProps;

    private getChooseAction(id: string) {
        return (): void => {
            todoActions.chooseTodoList(id);
        };
    }

    private getRemoveAction(id: string) {
        return (): void => {
            todoActions.chooseTodoList(id);
        };
    }

    public render(): JSX.Element {
        return (
            <header className="todo-list-item-header">
                <h2>{this.props.todoList.title}</h2>
                <button onClick={this.getChooseAction(this.props.todoList.id)} className="edit ion">
                    <span>Edit</span>
                </button>
                <button onClick={this.getRemoveAction(this.props.todoList.id)} className="remove ion">
                    <span>Remove</span>
                </button>
                <button onClick={this.getChooseAction(null)} className="cancel ion">
                    <span>Cancel</span>
                </button>
            </header>
        );
    }
}