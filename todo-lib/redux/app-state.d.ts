import { ITodoList } from '../dto';
import { FilterType } from '../filters/todos-filter';

export interface IAppState {
    currentListId: string;
    todoLists: ITodoList[];
    currentFilter: FilterType;
}