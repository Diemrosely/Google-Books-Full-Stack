import * as actionTypes from '../constants/action-types';

export const updateBooks = (payload) => ({type: actionTypes.UPDATE_BOOKS, payload});
export const updatePage = (payload) => ({type: actionTypes.UPDATE_PAGE, payload});
export const addFavorite = (payload) => ({type: actionTypes.ADD_FAVORITE, payload});
export const deleteFavorite = (payload) => ({type: actionTypes.DELETE_FAVORITE, payload});
export const setFavorites = (payload) => ({type: actionTypes.SET_FAVORITES, payload});
export const deleteFavoriteBook = (payload) => ({type: actionTypes.DELETE_FAVORITE_BOOK, payload});
