import * as React from 'react';
import { connect } from 'react-redux';
import TutorDay from './TutorDay/TutorDay';

const TutorBox = (props: any) => {
	const { hideName, hideDate, data } = props;
	return (
		<div>
			{!hideName ? <h4>{data.tutor.name}</h4> : null}
			{!hideDate ? <h5>{data.date.toDateString()}</h5> : null}
			{data.tutor.work_schedule.map((day: any, i: number) => {
				if (i === data.date.getDay()) {
					return <TutorDay key={i} hours={day} data={{ date: data.date, tutor: data.tutor }} />;
				}
				return null;
			})}
		</div>
	);
};

TutorBox.defaultProps = {
	hideName: false,
	hideDate: false
};

const mapStateToProps = (state: any) => ({
	dates: state.date.data.dates
});

export default connect(mapStateToProps, null)(TutorBox);
