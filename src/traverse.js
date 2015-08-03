import cursor from './cursor';

export default function traverse() {
	return new Traverse();
};

const Traverse = cursor({

	in() {},

	inV() {},

	out() {},

	outV() {},

	has() {},

	except() {},
});
