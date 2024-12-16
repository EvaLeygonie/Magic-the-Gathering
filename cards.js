const cardList = document.querySelector("#card_list")
const inputForm = document.querySelector("form")
const favoriteCards = JSON.parse(localStorage.getItem("favorites"))

addEventListener("load", loadAllCards)

async function loadAllCards() {
  const params = new URLSearchParams(window.location.search)
  const typeFilter = params.get("types")
  const colorFilter = params.get("colors")

  let queryParam = ""
  if (typeFilter) {
    queryParam = `types=${typeFilter}`
    document.querySelector(`[value=${typeFilter}]`).selected = true
  } else if (colorFilter) {
    queryParam = `colors=${colorFilter}`
    document.querySelector(`[value=${colorFilter}]`).checked = true
  }

  const result = (await axios.get(`https://api.magicthegathering.io/v1/cards?${queryParam}`)).data

  const allCards = result.cards
  displayCards(allCards)
}

addEventListener("DOMContentLoaded", () => {
  inputForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const cardTypeFilter = document.querySelector('select[id="card_type_filter"]').value
    const cardNameFilter = document.querySelector('#search_card').value
    const checkedColors = document.querySelectorAll("#card_colors_filter input[type='checkbox']:checked")
    const cardColorFilter = [...checkedColors].map(e => e.value)

    let queryParams = []
    if (cardTypeFilter) queryParams.push(`type=${cardTypeFilter}`)
    if (cardNameFilter) queryParams.push(`name=${cardNameFilter}`)
    if (cardColorFilter) queryParams.push(`colors=${cardColorFilter}`)

    const queryString = queryParams.join("&")

    const result = (await axios.get(`https://api.magicthegathering.io/v1/cards?${queryString}`)).data
    let filteredCards = result.cards

    if (cardColorFilter.length > 0) {
      filteredCards = result.cards.filter(card =>
        JSON.stringify(card.colors.sort()) === JSON.stringify(cardColorFilter.sort())
      )
    }

    displayCards(filteredCards)
  })
})

function displayCards(cards) {
  cardList.innerHTML = ""

  cards.forEach(card => {
    if (card.imageUrl) {
      const cardContainer = document.createElement('div')
      cardList.appendChild(cardContainer)

      const cardImage = document.createElement('img')
      cardImage.className = 'card_image'
      cardImage.src = card.imageUrl
      cardImage.alt = card.name
      cardContainer.appendChild(cardImage)

      const textDiv = document.createElement('div')
      textDiv.className = 'text_div'
      cardContainer.appendChild(textDiv)

      let addFavorite = document.createElement('img')
      addFavorite.className = 'fav_icon'
      addFavorite.alt = "Heart icon"
      textDiv.appendChild(addFavorite)

      let fav = false
      favoriteCards.map(val =>{
        if(JSON.stringify( {...val})===JSON.stringify({...card})) fav = true
      })
      if(fav) addFavorite.src = "CSS/heart-black.svg"
      else addFavorite.src = "CSS/heart.svg"

     addFavorite.addEventListener("click", () => {
      if (addFavorite.src = "CSS/heart.svg") {
        addFavorite.src = "CSS/heart-black.svg"
        favoriteCards.push(card)
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
