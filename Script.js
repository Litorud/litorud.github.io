//
// Echo
//

const echoForm = document.forms['echo'];
const input = echoForm.input;
const output = echoForm.output;

input.addEventListener('input', function () {
	output.textContent = input.value;
});

//
// 日本語の独自正規化
//

const normalizerForm = document.forms['normalizer'];
const sourceText = normalizerForm.source;
const resultText = normalizerForm.result;
const dResultText = normalizerForm.dResult;
const cResultText = normalizerForm.cResult;
const kdResultText = normalizerForm.kdResult;
const kcResultText = normalizerForm.kcResult;
const charTable = {
	'ㇷ゚': 'ぷ',
	'𛀀': 'え',
	'𛀁': 'え',
	'ゐ': 'い',
	'ゑ': 'え',
	'ゕ': 'か',
	'ゖ': 'け',
	'ㇰ': 'く',
	'ㇱ': 'し',
	'ㇲ': 'す',
	'ㇳ': 'と',
	'ㇴ': 'ぬ',
	'ㇵ': 'は',
	'ㇶ': 'ひ',
	'ㇷ': 'ふ',
	'ㇸ': 'へ',
	'ㇹ': 'ほ',
	'ㇺ': 'む',
	'ㇻ': 'ら',
	'ㇼ': 'り',
	'ㇽ': 'る',
	'ㇾ': 'れ',
	'ㇿ': 'ろ'
};

sourceText.addEventListener('input', normalize);
normalizerForm.normalize.addEventListener('click', normalize);

function normalize() {
	const text = sourceText.value;
	resultText.value = normalizeJapanese(text);
	dResultText.value = text.normalize('NFD');
	cResultText.value = text.normalize('NFC');
	kdResultText.value = text.normalize('NFKD');
	kcResultText.value = text.normalize('NFKC');
}

function normalizeJapanese(str) {
	return str.normalize('NFKC') // 全角英数記号を半角に、半角カタカナを全角に。
		.replace(/[ァ-ヶ]/g, function (match) { // カタカナをひらがなに。
			return String.fromCharCode(match.charCodeAt(0) - 96);
		})
		.replace(/ㇷ゚|𛀀|𛀁|[ゐゑゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ]/g, function (match) {
			// 一部の文字をひらがなに。
			return charTable[match];
		})
		.replace(/[か-とは-ほ] ゙/g, function (match) { // 濁点を合成。
			return String.fromCharCode(match.charCodeAt(0) + 1);
		})
		.replace(/[は-ほ] ゚/g, function (match) { // 半濁点を合成。
			return String.fromCharCode(match.charCodeAt(0) + 2);
		})
		.toLowerCase() // 大文字を小文字に。
		.replace(/[ぁぃぅぇぉっゃゅょゎ]/g, function (match) { // 捨て仮名を普通のひらがなに。
			return String.fromCharCode(match.charCodeAt(0) + 1);
		})
		.replace(/[­‐‑‒–—―⁃⁻₋−─〜〰－～─→]/g, 'ー'); // そのほか、長音符として使われそうな文字を長音符に。
}

sourceText.value = '｢aAａＡ?？　えぇエェｴｪゑヱ𛀀𛀁ぷプふ゜フ゜ﾌ゜ㇷ゜ふﾟフﾟﾌﾟㇷﾟふ ゚フ ゚ﾌ ゚ㇷ ゚ㇷ゚｡｣';
normalize();

//
// 文字数
//

const counterForm = document.forms['counter'];
const original = counterForm.original;
const originalLength = counterForm.originalLength;
const optimized = counterForm.optimized;
const optimizedLength = counterForm.optimizedLength;
const shrinked = counterForm.shrinked;
const shrinkedLength = counterForm.shrinkedLength;
const removed = counterForm.removed;
const removedLength = counterForm.removedLength;

original.addEventListener('input', count);
counterForm.count.addEventListener('click', count);

function count() {
	originalLength.value = original.textLength;

	optimized.value = original.value
		.replace(/^\s*\n/, '')
		.trimEnd()
		.split('\n')
		.map(l => l.trimEnd())
		.join('\n');
	optimizedLength.value = optimized.textLength;

	shrinked.value = optimized.value
		.trimStart()
		.replace(/\s+/g, ' ');
	shrinkedLength.value = shrinked.textLength;

	removed.value = shrinked.value.replace(/ /g, '');
	removedLength.value = removed.textLength;
}

original.value = ` 
　 あ   い

 
う　
  
`;
count();

//
// 基数変換
//

const radixConverterForm = document.forms['radixConverter'];
const num2 = radixConverterForm.num2;
const num10 = radixConverterForm.num10;
const num16 = radixConverterForm.num16;
const num36 = radixConverterForm.num36;
const num64 = radixConverterForm.num64;
// URL アプリケーションのための変形 Base64 ('base64url' encoding) では、
// 62番目の文字に-を、63番目の文字に_を使うので、それに倣う。
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

