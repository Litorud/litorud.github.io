function count(textarea) {
	dd1.textContent = textarea.textLength;
	dd2.textContent = textarea.value.replace(/\n/g, "").length;
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

function print(form) {
	form.childNodes[2].textContent = form.text1.value;
}

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

function read(form) {
	var reader = new FileReader();
	reader.onload = function (event) {
		form.textarea1.value = event.target.result;
	};
	try {
		reader.readAsText(form.file1.files[0], "UTF-8");
	} catch (e) {
		form.textarea1.value = "エラーが発生しました。\n" + e;
	}
}

function write(button) {
	location = "data:application/octet-stream," + encodeURI(button.form.textarea1.value);
}

charTable = {
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