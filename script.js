const list = document.querySelector(".list");
const inputSearch = document.querySelector(".search");
const btnNextPage = document.querySelector('.btn-arrow__next-page');
const btnPreviousPage = document.querySelector('.btn-arrow__previous-page');

let pokemonsList = [];

// total de nome de pokemons 1154
// total de imagens disponiveis pra plotar = 898
const amountOfPokemons = 100;
const pokemonsPerPage = 18;
let start = 0;
let end = pokemonsPerPage;

const fetchPokemons = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${amountOfPokemons}&offset=0`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            pokemonsList = result.results;
            pokemonsList.forEach((row, index) => row['id'] = index + 1)
            createPokemonsList(pokemonsList);

        })
        .catch(error => alert(error))
}

const createPokemonsList = (pokemonsList) => {
    list.innerHTML = ""
    for (let i = start; i < end; i++) {
        list.innerHTML += `
        <li class='items'>
            <img class='image' 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonsList[i].id}.png">
            <p class='name'>${pokemonsList[i].name}</p>
        </li>
  `;
    }
}
const createPokemonsFiltredList = (filtredList)=>{ 
    list.innerHTML = ""
    filtredList.forEach(pokemon=>{
        list.innerHTML += `
        <li class='items'>
            <img class='image' 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
            <p class='name'>${pokemon.name}</p>
        </li>
  ` 
    })
 } 

const filterPokemon = () => {
if(inputSearch.value != ''){
    createPokemonsFiltredList(pokemonsList.filter(pokemonFiltred => pokemonFiltred.name.toLowerCase().includes(inputSearch.value.toLowerCase())));
}else{
    createPokemonsList(pokemonsList);
}
}
const goToPreviousPage = () => {
    // console.log('anterior')
    if (start > 0) {
        start -= pokemonsPerPage
        end -= pokemonsPerPage
        createPokemonsList(pokemonsList);
    }

}
const goToNextPage = () => {
    // console.log('next')
    if (end < amountOfPokemons) {
        start += pokemonsPerPage
        end += pokemonsPerPage
        createPokemonsList(pokemonsList);
    }
}

fetchPokemons();
inputSearch.addEventListener('keyup', filterPokemon)
btnPreviousPage.addEventListener('click', goToPreviousPage)
btnNextPage.addEventListener('click', goToNextPage)
