
module.exports = {
    path: 'rules',
    getComponent( nextState, cb ) {
        require.ensure( [], require => {
            cb( null, require('./Rules') );
        } );
    }
}