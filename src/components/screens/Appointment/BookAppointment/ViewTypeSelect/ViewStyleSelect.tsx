import * as React from 'react';
import { connect } from 'react-redux';
import { selectType } from 'redux/stores/tutor/action';

class ViewStyleSelect extends React.Component<any, any> {
	state = { select: 'single' };

	setType = (event: React.FormEvent<HTMLInputElement>) => this.props.selectType(event.currentTarget.value);

	render() {
		return (
			<div className="radio">
				<label>
					<input
						type="radio"
						value="single"
						checked={this.props.selectedType === 'single'}
						onChange={this.setType}
					/>
					<strong>Single-day View (All Tutors)</strong>
				</label>
				<label>
					<input
						type="radio"
						name="option"
						value="multi"
						checked={this.props.selectedType === 'multi'}
						onChange={this.setType}
					/>
					<strong>Multi-day View (Single Tutor)</strong>
				</label>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({ selectedType: state.tutor.data.selectedType });

export default connect(mapStateToProps, { selectType })(ViewStyleSelect);
