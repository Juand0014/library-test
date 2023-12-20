const fs = require('fs/promises');
const Book = require('../models/Book');
const mongoose = require('mongoose');

const shouldSeedDatabase = async (filePaths) => {
	const books = await Book.find({}).select({ "name": 1, "_id": 0 });
	const booksNames = books.reduce((acc, u, idx) => idx > 0 ? `${acc},${u.name}` : u.name, '');
	return booksNames !== filePaths.join(',');
}

module.exports.seedFromLocalBooks = async () => {
	const basePath = './src/books';
	const filesPaths = await fs.readdir(basePath);
	const shouldSeed = await shouldSeedDatabase(filesPaths);
	if(!shouldSeed) return;
	console.log('Seeding from local books...');
	const books = filesPaths.map((fileName, idx) => ({
		name: fileName,
		uri: `local://books/${fileName}`,
		sequence: idx + 1
	}));
	let collection = mongoose.connection.collections['books'];
	if(!collection) {
		collection = await mongoose.connection.createCollection('books');
	}
	await collection.deleteMany({ name: { $in: filesPaths } });
	await collection.insertMany(books);
	console.log('Database was seeded.');
}