import * as React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { selectDateOne, selectDateTwo } from 'redux/stores/date/action';
import styles from './styles.module.css';

class DateSelect extends React.Component<any, any> {
	static defaultProps = {
		type: 'day1'
	};
	setDateOne = (date: Date) => this.props.selectDateOne(date);
	setDateTwo = (date: Date) => this.props.selectDateTwo(date);

	render() {
		return (
			<DatePicker
				selected={this.props.type === 'day1' ? this.props.dayOne : this.props.dayTwo}
				onChange={this.props.type === 'day1' ? this.setDateOne : this.setDateTwo}
				className={styles.datePicker}
				todayButton={'Select Today'}
				minDate={this.props.type === 'day1' ? new Date() : this.props.dayOne}
				maxDate={this.props.type === 'day1' ? (this.props.dayTwo ? this.props.dayTwo : null) : null}
				dateFormat="eee, MMM d yyyy"
			/>
		);
	}
}

const mapStateToProps = (state: any) => ({
	dayOne: state.date.data.dayOne,
	dayTwo: state.date.data.dayTwo,
	selectedSubject: state.subject.data.selectedSubject
});

export default connect(mapStateToProps, { selectDateOne, selectDateTwo })(DateSelect);
