function onJson(json)
{
    console.log('Stampo il json');
    console.log(json);

    const risultati = json.hits;
    const ricette = document.querySelector('#ricette');
    ricette.innerHTML='';

    for(let i = 0; i<10; i++)
    {
        const descPiatto = document.createElement('div');
        descPiatto.classList.add('piatto');
        const risultato = risultati[i];

        const calorie = risultato.recipe.calories;
        const nomePiatto = risultato.recipe.label;
        const tipoPiatto = risultato.recipe.dishType[0];
        

        const kcal = document.createElement('div');
        kcal.classList.add('calorie');
        kcal.textContent='Calorie:  '+ calorie+' kcal';

        const dishName = document.createElement('div');
        dishName.classList.add('nomePiatto');
        dishName.textContent='Nome piatto:  '+nomePiatto;

        const typeDish = document.createElement('div');
        typeDish.classList.add('tipoPiatto');
        typeDish.textContent='Tipologia piatto:  '+tipoPiatto;

        descPiatto.appendChild(dishName);
        descPiatto.appendChild(typeDish);
        descPiatto.appendChild(kcal);
        for(let j=0; j<5; j++)
            {
                const ingrediente = risultato.recipe.ingredientLines[j]; 
                const ingr = document.createElement('div');
                ingr.classList.add('ingrediente');
                ingr.textContent= 'Ingrediente '+(j+1)+': '+ingrediente;
                descPiatto.appendChild(ingr);
            }
        ricette.appendChild(descPiatto);
    }
}

function onResponse(response)
{
    console.log('Promise ricevuta, restituisco json');
    return response.json();
}
function onError(error)
{
    console.log('Errore'+error);
}
function searchForIngredientes(event)
{
    event.preventDefault();
    const inputData=document.querySelector('#ingrediente');
    const inputValue=encodeURIComponent(inputData.value);

    fetch('https://api.edamam.com/api/recipes/v2?type=public&q='+inputValue+'&app_id='+appID+'&app_key='+apiKey).then(onResponse, onError).then(onJson);
}
const appID='23db2455';
const apiKey = '38587711c00e8bd03fddfde455006e81';

