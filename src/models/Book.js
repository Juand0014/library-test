const { Schema, model } = require('mongoose');
const { URL } = require('url');

const bookSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	uri: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	sequence: {
		type: Number,
		required: true,
		unique: true
	},
});

bookSchema.methods.getUri = function() {
	const url = new URL(this.uri);
	const protocols = {
		'local:': () => url.pathname 
	};
	return protocols[url.protocol]();
};

module.exports = model('books', bookSchema);