num2.addEventListener('input', function () {
	const i = parseInt(num2.value, 2);

	num10.value = to10(i);
	num16.value = to16(i);
	num36.value = to36(i);
	num64.value = to64(i);
});

num10.addEventListener('input', function () {
	const i = parseInt(num10.value);

	num2.value = to2(i);
	num16.value = to16(i);
	num36.value = to36(i);
	num64.value = to64(i);
});

num16.addEventListener('input', function () {
	const i = parseInt(num16.value, 16);

	num2.value = to2(i);
	num10.value = to10(i);
	num36.value = to36(i);
	num64.value = to64(i);
});

num36.addEventListener('input', function () {
	const i = parseInt(num36.value, 36);

	num2.value = to2(i);
	num10.value = to10(i);
	num16.value = to16(i);
	num64.value = to64(i);
});

num64.addEventListener('input', function () {
	const i = from64(num64.value);

	num2.value = to2(i);
	num10.value = to10(i);
	num16.value = to16(i);
	num36.value = to36(i);
});

function from64(text) {
	const is = Array.from(text)
		.map(c => chars.indexOf(c))
		.reverse();

	let result = 0;
	let power = 1;
	for (let i of is) {
		result += i * power;
		power *= 64;
	}

	return result;
}

function to2(i) {
	return i.toString(2);
}

function to10(i) {
	return i.toString();
}

function to16(i) {
	return i.toString(16);
}

function to36(i) {
	return i.toString(36);
}

function to64(i) {
	if (isNaN(i)) {
		return 'NaN';
	} else if (i < 0) {
		return 'Underflow'
	}

	const bitsIterator = getBitsIterator(i);
	return Array.from(bitsIterator)
		.map(b => chars[b])
		.reverse()
		.join('');
}

function* getBitsIterator(number) {
	do {
		yield number % 64;
		number = Math.floor(number / 64);
	} while (number > 0);
}

//
// 読み込みと書き出し
//

const editorForm = document.forms['editor'];
const file = editorForm.file;
const content = editorForm.content;

file.addEventListener('change', importFile);
editorForm.import.addEventListener('click', importFile);
editorForm.export.addEventListener('click', exportContent);

function importFile() {
	if (!file.files.length) {
		return;
	}

	const reader = new FileReader();
	reader.onload = function (event) {
		content.value = event.target.result;
	};

	try {
		reader.readAsText(file.files[0], 'UTF-8');
	} catch (e) {
		content.value = 'エラーが発生しました。\n' + e;
	}
}

function exportContent() {
	location = 'data:application/octet-stream,' + encodeURI(content.value);
}

//
// 非同期的取得
//

const fetcherForm = document.forms['fetcher'];
const select = fetcherForm.select;
const fetchedCode = document.getElementById('fetchedCode');

select.addEventListener('change', fetchCode);
fetcherForm.fetch.addEventListener('click', fetchCode);

async function fetchCode() {
	fetchedCode.textContent = '取得しています...';

	try {
		const response = await fetch(select.value);
		const text = await response.text();
		fetchedCode.textContent = text.replace(/\t/g, '  ');
	} catch (e) {
		fetchedCode.textContent = '取得できませんでした。\n' + e;
	}
}

//
// ドラッグして移動
//

addEventListener('DOMContentLoaded', () => {
	const elems = document.getElementsByClassName('draggable');
	for (let i = 0, l = elems.length; i < l; i++) {
		const elem = elems[i];
		elem.left = elem.top = 0;
		elem.addEventListener('mousedown', startDrag);
	}
});

function startDrag(event) {
	event.preventDefault();

	const elem = event.currentTarget;
	const style = elem.style;
	const x = event.clientX - elem.left;
	const y = event.clientY - elem.top;

	document.body.addEventListener('mousemove', drag);
	document.body.addEventListener('mouseup', endDrag);

	function drag(event) {
		style.left = `${elem.left = event.clientX - x}px`;
		style.top = `${elem.top = event.clientY - y}px`;
	}

	function endDrag() {
		document.body.removeEventListener('mousemove', drag);
		document.body.removeEventListener('mouseup', endDrag);
	}
}

//
// カメラ
//

addEventListener('DOMContentLoaded', function () {
	const cameraButton = document.getElementById('cameraButton');
	const video = document.getElementById('cameraVideo');

	cameraButton.addEventListener('click', async function () {
		if (video.srcObject) {
			video.style.display = 'none';
			for (let track of video.srcObject.getVideoTracks()) {
				track.stop();
			}
			video.srcObject = null;

			cameraButton.textContent = '開始';
		} else {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					video: { width: 1280, height: 720 }
				});

				video.srcObject = mediaStream;
				video.style.display = 'block';

				cameraButton.textContent = '停止';
			} catch {
				alert('カメラを開始できませんでした。');
			}
		}
	});
});
