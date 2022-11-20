const section = document.getElementById("section")
const button = document.getElementById("button");
const imgCont = document.getElementById("container");
const pokeInfo = document.getElementById("poke-information")
const pokeInput = document.getElementById("input") 


const pokeSet =(data)=>{
  let info = ""
  let name = data.name.toUpperCase()
  info += `
  <h2 id="name-h2">${name}</h2>
  <h2 id="type-h2">Tipo: ${data.types[0].type.name}</h2>
  <h2 id="height-h2">Altura: ${data.height*10} Cm</h2>
  <h2 id="weight-h2">Peso: ${data.weight/10} Kg</h2>
  `
  pokeInfo.innerHTML=info
}

const addImg = (call)=>{
  let pokeImg = ''
  pokeImg +=`<div id="img-container">
              <img id="poke-img" src=${call.sprites.other.home.front_default} alt="pokeimg">
            </div>`
  imgCont.innerHTML=pokeImg
}

const showError =(text)=>{
    section.innerHTML=`<div id="error">${text}</div>`  
    setTimeout(()=>{
      section.innerHTML=""
      },2000)
}

const callApi = async()=>{
      let cont = pokeInput.value
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${cont}`)
      const resJson = await res.json()
      pokeSet(resJson)
      addImg(resJson)
}

const valid = ()=>{
  let cont = pokeInput.value
  console.log(cont);
  if(cont=="")showError("Por favor ingrese un numero")
  else if(cont<900&&cont>0)callApi()
  else(showError("No se encontro ningun pokemon"))
}

button.addEventListener("click",()=>(valid()))



