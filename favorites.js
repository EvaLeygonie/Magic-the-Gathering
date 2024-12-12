const chartSection = document.querySelector("#my_chart")
const favoriteList = document.querySelector("#saved_favorites")
const favoriteCards = JSON.parse(localStorage.getItem("favorites"))

addEventListener("DOMContentLoaded", displayCards(favoriteCards))

function displayCards(cards) {
  favoriteList.innerHTML = ""
  cards.forEach(function (card, index) {
    const cardContainer = document.createElement('div')
    cardContainer.className = 'card_container'
    favoriteList.appendChild(cardContainer)

    const cardImage = document.createElement('img')
    cardImage.className = 'card_image'
    cardImage.src = card.imageUrl
    cardImage.alt = card.name
    cardContainer.appendChild(cardImage)

    const textDiv = document.createElement('div')
    textDiv.classname = 'text_div'
    cardContainer.appendChild(textDiv)

    let addFavorite = document.createElement('img')
    addFavorite.className = 'fav_icon'
    addFavorite.src = "CSS/heart-black.svg"
    addFavorite.alt = "Heart icon"
    textDiv.appendChild(addFavorite)

    addFavorite.addEventListener("click", () => {
      if (addFavorite.src = "CSS/heart-black.svg") {
        addFavorite.src = "CSS/heart.svg"
        favoriteCards.splice(index, 1)
        localStorage.setItem("favorites", JSON.stringify(favoriteCards))
      }
    })

    const cardName = document.createElement('p')
    cardName.className = 'card_name'
    cardName.innerHTML = card.name
    textDiv.appendChild(cardName)
  }
)
}

let colorData = [55, 49, 44, 24, 15] //TODO: Get right data
let colorLabels = ["Black", "Red", "Green", "Blue", "White"]
let barColors = ['#1B1B1B', '#E63946', '#3A9D23', '#0078BF', '#EDE6DB']

new Chart(chartSection, {
  type: "pie",
  data: {
    labels: colorLabels,
    datasets: [{
      data: colorData,
      backgroundColor: barColors,
      borderColor: '#1B1B1B',
      borderWidth: 0.5,
      hoverOffset: 4
    }]
  }
})
