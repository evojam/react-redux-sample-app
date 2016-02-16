import { applyMiddleware, compose, createStore, IStoreEnhancer, Store } from 'redux';

import { IAppState } from './app-state';
import { TodoActions } from './todo-actions';
import { rootReducer } from './root-reducer';
import { getInitialState } from './storage-binder'

import { logger } from './middleware/logger';
import { Maybe, Identity } from 'monet';

// Add support for Redux Dev Tools:
// See: https://github.com/zalmoxisus/redux-devtools-extension
export const store: Store<IAppState> = new Identity(applyMiddleware(logger))
    .map(middleware => Maybe.fromNull(window.devToolsExtension)
        .map(devToolsExtension =>
            compose<IStoreEnhancer<IAppState>>(middleware, devToolsExtension<IAppState>()))
        .orJust(middleware))
    .get()(createStore)(rootReducer, getInitialState());

//.orJust(applyMiddleware(logger))(createStore)();

//
//    ?
//compose<IStoreEnhancer<IAppState>>(applyMiddleware(logger), window.devToolsExtension()) :
//applyMiddleware(logger);

//export const store = createStore(rootReducer, getInitialState(), middleware);