
const digimonList = document.getElementById('digimonList');
const paginationContainer = document.getElementById('pagination-container');

let allDigimons = [];     
let currentPage = 1;      
const itemsPerPage = 12;  

function convertDigimonToLi(digimon) {
    
    const levelClass = digimon.level.toLowerCase().replace(/\s+/g, '-'); // Ex: "In Training" -> "in-training"
    
    return `
        <li class="digimon ${levelClass}">
            <span class="number">#${digimon.name}</span>
            <span class="name">${digimon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    <li class="type">${digimon.level}</li>
                </ol>
                <img src="${digimon.img}" alt="${digimon.name}">
            </div>
        </li>
    `;
}


function displayPage(page) {
    currentPage = page;
  
    digimonList.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedDigimons = allDigimons.slice(startIndex, endIndex);

    const newHtml = paginatedDigimons.map(convertDigimonToLi).join('');
    digimonList.innerHTML = newHtml;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupPagination() {

    paginationContainer.innerHTML = '';
    
    const pageCount = Math.ceil(allDigimons.length / itemsPerPage);

    if (pageCount <= 1) return;

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Anterior';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        displayPage(currentPage - 1);
        setupPagination(); 
    });
    paginationContainer.appendChild(prevButton);

    
    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;

        if (i === currentPage) {
            pageButton.classList.add('active');
        }

        pageButton.addEventListener('click', () => {
            displayPage(i);
            setupPagination(); 
        });

        paginationContainer.appendChild(pageButton);
    }
    

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Próximo';
    nextButton.disabled = currentPage === pageCount; 
    nextButton.addEventListener('click', () => {
        displayPage(currentPage + 1);
        setupPagination(); 
    });
    paginationContainer.appendChild(nextButton);
}


function start() {
    digiApi.getDigimons()
        .then((digimonsData = []) => {
            allDigimons = digimonsData; 
            displayPage(1);            
            setupPagination();          
        })
        .catch(error => {
            console.error('Falha ao buscar os Digimons:', error);
            digimonList.innerHTML = '<p class="error-message">Não foi possível carregar os Digimons. Tente recarregar a página.</p>';
        });
}

start();
