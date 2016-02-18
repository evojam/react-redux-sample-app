import * as React from 'react';
import { Component } from 'react';

import { todoActions } from '../services/todo-actions';
import { FilterType, todosFilter } from '../../todo-lib/filters';
import { ITodo } from '../../todo-lib/dto';

interface ITodoListProps {
    todos: ITodo[];
    filter: FilterType;
}

export class TodoList extends Component<ITodoListProps, {}> {

    public props: ITodoListProps;

    public render(): JSX.Element {
        return (
            <ul className="todo-list">
                {todosFilter(this.props.todos, this.props.filter).map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                    </li>
                ))}
            </ul>
        );
    }

}
