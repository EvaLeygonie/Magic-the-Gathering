//let filterTest = document.querySelector("#filter_test")
//filterTest.addEventListener("click", testDisplayCardTypes)

//let cardTypeButton = document.querySelector('#magic_card_types a')
//console.log(cardTypeButton)

/*let creatureType = document.querySelector('button[value=creature]').value
console.log(creatureType)*/

//document.querySelector(`[value=${cardTypeButton}]`).selected = true

//=== QUERY PARAMS ===//
for (const [types, creature] of mySearchParams) {
  document.querySelector(`[value=creature]`).selected = true
}

/*if (filterParams.has('types')){
  console.log(filterParams.values())
  //loadFilteredCards()
}*/


if (URLSearchParams){ // same as = "?types=creature"
  document.querySelector(`[value=creature]`).selected = true
  let queryParams = 'types=creature'
  loadFilteredCards(queryParams)
} /* else if (URLSearchParams = '?types=sorcery'){
  document.querySelector(`[value=sorcery]`).selected = true
  let queryParams = 'types=sorcery'
  loadFilteredCards(queryParams) */

//*! Remove query Parameters afterwards? + make it one code that adapts to the value?
/* if (URLSearchParams.has('types')){
  document.querySelector(`[value=creature]`).selected = true
  let queryParams = 'types=creature'
  loadFilteredCards(queryParams)*/



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
