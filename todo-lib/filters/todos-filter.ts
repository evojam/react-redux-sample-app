import { ITodo } from '../dto';

export enum FilterType { All, Active, Completed }

export function todosFilter(todos: ITodo[], [type]: [FilterType]): ITodo[] {
    switch (type) {
        case FilterType.Active:     return todos.filter(todo => !todo.completed);
        case FilterType.Completed:  return todos.filter(todo => todo.completed);
        default:                    return todos;
    }
}