const actives = document.querySelectorAll('ul li')

actives.forEach((active) => {
    console.log(active)

    active.addEventListener('click', () => {
        active.classList.add('active')
    })
})