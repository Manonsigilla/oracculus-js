let datas = []

async function init() {
    datas = await getDatas()
    showDatas(datas, 1)
    changeTop(datas, 1)
}
init()

async function getDatas(){
    const req = await fetch('../json/horoscope.json')
    return await req.json()

}

function showDatas(datas, id) {
    const signeActuel = datas.find(el => el.id === id)

    document.querySelector('#title-sign').innerHTML = signeActuel.signe
    document.querySelector('#date').innerHTML = signeActuel.date

    document.querySelector('#amour').innerHTML = `<span id="text-sign">Amour : </span>${signeActuel.amour}`
    document.querySelector('#travail').innerHTML = `<span id="text-sign">Travail : </span>${signeActuel.travail}`
    document.querySelector('#argent').innerHTML = `<span id="text-sign">Argent : </span>${signeActuel.travail}`
    document.querySelector('#sante').innerHTML = `<span id="text-sign">Santé : </span>${signeActuel.sante}`
    document.querySelector('#famille').innerHTML = `<span id="text-sign">Famille et amis : </span>${signeActuel.famille}`
    document.querySelector('#conseil').innerHTML = `<span id="text-sign">Conseil : </span>${signeActuel.conseil}`

    document.querySelector('#sign-img').src = signeActuel.image
}

function changeTop(datas, id) {
    // Signe précédent
    const prev = id <= 1 ? datas.length : id - 1
    const signePrecedent = datas.find(el => el.id === prev)

    // On peuple celui de gauche
    const left = document.querySelector('.prev-sign')
    left.innerHTML = `${signePrecedent.signe} <span class="date-prev-sign">${signePrecedent.date} </span>`
    left.dataset.id = prev

    // Signe suivant
    const next = id >= datas.length ? 1 : id + 1
    const signeSuivant = datas.find(el => el.id === next)

    // On peuple celui de droite
    const right = document.querySelector('.next-sign')
    right.innerHTML = `${signeSuivant.signe} <span class="date-next-sign">${signeSuivant.date}</span>`
    right.dataset.id = next
}

// Ajoute les eventlistener sur les flèches
const arrowRight = document.querySelector('.arrow-right')
let index = 1

arrowRight.addEventListener('click', () => {
    index = index >= datas.length ? 1 : index + 1
    showDatas(datas, index)
    changeTop(datas, index)
})

const arrowLeft = document.querySelector('.arrow-left')

arrowLeft.addEventListener('click', () => {
    index = index <= 1 ? index = datas.length : index - 1
    showDatas(datas, index)
    changeTop(datas, index)
})

// Afficher la date du jour
const dateDuJour = new Date()
const jour = dateDuJour.getDate().toString().padStart(2, '0')
const mois = (dateDuJour.getMonth() + 1).toString().padStart(2, '0')
const annee = dateDuJour.getFullYear()

const dateFormatee = `${jour}/${mois}/${annee}`
document.querySelector('#datejour').innerText = `HOROSCOPE DU ${dateFormatee}`

// EventListener sur les éléments du top
const leftHoroscope = document.querySelector('.prev-sign')
leftHoroscope.addEventListener('click', () => {
    showDatas(datas, parseInt(leftHoroscope.dataset.id))
    changeTop(datas, parseInt(leftHoroscope.dataset.id))
})

const righttHoroscope = document.querySelector('.next-sign')
righttHoroscope.addEventListener('click', () => {
    showDatas(datas, parseInt(righttHoroscope.dataset.id))
    changeTop(datas, parseInt(righttHoroscope.dataset.id))
})