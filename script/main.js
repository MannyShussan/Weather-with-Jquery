const baseUrl = "https://api.hgbrasil.com/weather?format=json-cors&array_limit=7&user_ip=remote&key=92f3b559"

$(document).ready(() => {
    mostraHoras()
    requisitaDados()
    $('.autoplay').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });
})

function mostraHoras() {
    var hora = new Date()
    $('#hora-req').text(`${hora.getHours() < 10 ? '0' + hora.getHours() : hora.getHours()}:${hora.getMinutes() < 10 ? '0' + hora.getMinutes() : hora.getMinutes()}`)
}

function requisitaDados() {
    $.get(baseUrl, (data) => {
        organizaDados(data)
    })
}

function organizaDados(dados) {
    const api = dados.results
    const dias = api.forecast.slice(1)
    const htmltag = ['.cidade', '.descricao', '.temp-atual', '.chuva', '.vento', '.nascer-do-sol', '.por-do-sol', '.umidade', '.temp-max', '.temp-min', '.nuvens', '.direcao-vento']
    const parametros = [api.city, api.description, api.temp, api.rain, api.wind_speedy, api.sunrise, api.sunset, api.humidity, api.forecast[0].max, api.forecast[0].min, api.cloudiness, api.wind_cardinal]
    const previsao = $('.prev')
    const prevhtml = ['.dia-da-semana', '.max', '.min', '.rain', '.description', '.date', '.velo-vento']

    console.log(api)
    for (let i = 0; i < htmltag.length; i++) $(htmltag[i]).text(parametros[i])

    previsao.each((index, element) => {
        const encurta = dias[index]
        const param = [encurta.weekday, encurta.max, encurta.min, encurta.rain_probability, encurta.description, encurta.date, encurta.wind_speedy]
        for (let i = 0; i < prevhtml.length; i++) element.querySelector(prevhtml[i]).innerText = param[i]
    })
}
