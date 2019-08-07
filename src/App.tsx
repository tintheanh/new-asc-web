import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Home, Login, Appointment, BookAppointment, SingleViewAppointment, MultiViewAppointment, NotFound } from './components/screens';
import { Nav, PrivateRoute } from './components/common';
import configureStore from './redux/configureStore';

class App extends React.Component {
	private configureStore: any;

	constructor(props: any) {
		super(props);

		this.configureStore = configureStore();
	}

	render() {
		return (
			<Provider store={this.configureStore.store}>
				<PersistGate loading={null} persistor={this.configureStore.persistor}>
					<BrowserRouter>
						<Nav />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/login" component={Login} />
							<PrivateRoute exact path="/appointment" component={Appointment} />
							<PrivateRoute exact path="/appointment/book" component={BookAppointment} />
							<PrivateRoute exact path="/appointment/book/single-view" component={SingleViewAppointment} />
							<PrivateRoute exact path="/appointment/book/multi-view" component={MultiViewAppointment} />
							<Route component={NotFound} />
						</Switch>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
