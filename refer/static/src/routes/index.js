
export default {
    childRoutes: [
        {
            path: 'login',
            component: require('../components/Login/Login')
        },
        {
            path: '/',
            indexRoute: { onEnter: (nextState, replace) => replace('/polling') },
            component: require('../components/App'),
            getChildRoutes( partialNextState, callback ) {
                require.ensure( [], function(require) {
                    callback(null, [
                        require('../components/Polling'),
                        require('../components/Rules'),
                        require('../components/Password'),
                    ]);
                } );
            }
        }
    ]
};