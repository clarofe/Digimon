const digiApi = {};

function convertDigiApiDetailToDigimon(digiDetail) {
    const digimon = new Digimon();
    digimon.name = digiDetail.name;
    digimon.img = digiDetail.img;
    digimon.level = digiDetail.level;
    
    return digimon;
}

digiApi.getDigimons = () => {
    const url = 'https://digimon-api.vercel.app/api/digimon';

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.map(convertDigiApiDetailToDigimon))
        .catch((error) => console.error(error));
}
