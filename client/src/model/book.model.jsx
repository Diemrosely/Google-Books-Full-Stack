class BookModel {
     title = '';
     authors = [];
     description = ''
     image = '';
     link = '';
     pageCount = 0;
     averageRating = 0;
     categories = [];

     constructor(singleBook) {
     	const volumeInfo = singleBook && singleBook.volumeInfo;
     	if (!volumeInfo) {
     		return;
     	}
     	this.id = singleBook.id;
     	this.title = volumeInfo.title;
     	this.authors = volumeInfo.authors;
     	this.description = volumeInfo.description;
     	this.image = volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail;
     	this.link = volumeInfo.infoLink;
     	this.pageCount = volumeInfo.pageCount;
     	this.averageRating = volumeInfo.averageRating;
     	this.categories = volumeInfo.categories;
     }

     createFromObject(bookObject){
     	if (!bookObject){
     		return;
     	}

     	this.id = bookObject.id;
     	this.title = bookObject.title;
     	this.authors = bookObject.authors;
     	this.description = bookObject.description;
     	this.image = bookObject.image;
     	this.link = bookObject.link;
     	this.pageCount = bookObject.pageCount;
     	this.averageRating = bookObject.averageRating;
     	this.categories = bookObject.categories;
     }
}

export default BookModel;
