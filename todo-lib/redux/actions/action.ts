import { IAction } from 'redux';

export enum ActionType {
    AddTodo,
    AddTodoList,
    ChooseTodoList,
    RemoveTodo,
    RemoveTodoList,
    ToggleTodo,
    SetFilter
}

export interface IAppAction extends IAction {
    type: ActionType;
}
