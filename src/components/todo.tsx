import * as React from 'react';
import { Component } from 'react';

import { ITodo } from '../../todo-lib/dto';
import { todoActions } from '../services/todo-actions';

interface ITodoProps {
    todo: ITodo;
    key: string;
}

export class Todo extends Component<ITodoProps, {}> {

    private getToggleAction(todo: ITodo) {
        return () => {
            todoActions.toggleTodo(todo.id);
        }
    }

    private getRemoveAction(todo: ITodo) {
        return () => {
            todoActions.removeTodo(todo.id);
        }
    }

    public render(): JSX.Element {
        return (
            <li className={'todo' + (this.props.todo.completed ? ' done' : '')}>
                <button onClick={this.getToggleAction(this.props.todo)} className="toggle">
                    {this.props.todo.text}
                </button>
                <button onClick={this.getRemoveAction(this.props.todo)} className="remove ion">
                    <span>Remove</span>
                </button>
            </li>
        );
    }

}
