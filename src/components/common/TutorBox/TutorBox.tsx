import * as React from 'react';
import { connect } from 'react-redux';
import TutorDay from './TutorDay/TutorDay';
import { traverseWeekdays } from 'utils/functions';

const dayArr = (d1: Date, d2: Date) => {
	const type =
		d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

	return traverseWeekdays(d1.getDay(), d2.getDay(), type);
};

const daysOfWeek = (dates: Date[]) => dates.map((date) => date.getDay());

const TutorBox = (props: any) => {
	if (props.type === 'single') {
		return (
			<div>
				<h4>{props.data.tutor.name}</h4>
				{props.data.tutor.work_schedule.map((day: any, i: number) => {
					if (i === props.data.date.getDay()) {
						return <TutorDay key={i} hours={day} data={{ date: props.data.date, tutor: props.data.tutor }} />;
					}
					return null;
				})}
			</div>
		);
	}
	return (
		// <div>
		// 	<h4>{props.tutor.name}</h4>
		// 	{props.hours.map((hr: any, i: number) => {
		// 		if (dayArr(props.dayOne, props.dayTwo).includes(i))
		// 			return <TutorDay key={i} hours={hr} tutor={props.tutor} />;
		// 		return null;
		// 	})}
		// </div>
		null
	);
};

const mapStateToProps = (state: any) => ({
	dayOne: state.date.data.dayOne,
	dayTwo: state.date.data.dayTwo,
	dates: state.date.data.dates
});

export default connect(mapStateToProps, null)(TutorBox);
