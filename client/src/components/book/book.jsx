import React, {Component} from 'react';
import {Row, Col, ListGroup} from 'react-bootstrap'
import {connect} from "react-redux";
import {addFavorite, deleteFavorite, deleteFavoriteBook} from "../../redux/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { truncate } from "../../helpers/misc.helpers";
import './book.css';
import FavoriteApi from "../../api/favorite.api";

const mapStateToProps = (state) => {
	return {
		favorites: state.list,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addFavorite: (favoriteId) => new Promise( (resolve, reject) => {
			dispatch(addFavorite(favoriteId));
			resolve();
		}),
		deleteFavorite: (favoriteId) => new Promise((resolve, reject) => {
			dispatch(deleteFavorite(favoriteId))
			resolve();
		}),
		deleteFavoriteBook: (favoriteId) => {
			dispatch(deleteFavoriteBook(favoriteId))
		},
	};
};

class AppBook extends Component {
	constructor(props) {
		super(props);
		this.favoriteApi = new FavoriteApi();
	}

	addFavorite(e) {
		if (!e) {
			return;
		}
		this.props.addFavorite({favorite: e}).then(() => this.favoriteApi.saveFavorite(this.props.singleBook));
	}

	deleteFavorite(e) {
		if (!e) {
			return;
		}
		this.props.deleteFavorite({favorite: e}).then(() => this.favoriteApi.deleteFavorite(e));
		this.props.deleteFavoriteBook({id: e});
	}

	render() {
		const singleBook = this.props.singleBook;
		const emptyHeart = <FontAwesomeIcon size="2x" icon={["far", "heart"]}/>
		const fullHeart = <FontAwesomeIcon size="2x" icon={["fas", "heart"]}/>
		const binoculars = <FontAwesomeIcon size="2x" icon={["fas", "binoculars"]}/>
		const isFavorite = this.props.favorites && this.props.favorites.includes(singleBook.id);
		return (
			<ListGroup.Item>
				<Row>
					<Col xs={2}><a rel="noopener noreferrer" target={"_blank"} href={singleBook.link}><img
						src={singleBook.image} alt={singleBook.title}/></a></Col>
					<Col xs={10}>
						<Row>
							<Col>
								<span className="book-label-title mr-2"><a rel="noopener noreferrer"
																   target={"_blank"}
																   href={singleBook.link}>{singleBook.title}</a></span>
							</Col>
							<Col className="position-relative">
								<span className="position-absolute corner-binoculars" title="View Book">
									{singleBook.link
										? <a rel="noopener noreferrer" target={"_blank"}
											 href={singleBook.link}>{binoculars}</a>
										:''
									}
								</span>
								<span className="position-absolute corner-heart">
									{isFavorite
									//condition ? exprIfTrue : exprIfFalse
										? <span className="pointer" title="Remove from Favorites"
											   onClick={(e) => this.deleteFavorite(singleBook.id)}>{fullHeart}</span>
										: <span className="pointer" title="Add to Favorites"
											   onClick={(e) => this.addFavorite(singleBook.id)}>{emptyHeart}</span>}
								</span>
							</Col>
						</Row>
						<Row><Col><span
							className="font-weight-bold mr-1">By:</span> {singleBook.authors ? singleBook.authors.join(", "): ''}
						</Col></Row>
						<Row className="mt-3"><Col><span
							className="font-weight-bold mr-1">Description:</span>{truncate(singleBook.description, 1000, true)}
						</Col></Row>
						<Row className="mt-2"><Col><span
							className="font-weight-bold">Categories: </span>{singleBook.categories ? singleBook.categories.join(", ") : ''}
						</Col></Row>
						<Row className="mt-2"><Col><span
							className="font-weight-bold">Pages: </span>{singleBook.pageCount}</Col><Col><span
							className="font-weight-bold">Average Rating: </span>{singleBook.averageRating ? singleBook.averageRating : 'N/A'}
						</Col></Row>
					</Col>
				</Row>
			</ListGroup.Item>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBook);
