import { IAppState } from './app-state';
import { FilterType } from '../filters/todos-filter';
import { Either, Left, Maybe, None, Some, Right } from 'monet';

const storageKey = 'ng2playground$$initialState';

export function getInitialState(): IAppState {
    return Maybe.fromNull(window.localStorage.getItem(storageKey))
        .flatMap(stateJson => parseJson<IAppState>(stateJson).toMaybe())
        .orJust({
            currentListId: null,
            todoLists: [],
            currentFilter: FilterType.All
        });
}

export function syncStorage(state: IAppState): void {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
}

function parseJson<T>(json: string): Either<Error, T> {
    try {
        return Right<Error, T>(JSON.parse(json));
    } catch (e) {
        return Left<Error, T>(e);
    }
}