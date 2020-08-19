import React from "react";
import { Image, Navbar, Nav, Row, Col} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import headerImage from "../../assets/images/header.jpg"
import './header.css';

const AppHeader = () => {
	return (
		<React.Fragment>
			<Row className="mb-2 mt-1">
				<Col>
					<Image className="header-image" src={headerImage} fluid />
				</Col>
			</Row>
			<Row className="mb-2">
				<Col>
					<Navbar bg="secondary" variant="dark" className="justify-content-end">
						<Nav className="ml-auto">
							<LinkContainer to="/" exact={true}>
								<Nav.Link>Search</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/favorites">
								<Nav.Link>Favorites</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar>
				</Col>
			</Row>
		</React.Fragment>
	);
}
export default AppHeader
