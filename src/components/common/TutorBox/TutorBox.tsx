import * as React from 'react';
import { connect } from 'react-redux';
import TutorDays from './TutorDays/TutorDays';
import { traverseWeekdays } from 'utils/functions';

const dayArr = (d1: Date, d2: Date) => {
	const type =
		d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

	return traverseWeekdays(d1.getDay(), d2.getDay(), type);
};

const TutorBox = (props: any) => {
	if (props.type === 'single') {
		if (props.hours[props.dayOne.getDay()] !== 'none') {
			return (
				<div>
					<h4>{props.tutor.name}</h4>
					<TutorDays hours={props.hours[props.dayOne.getDay()]} tutor={props.tutor} />
				</div>
			);
		}
		return null;
	}
	return (
		<div>
			<h4>{props.tutor.name}</h4>
			{props.hours.map((hr: any, i: number) => {
				if (dayArr(props.dayOne, props.dayTwo).includes(i))
					return <TutorDays key={i} hours={hr} tutor={props.tutor} />;
				return null;
			})}
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	dayOne: state.date.data.dayOne,
	dayTwo: state.date.data.dayTwo
});

export default connect(mapStateToProps, null)(TutorBox);
