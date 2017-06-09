
import request from 'superagent';
import URL from './url';

export default (options) => {
	
	const settings = {
		type: "GET",
		data: {},
		headers: [],
		success: (res) => { console.log( 'request success...', res ); },
		failure: (res) => { console.error( 'request failure...', res ); }
	};
	const opts = Object.assign({}, settings, options);
	const requestType = opts.type.toUpperCase();

	let url;

	if ( !opts.url || !URL[ opts.url.toUpperCase() ] ) {
		console.error( 'please set the right url...' );
		return false;
	} else {
		url = URL[ opts.url.toUpperCase() ];
	}

	function ajaxSuccess (res) {
        let content = res.body;
        if(content.status === 'logout') {
            location.href = '#/login';
            return false;
        }
		opts.success(content);
	}

	if ( requestType === 'GET' ) {
		request
			.get( url )
			.query( opts.data )
			.then( ajaxSuccess, opts.failure );
	} else if ( requestType === 'POST' ) {
		let r = request.post(url).type('form');
		opts.headers.map( header => r.set(header.key, header.val) );
		r.send(opts.data).then(ajaxSuccess, opts.failure);
	}

}