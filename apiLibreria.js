function onJsonBooks(json)
{
    console.log('Json ricevuto...');
    console.log(json);

    const risultati = json.docs;
    const books = document.querySelector('#libreria');
    books.innerHTML='';

    for(let i=0; i<risultati.length; i++)
    {
        const titolo=risultati[i].title;
        const autore=risultati[i].author_name[0];
        const annoPublicazione = risultati[i].first_publish_year;
        const isbn = risultati[i].isbn[0];

        const img='https://covers.openlibrary.org/b/isbn/'+isbn+'-M.jpg';
        

        const tit = document.createElement('div');
        tit.classList.add('titolo');
        tit.textContent='TITOLO: '+titolo;

        const auth = document.createElement('div');
        auth.classList.add('autore');
        auth.textContent ='AUTORE: '+autore;

        const pub = document.createElement('div');
        pub.classList.add('annoPubblicazione');
        pub.textContent='ANNO DI PUBBLICAZIONE: '+annoPublicazione;

        const copertina = document.createElement('img');
        copertina.classList.add('copertina');
        copertina.src=img;

        books.appendChild(tit);
        books.appendChild(auth);
        books.appendChild(pub);
        books.appendChild(copertina);
    }
}
function onResponse(response)
{
    console.log('Promise ricevuta, restituisco json');
    return response.json();
}

function onError(error)
{
    console.log('Errore promise'+error);
}

function searchBooks(event)
{
    event.preventDefault();

    const valueInput = document.querySelector('#libriRicette');
    const searchValue = encodeURIComponent(valueInput.value);

    fetch('https://openlibrary.org/search.json?q='+searchValue).then(onResponse, onError).then(onJsonBooks);

}