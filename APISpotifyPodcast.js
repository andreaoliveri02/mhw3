/*NOTA: L'API di spotify era stata inserita per ricercare podcast di cucina o comunque a tema culinario. Purtroppo inserendo nella query il type 'episode' o simili
il file json restituito risulta vuoto di items nonostante i risultati ottenuti siano >0.
*/

function onJsonSpotify(json)
{   
    console.log('json ricevuto');
  
    const risultati = json.albums.items;
    const numRisultati = risultati.length;
    const albums = document.querySelector('#libreriaAlbum');
    albums.innerHTML = '';

    for(let i =0; i<5; i++)
    {
        
        const singleAlbum = risultati[i];

        const imageAlbum = singleAlbum.images[0].url;

        const nomeAlbum = singleAlbum.name;
        const dataRilascio = singleAlbum.release_date;
        
        
        const link_album = singleAlbum.external_urls.spotify
        
        const img = document.createElement('img');
        img.classList.add('copertina');
        img.src = imageAlbum;

        const desc = document.createElement('div');
        desc.classList.add('descrizione');
        desc.textContent ='NOME PODCAST: '+ nomeAlbum;

        const dataAlbum = document.createElement('div');
        dataAlbum.classList.add('rilascio');
        dataAlbum.textContent ='DATA USCITA:'+dataRilascio;

        const rif = document.createElement('a');
        rif.href= link_album;
        rif.textContent= 'Link al podcast';

        const infoAlbum = document.createElement('div');
        infoAlbum.classList.add('infoAlbum');

        infoAlbum.appendChild(img);
        infoAlbum.appendChild(desc);
        infoAlbum.appendChild(dataAlbum);
        infoAlbum.appendChild(rif);

        albums.appendChild(infoAlbum);
    }

}  

function onResponse(response)
{
    console.log('Funzione onResponse: ritorno il json');
    return response.json();

}
function onError(error)
{
    console.log('Errore:'+error);
}

function ricercaPodcast(event)
{
    event.preventDefault(); 
    const podcast_input = document.querySelector('#podcast');
    const podcast_value = encodeURIComponent(podcast_input.value); 

    console.log('Eseguo la ricerca del podcast'+ podcast_value);

    
    fetch("https://api.spotify.com/v1/search?type=album&q=" + podcast_value, // avrei dovuto inserire 'type=episode' oppure 'type= show'
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(onResponse, onError).then(onJsonSpotify);
}




function onTokenJson(json)
{
    console.log('Token ottenuto')
    token=json.access_token; 
}
function onTokenResponse(response)
{
    return response.json();
}

function onTokenError(error)
{
    console.log('Errore nella promise'+error);
}

const client_id = '30c0465b34914334adb3c083523dbf58';
const client_secret = '6bfb7a82d33f415d9733c18653c78736';
let token;
fetch('https://accounts.spotify.com/api/token',
    {
        method: "post",
        body: 'grant_type=client_credentials',
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret) 
        }
    }).then(onTokenResponse, onTokenError).then(onTokenJson);

  