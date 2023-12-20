const fs = require('fs/promises');
const pdfjs = require("pdfjs-dist/legacy/build/pdf");
const Book = require('../models/Book');
const { renderPageText } = require('../util/pdf');
const { isAnyNaN, getErrorObject } = require('../util/helpers');

module.exports = {
	getFirst: async sequence => {
		if(isAnyNaN(+sequence)) {
			return getErrorObject('Invalid parameter. Book ID');
		}
		return await Book.findOne({ sequence });
	},
	listAll: async () => {
		return await Book.find({});
	},
	getPage: async (sequence, pageNumber, format) => {
		if(isAnyNaN(+sequence, +pageNumber)) {
			return getErrorObject('One or more parameters were invalid (Book sequence or page number)');
		}
		const book = await Book.findOne({ sequence });
		if(book === null) {
			return getErrorObject(`Book with sequence ${sequence} couldn\'t be found`);
		}
		const path = `./src/books/${book.getUri()}`;
		const buffer = await fs.readFile(path);
		const doc = await pdfjs.getDocument(buffer).promise;
		if(pageNumber < 1 || pageNumber > doc.numPages) {
			return getErrorObject(`Incorrect page number (${pageNumber}). The page must be between 1 and ${doc.numPages}`);
		}
		const content = await renderPageText(doc, pageNumber, format);
		return {
			ok: true,
			content
		};
	}
}