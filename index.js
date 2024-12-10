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
  //*! Add a unique link for each symbol.colors[0]
  const colorLink = document.createElement('a')
  colorLink.href = 'cards.html'
  magicColors.appendChild(colorLink)

  const colorContainer = document.createElement('div')
  colorContainer.className = 'color_container'
  colorLink.appendChild(colorContainer)

  const colorSymbol = document.createElement('img')
  colorSymbol.className = 'color_symbols'
  colorSymbol.src = symbol.svg_uri
  colorSymbol.alt = symbol.english
  colorContainer.appendChild(colorSymbol)

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
 })
}
