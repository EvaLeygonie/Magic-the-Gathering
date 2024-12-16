const cityDisplay = document.querySelector("#show_cities")
let cityName = ""

addEventListener("load", fetchCities(cityName))

function fetchCities(name) {
  fetch('https://avancera.app/cities/?name=' + name)
  .then(response => {
    let cities = response.json()
    return cities
  })
  .then(cities => {
    cityDisplay.innerHTML = ""
    cities.forEach(city => {
      const cityItem = document.createElement("p")
      cityItem.className = 'city_list'
      cityItem.textContent = `${city.name}, Population: ${city.population}`
      cityDisplay.appendChild(cityItem)

      const cityIdDisplay = document.createElement("p")
      cityItem.className = 'city_list'
      cityIdDisplay.textContent = `ID: ${city.id}`
      cityItem.appendChild(cityIdDisplay)

      const cityDiv = document.createElement("div")
      cityDiv.innerHTML = `<button onclick="deleteCity('${city.id}')">Delete city</button>`
      cityItem.appendChild(cityDiv)
    })
  })
}

function deleteCity (cityId) {
  fetch('https://avancera.app/cities/' + cityId, {
    method: 'DELETE'
  })
    .then(() => fetchCities(cityName))
}

const getCity = document.querySelector("#get_city")
getCity.addEventListener("submit", (event) => {
  event.preventDefault()
  const getName = document.querySelector("#get_name").value
  fetchCities(getName)
})

/* const postCity = document.querySelector("#post_city")
postCity.addEventListener("submit", (event) => {
  event.preventDefault()
  const postName = document.querySelector("#post_name").value
  const postPop = Number(document.querySelector("#post_pop").value)

  fetch('https://avancera.app/cities/', {
    body: JSON.stringify({name: postName, population: postPop}),
    headers: {
      'Content-Type': 'application/json'
    },
      method: 'POST'
    })
    .then(() => {
      fetchCities(cityName)
      event.target.reset()
    })
})

const putCity = document.querySelector("#put_city")
putCity.addEventListener("submit", (event) => {
  event.preventDefault()

  const cityId =  document.querySelector("#city_id").value
  const putName = document.querySelector("#put_name").value
  const putPop = Number(document.querySelector("#put_pop").value)

  fetch('https://avancera.app/cities/', {
    body: JSON.stringify({id: cityId, name: putName, population: putPop}),
    headers: {
      'Content-Type': 'application/json'
    },
      method: 'PUT'
    })
    .then(() => {
      fetchCities(cityName)
      event.target.reset()
    })
}) */
