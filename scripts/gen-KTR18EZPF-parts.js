const assert = require('assert');
const fs = require('fs');
const formatSI = require('si-prefixer');

const file = process.argv[2];
const regexp = /^KTR18EZPF(.*)$/;

function mpn2value (mpn) {
	const [_, valueMpn] = regexp.exec(mpn);
	const [a, b] = valueMpn.split('R');
	if (b === undefined) {
		assert(a.length === 4);
		const significand = parseInt(a.slice(0, 3));
		const exponent = parseInt(a.slice(3, 4));
		return significand * Math.pow(10, exponent);
	} else {
		return parseFloat(`${a}.${b}`);
	}
}

const items = fs.readFileSync(file).toString().trim().split('\n').map((line) => line.split('\t'));


items.map(([mpn, uuid]) => {
	const resistance = mpn2value(mpn);
	const value = formatSI(resistance, '\u2126');
	const description = `HV Chip Resistor ${value} 1% 0.25W 500V`
	fs.writeFileSync(`${mpn}.json`, JSON.stringify({
		"MPN": [
			false,
			mpn,
		],
		"base": "757a90dd-0998-43fc-b546-dfa2ee964885",
		"datasheet": [
			true,
			""
		],
		"description": [
			false,
			description
		],
		"inherit_model": true,
		"inherit_tags": true,
		"manufacturer": [
			true,
			""
		],
		"parametric": {
			"pmax": "0.25",
			"table": "resistors",
			"tolerance": "1",
			"value": resistance.toFixed(2)
		},
		"tags": [],
		"type": "part",
		"uuid": uuid,
		"value": [
			false,
			value
		]
	}, null, '    '));
});
