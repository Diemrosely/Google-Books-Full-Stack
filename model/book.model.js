const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create mongoose schema
const bookSchema = new Schema({
	id: String,
	title: String,
	authors: Array,
	description: String,
	image: String,
	link: String,
	pageCount: String,
	averageRating: String,
	categories: Array
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
