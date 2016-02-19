import * as React from 'react';
import { Component } from 'react'; // , Factory

import { FilterType, todosFilter } from '../../todo-lib/filters';
import { ITodo } from '../../todo-lib/dto';

import { Todo } from './todo';

interface ITodoListProps {
    todos: ITodo[];
    filter: FilterType;
}

export class TodoList extends Component<ITodoListProps, {}> {

    public render(): JSX.Element {
        return (
            <ul className="todo-list">
                {todosFilter(this.props.todos, this.props.filter).map(todo => <Todo todo={todo} key={todo.id} />)}
            </ul>
        );
    }

}

// FIXME: Below functional version works well but does not compile
//export const TodoList: Factory<ITodoListProps> = (props: ITodoListProps) => (
//    <ul className="todo-list">
//        {todosFilter(props.todos, props.filter).map(todo => <Todo todo={todo} key={todo.id} />)}
//    </ul>
//);