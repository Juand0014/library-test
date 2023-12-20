const mongoose = require('mongoose');
const { seedFromLocalBooks } = require('./seeders/seeder');

module.exports.connect = () => {
	mongoose.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	});

	mongoose.connection.on('connected', async () => {
		console.log('\x1b[32m%s\x1b[0m', 'Connected to database');
		mongoose.connection.db.listCollections().toArray(async function(err) {
			if (err) throw err;
			await seedFromLocalBooks();
		});
	});
};