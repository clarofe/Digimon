
const digiApi = {}

function convertPokeApiDetailToDigimon(digiDetail) {
    const digimon = new digimon()
    digimon.number = digiDetail.id
    digimon.name = digiDetail.name

    const types = digieDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    digimon.types = types
    digimon.type = type

    digimon.photo = digiDetail.sprites.other.dream_world.front_default

    return digimon
}

digiApi.getDigimonDetail = (digimon) => {
    return fetch(digimon.url)
        .then((response) => response.json())
        .then(convertDigiApiDetailToDigimon)
}

digiApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://digi-api.com/v1/digimon/?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((digimons) => digimons.map(digiApi.getDigimonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((digimonsDetails) => digimonsDetails)
}