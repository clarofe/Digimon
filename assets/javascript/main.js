const digimonList = document.getElementById('digimonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertDigimonToLi(digimon) {
    return `
        <li class="digimon ${digimon.type}">
            <span class="number">#${digimon.number}</span>
            <span class="name">${digimon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${digimon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${digimon.photo}"
                     alt="${digimon.name}">
            </div>
        </li>
    `
}

function loadDigimonItens(offset, limit) {
    digiApi.getDigimon(offset, limit).then((digimons = []) => {
        const newHtml = digimons.map(convertDigimonToLi).join('')
        digimonList.innerHTML += newHtml
    })
}

loadDigimonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})