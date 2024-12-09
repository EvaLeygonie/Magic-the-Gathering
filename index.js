//TODO: Get info about the game
//TODO: Import info about colors & card types
//TODO: Create buttons for each category that leads to filtered search

addEventListener("load", loadAllInfo)

async function loadAllInfo() {
  const result = (await axios.get('https://api.magicthegathering.io/v1/cards')).data
}
