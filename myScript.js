let filterTest = document.querySelector("#filter_test")
filterTest.addEventListener("click", testDisplayCardTypes)

async function testDisplayCardTypes() {
  const cardTypeButton = 'sorcery'
  document.querySelector(`[value=${cardTypeButton}]`).selected = true

  const result = (await axios.get(`https://api.magicthegathering.io/v1/cards?types=${cardTypeButton}`)).data
  const cardTypeSort = result.cards

  displayCards(cardTypeSort)
}

function displayCards(cards) {
  cardList.innerHTML = ""

  cards.forEach(card => {
    if (card.imageUrl) {
      const cardContainer = document.createElement('div')
      cardContainer.className = 'card_container'
      cardList.appendChild(cardContainer)

      const cardImage = document.createElement('img')
      cardImage.className = 'card_image'
      cardImage.src = card.imageUrl
      cardImage.alt = card.name
      cardContainer.appendChild(cardImage)

      const cardName = document.createElement('p')
      cardName.className = 'card_name'
      cardName.innerHTML = card.name
      cardContainer.appendChild(cardName)

       //TODO: reduce card names that are > 15 characters
      if (card.name.length > 18) {
        cardName.className = 'card_name_big'
      } else if (card.name.length > 22) {
        cardName.className = 'card_name_biggest'
      }

      const addFavorite = document.createElement('img')
      addFavorite.className = 'fav_icon'
      addFavorite.src = "CSS/heart.svg"
      addFavorite.alt = "Heart icon"
      cardName.appendChild(addFavorite)

      //*! toggle color + add/remove from favorites page
      addFavorite.addEventListener("click", () => {
        if (addFavorite.src = "CSS/heart.svg") {
          addFavorite.src = "CSS/heart-black.svg"
        } else if (addFavorite.src = "CSS/heart-black.svg"){
          addFavorite.src = "CSS/heart.svg"
        }
      })
    }
})
}
