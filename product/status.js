// action func, return a string which display current time
const sysTime = function () {
	let sysTime = new Date().toLocaleString();
	sysTime = sysTime.replace("上午", "");
	sysTime = sysTime.replace("下午", "");
	return sysTime;
};

const readline = require("node:readline");
rl = readline.createInterface({
	in: process.stdin,
	output: process.stdout,
});

const showTime = setInterval(() => {
	console.log(sysTime());
}, 1000);
setTimeout(() => {
	clearInterval(showTime);
}, 5000);
return 0;
