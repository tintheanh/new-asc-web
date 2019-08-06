import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'redux/stores/auth/action';

class Nav extends React.Component<any, any> {
	performLogout = () => {
		this.props.logout();
	};

	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">
							Mission College / Academic Tutoring Center
						</Link>
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

const mapStateToProps = (state: any) => ({ profile: state.auth.data.profile });

export default connect(mapStateToProps, { logout })(Nav);
