const mongoose = require('mongoose');

//prepare database
//create collection for favorite books
mongoose.connect('mongodb://localhost:27017/googlebooks', {useNewUrlParser: true}, (err) => {
	if (!err) {
		console.log('Successfully Established Connection with MongoDB')
	}
	else {
		console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
	}
});

require('../model/book.model');
