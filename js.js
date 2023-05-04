// DATE
const date = new Date()
let currTime = date.getTime()
const curDay = date.getDate()
const curMonth = date.getMonth() + 1
const curYear = date.getFullYear()

// INPUT
let inputs = document.querySelectorAll('.date-input');
let inptDay = document.querySelector('#day');
let inptMonth = document.querySelector('#month');
let inptYear = document.querySelector('#year');
let button = document.querySelector('#submit-block__btn')

// OUTPUT
let ouptDay = document.getElementById('output-day');
let ouptMonth = document.getElementById('output-month');
let ouptYear = document.getElementById('output-year');

// AUXILIAR
const daysOfMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

button.addEventListener('click', handleSubmit);

function handleSubmit(){
    if (!validate()){ return false }

    let difDay = curDay - inptDay.value
    let difMonth = curMonth - inptMonth.value
    let difYear = curYear - inptYear.value

    if (difDay < 0){
        difMonth -= 1
        difDay = daysOfMonths[curMonth - 1] + difDay
    }
    if (difMonth < 0){
        difYear -= 1
        difMonth = 12 + difMonth
    }
    console.log(difDay)
    console.log(difMonth)
    console.log(difYear)

    ouptDay.querySelector('.output__text--enphasis').innerHTML = difDay
    ouptMonth.querySelector('.output__text--enphasis').innerHTML = difMonth
    ouptYear.querySelector('.output__text--enphasis').innerHTML = difYear
}

function validate(){
    let key = true
    inputs.forEach(i => {
        const parent = i.parentElement
        i.style.borderColor = ''
        parent.querySelector("label").style.color = ''
        parent.querySelector("small").innerHTML = ""

        // empty
        if (!i.value){
            i.style.borderColor = 'red'
            parent.querySelector("label").style.color = 'red'
            parent.querySelector("small").innerHTML = "This field is required"
            key = false
        }

        // month
        if (inptMonth.value < 1 || inptMonth.value > 12) { 
            i.style.borderColor = 'red'
            parent.querySelector("label").style.color = 'red'
            parent.querySelector("small").innerHTML = "Must be a valid month"
            key = false
        } 

        // day
        if (inptDay.value > daysOfMonths[inptMonth - 1] || inptDay.value < 1){
            i.style.borderColor = 'red'
            parent.querySelector("label").style.color = 'red'
            parent.querySelector("small").innerHTML = "Must be a valid day"
            key = false
        }

        // future
        let inptTime = new Date(inptYear.value, inptMonth.value, inptDay.value).getTime()
        if (currTime < inptTime) {
            i.style.borderColor = 'red'
            parent.querySelector("label").style.color = 'red'
            parent.querySelector("small").innerHTML = "Must be a past date"
            key = false
        }
    })
    return key;
}


