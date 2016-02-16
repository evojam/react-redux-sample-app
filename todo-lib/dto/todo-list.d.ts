import { ITodo } from './todo';

export interface ITodoList {
    id: string;
    title: string;
    todos: ITodo[];
}