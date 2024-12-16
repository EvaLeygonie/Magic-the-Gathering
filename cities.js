const getCity = document.querySelector("#get_city")

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
})

const cityDisplay = document.querySelector("#show_cities")

function displayCity (cities) {
  cityDisplay.innerHTML = ""

  cities.forEach(city => {
    const cityDiv = document.createElement('div')
    cityDiv.className = 'city_div'
    cityDisplay.appendChild(cityDiv)

    const cityDisplayName = document.createElement('p')
    cityDisplayName.className = 'city_display_name'
    cityDisplayName.innerHTML = city.name
    cityDiv.appendChild(cityDisplayName)

    const cityDisplayPop = document.createElement('p')
    cityDisplayPop.className = 'city_display_pop'
    cityDisplayPop.innerHTML = 'Population: ' + city.population
    cityDiv.appendChild(cityDisplayPop)
  })
}
