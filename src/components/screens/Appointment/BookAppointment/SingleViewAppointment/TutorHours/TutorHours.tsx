import * as React from 'react';
import { timeStringToFloat } from 'utils/functions';
import Hour from './Hour/Hour';

const processWorkHours = (hours: any[]) => {
	const totalHrs: number[] = [];
	hours.forEach((hr) => {
		let start = timeStringToFloat(hr.from);
		const diff = timeStringToFloat(hr.to) - start;

		for (let i = 0; i < diff / 0.5; i++) {
			totalHrs.push(start);
			start += 0.5;
		}
	});
	return totalHrs;
};

const TutorHours = (props: any) => {
	if (props.hours !== 'none') {
		return (
			<div className="alert alert-info" style={wrapperStyle}>
				{processWorkHours(props.hours).map((hr, i) => <Hour key={i} hour={hr} tutor={props.tutor} />)}
			</div>
		);
	}
	return null;
};

const wrapperStyle = {
	display: 'grid',
	gridTemplateColumns: 'auto auto auto auto auto auto',
	paddingBottom: 8
};

export default TutorHours;
