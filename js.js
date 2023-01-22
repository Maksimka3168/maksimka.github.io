const htmlMain = document.getElementById("html_main");
const widthSize = window.screen.width
const heightSize = window.screen.height
htmlMain.setAttribute('style', `--tg-viewport-height:${widthSize}px; --tg-viewport-stable-height:${heightSize}px;`);
