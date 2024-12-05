//=== HTML COMMANDS ===//
SHIFT + =>/<= to select bits of code
CMD + ALT + pil to select multiple lines

//=== DOCUMENT COLORS ===//
Black: #1B1B1B
Red: #E63946
Green: #3A9D23
Blue: #0078BF
White: #EDE6DB
Background: linear-gradient(90deg, #1B1B1B, #E63946, #3A9D23, #0078BF, #EDE6DB)

//=== CSS ===//
Man kan nestla CSS ie inom en element {}, lägga till div {} eller p{}
och då påverkas bara dessa element typer inom den första element
EXEMPEL:
a {
  :hover {

  }}

//=== COLORS ==//

Black cards:
'https://api.magicthegathering.io/v1/cards?colors=B'
White cards:
'https://api.magicthegathering.io/v1/cards?colors=W'
Green cards:
'https://api.magicthegathering.io/v1/cards?colors=G'
Red cards:
'https://api.magicthegathering.io/v1/cards?colors=R'
Blue cards:
'https://api.magicthegathering.io/v1/cards?colors=U'
Combine colors:
'https://api.magicthegathering.io/v1/cards?colors=R,B'
=> Will show every card with those two colors, even with other colors
Search several colors but not combined:
'https://api.magicthegathering.io/v1/cards?colors=R|B'
=> Will show all red(only) and all black(only) cards


//=== TYPES ==//

Creatures:
'https://api.magicthegathering.io/v1/cards?types=creature'
Sorcery:
'https://api.magicthegathering.io/v1/cards?types=sorcery'
Instant:
'https://api.magicthegathering.io/v1/cards?types=instant'
Enchantment:
'https://api.magicthegathering.io/v1/cards?types=enchantment'
Artifact:
'https://api.magicthegathering.io/v1/cards?types=artifact'
Planeswalker:
'https://api.magicthegathering.io/v1/cards?types=planeswalker'

//=== NAME ===//

https://api.magicthegathering.io/v1/cards?name= ...

//=== COMBINE ATRIBUTES ===//

'https://api.magicthegathering.io/v1/cards?types=creature&colors=R'



//=== AXIOS ===//

async function loadCards() {
  const result = (await axios.get('https://api.magicthegathering.io/v1/cards')).data
}
loadCards()

// => Not the cards, just the data from the website

//=== FETCH ===//

fetch('https://api.magicthegathering.io/v1/cards')
.then((response) => response.json())
.then((result) => {
  const cards = result.cards
  const cardList = document.querySelector("#card_list")

  cards.forEach(card => {
    if (card.imageUrl) {
      const cardImage = document.createElement('img')
      cardImage.src = card.imageUrl
      cardImage.alt = card.name
      cardImage.className = 'card_image'
      cardList.appendChild(cardImage)
    }
  })
})

//=== OLD SWITCH COLOR CODE ===///
      switch(input){
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
