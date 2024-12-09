//TODO: Get info about the game
//TODO: Import info about colors & card types
//TODO: Create buttons for each category that leads to filtered search

const magicColors = document.querySelector("#magic_colors")

addEventListener("load", loadSymbols)

async function loadSymbols() {
  const result = (await axios.get('https://api.scryfall.com/symbology')).data
  const allSymbols = result.data
  const manaSymbols = []
  for (let i = 75; i < 80; i++){
    manaSymbols.push(allSymbols[i])
  }
  [manaSymbols[0], manaSymbols[1], manaSymbols[2], manaSymbols[3], manaSymbols[4]] =  [manaSymbols[2], manaSymbols[3], manaSymbols[4], manaSymbols[1], manaSymbols[0]]
  displaySymbols(manaSymbols)
}

function displaySymbols (symbols) {
 symbols.forEach(symbol => {
  const colorSymbol = document.createElement('img')
  colorSymbol.src = symbol.svg_uri
  colorSymbol.alt = symbol.english
  colorSymbol.className = 'color_symbols'
  magicColors.appendChild(colorSymbol)
 })
}
