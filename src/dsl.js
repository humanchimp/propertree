export default dsl;

Object.assign(dsl, {
	safeHtml() {/* TODO: implement */}
});

function dsl(strings, ...values) {
	return values.map((value, i) => {
			if ('function' === typeof value) {
				value = value();
			}
			return strings[i] + value;
		}).join("");
}
