axios.defaults.headers.common['x-api-key'] = 'live_OyotYN6ePJII1Ed8zsA9qxZ8OFGwkb4EyrJtKrDjoe5M5YvGRMPfwJsHvqBcL7a5';
const breedsURL = 'https://api.thecatapi.com/v1/breeds';
const imgUrl = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

const loader = document.querySelector('.loader');
const h1 = document.querySelector('h1');
const h4 = document.querySelector('h4');
const section = document.querySelector('.cat-api');

const getBreeds = async() => {
        let axiosObj = await axios.get(breedsURL);
        return axiosObj.data;
};

const getInformationFromBreeds = async() => {
    const breeds = await getBreeds();
    const select = '<select id="selectElement" class="breedSelect"></select>';
    section.insertAdjacentHTML("beforeend",select);
    const s = document.querySelector('.breedSelect');

    breeds.forEach(breed => {
        const option = `
        <option value=${breed.id}>${breed.name}</option>`;
        s.insertAdjacentHTML("beforeend",option);
    });
    loader.style.display = 'none';
   
    s.addEventListener("change",async(e) => {
        loader.style.display = "inline";
        const breedId = e.target.value;
        let infoArray = await findInfoOfBreedById(breedId);
        console.log(infoArray);
        await createElementAndReplaceInformation(infoArray);
    });
};

const findInfoOfBreedById = async(breed_id) => {
    const url = imgUrl + breed_id;
    const obj = await axios.get(url);
    const data = obj.data[0];
    console.log(data);

    const name = data.breeds[0]['name'];
    const pictureUrl = data.url;
    const origin = data.breeds[0]['origin'];
    const description = data.breeds[0]['description'];
    const height = data.height;
    const weight = data.breeds[0]['weight']['metric'];
    const lifeSpan = data.breeds[0]['life_span'];
    const temperament = data.breeds[0]['temperament'];

    return [name,pictureUrl,origin,description,height,weight,lifeSpan,temperament];
};

const createElementAndReplaceInformation = async(array) => {
    const name = array[0];
    const pictureUrl = array[1];
    const origin = "Origin Country : " + array[2];
    const desc = array[3];
    const height = "Height : " + array[4] + " mm";
    const weight = "Weight : " + array[5] + " Kilograms";
    const lifeSpan = "Life Span : " + array[6] + " Years";
    const temperament =  "Temperament : " + array[7];

    const item = `
    <div class="cat">
        <div class="cat__text">
            <p class="tip">TOP TIPS FOR CATS</p>
            <h2 class="cat__name">${name}</h2>
            <p class="cat__desc">${desc}</p>
            <p class="cat__height">${height}</p>
            <p class="cat__weight">${weight}</p>
            <p class="cat__lifespan">${lifeSpan}</p>
            <p class="cat__temperament">${temperament}</p>
            <p class="cat__origin">${origin}</p>
        </div>
        <img class="cat__image lazyload blur-up" src='./images/ph.jpg' data-src="${pictureUrl}" alt="cat from api">
    </div>
    `;
    const cat = document.querySelector('.cat');
    if(cat != undefined){
        section.removeChild(cat);
    }
    section.insertAdjacentHTML("beforeend",item);
    loader.style.display = "none";
};

getInformationFromBreeds();