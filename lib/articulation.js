const Openness = Object.freeze({
	close: 0 / 6,
	nearClose: 1 / 6,
	closeMid: 2 / 6,
	mid: 3 / 6,
	openMid: 4 / 6,
	nearOpen: 5 / 6,
	open: 6 / 6
});

const Frontness = Object.freeze({
	front: 6 / 6,
	nearFront: 5 / 6,
	central: 3 / 6,
	nearBack: 1 / 6,
	back: 0 / 6
});

const Roundness = Object.freeze({
	rounded: true,
	unrounded: false
});

module.exports = {
	Frontness,
	Openness,
	Roundness
};
