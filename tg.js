const urlData = document.location.search;
const searchParams = new URLSearchParams(urlData);
let formType = searchParams.get("form")
let userData = {
    "lock": searchParams.get("lock"), // Закрыто ли заполнение профиля
    "ban": searchParams.get("ban"), // Блокировка пользователя
}

if (userData["ban"] === null){
    if (userData["lock"] === null){
        if (formType === "register") { // Если user регистрируется
            document.getElementById("block-start-register").style.display = "block"
            const button = document.getElementById("start_register");
            button.addEventListener('click', () => {
                // Обнуляем то, что нам не нужно
                document.getElementById("block-start-register").style.display = "none";
                document.getElementById("register").style.display = "block";
                // ----------------------------
                let tg = window.Telegram.WebApp;
                tg.MainButton.setText("Завершить регистрацию")
                tg.MainButton.show()
                Telegram.WebApp.onEvent('mainButtonClicked', function(){
                    const inputsData = document.getElementsByClassName("input_element")
                    let flag = true;
                    for (let i = 0; i < inputsData.length; i++) {
                        const errorElement = document.getElementById("text-field__messsage-" + inputsData[i].id.toString())
                        if (!(inputsData[i].value)) {
                            flag = false
                            errorElement.innerText = "Заполните это поле!"
                        } else {
                            errorElement.innerText = ""
                        }
                    }
                    if (flag){
                        const element = document.getElementById("error__header_id")
                        element.innerText = "Успешно!"
                        tg.sendData("some string that we need to send");
                    } else {
                        const element = document.getElementById("error__header_id")
                        element.innerText = "Не успешно!"
                    }
                    //при клике на основную кнопку отправляем данные в строковом виде
                });

            })
        } else if (formType === "profile"){ // здесь делаем дозаполнение профиля
            document.getElementById("profile").style.display = "block"
        }
    } else {
        const container = document.createElement("div")
        container.className = "container"
        const h1Element = document.createElement("h1")
        h1Element.innerHTML = "Сервис временно недоступен!"
        container.append(h1Element)
        document.body.append(container)
    }
} else {
    const container = document.createElement("div")
    container.className = "container"
    const h1Element = document.createElement("h1")
    h1Element.innerHTML = "Вы заблокированы"
    container.append(h1Element)
    document.body.append(container)
}

