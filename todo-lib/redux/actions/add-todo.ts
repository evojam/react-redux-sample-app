import { IAppAction, ActionType } from './action';
import { ITodo } from '../../dto/todo';
import { uniqueID } from '../../helpers';

export class AddTodoAction implements IAppAction, ITodo {

    public type = ActionType.AddTodo;
    public id = uniqueID();
    public completed = false;

    constructor(public text: string) {}

}
