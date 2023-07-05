let currentPageUrl = 'https://swapi.dev/api/people/'


// chamamno a função para pegar os personagem da API. função assincrona, ela espera o retorno da função try.
window.onload = async() => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os personagens');
    }

    // configurando os eventos de botão
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};


// a função espera o retorno do parametro (url) 
async function loadCharacters(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';  // limpa os resultados anteriores

    try {

        const response = await fetch(url); 
        const responseJson = await response.json(); // convertendo para json

        responseJson.results.forEach((character) => {
            const card = document.createElement("div") // metodo para criar tags na html
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')` // usandro crase pois será um valor dinâmico no código, função replace para buscar o id de cada imagem
            card.className = "cards"




            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"


            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`  // busca dentro da API o nome do personagem para chamá-lo no card


            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG) // colocando as tags umas dentro das outras, como está no html, criando as dependencias entre elas

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"
                
                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "character-details"
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-details"
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color) }`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento: ${convertBirthYear (character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
            }
            const mainContent = document.getElementById('main-content');
            mainContent.appendChild(card);
        });
        // criando o array de personagens (cads) no html usando o JS.

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        // alterando a visibilidade do backbutton no css
        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

        currentPageUrl = url  // dinamizando o valor de url lá do card

    } catch {
        console.log(error);
        alert('Erro ao carregar os personagens');
    }
}


// currentPageUrl gerou uma url, fetch usa essa url especifica. currentPageUrl é uma variável para poder pegar um parâmetro (url) da API por card.
// limpar os resultados anteriores serve para criar o efeito de paginas, caso contrário iria acrescentando os personagem em lista criando uma grande pagina unica com vários cards

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor(eyeColor) {
    const cores = {
      blue: "azul",
      brown: "castanho",
      green: "verde",
      yellow: "amarelo",
      black: "preto",
      pink: "rosa",
      red: "vermelho",
      orange: "laranja",
      hazel: "avela",
      unknown: "desconhecida",
      'blue-gray': "azul-acinzentado"
    };
  
    return cores[eyeColor.toLowerCase()] || eyeColor;
  }
  
  function convertHeight(height) {
    if (height === "unknown") {
      return "desconhecida";
    }
    
    return (height / 100).toFixed(2);
  }
  
  function convertMass(mass) {
    if (mass === "unknown") {
      return "desconhecido";
    }
    
    return `${mass} kg`;
  }
  
  function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
      return "desconhecido";
    }
    
    return birthYear;
  }

async function loadNextPage() {
    if (!currentPageUrl) return; // checando se existe uma próxima pagina na API

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)


    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return; // checando se existe uma próxima pagina na API

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

        
    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página')
    }
}



