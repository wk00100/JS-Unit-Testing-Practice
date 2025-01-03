import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

// return formatted Date 
const formatTime = function (time = new Date()) {
	time = time.toLocaleString(undefined, { hourCycle: 'h23' });
	time = time.replace("上午", "");
	time = time.replace("下午", "");
	return time;
};

// read the input than return the string
async function readLine(qs = '') {
	const input = await rl.question(qs);
	rl.pause();
	return input;
}

// print item in input list
function printList(list = []) {
	for (let item of list) { console.log(item); }
	return;
}

function formatBarcode(barcode = '') {
	if (barcode.length !== 15) return null;
	const ID = barcode.substring(0, 5);
	const year = Number(barcode.substring(5, 9));
	const month = Number(barcode.substring(9, 11));
	const date = Number(barcode.substring(11, 13));
	const hour = Number(barcode.substring(13, 15));

	// check time format
	if (Number.isNaN(year) || year < 0) return null;
	else if (Number.isNaN(month) || month < 1 || month > 12) return null;
	else if (Number.isNaN(date) || date < 0 || date > 30) return null;
	else if (Number.isNaN(hour) || hour < 0 || hour > 23) return null;

	return {
		ID: ID,
		expireTime: {
			year: year,
			month: month,
			date: date,
			hour: hour
		}
	};
}

function getBarcodeState(barcode, time = new Date()) {
	const STATE = [
		'商品尚於期限內',
		'商品即將到期',
		'商品已過期'
	]
	const stateCode = 0;
	if (!barcodeList.length) return;
	const timeInfo = {
		year: time.getFullYear(),
		month: time.getMonth() + 1,
		date: time.getDate(),
		hour: time.getHours(),
		minute: time.getMinutes()
	}
	
	// not comoleted yet.
	const expiredTime = barcode.expiredTime;
	if ((timeInfo.year <= expiredTime.year) && (timeInfo.month <= expiredTime.month) && timeInfo.date <= expiredTime.date && timeInfo.hour <= expiredTime.hour) {
		const lastHour = expiredTime.hour - timeInfo.hour;
		if(lastHour <= 1){
			
			if((expiredTime.hour-timeInfo.hour===1)){}
		}
		
	}
	if ((timeInfo.hour === (expiredTime - 1))) {

	}
}


(async function mainProcess() {

	let barcodeList = [];
	let isMutiLine;	// has one barcode or more
	const sysTime = new Date();
	console.log(`系統時間 ${formatTime(sysTime)}`);

	isMutiLine = parseInt(await readLine('單筆條碼請輸入0，五筆請輸入1：'));
	while (isMutiLine !== 0 && isMutiLine !== 1) {
		isMutiLine = parseInt(await readLine('單筆條碼請輸入0，五筆請輸入1：'));
	}

	const barcodeNum = isMutiLine ? 5 : 1;

	console.log("Enter the barcode: ");
	// readline in specific times
	for (let i = 0; i < barcodeNum; i++) {
		let barcode = await readLine();
		barcode = formatBarcode(barcode)
		while (!barcode) {
			console.log('條碼格式錯誤！');
			barcode = await readLine('請重新輸入：');
		}
		barcodeList.push(barcode);
	}
	getBarcodeState(barcodeList, sysTime);


	printList(barcodeList);


})();
// return 0;

/**
 * testCase
 * XXXXX2024101012
 * AAAAA2032110102
 * BBCCD2001060121
 * FFGGA2002071301
 * FFANG2018040308
 */