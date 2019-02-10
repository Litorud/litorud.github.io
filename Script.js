//
// 日本語の個人的正規化
//

const normalizerForm = document.forms["normalizer"];
const sourceText = normalizerForm.source;
const normalizeButton = normalizerForm.normalize;
const resultText = normalizerForm.result;
const normalizerFormEventHandler = function () {
	resultText.value = normalizeJapanese(sourceText.value);
};

sourceText.addEventListener("input", normalizerFormEventHandler);
normalizeButton.addEventListener("click", normalizerFormEventHandler)

const charTable = {
	"　": " ",
	"ㇷ゚": "ぷ",
	"ゐ": "い",
	"ゑ": "え",
	"ゕ": "か",
	"ゖ": "け",
	"ㇰ": "く",
	"ㇱ": "し",
	"ㇲ": "す",
	"ㇳ": "と",
	"ㇴ": "ぬ",
	"ㇵ": "は",
	"ㇶ": "ひ",
	"ㇷ": "ふ",
	"ㇸ": "へ",
	"ㇹ": "ほ",
	"ㇺ": "む",
	"ㇻ": "ら",
	"ㇼ": "り",
	"ㇽ": "る",
	"ㇾ": "れ",
	"ㇿ": "ろ",
	"ｶﾞ": "が",
	"ｷﾞ": "ぎ",
	"ｸﾞ": "ぐ",
	"ｹﾞ": "げ",
	"ｺﾞ": "ご",
	"ｻﾞ": "ざ",
	"ｼﾞ": "じ",
	"ｽﾞ": "ず",
	"ｾﾞ": "ぜ",
	"ｿﾞ": "ぞ",
	"ﾀﾞ": "だ",
	"ﾁﾞ": "ぢ",
	"ﾂﾞ": "づ",
	"ﾃﾞ": "で",
	"ﾄﾞ": "ど",
	"ﾊﾞ": "ば",
	"ﾋﾞ": "び",
	"ﾌﾞ": "ぶ",
	"ﾍﾞ": "べ",
	"ﾎﾞ": "ぼ",
	"ﾊﾟ": "ぱ",
	"ﾋﾟ": "ぴ",
	"ﾌﾟ": "ぷ",
	"ﾍﾟ": "ぺ",
	"ﾎﾟ": "ぽ",
	"｡": "。",
	"｢": "「",
	"｣": "」",
	"､": "、",
	"･": "・",
	"ｦ": "を",
	"ｧ": "あ",
	"ｨ": "い",
	"ｩ": "う",
	"ｪ": "え",
	"ｫ": "お",
	"ｬ": "や",
	"ｭ": "ゆ",
	"ｮ": "よ",
	"ｯ": "つ",
	"ｰ": "ー",
	"ｱ": "あ",
	"ｲ": "い",
	"ｳ": "う",
	"ｴ": "え",
	"ｵ": "お",
	"ｶ": "か",
	"ｷ": "き",
	"ｸ": "く",
	"ｹ": "け",
	"ｺ": "こ",
	"ｻ": "さ",
	"ｼ": "し",
	"ｽ": "す",
	"ｾ": "せ",
	"ｿ": "そ",
	"ﾀ": "た",
	"ﾁ": "ち",
	"ﾂ": "つ",
	"ﾃ": "て",
	"ﾄ": "と",
	"ﾅ": "な",
	"ﾆ": "に",
	"ﾇ": "ぬ",
	"ﾈ": "ね",
	"ﾉ": "の",
	"ﾊ": "は",
	"ﾋ": "ひ",
	"ﾌ": "ふ",
	"ﾍ": "へ",
	"ﾎ": "ほ",
	"ﾏ": "ま",
	"ﾐ": "み",
	"ﾑ": "む",
	"ﾒ": "め",
	"ﾓ": "も",
	"ﾔ": "や",
	"ﾕ": "ゆ",
	"ﾖ": "よ",
	"ﾗ": "ら",
	"ﾘ": "り",
	"ﾙ": "る",
	"ﾚ": "れ",
	"ﾛ": "ろ",
	"ﾜ": "わ",
	"ﾝ": "ん",
	"ﾞ": "",
	"ﾟ": "",
	"゚": ""
}

