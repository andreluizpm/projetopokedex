const pokemonName = document.querySelector('.pokemon_name'); // const cria uma variável que não muda o valor

const pokemonNumber = document.querySelector('.pokemon_number');

const PokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');

const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');

const buttonNext = document.querySelector('.btn-next');


let searchPokemon = 1; 

//procura o pokemon na api 
const fetchpokemon = async (pokemon) => {

    //o fetch busca os dados e await aguarda ate buscar
    const APIResponse =await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //caso a api retorna o status 200 e que deu certo
    if (APIResponse.status === 200) {

    //extrai os dados em json porém ela também leva um tempo para ser executada
    const data =await APIResponse.json();

    //retorna os dados do pokemon
    return data;

    }

}

const renderPokemon =async (pokemon) => {

    pokemonName.innerHTML = "loading...";

    pokemonNumber.innerHTML = "";
        //executa a função de buscar os dados do pokemon e guarda na variável data
        const data = await fetchpokemon(pokemon);

        if (data) {

            console.log(data); //so para saber o que a api respondeu

            PokemonImage.style.display = 'block'; //caso os dados exista ira retorna a imagem

            pokemonName.innerHTML = data.name; //caso os dados exista ira retorna o nome

            pokemonNumber.innerHTML = data.id; //caso os dados exista ira retorna o numero que sera o id

            //procura a imagem nas pastas 
            PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            searchPokemon = data.id;


            input.value = ''; //depois de pesquisar a busca sera resetado

        }

        else {

            //caso o pokemon não exista mostra na tela
            pokemonName.innerHTML = 'not found'

            //caso o pokemon não exista não mostra o numero
            pokemonNumber.innerHTML = '';

            //some a imagem caso o pokemon não exista
            PokemonImage.style.display = 'none';

            //se o pokemon não existir a variável ira receber 0 para poder usar os botões
            searchPokemon = 0;

        }

}   

//enviando o nome ou numero do pokemon ira fazer a pesquisa na variável fetchpokemon
form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

});

//se clicar no botão iria diminuir 1 na variável searchPokemon
buttonPrev.addEventListener('click', () => {

    if(searchPokemon > 1) {

        searchPokemon-= 1;
        renderPokemon(searchPokemon);

    }

});

//mesma lógica so que aumenta
buttonNext.addEventListener('click', () => {

    searchPokemon+= 1;
    renderPokemon(searchPokemon);

});

//renderiza o pokemon 1 
renderPokemon(searchPokemon);