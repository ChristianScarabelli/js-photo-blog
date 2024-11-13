console.log('Photo Blog')

// DOM
const overlayEl = document.getElementById('overlay')
const overlayImg = document.getElementById('overlay_img')
const closePhotoButtonEl = document.getElementById('close_photo_btn')

const baseUrl = 'https://jsonplaceholder.typicode.com/'
const urlBody = 'photos'
const endPoint = baseUrl + urlBody

// Chiamata Ajax con Axios
axios
    .get(endPoint, {
        params: {
            _limit: 6,
        },
    })
    .then((res) => {
        console.log(res)
        const photos = res.data // Variabile con i dati della chiamata
        createAppendPhotoCard(photos) // chiamo la funzione appena arrivati i dati
    })
    .catch((err) => {
        console.error(err)
    })

// Funzione per creare e appendere la card con i dati della chiamata ed eventi click alle card
const createAppendPhotoCard = (photos) => {
    const photoCardFragment = document.createDocumentFragment()

    photos.forEach((photo) => {
        const { url, title } = photo

        const photoCardCol = document.createElement('div')
        photoCardCol.classList.add('col', 'col-4')
        photoCardCol.innerHTML = `
            <div class="photo_card_main">
                <figure class="photo_card_img">
                    <img class="photo_img" src="${url}" alt="${title}">
                    <img class="photo_pin" src="./img/pin.svg" alt="Pin icon">
                </figure>
                <div class="photo_card_text">
                    <p>${title}</p>
                </div>
            </div>
        `
        photoCardFragment.appendChild(photoCardCol)
    })
    // recupero il container dal dom e appendo il frammento con le card
    const photoContainerEl = document.getElementById('photo_container').appendChild(photoCardFragment)

    // recupero la card dal frammento
    const photoCardMainEls = document.querySelectorAll('.photo_card_main')

    // evento al click di ogni card
    photoCardMainEls.forEach((card, index) => {
        card.addEventListener('click', () => {
            overlayEl.classList.remove('display_none')
            document.body.style.overflow = 'hidden'

            // recupero l'url per ogni indice della variabile photos 
            const { url } = photos[index]
            // l'immagine dell'overlay ha l'url dell'indice della card cliccata
            overlayImg.src = url
        })
    })
}

// OVERLAY
// Chiudo l'overlay quando si clicca sull'overlay stesso ma non sull'immagine
overlayEl.addEventListener('click', (event) => {
    if (event.target === overlayEl) {
        overlayEl.classList.add('display_none')
        document.body.style.overflow = 'auto'
    }
})

// Chiudo l'overlay quando si clicca sul bottone chiudi
closePhotoButtonEl.addEventListener('click', () => {
    overlayEl.classList.add('display_none')
    document.body.style.overflow = 'auto'
})