function normalizeJapanese(str) {
	return str.replace(/[ァ-ヶ]/g, function (match) {
		return String.fromCharCode(match.charCodeAt(0) - 96);
	}).replace(/[ぁぃぅぇぉっゃゅょゎ]/g, function (match) {
		return String.fromCharCode(match.charCodeAt(0) + 1);
	}).replace(/[ｶ-ﾄﾊ-ﾎ]ﾞ|[ﾊ-ﾎ]ﾟ|ㇷ゚|[　｡-ﾟゐゑゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ゚]/g, function (match) {
		return charTable[match];
	}).replace(/[­‐‑‒–—―⁃⁻₋−─〜〰－～─→]/g, "ー").replace(/[！-｝]/g, function (match) {
		return String.fromCharCode(match.charCodeAt(0) - 65248);
	}).replace(/-/g, "ー").toLowerCase();
}

sourceText.value = "aAａＡ!！いぃイィｲｨゐヰぷプふ゜フ゜ﾌﾟㇷ゚";
normalizerFormEventHandler();

//
// 文字数
//

const counterForm = document.forms["counter"];
const textarea = counterForm.text;
const countButton = counterForm.count;
const wholeCount = counterForm.whole;
const trimmedCount = counterForm.trimmed;
const noBreakCount = counterForm.noBreak;
const counterFormEventHandler = function () {
	wholeCount.value = textarea.textLength;

	const trimmedText = textarea.value.trim();
	trimmedCount.value = trimmedText.length;
	noBreakCount.value = trimmedText.replace(/\n/g, "").length;
};

textarea.addEventListener("input", counterFormEventHandler);
countButton.addEventListener("click", counterFormEventHandler);

//
// 基数変換
//

const radixConverterForm = document.forms["radixConverter"];
const num2 = radixConverterForm.num2;
const num10 = radixConverterForm.num10;
const num36 = radixConverterForm.num36;
const num64 = radixConverterForm.num64;
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";

num2.addEventListener("input", function () {
	const i = parseInt(num2.value, 2);

	num10.value = to10(i);
	num36.value = to36(i);
	num64.value = to64(i);
});

num10.addEventListener("input", function () {
	const i = parseInt(num10.value);

	num2.value = to2(i);
	num36.value = to36(i);
	num64.value = to64(i);
});

num36.addEventListener("input", function () {
	const i = parseInt(num36.value, 36);

	num2.value = to2(i);
	num10.value = to10(i);
	num64.value = to64(i);
});

num64.addEventListener("input", function () {
	const i = from64(num64.value);

	num2.value = to2(i);
	num10.value = to10(i);
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

function to36(i) {
	return i.toString(36);
}

function to64(i) {
	if (isNaN(i)) {
		return "NaN";
	} else if (i < 0) {
		return "Underflow"
	}

	const bitsIterator = getBitsIterator(i);
	return Array.from(bitsIterator)
		.map(b => chars[b])
		.reverse()
		.join("");
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

const editorForm = document.forms["editor"];
const file = editorForm.file;
const importButton = editorForm.import;
const content = editorForm.content;
const exportButton = editorForm.export;

file.addEventListener("change", importFile);
importButton.addEventListener("click", importFile);
exportButton.addEventListener("click", exportContent);

function importFile() {
	if (!file.files.length) {
		return;
	}

	var reader = new FileReader();
	reader.onload = function (event) {
		content.value = event.target.result;
	};

	try {
		reader.readAsText(file.files[0], "UTF-8");
	} catch (e) {
		content.value = "エラーが発生しました。\n" + e;
	}
}

function exportContent() {
	location = "data:application/octet-stream," + encodeURI(content.value);
}



addEventListener("load", function () {
	var elem, style, x, y, body = document.body, elems = document.getElementsByClassName("draggable"), i = 0, l = elems.length;
	function dragListener(event) {
		style.left = (elem.left = event.clientX - x) + "px";
		style.top = (elem.top = event.clientY - y) + "px";
	}
	for (; i < l; i++) {
		elem = elems[i];
		elem.left = elem.top = 0;
		elem.addEventListener("mousedown", function (event) {
			event.preventDefault();
			elem = event.currentTarget;
			style = elem.style;
			x = event.clientX - elem.left;
			y = event.clientY - elem.top;
			body.addEventListener("mousemove", dragListener, false);
			body.addEventListener("mouseup", function () {
				body.removeEventListener("mousemove", dragListener, false);
				body.removeEventListener("mouseup", arguments.callee, false);
			}, false);
		}, false);
	}

	dd1 = document.getElementById("num1");
	dd2 = document.getElementById("num2");
}, false);

function getCode(form) {
	var pre = form.childNodes[3], req = new XMLHttpRequest();
	pre.textContent = "読み込んでいます...";
	req.open("GET", form.select.value);
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200)
				pre.textContent = req.responseText.replace(/\t/g, "  ");
			else
				pre.textContent = "読み込みに失敗しました。";
		}
	};
	req.send(null);
}
