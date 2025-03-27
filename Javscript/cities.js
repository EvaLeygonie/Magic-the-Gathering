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
      const cityItem = document.createElement("div")
      cityItem.className = 'city_list'
      cityItem.innerHTML = `<p>${city.name},  <em>Population:</em> ${city.population}</p>`
      cityDisplay.appendChild(cityItem)

      const cityEdit = document.createElement("div")
      cityEdit.innerHTML = `<input type="text" id="edit_name" placeholder="City name" required>
      <input type="text" id="edit_pop" placeholder="Population" required><button onclick="editCity('${city.id}')">Edit city</button>`
      cityItem.appendChild(cityEdit)

      const cityDelete = document.createElement("div")
      cityDelete.innerHTML = `<button onclick="deleteCity('${city.id}')">Delete city</button>`
      cityItem.appendChild(cityDelete)
    })
  })
}

function deleteCity (cityId) {
  fetch('https://avancera.app/cities/' + cityId, {
    method: 'DELETE'
  })
    .then(() => fetchCities(cityName))
}

function editCity(cityId) {
  const putName = document.querySelector("#edit_name").value
  const putPop = Number(document.querySelector("#edit_pop").value)

  fetch(`https://avancera.app/cities/${cityId}`, {
    body: JSON.stringify({id: cityId, name: putName, population: putPop}),
    headers: {
      'Content-Type': 'application/json'
    },
      method: 'PUT'
    })
    .then(() => fetchCities(cityName))
}

const searchCity = document.querySelector("#search_city")
searchCity.addEventListener("submit", (event) => {
  event.preventDefault()
  const getName = document.querySelector("#get_name").value
  fetchCities(getName)
})

const postCity = document.querySelector("#post_city")
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
