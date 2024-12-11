const input = document.querySelector(`.input-field`);
const cityName = document.querySelector('.cityName');
const searchIcon = document.querySelector('.searchIcon');
const currDate = document.querySelector(`.currentDate`);

//right panel info
const temperatureR = document.querySelector(`.temperatureInfo`);
const conditionsR = document.querySelector(`.conditionsInfo`);
const windR = document.querySelector(`.windInfo`);
const humidityR = document.querySelector(`.humidityInfo`);
const weatherIcon = document.querySelector('.weatherIcon');

//errorMsg
const errorMsg = document.querySelector('.errorMsg');

const API_KEY = '0d0f63fea88d0940585e38bc845821be';
const CITY_API_KEY = 'R/fr3fUwhYaFyjrCzVIz1Q==E7EeKLSxMNLUyWea';

const hanldeWeather = () => {
	/*

135deg,
		rgb(30, 30, 40) 0%,
		rgb(50, 60, 80) 40%,
		rgb(70, 70, 100) 100% - 200-232

		135deg,
		rgb(40, 40, 50) 0%,
		rgb(60, 60, 70) 40%,
		rgb(80, 80, 100) 100% - 300-321

		135deg,
    rgb(20, 30, 50) 0%,
    rgb(40, 60, 90) 40%,
    rgb(60, 90, 120) 100% 500-531

	135deg,
		rgb(50, 60, 70) 0%,
		rgb(80, 90, 100) 50%,
		rgb(110, 120, 130) 100% - 600-622

		 135deg,
    rgb(40, 40, 40) 0%,
    rgb(60, 60, 60) 50%,
    rgb(80, 80, 80) 100% 700-741

	135deg,
		rgb(164, 202, 203) 0%,
		rgb(194, 195, 112) 9%,
		rgb(82, 156, 168) 39%,
		rgb(78, 126, 138) 85% 800

		135deg,
		rgb(114, 135, 136) 0%,
		rgb(137, 138, 68) 5%,
		rgb(91, 130, 136) 21%,
		rgb(78, 111, 119) 85% 801-802

		135deg,
    rgb(30, 30, 40) 0%,
    rgb(50, 50, 60) 50%,
    rgb(70, 70, 80) 100% 803-804
	*/

	//200-232 - burza
	//300-321 - mrzawka
	//500-531 - deszcz
	//600-622 - śnieg
	// 701 lub 741 - mgła
	// 800- czyste niebo
	//801-804 - chmury

	const city = input.value || 'Rzeszów';
	const newDate = new Date();
	const currentDate = `${newDate.getDate()}.${
		newDate.getMonth() + 1
	}.${newDate.getFullYear()}`;

	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

	axios.get(URL).then(res => {
		console.log(res);
		console.log(res.data.weather[0]);
		const weatherData = res.data.weather[0].id;
		console.log(weatherData);

		cityName.innerHTML = `${city}, ${currentDate}`;

		conditionsR.textContent = res.data.weather[0].description;
		temperatureR.textContent = `${Math.round(res.data.main.temp)}°C`;
		windR.textContent = `${Math.round(res.data.wind.speed * 3.6)} km/h`;
		humidityR.textContent = `${Math.round(res.data.main.humidity)}%`;

		switch (true) {
			case weatherData >= 200 && weatherData <= 232:
				weatherIcon.setAttribute('src', '../src/img/stomy.png'); // Burza
				break;
			case weatherData >= 300 && weatherData <= 321:
				weatherIcon.setAttribute('src', '../src/img/rainIcon.png');
				break;
			case weatherData >= 500 && weatherData <= 531:
				weatherIcon.setAttribute('src', '../src/img/rainIcon.png');
				break;
			case weatherData >= 600 && weatherData <= 622:
				weatherIcon.setAttribute('src', '../src/img/swonIcon.png');
				break;
			case weatherData >= 701 && weatherData <= 741:
				weatherIcon.setAttribute('src', '../src/img/mistIcon.png');
				break;
			case weatherData === 800:
				weatherIcon.setAttribute('src', '../src/img/sunny.png');
				break;
			case weatherData >= 801 && weatherData <= 802:
				weatherIcon.setAttribute('src', '../src/img/halfsunny.png');
				break;
			case weatherData >= 803 && weatherData <= 804:
				weatherIcon.setAttribute('src', '../src/img/cloudy.png');
				break;
		}

		input.value = '';
	});
};

const handleError = () => {
	if (input.value === '') {
		errorMsg.style.visibility = 'visible';
	} else {
		errorMsg.style.visibility = 'hidden';
	}
};

hanldeWeather();

const submitWithEnter = () => {
	if (event.keyCode === 13) {
		handleError();
		hanldeWeather();
	}
};

searchIcon.addEventListener(`click`, hanldeWeather);
input.addEventListener(`keyup`, submitWithEnter);
