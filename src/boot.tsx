import * as React from 'react';
import { render } from 'react-dom';

import { App } from './app';
import { store } from '../todo-lib/redux/core';


render((
    <App store={store}/>
), document.getElementById('app'));
