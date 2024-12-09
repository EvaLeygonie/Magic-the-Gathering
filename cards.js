//=== FUNCTIONS ===//

const cards = []
const allCards = []
const cardList = document.querySelector("#card_list")

//*! Reloads all cards before filtering every time!
//TODO: Load all cards, when page opens
addEventListener("load", loadAllCards)

async function loadAllCards(allCards) {
  const result = (await axios.get('https://api.magicthegathering.io/v1/cards')).data

  allCards = result.cards

  allCards.forEach(card => {
    if (card.imageUrl) {
      const cardImage = document.createElement('img')
      cardImage.src = card.imageUrl
      cardImage.alt = card.name
      cardImage.className = 'card_image'
      cardList.appendChild(cardImage)
    }
  })
  return allCards
}

addEventListener("DOMContentLoaded", (cards) => {
  const inputForm = document.querySelector("form")

  inputForm.addEventListener("submit", async (event) => {
    event.preventDefault()

//*! Merge all filters to combine the results

    //TODO: card type filter
    const cardTypeFilter = document.querySelector('select[id="card_type_filter"]').value
    async function filterCardType(type) {
      const result = (await axios.get(`https://api.magicthegathering.io/v1/cards?type=${type}`)).data

      cardList.innerHTML = ""
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
    filterCardType(cardTypeFilter)

    //TODO: card name filter
    const cardNameFilter = document.querySelector('#search_card').value
    async function filterCardName(name) {
      const result = (await axios.get(`https://api.magicthegathering.io/v1/cards?name=${name}`)).data

      cardList.innerHTML = ""
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
    filterCardName(cardNameFilter)

    //TODO: Color filters works with allCards and switching
    //*! doesn't exclusively show the colors choosen => Try filter()
    let checkedColors = document.querySelectorAll("#card_colors_filter input[type='checkbox']:checked")
    let cardColorFilter = [...checkedColors].map(e => e.value)

    async function filterCardColor(colors) {
      const result = (await axios.get(`https://api.magicthegathering.io/v1/cards?colors=${colors}`)).data

      cardList.innerHTML = ""
      cards = result.cards
      /*let cardsFiltered = cards.filter((cards) => cards.colors == colors)
      console.log(cardsFiltered)*/

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
