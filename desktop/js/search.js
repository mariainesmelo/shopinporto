// Variaveis onde estão guardadas as listas de produtos vazias (inicialmente)

let productListArrayGlobal = [];
let filteredProductsList = [];
let activeFilters = { 'C': [], 'Z': [], 'K': [] };

// fetchProduts = faz o pedido a API para ir buscar os dados

const fetchProducts = () => {
    return fetch(`/api/getStoresList?nStores=100`).then(resp => resp.json());
}

//updateDOM = transferir do JS para o HTML


const updateDOM = (productListArray) => {
    const productListElement = document.getElementById('product-card-list');
    productListElement.innerHTML = '';
    productListArray.forEach(product => {
        productListElement.innerHTML += `
        <a class="ancora-product-page" href="./product_page.html"><div class="container-product-card gridrowfull mt">
            <div class="product-card-img col-d-4 col-12">
                <img  class="imgfit" id="img-id" src="${Object.values(product.image)[0]}">
            </div>
            <div class="product-card-description col-d-6 p2">
                <div class="product-card-name-description-schedule-address-promo">
                    <h3 class="h3-search-category">${product.category}</h3>
                    <h4 class="h4-search-category">${product.name}</h4>
                    <p class="p-schedule-search"><img src="img/product_page/icons/time.svg"> ${product.schedule}</p>
                    <p class="p-address-search"><img src="img/product_page/icons/place-icon.svg"> ${product.address}</p>
                    <div class="promocoes-product-card-search">
                        <p class="p-promos-search">Mais de 4 promoções em loja</p>
                    </div>
                </div>
            </div>
            <div class="container-map-fav-share-rate col-d-2 p2">
                <div class="container-map-fav-share">
                    <img src="img/search/roteiro.svg">
                    <img src="img/search/heart.svg">
                    <img src="img/search/share-sem-fundo.svg">
                </div>
                <div class="rate-search">
                    <p class="textcenter"><img src="img/product_page/icons/star.svg"><strong>${product.score}/5</strong></p>
                </div>
            </div>
        </div>
        </a>`

    })
}

// Filters

// productListArrayGlobal = Todos os items da db.js (Lista completa)

//filteredProductsList = Todos os items filtrados


// Filtro categorias

const sortCategory = (productsList, catList) => {
    if (catList.length > 0) {
        filteredProductsList = productsList.filter(store =>
            catList.includes(store.catId)
        )
    } else if (productsList === productListArrayGlobal) {
        filteredProductsList = productListArrayGlobal;
    }
}

// Filtro Zonas

const sortZone = (productsList, zoneList) => {
    if (zoneList.length > 0) {
        filteredProductsList = productsList.filter(store =>
            zoneList.includes(store.zoneId)
        )
    } else if (productsList === productListArrayGlobal) {
        filteredProductsList = productListArrayGlobal;
    }
}



//updateFilters atualiza os filtros ativos, com a array active filters. productFilter elemento que quero adicionar ou remover 

const updateFilters = (filterType, filterID) => {
    console.log("searching...")
    if (filterType === 'K') {
        activeFilters['K'] = filterID;
    } else {
        if (activeFilters[filterType].includes(filterID)) {
            activeFilters[filterType] = activeFilters[filterType].filter(f => f !== filterID)
        } else {
            activeFilters[filterType].push(filterID);
        }
    }
    console.log('Active Filter:', activeFilters);
    sortCategory(productListArrayGlobal, activeFilters['C']);
    sortZone(filteredProductsList, activeFilters['Z']);
    sortKeywords(activeFilters['K']);
    updateDOM(filteredProductsList);
    console.log('finish!')
}

const loadPageContent = (sortBy) => {
    fetchProducts(sortBy).then(jsonData => {
        productListArrayGlobal = jsonData.data;
        updateDOM(productListArrayGlobal);
    });
}



var textRemove = new Choices(document.getElementById('choices-text-remove-button'), {
    delimiter: ',',
    editItems: true,
    maxItemCount: 5,
    removeItemButton: true,
});

const searchKeyword = () => {
    const choicesButton = document.getElementById('choices-text-remove-button');
    const choices = choicesButton.value.toLowerCase().split(",");
    updateFilters('K', choices[0] === "" ? [] : choices);
}

const sortKeywords = (keywordList) => {
    console.log('k', keywordList);
    if (keywordList.length > 0) {
        keywordList.forEach(keyword => {
            filteredProductsList = filteredProductsList.filter(store => store.keywords && store.keywords.includes(keyword))
        })
    }
}


document.addEventListener('DOMContentLoaded', () => loadPageContent('price'))
