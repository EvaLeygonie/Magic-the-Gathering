//=== OLD DISPLAY CARD CONTAINER WITH BUTTON ===//

function displaySymbols (symbols) {
  symbols.forEach(symbol => {
   const colorLink = document.createElement('a')
   colorLink.href = `cards.html?colors=${color}`
   magicColors.appendChild(colorLink)

   const colorContainer = document.createElement('div')
   colorContainer.className = 'color_container'
   colorLink.appendChild(colorContainer)

   const colorSymbol = document.createElement('img')
   colorSymbol.className = 'color_symbols'
   colorSymbol.src = symbol.svg_uri
   colorSymbol.alt = symbol.english
  colorContainer.appendChild(colorSymbol)
  })
}

let color = symbol.colors[0]
   switch(color){
     case "B": color = "Black"
     break;
     case "R": color= "Red"
     break;
     case "G": color = "Green"
     break;
     case "U": color= "Blue"
     break;
     case "W": color= "White"
     break;
     default: color = ""
   }

   const colorName = document.createElement('button')
   colorName.className = 'color_name'
   colorName.innerHTML = color
   colorContainer.appendChild(colorName)

//=== TEST FILTERED SEARCH BUTTON ===//
let creatureType = document.querySelector('button[value=creature]')

creatureType.addEventListener("click", filterCreatures)

async function filterCreatures() {
  cardList.innerHTML = ""
  document.querySelector(`[value=creature]`).selected = true

  const result = (await axios.get('https://api.magicthegathering.io/v1/cards?types=creature')).data
  const cards = result.cards

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
