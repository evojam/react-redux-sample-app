import { IAppAction, ActionType } from './action';
import { ITodo } from '../../dto/todo';
import { FilterType } from '../../filters/todos-filter';

export class SetFilterAction implements IAppAction {

    public type = ActionType.SetFilter;

    constructor(public filter: FilterType) {}

}
