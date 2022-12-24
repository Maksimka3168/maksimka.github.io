const slider = document.getElementById("myRange");
const output = document.getElementById("slider__count");
const tg = tg = window.Telegram.WebApp;

output.innerHTML = slider.value; 
tg.MainButton.show()
tg.MainButton.text = "Подтвердить и продолжить";

slider.oninput = function() {
    output.innerHTML = this.value;
}

Telegram.WebApp.onEvent('mainButtonClicked', function(){
	tg.sendData(output.innerHTML); 
});
