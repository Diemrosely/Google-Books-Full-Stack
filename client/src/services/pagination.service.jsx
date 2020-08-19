import {Subject} from 'rxjs'

const updateSearch = new Subject();

const paginationService = {
	changePage: pageNumber => updateSearch.next(pageNumber),
	getPage: () => updateSearch.asObservable()
}

export default paginationService;
