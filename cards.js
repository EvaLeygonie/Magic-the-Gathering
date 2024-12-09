const cardList = document.querySelector("#card_list")

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
      const cardImage = document.createElement('img')
      cardImage.src = card.imageUrl
      cardImage.alt = card.name
      cardImage.className = 'card_image'
      cardList.appendChild(cardImage)
    }
})
}

addEventListener("DOMContentLoaded", () => {
  const inputForm = document.querySelector("form")

  inputForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const cardTypeFilter = document.querySelector('select[id="card_type_filter"]').value
    const cardNameFilter = document.querySelector('#search_card').value
    const checkedColors = document.querySelectorAll("#card_colors_filter input[type='checkbox']:checked")
    const cardColorFilter = [...checkedColors].map(e => e.value)

    console.log(cardTypeFilter)
    console.log(cardNameFilter)
    console.log(checkedColors)
    console.log(cardColorFilter)

    let queryParams = []
    if (cardTypeFilter) queryParams.push(`type=${cardTypeFilter}`)
    if (cardNameFilter) queryParams.push(`name=${cardNameFilter}`)
    if (checkedColors) queryParams.push(`colors=${cardColorFilter}`)

    const queryString = queryParams.join("&")

    const result = (await axios.get(`https://api.magicthegathering.io/v1/cards?${queryString}`)).data
    const filteredCards = result.cards
    displayCards(filteredCards)
  })
})
