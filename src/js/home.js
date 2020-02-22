console.log('Hola Mundo');

/*const getUser = new Promise((allfine, allwrong) => {
    //llamar a un api
    setTimeout(() => {
        allwrong('timeout');
    }, 3000);
});

getUser.then(() => {
    console.log('Todo bien en la vida')
}).catch((message) => {
    console.log(message)
});

Promise.race([
    getUser,
    getUser
]).then().catch((message) => {
    console.log(message)
});

/*$.ajax('https://randomuser.me/api/', {
    method: 'GET',
    success: (data) => {
        console.log(data)
    }, error: (error) => {
        console.log(error)
    }
});*/

fetch('https://randomuser.me/api/').then((response) => {
    //console.log(response)
    return response.json()
}).then((user) => {
    console.log('user', user.results[0].name.first)
}).catch(() => {
    console.log('Algo fallo')
});

//Envolviendo la funcion dentro de los parentesis y poniendolos al final, hace que la funcion se autoejecute

(async function load() {

    /*const $modalTitle = $modal.querySelector('h1');
    const $modalDescription = $modal.querySelector('p');
    const $modalImage = $modal.querySelector('img');*/
    const $featuringContainer = document.getElementById('featuring');

    /*MOSTRAR EL MODAL CUANDO LE DAMOS CLICK A UNA PELICULA*/
    //const $home = $('.home') //selector de clase con jQuery
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    function showModal() {
        $overlay.classList.add('active');
        $modal.style.animation = 'modalIn .8s forwards'
    }

    function hideModal() {
        $overlay.classList.remove('active');
        $modal.style.animation = 'modalOut .8s forwards'
    }

    $hideModal.addEventListener('click', hideModal);


    function addEventClick($element) {
        $element.addEventListener('click', () => {
            showModal();
        })
    }

    /*TRAER LA DATA DEL SERVIDOR*/
    async function getData(url) {
        const response = await fetch(url);
        return await response.json();
    }

    /*MOSTRAR CUADRO DE BUSQUEDA*/
    const $form = document.getElementById('form');
    const $home = document.getElementById('home');

    function setAttributes($element, attributes) {
        for (const attribute in attributes) {   //Esto va a iterar los elementos que esten dentro de attributes, creando una variable atributo donde se guardara el elemento iterado
            $element.setAttribute(attribute, attributes[attribute]);
        }
    }

    const BASE_API = 'https://yts.mx/api/v2/';

    function featuringTemplate(peli) {
        return (
            `
      <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>
      `
        )
    }

    $form.addEventListener('submit', async (event) => {
        event.preventDefault();
        $home.classList.add('search-active');
        const $loader = document.createElement('img');
        setAttributes($loader, {
            src: 'src/images/loader.gif',
            height: 50,
            width: 50
        });
        $featuringContainer.append($loader);
        const data = new FormData($form);
        const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
        $featuringContainer.innerHTML = featuringTemplate(peli.data.movies[0]);
    });

    /*RENDERIZAR LAS PELICULAS EN PANTALLA*/
    function videoItemTemplate(movie) {
        return (
            `<div class="primaryPlaylistItem>"
                <div class="primaryPlaylistItem-image">
                    <img src="${movie.medium_cover_image}" alt="${movie.title}">
                </div>
                <h4 class="primaryPlaylist-title">${movie.title}</h4>
            </div>`
        )
    }

    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0]
    }

    function renderMovieList(list, $container) {
        list.forEach((movie) => {
            //debugger
            const HTMLString = videoItemTemplate(movie);
            const movieElement = createTemplate(HTMLString);
            $container.append(movieElement);
            addEventClick($container);
        });
        $container.children[0].remove();
        console.log('Pelis mostradas!')
    }


    const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
    const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama');
    const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation');
    const $actionContainer = document.getElementById('action');
    const $dramaContainer = document.getElementById('drama');
    const $animationContainer = document.getElementById('animation');

    renderMovieList(actionList.data.movies, $actionContainer);
    renderMovieList(dramaList.data.movies, $dramaContainer);
    renderMovieList(animationList.data.movies, $animationContainer);


    /*'<div class="primaryPlaylistItem">' +
    '<div class="primaryPlaylistItem-image">' +
    '<img src="src/images/covers/midnight.jpg">' +
    < /div>
    '<h4 class="primaryPlaylistItem-title">Titulo de la peli </h4>'
    < /div>'*/ //ASI se haria con jQuery para crear template
    //console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'bitcoin'));

})();