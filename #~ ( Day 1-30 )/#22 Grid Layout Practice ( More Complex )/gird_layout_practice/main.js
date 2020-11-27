const sekarang = document.querySelector('.sekarang')

// With moment.js
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        let momentNow = moment()

        let tanggalJam = momentNow.format('dddd , hh : mm A')


        sekarang.innerHTML = tanggalJam
    }, 100)
})

// Get Elements
const bali = document.querySelector('.bali')
const show = document.querySelector('.show')
const judul = document.querySelector('.judul')
const insBali = document.querySelector('.ib')

bali.addEventListener('click', () => {

    judul.innerHTML = `<h2>// Bali </h2>`
    show.style.backgroundImage = 'url(./img/bali1.jpg)'

    bali.style.backgroundImage = 'url(./img/monas.jpg)'
    bali.style.backgroundPositionY = '-20px'
    insBali.innerHTML = `<h3>// Monas </h3>`
})


let tl = gsap.timeline()

tl.fromTo('.judul', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: Power2.easeInOut })



// Old

// Ambil Watku sekarang
let now = new Date();

// Definisi kan hari dengan nama (0-6)
let hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// Ambil Watku Jam dan Menit
let time = now.getHours() + ' : ' + now.getMinutes()

// Ambil Hari 
let namaHari = hari[now.getDay()]

// Gabungkan
let realDate = `${namaHari} , ${time}`

// Implementasikan ke Element HTML
// sekarang.innerHTML = realDate
// sekarang.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');