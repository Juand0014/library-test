const http = require('http');
const { match } = require('path-to-regexp');
require('dotenv').config();
require('./database').connect();
const { book, books, bookPage } = require('./routes/book.routes');

const routes = {
	['/book/:id']: book,
	['/book/:id/page/:pageNumber/:format?']: bookPage,
	['/books']: books
};

const requestListener = function (req, res) {
  res.writeHead(200);
	
	for(let path of Object.keys(routes)) {
		const url = match(path, { decode: decodeURIComponent })(req.url);
		if(url && req.method === 'GET') {
			req.params = url.params;
			routes[path](req, res);
			return;
		}
	}

	res.writeHead(404);
	res.end('Not found');
}

const port = process.env.PORT || 3000;
const server = http.createServer(requestListener);
server.listen(port, () => console.log(`Library API is up and listening on port ${port}`));