import {ADD_FAVORITE, DELETE_FAVORITE, DELETE_FAVORITE_BOOK, SET_FAVORITES, UPDATE_BOOKS, UPDATE_PAGE} from '../constants/action-types';
import BookCollection from "../../model/bookcollection.model";

const initialState = {
	books_home: BookCollection,
	books_favorite: BookCollection,
	list: [],
};

const rootReducer = (state = initialState, action) => {
	if (action.type === UPDATE_BOOKS) {
		const collectionToUpdate = action.payload.collectionName;
		const collectionState = new BookCollection();
		Object.assign(collectionState,{
			books: action.payload.books,
			resultsPerPage: action.payload.resultsPerPage,
			pageCount: action.payload.pageCount,
			currentPage: action.payload.currentPage,
			bookSearch: action.payload.bookSearch
		})
		return {...state, [collectionToUpdate]: collectionState};
	}

	if (action.type === UPDATE_PAGE) {
		const collectionToUpdate = action.payload.collectionName;
		let collectionState = state[collectionToUpdate];
		Object.assign(collectionState, {
			currentPage: action.payload.currentPage,
		});
		return {...state, collectionState};
	}

	if (action.type === ADD_FAVORITE) {
		return {...state, list: [...state.list, action.payload.favorite]};
	}
	
	if (action.type === DELETE_FAVORITE_BOOK){
		//used a specific name here, because it's one call, would use a generic for multiple lists
		return {
			...state,
			books_favorite: {
				...state.books_favorite,
				books: state.books_favorite.books.filter(x => x.id !== action.payload.id)
			}
		};
	}

	if (action.type === DELETE_FAVORITE) {
		return {...state, list: state.list.filter(x => x !== action.payload.favorite)};
	}

	if (action.type === SET_FAVORITES) {
		return {...state, list: [...state.list,...action.payload.favorites]};
	}
	return state;
};

export default rootReducer;
