import store from './store';
import {updateBooks, addFavorite, deleteFavorite, updatePage} from './actions';

window.store = store;
window.updateBooks = updateBooks;
window.addFavorite = addFavorite;
window.deleteFavorite = deleteFavorite;
window.updatePage = updatePage;
