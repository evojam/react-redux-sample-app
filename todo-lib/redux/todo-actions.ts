import { Store } from 'redux';

import { IAppState } from './app-state';
import { IAppAction, AddItemType, ActionType } from './actions';
import { AddTodoAction, AddTodoListAction, SetFilterAction, ItemStateAction } from './actions';
import { FilterType } from '../filters/todos-filter';
import { store } from './store';

export class TodoActions {

    private appStore = store;

    private plain(action: IAppAction): IAppAction {
        return Object.freeze(Object.assign(Object.create(null), action));
    }

    private dispatch(action: IAppAction): void {
        this.appStore.dispatch(this.plain(action));
    }

    public addItem(itemType: AddItemType, text: string) {
        switch (itemType) {

            case AddItemType.Todo:
                return this.dispatch(new AddTodoAction(text));

            case AddItemType.TodoList:
                return this.dispatch(new AddTodoListAction(text));

            default:
                throw new Error(`TodoActions#addItem itemType is ${ itemType } ` +
                    `but has to be ${ AddItemType.Todo } or ${ AddItemType.TodoList }`);

        }

    }

    public toggleTodo(id: string) {
        return this.dispatch(new ItemStateAction(id, ActionType.ToggleTodo));
    }

    public removeTodo(id: string) {
        return this.dispatch(new ItemStateAction(id, ActionType.RemoveTodo));
    }

    public removeTodoList(id: string) {
        return this.dispatch(new ItemStateAction(id, ActionType.RemoveTodoList));
    }

    public chooseTodoList(id: string) {
        return this.dispatch(new ItemStateAction(id, ActionType.ChooseTodoList));
    }

    public setFilter(filter: FilterType) {
        return this.dispatch(new SetFilterAction(filter));
    }

}
