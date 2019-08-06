import * as React from 'react';
import { Link } from 'react-router-dom';
import add from './add.png';
import view from './view.png';
import styles from './styles.module.css';

class Appointment extends React.Component<any, any> {
	render() {
		return (
			<div className="container">
				<h2 className="text-center title-box-form">Appointment</h2>
				<div className="box-form">
					<Link to="/appointment/book">
						<img src={add} style={{ maxHeight: '100px' }} className="image-reponsive" />
						<label>Book Appointment</label>
					</Link>
					<a href="categories/manage">
						<img src={view} style={{ maxHeight: '100px' }} className="image-reponsive" />
						<label>View/Cancel Appointments</label>
					</a>
				</div>
			</div>
		);
	}
}

export default Appointment;
