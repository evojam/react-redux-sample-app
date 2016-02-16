import { IAppState } from '../app-state';
import { IMiddleware } from 'redux';

export const logger: IMiddleware<IAppState> =
    store => next => action => {
        console.groupCollapsed('Redux middleware logger:');
        console.debug('Prev state: %O', store.getState());
        console.debug('Action: %O', action);
        const result = next(action);
        console.debug('Next state: %O', store.getState());
        console.groupEnd();
        return result;
    };
