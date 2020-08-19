import React, {Component} from 'react';
import {setFavorites, updateBooks} from "../../redux/actions";
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import AppList from '../../components/list/list';
import FavoriteApi from "../../api/favorite.api";
import BookModel from "../../model/book.model";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import './favorites.css';

const mapStateToProps = (state) => {
	const storeProps = {};
	for (const [key, value] of Object.entries(state)){
		storeProps[key] = value;
	}
	return {
		storeProps
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateBooks: (bookUpdate) => new Promise((resolve, reject) => {
		dispatch(updateBooks(bookUpdate));
		resolve();
	}),
	setFavorites: (favorites) => {
		dispatch(setFavorites(favorites))
	}
});

const useStyles = theme => ({
	grow: {
		flexGrow: 1,
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
});

class AppFavorites extends Component {
	state = {
		error: false,
		fetchingBooks: false,
		errorMessage: '',
		defaultCollection: 'books_favorite',
		resultsPerPage: 10,
		currentPage: 1
	};

	constructor(props) {
		super(props);
		this.favoriteApi = new FavoriteApi();
	}

	componentDidMount() {
		this.getFavorites();
	}

	updateFavoriteList(books) {
		if (this.props.storeProps.list && this.props.storeProps.list.length !== 0){ return; }
		const bookIds = books.map(x => x.id);
		this.props.setFavorites({favorites: bookIds});
	}

	getFavorites() {
		this.favoriteApi.getFavorites()
			.then((favorites) => {
				if (!favorites && !favorites.data){
					return;
				}
				const total = favorites.data.length;
				const rawData = favorites.data;
				const books = rawData.map((x) => {
					const book = new BookModel();
					book.createFromObject(x);
					return book;
				});
				const pageCount = Math.ceil(total / this.state.resultsPerPage);
				this.updateFavoriteList(books);
				this.props.updateBooks({
					collectionName: this.state.defaultCollection,
					books: books,
					pageCount: pageCount > 50 ? 40 : pageCount,
					currentPage: this.state.currentPage,
				}).then(() => {
					this.setState({error: false});
				});
			})
	}

	render() {
		const error = this.state.error;
		const fetchingBooks = this.state.fetchingBooks;
		const errorMessage = this.state.errorMessage;
		const bookCollection = this.state.defaultCollection;
		const currentCollect = this.props.storeProps[this.state.defaultCollection];
		const hasBooks = currentCollect && currentCollect.books && currentCollect.books.length > 0;
		const {classes} = this.props;
		return (<React.Fragment>
			<Row>
				<Col>
					<AppBar position="static">
						<Toolbar>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="open drawer"
							>
							</IconButton>
							<Typography className={classes.title} variant="h6" noWrap>
								Favorites
							</Typography>
							<div className={classes.grow}/>
						</Toolbar>
					</AppBar>
				</Col>
			</Row>
			<Row>
				{hasBooks ? <AppList showPagination = {false} collectionToUse = {bookCollection}/> : fetchingBooks ?
					<Col className="text-center fetching-books">Loading Favorites....</Col> :
					error ? <Col className="text-center">{errorMessage}</Col> : <Col className="text-center mt-5"><span className="no-favorites">No Favorites, Go Add A Favorite!</span></Col>}
			</Row>
		</React.Fragment>);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AppFavorites));
