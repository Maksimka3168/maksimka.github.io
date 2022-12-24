let slider = document.getElementById("myRange");
let output = document.getElementById("slider__count");
let tg = window.Telegram.WebApp;

output.innerHTML = slider.value; 
tg.MainButton.show();
tg.MainButton.text = "Подтвердить и продолжить";

slider.oninput = function() {
    output.innerHTML = this.value;
}

Telegram.WebApp.onEvent('mainButtonClicked', function(){
	output.innerHTML = "22";
	tg.sendData("1"); 
});
