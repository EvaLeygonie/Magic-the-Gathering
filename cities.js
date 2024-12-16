const cityDisplay = document.querySelector("#show_cities")
let cityName = ""

addEventListener("load", fetchCities(cityName))

const getCity = document.querySelector("#get_city")
getCity.addEventListener("submit", (event) => {
  event.preventDefault()
  const getName = document.querySelector("#get_name").value
  fetchCities(getName)
})

function fetchCities(name) {
  fetch('https://avancera.app/cities/?name=' + name)
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
    .then(() => fetchCities(cityName))
}
