System.config({
    map: {
        'monet': 'node_modules/monet/src/main/javascript/monet.js',
        'react': 'node_modules/react/dist/react.js',
        'react-dom': 'node_modules/react-dom/dist/react-dom.js',
        'redux': 'node_modules/redux/dist/redux.js'
    },
    packages: {
        'dist/app': {format: 'register', defaultExtension: 'js'},
        'dist/todo-lib': {format: 'register', defaultExtension: 'js'}
    }
});