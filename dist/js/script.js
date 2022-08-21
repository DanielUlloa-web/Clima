const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "de08cc71bemshefbbc8a78836bc0p1c7994jsn25555d2e2255",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

let clima = {
  fetchClima: function (ciudad) {
    fetch(
      "https://weatherapi-com.p.rapidapi.com/forecast.json?q="+ciudad+"&days=3",
      options
    )
      .then((response) => response.json())
      .then((data) => this.mostrarClima(data))
      .catch((err) => console.error(err));
  },
  mostrarClima: function (data) {
    const { name, region, country } = data.location;
    const { last_updated, temp_c, wind_kph, pressure_mb, humidity, uv } =
      data.current;

    const dia0 = [];
    const dia1 = [];
    const dia2 = [];

    {
      let { date } = data.forecast.forecastday[0];
      let { maxtemp_c, mintemp_c } = data.forecast.forecastday[0].day;
      let { icon } = data.forecast.forecastday[0].day.condition;
      dia0.push(date, maxtemp_c, mintemp_c, icon);
    }

    {
      let { date } = data.forecast.forecastday[1];
      let { maxtemp_c, mintemp_c } = data.forecast.forecastday[1].day;
      let { icon } = data.forecast.forecastday[1].day.condition;
      dia1.push(date, maxtemp_c, mintemp_c, icon);
    }

    {
      let { date } = data.forecast.forecastday[2];
      let { maxtemp_c, mintemp_c } = data.forecast.forecastday[2].day;
      let { icon } = data.forecast.forecastday[2].day.condition;
      dia2.push(date, maxtemp_c, mintemp_c, icon);
    }

    /*console.log(
      name,
      region,
      country,
      last_updated,
      temp_c,
      wind_kph,
      pressure_mb,
      humidity,
      uv
    );*/
    /*console.log(dia0, dia1, dia2);*/
    /*console.log(hora)*/
    let hora = last_updated.slice(11);
    let dia1Fecha = (document.getElementById(
      "ciudad"
    ).innerText = `${name}, ${region} Apartir de las ${hora}`);
    document.getElementById("temperaturaActual").innerText = `${temp_c}°`;
    document.getElementById(
      "minMax"
    ).innerText = `Max ${dia0[1]}° - Min ${dia0[2]}°`;

    document.getElementById("humedad").innerText = `${humidity}%`;
    document.getElementById("presion").innerText = `${pressure_mb} mb`;
    document.getElementById("viento").innerText = `${wind_kph} km/h`;
    document.getElementById("uv").innerText = `${uv} de 10`;

    document.getElementById("maxHoy").innerText = `${dia0[1]}°`;
    document.getElementById("minHoy").innerText = `${dia0[2]}°`;
    document.getElementById("iconoHoy").src = `${dia0[3]}`;

    document.getElementById("dia1").innerText = `${dia1[0]}`;
    document.getElementById("dia1Max").innerText = `${dia1[1]}°`;
    document.getElementById("dia1Min").innerText = `${dia1[2]}°`;
    document.getElementById("iconoDia1").src = `${dia1[3]}`;

    document.getElementById("dia2").innerText = `${dia2[0]}`;
    document.getElementById("dia2Max").innerText = `${dia2[1]}°`;
    document.getElementById("dia2Min").innerText = `${dia2[2]}°`;
    document.getElementById("iconoDia2").src = `${dia2[3]}`;
  },
  search: function () {
    this.fetchClima(document.querySelector(".form-control").value);
  },
};

document.querySelector(".btn").addEventListener("click", function (e) {
  e.preventDefault();
  clima.search();
});
