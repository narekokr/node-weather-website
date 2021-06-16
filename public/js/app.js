const form = document.querySelector('form')
const search = document.querySelector('input')
const firstP = document.querySelector('.first')
const secondP = document.querySelector('.second')
const searchButton = form.querySelector('#search')
const geoButton = form.querySelector('#geo')

searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    const address = search.value
    firstP.textContent = 'Loading...'
    secondP.textContent = ''
    const url = `/weather?address=${address}`
    fetch(url).then(response => {
        response.json().then(data => {
            if (data.error) {
                firstP.textContent = data.error
            } else {
                firstP.textContent = data.location
                secondP.textContent = data.forecast
            }
        })
    })
})

geoButton.addEventListener('click', async(e) => {
    e.preventDefault()
    if (!navigator.geolocation) return alert('Geolocation is not supported by your browser')
    geoButton.setAttribute('disabled', 'disabled')
    await navigator.geolocation.getCurrentPosition(position => {
        if (!position && !position.coords) return
        const coords = {}
        coords.latitude = position.coords.latitude
        coords.longitude = position.coords.longitude
        firstP.textContent = 'Loading...'
        secondP.textContent = ''
        const url = `/weather?coords=${coords.latitude},${coords.longitude}`
        fetch(url).then(response => {
            response.json().then(data => {
                if (data.error) {
                    firstP.textContent = data.error
                } else {
                    firstP.textContent = data.location
                    secondP.textContent = data.forecast
                }
                geoButton.removeAttribute('disabled')
            })
        })
    })
    geoButton.removeAttribute('disabled')
})