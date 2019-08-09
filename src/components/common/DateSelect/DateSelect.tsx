import * as React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { selectDateOne, selectDateTwo } from 'redux/stores/date/action';
import styles from './styles.module.css';

class DateSelect extends React.Component<any, any> {
	static defaultProps = {
		type: 'day1',
		hasMax: false,
		noTo: false
	};

	setDateOne = (date: Date) => {
		const { selectDateOne, dates, noTo } = this.props;
		selectDateOne(dates, date, noTo);
	};

	setDateTwo = (date: Date) => {
		const { selectDateTwo, dates } = this.props;
		selectDateTwo(dates, date);
	};

	render() {
		const { type, dates, hasMax } = this.props;
		return (
			<DatePicker
				selected={type === 'day1' ? dates[0] : dates[dates.length - 1]}
				onChange={type === 'day1' ? this.setDateOne : this.setDateTwo}
				className={styles.datePicker}
				todayButton={'Select Today'}
				minDate={type === 'day1' ? new Date() : dates[0]}
				maxDate={type === 'day1' ? hasMax ? dates[dates.length - 1] : null : null}
				dateFormat="eee, MMM d yyyy"
			/>
		);
	}
}

const mapStateToProps = (state: any) => ({
	dates: state.date.data.dates,
	selectedSubject: state.subject.data.selectedSubject
});

export default connect(mapStateToProps, { selectDateOne, selectDateTwo })(DateSelect);
