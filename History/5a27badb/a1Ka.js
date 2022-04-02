// calculate ride
exports.calculateRide = function (distance, d) {
	// overnight
	if (d.getHours() >= 22) {
		return distance * 3.9;
	} else {
		//sanday
		if (d.getDay() === 0) {
			return distance * 2.9;
		} else {
			return distance * 2.1;
		}
	}
};
