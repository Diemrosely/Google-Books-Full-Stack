import axios from 'axios';

class FavoriteApi {
     URL = '/books';

     async getIds() {
     	const getIdUrl = `${this.URL}/id`;
     	return axios.get(getIdUrl);
     }
     async saveFavorite(favorite) {
     	return axios.post(this.URL, {
     		favorite: favorite
     	});
     }

     async deleteFavorite(favoriteId) {
     	const deleteURL = `${this.URL}/${favoriteId}`;
    	     return axios.delete(deleteURL);
     }

     async getFavorites() {
    	     return axios.get(this.URL);
     }
}

export default FavoriteApi;
