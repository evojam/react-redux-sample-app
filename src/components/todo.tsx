import * as React from 'react';
import { Component } from 'react';

import { ITodo } from '../../todo-lib/dto';
import { todoActions } from '../services/todo-actions';

interface ITodoProps {
    todo: ITodo;
    key: string;
}

export class Todo extends Component<ITodoProps, {}> {

    public props: ITodoProps;

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
            <li className={this.props.todo.completed ? 'done' : undefined}>
                <button onClick={this.getToggleAction(this.props.todo)} className="toggle">
                    {this.props.todo.text}
                </button>
                <button onClick={this.getRemoveAction(this.props.todo)} className="remove ion">x</button>
            </li>
        );
    }

}
