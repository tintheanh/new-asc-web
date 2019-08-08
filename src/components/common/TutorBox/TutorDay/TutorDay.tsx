import * as React from 'react';
import { timeStringToFloat } from 'utils/functions';
import Hour from '../../Hour/Hour';

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

const TutorDay = (props: any) => {
	return (
		<div className="alert alert-info" style={wrapperStyle}>
			{processWorkHours(props.hours).map((hr, i) => <Hour key={i} hour={hr} data={props.data} />)}
		</div>
	);
};

const wrapperStyle = {
	display: 'grid',
	gridTemplateColumns: 'auto auto auto auto auto auto',
	paddingBottom: 8,
	marginTop: 18
};

export default TutorDay;
