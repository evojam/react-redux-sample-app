import { IAppAction, ActionType } from './action';
import { ITodo, ITodoList } from '../../dto';
import { uniqueID } from '../../helpers';

export class AddTodoListAction implements IAppAction, ITodoList {

    public type = ActionType.AddTodoList;
    public todos: ITodo[] = [];
    public id = uniqueID();

    constructor(public title: string) {}

}
