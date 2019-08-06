import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = (props: any) => {
	const { component: Component, profile, ...rest } = props;
	return (
		<Route
			{...rest}
			render={(props: any) =>
				profile ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
};

const mapStateToProps = (state: any) => ({ profile: state.auth.data.profile });

export default connect(mapStateToProps, null)(PrivateRoute);
