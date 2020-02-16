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

    //const $home = $('.home') //selector de clase con jQuery
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('h1');
    const $modalDescription = $modal.querySelector('p');
    const $modalImage = $modal.querySelector('img');

    const $featuringContainer = document.getElementById('featuring');
    const $form = document.getElementById('form');
    const $home = document.getElementById('home');

    const $actionContainer = document.querySelector('#action');
    const $dramaContainer = document.querySelector('#drama');
    const $animationContainer = document.querySelector('#animation');

    async function getData(url) {
        const response = await fetch(url);
        return await response.json();
    }

    const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');

    console.log('pelis-action', actionList);

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
            console.log(HTMLString);
        });
    }

    renderMovieList(actionList.data.movies, $actionContainer);


    /*'<div class="primaryPlaylistItem">' +
    '<div class="primaryPlaylistItem-image">' +
    '<img src="src/images/covers/midnight.jpg">' +
    < /div>
    '<h4 class="primaryPlaylistItem-title">Titulo de la peli </h4>'
    < /div>'*/ //ASI se haria con jQuery para crear template
    //console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'bitcoin'));

})();