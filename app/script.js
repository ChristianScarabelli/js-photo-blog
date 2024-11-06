console.log('Photo Blog')

// DOM 
const photosContainer = document.getElementById('photo_container')


const BASE_URL = 'https://jsonplaceholder.typicode.com/'
let url_body = 'photos'

const endpoint = BASE_URL + url_body

axios
    .get(endpoint, {
        params: {
            _limit: 6,
        },
    })
    .then((res) => {
        const photos = res.data  // variabile con i dati della chiamata

        appendPhotos(photos, photosContainer)
    })
    .catch((err) => {
        console.log(err)
    })

const appendPhotos = (photos, root) => {

    photos.forEach(photo => {
        const { url, title } = photo

        const photoCardHtml = `
        <div class="col col-4">
            <div class="photo_card_main">
                <figure class="photo_card_img">
                    <img id="photo_img" src="${url}" alt="Immagine non disponibile">
                    <img class="photo_pin" src="./img/pin.svg" alt="30">
                </figure>
                <div class="photo_card_text">
                    <p>
                        ${title}
                    </p>
                </div>
            </div>
        </div>
        `
        root.innerHTML += photoCardHtml
    })
}

