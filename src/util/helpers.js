module.exports.isAnyNaN = (...args) => {
	for(let arg of args) {
		if(isNaN(+arg)) return true;
	}
	return false;
};

module.exports.getErrorObject = msg => ({
	ok: false,
	msg
});