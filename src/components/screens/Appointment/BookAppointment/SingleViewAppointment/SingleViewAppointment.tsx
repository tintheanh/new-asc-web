import * as React from 'react';
import { connect } from 'react-redux';
import { fetchTutors } from 'redux/stores/tutor/action';
import { DateSelect, TutorBox } from 'components/common';

class SingleViewAppointment extends React.Component<any, any> {
	componentDidMount() {
		this._fetch();
	}

	componentDidUpdate(prevProps: any, _: any) {
		if (this.props.dates[0].getTime() !== prevProps.dates[0].getTime()) {
			this._fetch();
		}
	}

	_fetch = () => {
		const { fetchTutors, selectedSubject, dates } = this.props;
		if (selectedSubject) fetchTutors(selectedSubject.value, dates);
	};

	render() {
		const { selectedSubject, datesWithTutors } = this.props;
		return (
			<div className="container">
				<div className="box-form" style={{ width: '80%' }}>
					{selectedSubject ? <h3>{`Subject selected: ${selectedSubject.label}`}</h3> : null}
					<div style={{ width: '30%', marginBottom: 8 }}>
						<p>Select a date</p>
						<DateSelect noTo />
					</div>

					{datesWithTutors.length ? datesWithTutors[0].tutors.length ? (
						datesWithTutors[0].tutors.map((tutor: any, i: number) => (
							<TutorBox key={i} hideDate data={{ date: datesWithTutors[0].date, tutor: tutor }} />
						))
					) : (
						<div className="alert alert-danger">No tutor is available during the selected date period.</div>
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
	datesWithTutors: state.tutor.data.datesWithTutors,
	dates: state.date.data.dates
});

export default connect(mapStateToProps, { fetchTutors })(SingleViewAppointment);
