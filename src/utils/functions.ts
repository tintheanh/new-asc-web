export const sort = (arr: any[], property: string) => {
	const compare = (a: any, b: any) => {
		if (a[property] < b[property]) {
			return -1;
		}
		if (a[property] > b[property]) {
			return 1;
		}
		return 0;
	};
	const sorted = arr.sort(compare);
	return sorted;
};

export const timeStringToFloat = (time: string) => {
	let result;
	const hoursMinutes = time.split(/[.:]/);
	const hours = parseInt(hoursMinutes[0], 10);
	const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
	result = hours + minutes / 60;
	if (time.includes('AM')) {
		return result;
	}
	if (time.includes('PM') && Math.floor(result) === 12) return result;
	return (result += 12);
};

export const floatToTime = (float: number) => {
	if (float > 24 || float < 0) {
		return '';
	}
	let hr = Math.floor(Math.abs(float));
	const min = Math.floor((Math.abs(float) * 60) % 60);

	if (hr === 12) {
		return hr + ':' + (min < 10 ? '0' : '') + min + ' PM';
	}
	if (hr >= 12) {
		hr -= 12;
		return (hr < 10 ? '0' : '') + hr + ':' + (min < 10 ? '0' : '') + min + ' PM';
	}
	return (hr < 10 ? '0' : '') + hr + ':' + (min < 10 ? '0' : '') + min + ' AM';
};

export const traverseWeekdays = (d1: number, d2: number, type: boolean) => {
	const result = [];
	if (d1 < d2) {
		for (let i = d1; i <= d2; i++) {
			result.push(i);
		}
	} else if (d1 > d2) {
		if (d2 !== 0) {
			for (let i = d1; i !== d2; i++) {
				if (i === 7) {
					i = 0;
				}
				result.push(i);
			}
			result.push(d2);
		} else {
			for (let i = d1; i < 7; i++) {
				result.push(i);
			}
			result.push(d2);
		}
	} else {
		if (type) result.push(d1);
		else {
			let i = d1;

			while (true) {
				result.push(i);
				i++;
				if (i === 7) {
					i = 0;
				}
				if (i === d2) {
					break;
				}
			}
		}
	}

	return result;
};
