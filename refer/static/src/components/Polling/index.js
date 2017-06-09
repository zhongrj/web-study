
module.exports = {
    path: 'polling',
    getComponent( nextState, cb ) {
        require.ensure( [], require => {
            cb( null, require('./Polling') );
        } );
    }
}