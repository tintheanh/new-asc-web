import * as React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { selectDate } from 'redux/stores/tutor/action';
import styles from './styles.module.css';

class DateSelect extends React.Component<any, any> {

	setDate = (date: Date) => this.props.selectDate(date);

	render() {
		return (
			<DatePicker
				selected={this.props.selectedDate}
				onChange={this.setDate}
				className={styles.datePicker}
				todayButton={'Select Today'}
				minDate={new Date()}
				dateFormat="eee, MMM d yyyy"
			/>
		);
	}
}

const mapStateToProps = (state: any) => ({
	selectedDate: state.tutor.data.selectedDate,
	selectedSubject: state.subject.data.selectedSubject
});

export default connect(mapStateToProps, { selectDate })(DateSelect);
