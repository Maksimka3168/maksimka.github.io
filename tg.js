const urlData = document.location.search;
const searchParams = new URLSearchParams(urlData);

let tg = window.Telegram.WebApp;
const testElement = document.getElementById("itc-slider_wrapper_id")
testElement.style.minHeight = (tg.viewportHeight - 124).toString()


function generate_pages(pages){
    const blockDiv = document.getElementById("itc-slider__items")
    for (let i = 1; i <= pages; i++){
        const blockPage = document.createElement("div")
        blockPage.className = "itc-slider__item"
        blockPage.id = "page_" + i.toString()
        blockDiv.append(blockPage)
    }
}

let formType = searchParams.get("form")
let userData = {
    "lock": searchParams.get("lock"), // Закрыто ли заполнение профиля
    "ban": searchParams.get("ban"), // Блокировка пользователя
    "pages": searchParams.get("pages"), // Количество страничек заполнения профиля
    "height": searchParams.get("height"), // Данные о росте
    "weight": searchParams.get("weight"), // Данные о весе
    "type": searchParams.get("type") // Данные о типаже
}

function getFormHTML(typeForm){ // Генерация самой формы с input
    const formElement = document.createElement("form")
    if (typeForm === "height"){
        const inputElement = document.createElement("input")
        // const h3Element = document.createElement("h3")
        // h3Element.innerHTML = "Ввод возраста"
        inputElement.type = "text"
        inputElement.id =  "input" + typeForm;
        inputElement.className = "form__input-" + typeForm;
        inputElement.placeholder = "Введите свой рост"
        // formElement.append(h3Element);
        formElement.append(inputElement);
    }
    return formElement;
}

function generate_form_profile(page){
    console.log(page);
    const blockDiv = document.getElementById("page_" + page.toString())
    const paramReg = searchParams.get("page_" + page.toString())
    if (paramReg !== null){
        const paramsReg = paramReg.split(",")
        paramsReg.forEach((element) =>{
            if (element === "height"){
                const formInput = getFormHTML(element);
                blockDiv.append(formInput);
            }
        })
    }
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
                // Создаём блоки страничек
                generate_pages(Number(userData['pages']))
                // ----------------------------
                const btnSlider = document.getElementById("itc-slider__ind")
                for (let item = 1;item <= Number(userData['pages']); item++){
                    const liElement = document.createElement("li")
                    liElement.className = "itc-slider__indicator"
                    liElement.setAttribute("data-slide-to", (item - 1).toString())
                    liElement.innerHTML = item.toString()
                    btnSlider.append(liElement)
                    generate_form_profile(item);
                }
                ItcSlider.createInstances();
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

