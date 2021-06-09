const form = document.querySelector('form')
const search = document.querySelector('input')
const firstP = document.querySelector('.first')
const secondP = document.querySelector('.second')


form.addEventListener('submit', (e) => {
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