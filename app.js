const base_url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

window.addEventListener('load', ()=> {
    exchangeRate();
});
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc; 
}

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    exchangeRate();

})

const exchangeRate = async() => {
    let amount = document.querySelector('form input');
    let val = amount.value;
    const url = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let fromData = data[fromCurr.value.toLowerCase()];
    let rate = fromData[toCurr.value.toLowerCase()];
    let result = val * rate;
    
    msg.innerText = `${val} ${fromCurr.value} = ${result.toFixed(2)} ${toCurr.value}`;
}