//=== HTML COMMANDS ===//
SHIFT + =>/<= to select bits of code
CMD + ALT + pil to select multiple lines

Kommentera bort kod: OPTION + SHIFT + A
Ta bort indentering: SHIFT + TAB

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

Array all colors checked =
https://api.magicthegathering.io/v1/cards?colors=B,R,G,U,W


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

//=== HOMEPAGE API ===//
Mana symbols:
https://api.scryfall.com/symbology

white: 75
blue: 76
black: 77
red: 78
green: 79


//=== FILTER FUNCTION TYPES===//

async function testDisplayCardTypes() {
  cardList.innerHTML = ""

  const cardTypeButton = 'sorcery'
  const cardType = document.querySelector(`[value=${cardTypeButton}]`)
  cardType.selected = true

  const result = (await axios.get(`https://api.magicthegathering.io/v1/cards?types=${cardTypeButton}`)).data
  const cards = result.cards

  cards.forEach(card => {
    if (card.imageUrl) {
      const cardImage = document.createElement('img')
      cardImage.className = 'card_image'
      cardImage.src = card.imageUrl
      cardImage.alt = card.name
      cardList.appendChild(cardImage)
    }
  })
}


//=== FAVORITES ===//
Keep the black heart => If() card is in localStorage, show black heart
Reverse the process to make the heart white + unsave
Display cards on favorite page
Save data on colors (types?)
Make a chart on the side
