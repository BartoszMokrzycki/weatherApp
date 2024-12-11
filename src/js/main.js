const body = document.body;
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

const upperRightPanel = document.querySelector('.upperPart__right')

//bottom panel info
const lowerPart = document.querySelector('.lowerPart');

//errorMsg
const errorMsg = document.querySelector('.errorMsg');

const city = input.value || 'Rzeszów';
const cityLat = '50.041187';
const cityLon = '21.999121';
const API_KEY = '0d0f63fea88d0940585e38bc845821be';
const CITY_API_KEY = 'R/fr3fUwhYaFyjrCzVIz1Q==E7EeKLSxMNLUyWea';

const fetchWeather = city => {
	return fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
	)
		.then(res => {
			if (!res.ok) {
				throw new Error(`Network response was not ok`);
			}
			return res.json();
		})
		.then(data => {
			handleWeather(data);
			createLowerPanel(data);
		})
		.catch(error => {
			console.error('Błąd przy żądaniu:', error);
			throw error;
		});
};

//sprawdzanie danych pogodowych
const handleWeather = data => {
	if (!data || !data.list || data.list.length === 0) {
		console.error('Brak danych pogodowych');
		return;
	}

	const newDate = new Date();
	const currentDate = `${newDate.getDate()}.${
		newDate.getMonth() + 1
	}.${newDate.getFullYear()}`;

	const weatherData = data.list[0].weather[0].id;
	console.log(weatherData);

	const temperatureK = data.list[0].main.temp;
	const tempC = temperatureK - 273.15;

	// Aktualizacja danych na stronie
	cityName.innerHTML = `${data.city.name}, ${currentDate}`;
	conditionsR.textContent = data.list[0].weather[0].description;
	temperatureR.textContent = `${Math.round(tempC)}°C`;
	windR.textContent = `${Math.round(data.list[0].wind.speed * 3.6)} km/h`;
	humidityR.textContent = `${Math.round(data.list[0].main.humidity)}%`;

	

	switch (true) {
		case weatherData >= 200 && weatherData <= 232:
			weatherIcon.setAttribute('src', '../src/img/stomy.png');
			body.style.backgroundImage =
				'linear-gradient(135deg, rgb(30, 30, 40) 0%, rgb(50, 60, 80) 40%, rgb(70, 70, 100) 100%)';
			break;
		case weatherData >= 300 && weatherData <= 321:
			weatherIcon.setAttribute('src', '../src/img/rainIcon.png');
			body.style.backgroundImage =
				'linear-gradient(135deg, rgb(40, 40, 50) 0%, rgb(60, 60, 70) 40%, rgb(80, 80, 100) 100%)';
			break;
		case weatherData >= 500 && weatherData <= 531:
			weatherIcon.setAttribute('src', '../src/img/rainIcon.png');
			body.style.backgroundImage =
				'linear-gradient(135deg, rgb(20, 30, 50) 0%, rgb(40, 60, 90) 40%, rgb(60, 90, 120) 100%)';
			break;
		case weatherData >= 600 && weatherData <= 622:
			weatherIcon.setAttribute('src', '../src/img/swonIcon.png');
			body.style.backgroundImage =
				'linear-gradient(135deg, rgb(50, 60, 70) 0%, rgb(80, 90, 100) 50%, rgb(110, 120, 130) 100%)';
			break;
		case weatherData >= 701 && weatherData <= 741:
			weatherIcon.setAttribute('src', '../src/img/mistIcon.png');
			body.style.backgroundImage =
				'linear-gradient(135deg, rgb(40, 40, 40) 0%, rgb(60, 60, 60) 50%, rgb(80, 80, 80) 100%)';
			break;
		case weatherData === 800:
			weatherIcon.setAttribute('src', '../src/img/sunny.png');
			body.style.backgroundImage =
				'linear-gradient(135deg, rgb(164, 202, 203) 0%, rgb(194, 195, 112) 9%, rgb(82, 156, 168) 39%, rgb(78, 126, 138) 85%)';
			break;
		case weatherData >= 801 && weatherData <= 802:
			weatherIcon.setAttribute('src', '../src/img/halfsunny.png');
			body.style.backgroundImage =
				'linear-gradient(135deg, rgb(114, 135, 136) 0%, rgb(137, 138, 68) 5%, rgb(91, 130, 136) 21%, rgb(78, 111, 119) 85%)';
			break;
		case weatherData >= 803 && weatherData <= 804:
			weatherIcon.setAttribute('src', '../src/img/cloudy.png');
			body.style.backgroundImage =
				'linear-gradient(135deg, rgb(40, 40, 50) 0%, rgb(60, 60, 70) 40%, rgb(80, 80, 100) 100%)';
			break;
	}

	input.value = '';
};

const handleError = () => {
	if (input.value === '') {
		errorMsg.style.visibility = 'visible';
	} else {
		errorMsg.style.visibility = 'hidden';
	}
};

const submitWithEnter = event => {
	if (event.keyCode === 13) {
		const city = input.value;
		handleError();

		fetchWeather(city);
	}
};

//kilkudniowa prognoza

function getWeatherIcon(weatherData) {
	switch (true) {
		case weatherData >= 200 && weatherData <= 232:
			return '../src/img/stomy.png';
		case weatherData >= 300 && weatherData <= 321:
			return '../src/img/rainIcon.png';
		case weatherData >= 500 && weatherData <= 531:
			return '../src/img/rainIcon.png';
		case weatherData >= 600 && weatherData <= 622:
			return '../src/img/snowIcon.png';
		case weatherData >= 701 && weatherData <= 741:
			return '../src/img/mistIcon.png';
		case weatherData === 800:
			return '../src/img/sunny.png';
		case weatherData >= 801 && weatherData <= 802:
			return '../src/img/halfsunny.png';
		case weatherData >= 803 && weatherData <= 804:
			return '../src/img/cloudy.png';
	}
}
const createLowerPanel = data => {
	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const isSmallScreen = window.innerWidth < 450;

	lowerPart.innerHTML = '';

	for (let i = 1; i < 5; i++) {
		const dtTxt = data.list[i * 8].dt_txt;
		const nextDate = new Date(dtTxt);
		let dayOfWeek = daysOfWeek[nextDate.getDay()];

		if (isSmallScreen) {
			dayOfWeek = dayOfWeek.slice(0, 3);
		}

		const weatherId = data.list[i * 8].weather[0].id;

		const weatherItem = document.createElement('div');
		weatherItem.classList.add('weatherItem', `item-${i + 1}`);
		weatherItem.innerHTML = `
            <p class="weatherItem__day day">${dayOfWeek}</p>
            <p class="weatherItem__day temperatureOne">${Math.round(
							data.list[i * 8].main.temp - 273
						)}°C</p>
            <img src="${getWeatherIcon(weatherId)}" class="iconOne" />
            <p class="weatherItem__day conditionOne">${
							data.list[i * 8].weather[0].main
						}</p>
        `;

		lowerPart.append(weatherItem);
	}
};

document.addEventListener('DOMContentLoaded', () => {
	const city = input.value || 'Rzeszów';
	fetchWeather(city);
});
searchIcon.addEventListener(`click`, handleWeather);
input.addEventListener(`keyup`, submitWithEnter);
