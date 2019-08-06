import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import logo from './mission-logo.png';

class Home extends React.Component<any, any> {
	render() {
		if (this.props.profile) return <Redirect to="/appointment" />;
		return (
			<div className={styles.container}>
				<div className="jumbotron" style={{ width: '70%' }}>
					<div className="banner">
						<img
							src={logo}
							className="thumbnail img-responsive"
							style={{ margin: '0 auto' }}
						/>
						<p className="text-center login-btn-landing">
							<Link to="/login" className="btn btn-primary">
								<span className="ui-button-text">Login</span>
							</Link>
						</p>
						<p className="text-center">
							To get started, press Log In. If you do not have a current ID and password, please contact
							your center to get added as a Student
						</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({ profile: state.auth.data.profile });

export default connect(mapStateToProps, null)(Home);
