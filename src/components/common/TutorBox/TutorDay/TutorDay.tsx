import * as React from 'react';
import { timeStringToFloat } from 'utils/functions';
import Hour from '../../Hour/Hour';

// TODO: FIX - including "order" in from/to
const processWorkHours = (hours: any[]) => {
	const totalHrs: number[] = [];
	hours.forEach((hr) => {
		let start = timeStringToFloat(hr.from.time);
		const diff = timeStringToFloat(hr.to.time) - start;

		for (let i = 0; i < diff / 0.5; i++) {
			totalHrs.push(start);
			start += 0.5;
		}
	});
	return totalHrs;
};

const TutorDay = (props: any) => {
	const { hours, data } = props;
	return (
		<div className="alert alert-info" style={wrapperStyle}>
			{processWorkHours(hours).map((hr, i) => <Hour key={i} hour={hr} data={data} />)}
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
