var commands = require('./commands');
process.stdin.on('data', function (data) {
	var cmd = data.toString().trim();
	var spl=cmd.split(' ');
  	commands[spl[0]](spl, done)
});
var done = function(output) {
	process.stdout.write(output)	
  	process.stdout.write('\nprompt > ');
}