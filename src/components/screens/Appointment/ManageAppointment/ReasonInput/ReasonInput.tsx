import * as React from 'react';
import { connect } from 'react-redux';
import { inputReason } from 'redux/stores/auth/action';
import styles from './styles.module.css';

class ReasonInput extends React.Component<any, any> {
	setReason = (event: React.ChangeEvent<HTMLTextAreaElement>) => this.props.inputReason(event.currentTarget.value);
	render() {
		return (
			<div className={styles.textInputWrapper}>
				<textarea
					className="form-control"
					placeholder="Reason to delete: (Optional)"
					value={this.props.reasonToDeleteAppt}
					onChange={this.setReason}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({ reasonToDeleteAppt: state.auth.data.reasonToDeleteAppt });

export default connect(mapStateToProps, { inputReason })(ReasonInput);
