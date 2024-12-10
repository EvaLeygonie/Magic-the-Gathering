const cardList = document.querySelector("#card_list")
const inputForm = document.querySelector("form")

addEventListener("load", loadAllCards)

async function loadAllCards() {
  const result = (await axios.get('https://api.magicthegathering.io/v1/cards')).data

  const allCards = result.cards
  displayCards(allCards)
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

      let addFavorite = document.createElement('img')
      addFavorite.className = 'fav_icon'
      addFavorite.src = "CSS/heart.svg"
      addFavorite.alt = "Heart icon"
      cardName.appendChild(addFavorite)

      //*! toggle color + add/remove from favorites page
      addFavorite.addEventListener("click", () => {
        addFavorite.src = "CSS/heart-black.svg"
        /* console.log(addFavorite.getAttribute('src'))
        if (source == "CSS/heart-black.svg") {
          addFavorite.src = "CSS/heart.svg"
        } */

      })
    }
})
}

addEventListener("DOMContentLoaded", () => {

  //*! Remove query Parameters afterwards?
  if (URLSearchParams = '?types=creature'){
    document.querySelector(`[value=creature]`).selected = true
    let queryParams = 'types=creature'
    loadFilteredCards(queryParams)
  }

  inputForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const cardTypeFilter = document.querySelector('select[id="card_type_filter"]').value
    const cardNameFilter = document.querySelector('#search_card').value
    const checkedColors = document.querySelectorAll("#card_colors_filter input[type='checkbox']:checked")
    const cardColorFilter = [...checkedColors].map(e => e.value)

    let queryParams = []
    if (cardTypeFilter) queryParams.push(`type=${cardTypeFilter}`)
    if (cardNameFilter) queryParams.push(`name=${cardNameFilter}`)
    if (checkedColors) queryParams.push(`colors=${cardColorFilter}`)
    const queryString = queryParams.join("&")

    loadFilteredCards(queryString)
  })

  async function loadFilteredCards (queryString) {
    const result = (await axios.get(`https://api.magicthegathering.io/v1/cards?${queryString}`)).data

    const filteredCards = result.cards
    displayCards(filteredCards)
  }
})
