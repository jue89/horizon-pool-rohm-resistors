const fs = require('fs');
const uuid = require('uuid');

const file = process.argv[2];

const lines = fs.readFileSync(file).toString().trim().split('\n').map((line) => line.split('\t'));

lines.forEach((line) => {
    if (line.length === 1) line.push(uuid.v4());
});

fs.writeFileSync(file, lines.map((line) => line.join('\t')).join('\n'));
