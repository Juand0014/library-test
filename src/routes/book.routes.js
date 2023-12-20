const bookService = require("../services/book-service");

module.exports = {
	book: async function (req, res) {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		const { id } = req.params;
		const book = await bookService.getFirst(id);
		res.end(JSON.stringify(book, null, 2));
	},
	books: async function (_req, res) {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		const books = await bookService.listAll();
		res.end(JSON.stringify(books, null, 2));
	},
	bookPage: async function (req, res) {
		let { id, pageNumber, format } = req.params;
		format = format || 'html';
		const data = await bookService.getPage(id, pageNumber, format);
		if(!data.ok) {
			res.writeHead(400);
			res.end(data.msg);
			return;
		}
		res.writeHead(200, { "Content-Type": `text/${format}; charset=utf-8` });
		res.end(data.content);
	},
};
