// calculate ride
exports.calculateRide = function (distance, date) {
	const isOvernight = date.getHours() >= 22;
	if (isOvernight) {
		return distance * 3.9;
	} else {
		//sanday
		if (date.getDay() === 0) {
			return distance * 2.9;
		} else {
			return distance * 2.1;
		}
	}
};
