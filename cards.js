//=== FUNCTIONS ===//

const cards = []
const cardList = document.querySelector("#card_list")

addEventListener("load", loadAllCards)

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

addEventListener("DOMContentLoaded", (cards) => {
  const inputForm = document.querySelector("form")

  inputForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const cardTypeFilter = document.querySelector('select[id="card_type_filter"]').value

    const cardNameFilter = document.querySelector('#search_card').value

    const cardColorFilter = document.querySelector('select[id="card_colors_filter"]')

    console.log(cardColorFilter)

    async function filterCardColor(color) {
      switch(color){
        case "Black": color = "B"
        break;
        case "Red": color= "R"
        break;
        case "Green": color = "G"
        break;
        case "Blue": color= "U"
        break;
        case "White": color= "W"
        break;
        default: color = ""
      }

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

    filterCardColor(cardColorFilter)
    //filterCardType(cardTypeFilter)
    //filterCardName(cardNameFilter)

})
})
