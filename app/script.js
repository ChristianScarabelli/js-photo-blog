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
        console.log(photos)
        appendPhotos(photos, photosContainer) // Chiamo la funzione per appendere in HTML le card
        addCardClickEventListeners() // Chiamo la funzione per gli eventi dei click alle card e al bottone
    })
    .catch((err) => {
        console.log(err)
    })

// Funzione per generare le cards in HTML
const appendPhotos = (photos, root) => {
    photos.forEach(photo => {
        const { url, title } = photo
        const photoCardHtml = `
        <div class="col col-4">
            <div class="photo_card_main">
                <figure class="photo_card_img">
                    <img class="photo_img" src="${url}" alt="Immagine non disponibile">
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

// LOGICA DEL CLICK AL BOTTONE E DEL CLICK ALLE CARD 
// Dom
const closePhotoButtonEl = document.getElementById('close_photo_btn')
const overlayEl = document.getElementById('overlay')

// Evento al click bottone per chiudere l'overlay
closePhotoButtonEl.addEventListener('click', () => {
    overlayEl.classList.add('display_none')
    document.body.style.overflow = 'auto'
})


// Evento al click dell'overlay per chiuderlo anche non cliccando sul tasto
overlayEl.addEventListener('click', (event) => {
    if (event.target === overlayEl) {  // target è l'obiettivo dell'evento, così da escludere altre zone di click
        overlayEl.classList.add('display_none')
        document.body.style.overflow = 'auto'
    }
})


// Dom
const overlayImgEl = document.getElementById('overlay_img')
// Funzione per aggiungere evento click a tutte le card
const addCardClickEventListeners = () => {
    const mainPhotoCardEls = document.querySelectorAll('.photo_card_main')

    mainPhotoCardEls.forEach(card => {
        card.addEventListener('click', () => {
            overlayEl.classList.remove('display_none')
            document.body.style.overflow = 'hidden'
        })
    })
}

// overlayImgEl.innerHTML = ` src=${url.src} `