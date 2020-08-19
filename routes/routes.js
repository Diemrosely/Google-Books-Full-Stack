const routes = require('express').Router();
const path = require('path');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

//get / directory
routes.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/public/index.html'));
	//res.sendFile(path.join(__dirname = 'client/build/index.html'))
});

//get book ids for favorites
routes.get('/books/id', (req, res) => {
	Book.find({})
		.then(dbTransaction => {
			if (!dbTransaction && dbTransaction.length === 0){
				res.json([]);
				return;
			}
			const bookIds = dbTransaction.map(x => x.id);
			res.json(bookIds);
		}).catch(err => {
			res.status(500).send(err);
		})
});

//get all favorite books
routes.get('/books', (req, res) => {
	Book.find({})
		.then(dbTransaction => {
			res.json(dbTransaction);
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

//post favorite book
routes.post('/books', (req, res) => {
	const favorite = req.body.favorite;
	if (!favorite){
		res.status(500).send("Invalid Favorite");
		return;
	}

	const newBook = new Book({
		id: favorite.id,
		title: favorite.title,
		authors: favorite.authors,
		description: favorite.description,
		image: favorite.image,
		pageCount: favorite.pageCount,
		averageRating: favorite.averageRating,
		categories: favorite.categories,
	});
	newBook.save()
		.then(dbTransaction => {
			res.json(dbTransaction);
		}).catch(err => {
			res.status(500).send(err);
		});
});

//delete favorite book by id
routes.delete('/books/:id', (req, res) => {
	const bookId = req.params.id;
	if (!bookId){
		res.status(500).send("Invalid Book Id");
		return;
	}
	Book.deleteOne({ id: bookId})
		.then(dbTransaction => {
			res.json(dbTransaction);
		}).catch(err => {
			res.status(500).send(err);
		});
});

//sets up server to fail gracefully
routes.get('*', (req, res) => {
	res.sendFile(path.join(__dirname = 'client/build/index.html'));
});

module.exports = routes;
