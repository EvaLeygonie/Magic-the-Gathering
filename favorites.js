const favoriteList = document.querySelector("#saved_favorites")
const favoriteCards = JSON.parse(localStorage.getItem("favorites"))

addEventListener("DOMContentLoaded", displayCards(favoriteCards))

function displayCards(cards) {
  favoriteList.innerHTML = ""
  cards.forEach(card => {
    if (card.imageUrl) {
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
          favoriteCards.splice(card, 1)
          localStorage.setItem("favorites", JSON.stringify(favoriteCards))
        }
      })

      const cardName = document.createElement('p')
      cardName.className = 'card_name'
      cardName.innerHTML = card.name
      textDiv.appendChild(cardName)
    }
})
}

/* addEventListener("load", loadAllCards)

async function loadAllCards() {
  const result = (await axios.get('https://api.magicthegathering.io/v1/cards')).data

  const allCards = result.cards
  displayCards(favoriteCards)
} */
