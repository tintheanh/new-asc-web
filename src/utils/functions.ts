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

export const contains = (arr: any[] | null, obj: any, key: string, nestedKey?: string): boolean => {
	if (!nestedKey) {
		if (arr) {
			if (arr.filter((e) => obj[key] === e[key]).length) return true;
			return false;
		}
		return false;
	} else {
		if (arr) {
			if (arr.filter((e) => obj[key][nestedKey] === e[key][nestedKey]).length) return true;
			return false;
		}
		return false;
	}
};

export const convertTimestamp = (timestamp: number) => {
	var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
		ampm = 'AM',
		time;

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}

	time = `${mm}/${dd}/${yyyy}, ${h}:${min} ${ampm}`;
	return time;
};
