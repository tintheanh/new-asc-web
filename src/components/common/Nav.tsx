import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from 'redux/stores/auth/action';

import { subjectStoreClear } from 'redux/stores/subject/action';
import { tutorStoreClear } from 'redux/stores/tutor/action';
import { dateStoreClear } from 'redux/stores/date/action';

class Nav extends React.Component<any, any> {
	performLogout = () => {
		this.props.logout();
		this._clearStores();
	};

	navigateHome = () => {
		this.props.history.push('/');
		this._clearStores();
	};

	_clearStores = () => {
		const { subjectStoreClear, tutorStoreClear, dateStoreClear } = this.props;
		subjectStoreClear();
		tutorStoreClear();
		dateStoreClear();
	};

	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" role="button" onClick={this.navigateHome}>
							Mission College / Academic Tutoring Center
						</a>
					</div>

					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav" />
						<ul className="nav navbar-nav navbar-right">
							<li className="dropdown">
								{!this.props.profile ? (
									<Link to="/login" role="button">
										Login
									</Link>
								) : (
									<a className="dropdown-toggle" role="button" onClick={this.performLogout}>
										Logout
									</a>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

const FinNav = withRouter(Nav);

const mapStateToProps = (state: any) => ({ profile: state.auth.data.profile });

export default connect(mapStateToProps, {
	logout,
	subjectStoreClear,
	tutorStoreClear,
	dateStoreClear
})(FinNav);
