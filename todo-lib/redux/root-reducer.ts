import { Maybe } from 'monet';

import { IAppAction, ActionType, AddTodoAction, AddTodoListAction, ItemStateAction } from './actions';
import { ITodo, ITodoList } from '../dto';
import { FilterType } from '../filters/todos-filter';
import { IAppState } from './app-state';

export function rootReducer(state: IAppState, action): IAppState {

    switch (action.type) {

        case ActionType.AddTodo:
        case ActionType.ToggleTodo:
        case ActionType.AddTodoList:
        case ActionType.RemoveTodo:
        case ActionType.RemoveTodoList:
            return {
                todoLists: todoListsReducer(state, action),
                currentFilter: state.currentFilter,
                currentListId: currentListIdReducer(state, action)
            };

        case ActionType.SetFilter:
        case ActionType.ChooseTodoList:
            return {
                todoLists: state.todoLists,
                currentFilter: Maybe.fromNull<FilterType>(action.filter).orJust(state.currentFilter),
                currentListId: currentListIdReducer(state, action)
            };

        case '@@redux/INIT':
        case '@@INIT':
            return state;

        default:
            console.warn(`Action "${ ActionType[action.type] }" unimplemented. Action body: %O`, action);
            return state;

    }

}

function todoListsReducer(state: IAppState, action): ITodoList[] {
    switch (action.type) {

        case ActionType.AddTodo:
            return todoListMapReducer(state, addTodosReducer(action));

        case ActionType.RemoveTodo:
            return todoListMapReducer(state, removeTodoReducer(action));

        case ActionType.ToggleTodo:
            return todoListMapReducer(state, toggleTodoReducer(action));

        case ActionType.AddTodoList:
            return addTodoListReducer(action, state.todoLists);

        case ActionType.RemoveTodoList:
            return removeTodoListReducer(action, state.todoLists);

        default:
            return state.todoLists;

    }
}

function currentListIdReducer(state: IAppState, action): string {
    switch (action.type) {

        case ActionType.AddTodoList:
        case ActionType.ChooseTodoList:
            return action.id;

        case ActionType.AddTodo:
        case ActionType.ToggleTodo:
        case ActionType.SetFilter:
        case ActionType.RemoveTodo:
            return state.currentListId;

        case ActionType.RemoveTodoList:
            return state.currentListId === action.id ? null : state.currentListId;

        default:
            console.warn(`Action "${ ActionType[action.type] }" unimplemented in "currentListIdReducer". ` +
                `Action body: %O`, action);
            return state.currentListId;

    }
}

function addTodoListReducer(action: AddTodoListAction, todoLists: ITodoList[]): ITodoList[] {
    return Array({
        id: action.id,
        title: action.title,
        todos: action.todos
    }).concat(todoLists);
}

function removeTodoListReducer(action: ItemStateAction, todoLists: ITodoList[]): ITodoList[] {
    return todoLists.filter(list => list.id !== action.id);
}

function todoListMapReducer(state: IAppState, reducer: ITodoReducer): ITodoList[] {
    return state.todoLists.map(todoReducerComposer(state.currentListId, reducer));
}

interface ITodoListReducer {
    (todoList: ITodoList): ITodoList;
}

function todoReducerComposer(currentListId: string, reducer: ITodoReducer): ITodoListReducer {
    return (todoList: ITodoList): ITodoList => Maybe.fromNull(currentListId)
        .filter(listId => todoList.id === listId)
        .map(listId => ({id: listId, todos: reducer(todoList.todos), title: todoList.title}))
        .orJust(todoList);
}

interface ITodoReducer {
    (todos: ITodo[]): ITodo[];
}

function addTodosReducer(todo: AddTodoAction): ITodoReducer {
    return (todos: ITodo[]): ITodo[] => Array({
        id: todo.id,
        text: todo.text,
        completed: todo.completed
    }).concat(todos);
}

function removeTodoReducer(action: ItemStateAction): ITodoReducer {
    return (todos: ITodo[]): ITodo[] => todos.filter(todo => todo.id !== action.id);
}

function toggleTodoReducer(action: ItemStateAction): ITodoReducer {
    return (todos: ITodo[]): ITodo[] => todos.map(todo => todo.id === action.id ? {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed
    } : todo);
}