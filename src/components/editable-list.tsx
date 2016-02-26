import * as React from 'react';
import { Component } from 'react';

import { ITodoList } from '../../todo-lib/dto';
import { FilterType } from '../../todo-lib/filters';

import { AddItem } from './add-item'
import { TodoList } from './todo-list';
import { FilterLink } from './filter-link';

interface IEditableListProps {
    todoList: ITodoList;
    filter: FilterType;
}

export class EditableList extends Component<IEditableListProps, {}> {
    public render(): JSX.Element {
        return (
            <editable-list>
                <filters>
                    Show:
                    <FilterLink filterType="All"/>
                    <FilterLink filterType="Active"/>
                    <FilterLink filterType="Completed"/>
                </filters>
                <AddItem itemType="Todo"/>
                <TodoList todoList={this.props.todoList.todos} filter={this.props.filter}/>
            </editable-list>
        );
    }
}

// FIXME: Below functional version works well but does not compile
//export function EditableList(props: IEditableListProps) {
//    return (
//        <editable-list>
//            <filters>
//                Show:
//                <FilterLink filterType="All"/>
//                <FilterLink filterType="Active"/>
//                <FilterLink filterType="Completed"/>
//            </filters>
//            <AddItem itemType="Todo"/>
//            <TodoList todos={props.todoList.todos} filter={props.filter}/>
//        </editable-list>
//    );
//}