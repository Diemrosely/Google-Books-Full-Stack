import axios from 'axios';
import {encodeGetParams} from '../helpers/misc.helpers';

//create api call
class BooksApi {
     URL = 'https://www.googleapis.com/books/v1/volumes';
     APIKEY = 'AIzaSyBJYy5-SBnX5meFC9Sf6Wcy7ucrTHusu-4';

     async searchBooks(title, index) {
     	if (!title) {
     		return Promise.resolve(null);
     	}
     	const apiParams = {key: this.APIKEY, q: title, startIndex: index};
     	const apiCall = `${this.URL}?${encodeGetParams(apiParams)}`;
     	return axios.get(apiCall);
     }
}

export default BooksApi;
