export default {
    childRoutes: [
        {
            path: '/',
            // indexRoute: { onEnter: (nextState, replace) => replace('/test1') },
            component: require('../components/App'),
            getChildRoutes( partialNextState, callback ) {
                require.ensure( [], function(require) {
                    callback(null, [
                        require('../components/Test1'),
                        require('../components/Test2'),
                    ]);
                } );
            }
        },
        {
            path: 'hello',
            component: require('../components/Hello')
        }
    ]
}