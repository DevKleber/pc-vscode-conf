const OVERNIGHT_RATE = 3.9;
const SUNDAY_RATE = 2.90;
const NORMAL_RATE = 2.10;

exports.calculateRide = function (distance, date) {
	const isOvernight = date.getHours() >= 22;
	if (isOvernight) {
		return distance * OVERNIGHT_RATE;
	}
	const isSunday = date.getDay() === 0;
	if (isSunday) {
		return distance * SUNDAY_RATE;
	}

	return distance * NORMAL_RATE;
};
