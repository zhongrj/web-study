
module.exports = {
    path: 'password',
    getComponent( nextState, cb ) {
        require.ensure( [], require => {
            cb( null, require('./Password') );
        } );
    }
}