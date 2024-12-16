const cityDisplay = document.querySelector("#show_cities")

/* const getCity = document.querySelector("#get_city")
getCity.addEventListener("submit", (event) => {
  event.preventDefault()

  const getName = document.querySelector("#get_name").value
  const getPop = Number(document.querySelector("#get_pop").value)

  fetch('https://avancera.app/cities/?name=' + getName + '&minPopulation=' + getPop)
  .then(response => {
    let cities = response.json()
    return cities
  })
  .then(cities => {
    displayCity(cities)
  })
}) */

addEventListener("load", fetchCities)

function fetchCities() {
  const getName = document.querySelector("#get_name").value
  const getPop = Number(document.querySelector("#get_pop").value)

  fetch('https://avancera.app/cities/?name=' + getName + '&minPopulation=' + getPop)
  .then(response => {
    let cities = response.json()
    return cities
  })
  .then(cities => {
    cityDisplay.innerHTML = ""
    cities.forEach(city => {
      const cityItem = document.createElement("li")
      cityItem.className = 'city_list'
      cityItem.textContent = `${city.name} (${city.population})`
      cityItem.innerHTML += `<button onclick="deleteCity('${city.id}')">Delete city</button>`
      cityDisplay.appendChild(cityItem)
    })
  })
}

function deleteCity (cityId) {
  fetch('https://avancera.app/cities/' + cityId, {
    method: 'DELETE'
  })
    .then(() => fetchCities())
}
