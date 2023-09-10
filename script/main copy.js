const baseUrl = "https://api.hgbrasil.com/weather?format=json-cors&array_limit=7&user_ip=remote&key=92f3b559"

$(document).ready(() => {
    mostraHoras()
    requisitaDados()
})

function mostraHoras() {
    var hora = new Date()
    $('#hora-req').text(`${hora.getHours()}:${hora.getMinutes()}`)
}

async function requisitaDados() {
    try {
        const resposta = await fetch(baseUrl);
        const dados = await resposta.json();
        exibeDados(dados);
    } catch (err) {
        console.log(err);
    }
}

function exibeDados(dados) {
    const api = dados.results;
    const htmltag = ['.cidade', '.descricao', '.temp-atual', '.chuva', '.vento', '.nascer-do-sol', '.por-do-sol', '.umidade', '.temp-max', '.temp-min']
    const parametros = [api.city, api.description, api.temp, api.rain_probability, api.wind_speedy, api.sunrise, api.sunset, api.humidity, api.forecast[0].max, api.forecast[0].min]
    const dias = api.forecast.slice(1);
    const prevs = document.querySelectorAll('.prev');

    for (let i = 0; i <= htmltag.length; i++) {
        alteraHTML(htmltag[i], parametros[i])
    }

    prevs.forEach((prev, index) => {
        const dia = dias[index];
        const diaDaSemana = prev.querySelector('.dia-da-semana');
        const maximo = prev.querySelector('.max');
        const minimo = prev.querySelector('.min');
        const chuvaProb = prev.querySelector('.rain');
        const desc = prev.querySelector('.description');
        const data = prev.querySelector('.date');

        diaDaSemana.innerText = dia.weekday;
        maximo.innerText = dia.max;
        minimo.innerText = dia.min;
        chuvaProb.innerText = dia.rain_probability;
        desc.innerText = dia.description;
        data.innerText = dia.date;
    });
}

function alteraHTML(tag, texto) {
    $(tag).text(texto)
}
