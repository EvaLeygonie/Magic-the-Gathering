//=== FUNCTIONS ===//

const cards = []
const cardList = document.querySelector("#card_list")

//TODO: Load all cards, when page opens
//addEventListener("load", loadAllCards)

async function loadAllCards(cards) {
  const result = (await axios.get('https://api.magicthegathering.io/v1/cards')).data

  cards = result.cards

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

//*! Merge all functions + add loadAllCards when empty filters (default?) + make it reset so you can filter again
addEventListener("DOMContentLoaded", (cards) => {
  const inputForm = document.querySelector("form")

  inputForm.addEventListener("submit", async (event) => {
    event.preventDefault()

//TODO: Merge all filters to combine the results

    //TODO: card type filter
    const cardTypeFilter = document.querySelector('select[id="card_type_filter"]').value
    async function filterCardType(type) {
      const result = (await axios.get('https://api.magicthegathering.io/v1/cards?type=' + type)).data

      cards = result.cards

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
    //filterCardType(cardTypeFilter)

    //TODO: card name filter
    const cardNameFilter = document.querySelector('#search_card').value
    async function filterCardName(name) {
      const result = (await axios.get('https://api.magicthegathering.io/v1/cards?name=' + name)).data

      cards = result.cards

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

    //*! cardcolor filter => make so that choosing more colors shows only mixed colored card
    let checkedColors = document.querySelectorAll("#card_colors_filter input[type='checkbox']:checked")
    //Ger en nodelista på alla checkade boxer som en array

    let cardColorFilter = [...checkedColors].map(e => e.value)
    //* cardColorFilter ger oss rätt value

    async function filterCardColor(color) {

      const result = (await axios.get('https://api.magicthegathering.io/v1/cards?colors=' + color)).data

      cards = result.cards

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

    filterCardColor(cardColorFilter)
})
})
