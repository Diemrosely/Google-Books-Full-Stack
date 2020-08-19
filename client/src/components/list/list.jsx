import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup'
import { updatePage} from "../../redux/actions";
import AppBook from "../book/book";
import './list.css';
import Pagination from '@material-ui/lab/Pagination';
import paginationService from "../../services/pagination.service";

const mapStateToProps = (state) => {
	const storeProps = {};
	for (const [key, value] of Object.entries(state)){
		storeProps[key] = value;
	}
	return {
		storeProps
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updatePage: (pageUpdate) => new Promise( (resolve, reject) => {
			dispatch(updatePage(pageUpdate));
			resolve();
		}),
	};
};

class AppList extends Component {
	state = {
		showPagination: true,
	};

	handlePageClick = (e, page) => {
		this.props.updatePage({collectionName: this.props.collectionToUse, currentPage: page})
			.then(() => {
				paginationService.changePage(page);
			});
	}

	render() {
		const collection = this.props.storeProps[this.props.collectionToUse];
		const booksToMap = collection.books;
		const pageCount = collection.pageCount;
		const showPagination = this.props.showPagination === true || this.props.showPagination === false
			? this.props.showPagination : this.state.showPagination;
		const currentPage = collection.currentPage || 1;
		return (
			<Col>
				<Row>
					<Col>
						<ListGroup>
							{booksToMap.map((singleBook, index) => (
								<AppBook key={index} singleBook={singleBook}/>
							))}
						</ListGroup>
					</Col>
				</Row>
				<Row className="mt-2">
					<Col className="text-center">
						{showPagination
							? <Pagination className="pagination-class" count={pageCount}
									    page={currentPage}
									    onChange={this.handlePageClick} showFirstButton
									    showLastButton siblingCount={2} boundaryCount={2} size="large" variant="outlined" shape="rounded" />
							: ''}
					</Col>
				</Row>
			</Col>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
