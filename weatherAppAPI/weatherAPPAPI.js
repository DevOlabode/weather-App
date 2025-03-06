const form = document.querySelector('#weatherForm')


//Selection of stuffs from the HTML file...
const infoSelection = {
    cityDisplay : document.querySelector('#cityName'),
    errorMeassage : document.querySelector('#errorMessage'),
    countryName: document.querySelector('#countryName'),
    localTime : document.querySelector('#localTime'),
    weatherInCelsius : document.querySelector('#degreeCelcius'),
    text: document.querySelector('#text'),
    imageDisplay: document.querySelector('#img'),
    weatherCode : document.querySelector('#code'),
    footer: document.querySelector('footer')
}

form.addEventListener('submit' ,async (params) => {
    params.preventDefault()
    const cityName =  form.elements[0].value
    let APIKey = 'e06843fe0efb45d88ab233846250702'

    try{
        const config = {headers:{Accept: 'application/json'}}
        const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${cityName}`, config)
        weatherInfo(res.data)
        form.elements[0].value =''
    }catch(e){
        infoSelection.errorMeassage.textContent = '⚠️ Please enter a valid city.'
        console.log('error',e)

        setTimeout(() => {
            infoSelection.errorMeassage.style.display = 'none'
        }, 3000);

        form.elements[0].value=''

    }
})


const weatherInfo = (info)=>{
    infoSelection.cityDisplay.textContent = info.location.name
    infoSelection.countryName.textContent = `Country: ${info.location.country}`
    infoSelection.localTime.textContent = `Local time: ${info.location.localtime}`

    infoSelection.imageDisplay.innerHTML = ''; //this will clear the previus image before adding a new one.
    infoSelection.weatherInCelsius.textContent = Math.floor(info.current.temp_c) +  ' °C'

    const newImage = document.createElement('img')
    newImage.src = `https:${info.current.condition.icon}`
    infoSelection.imageDisplay.append(newImage)

    let countryDisplay = info.current.condition.code
    countryDisplay.style.color = '#2980b9'
    infoSelection.weatherCode.textContent = `Weather Code: ${countryDisplay}`

    infoSelection.text.textContent = info.current.condition.text

}