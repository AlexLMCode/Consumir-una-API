console.log('Hola Mundo');

const getUser = new Promise((allfine, allwrong) => {
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