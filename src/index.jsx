import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

import '@assets/stylesheet/app.scss';

render(
	<App />,
    document.getElementById('app')
);