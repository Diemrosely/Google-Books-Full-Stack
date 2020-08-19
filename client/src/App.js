import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHome from "./pages/home/home";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import {Container} from "react-bootstrap";
import AppHeader from "./components/header/header";
import NotFound from "./pages/notfound/notfound";
import AppFavorites from "./pages/favorite/favorites";
library.add(far, fas);

function App() {
	return (
		<Container>
			<AppHeader/>
			<Switch>
				<Route path="/" component={AppHome} exact />
				<Route path="/search" component={AppHome} exact />
				<Route path="/favorites" component={AppFavorites} exact />
				<Route component={NotFound} />
			</Switch>
		</Container>
	)
}

export default App;
