const getCity = document.querySelector("#get_city")

getCity.addEventListener("submit", (event) => {
  event.preventDefault()

  const getName = document.querySelector("#get_name").value
  const getPop = Number(document.querySelector("#get_pop").value)

  fetch('https://avancera.app/cities/?name=' + getName + '&minPopulation=' + getPop)
  .then(response => response.json())
  .then(result => {
    console.log(result)
  })
})
