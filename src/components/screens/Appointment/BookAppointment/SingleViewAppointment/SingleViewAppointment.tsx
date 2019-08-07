import * as React from 'react';
import { connect } from 'react-redux';
import { fetchTutorsOneDay } from 'redux/stores/tutor/action';
import { DateSelect, TutorBox } from 'components/common';

class SingleViewAppointment extends React.Component<any, any> {
	componentDidMount() {
		this._fetch();
	}

	componentDidUpdate(prevProps: any) {
		if (this.props.dayOne.getTime() !== prevProps.dayOne.getTime()) {
			this._fetch();
		}
	}

	_fetch = () => {
		const { fetchTutorsOneDay, selectedSubject, dayOne } = this.props;
		fetchTutorsOneDay(selectedSubject.value, dayOne.getDay());
	};

	render() {
		const { selectedSubject, dayOne, tutors } = this.props;
		console.log(tutors);
		return (
			<div className="container">
				<div className="box-form" style={{ width: '80%' }}>
					<h3>{`Subject selected: ${selectedSubject.label}`}</h3>
					<div style={{ width: '30%', marginBottom: 8 }}>
						<p>Select a date</p>
						<DateSelect />
					</div>

					{tutors.length ? (
						tutors.map((tutor: any) => (
							<TutorBox
								key={tutor.uid}
								type="single"
								hours={tutor.work_schedule}
								tutor={{ uid: tutor.uid, name: tutor.name, work_schedule: tutor.work_schedule }}
							/>
						))
					) : (
						<div className="alert alert-danger">No tutor is available during the selected date period.</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	selectedSubject: state.subject.data.subject,
	dayOne: state.date.data.dayOne,
	tutors: state.tutor.data.tutors
});

export default connect(mapStateToProps, { fetchTutorsOneDay })(SingleViewAppointment);
