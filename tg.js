const urlData = document.location.search;
const searchParams = new URLSearchParams(urlData);
let formType = searchParams.get("form")
let userData = {
    "lock": searchParams.get("lock"), // Закрыто ли заполнение профиля
    "ban": searchParams.get("ban"), // Блокировка пользователя
    "gender": searchParams.get("gender"), // Гендер пользователя
}

if (userData["ban"] === null){
    if (userData["lock"] === null){
        if (formType === "register") { // Если user регистрируется
            const outputUserData = {
                "height": "",
                "weight": "",
                "type": ""
            }
            document.getElementById("block-start-register").style.display = "block"
            const button = document.getElementById("start_register");
            button.addEventListener('click', () => {
                const weightDiv = document.getElementById("weight");
                const heightDiv = document.getElementById("height");
                const typeDiv = document.getElementById("type");
                // Разделяем по гендеру
                if (userData["gender"] === "male"){
                    let typeArray = ["Европейский", "Африканский", "Азиатский", "Кавказский", "Средиземноморский"];
                    let weightMin = 70;
                    let weightMax = 140;
                    let heightMin = 150;
                    let heightMax = 210;
                    for (let i = weightMin; i<=weightMax; i += 5){
                        let opt = document.createElement('option');
                        opt.value = i.toString();
                        opt.innerHTML = i.toString();
                        weightDiv.appendChild(opt);
                    }
                    for (let i = heightMin; i<=heightMax; i++){
                        let opt = document.createElement('option');
                        opt.value = i.toString();
                        opt.innerHTML = i.toString();
                        heightDiv.appendChild(opt);
                    }
                    typeArray.forEach((element) => {
                        let opt = document.createElement('option');
                        opt.value = element;
                        opt.innerHTML = element;
                        typeDiv.appendChild(opt);
                    })
                } else {
                    if (userData["gender"] === "female") {
                        let typeArray = ["Мулатка", "Азитка", "Славянка", "Африканка", "Европейка"];
                        let weightMin = 40;
                        let weightMax = 80;
                        let heightMin = 150;
                        let heightMax = 210;
                        for (let i = weightMin; i<=weightMax; i += 5){
                            let opt = document.createElement('option');
                            opt.value = i.toString();
                            opt.innerHTML = i.toString();
                            weightDiv.appendChild(opt);
                        }
                        for (let i = heightMin; i<=heightMax; i++){
                            let opt = document.createElement('option');
                            opt.value = i.toString();
                            opt.innerHTML = i.toString();
                            heightDiv.appendChild(opt);
                        }
                        typeArray.forEach((element) => {
                            let opt = document.createElement('option');
                            opt.value = element;
                            opt.innerHTML = element;
                            typeDiv.appendChild(opt);
                        })
                    }

                }
                // Обнуляем то, что нам не нужно
                document.getElementById("block-start-register").style.display = "none";
                document.getElementById("register").style.display = "block";
                // ----------------------------
                let tg = window.Telegram.WebApp;
                tg.MainButton.setText("Дальше 👉")
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
                            outputUserData[inputsData[i].id.toString()] = inputsData[i].value
                        }
                    }
                    if (flag){
                        tg.sendData(JSON.stringify(outputUserData));
                    } else {
                        const element = document.getElementById("error__header_id")
                        element.innerText = "Вы заполнили не все обязательные поля!"
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

