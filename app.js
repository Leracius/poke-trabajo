const section = document.getElementById("section")
const button = document.getElementById("button");
const imgCont = document.getElementById("front");
const pokeInfo = document.getElementById("back")
const pokeInput = document.getElementById("input") 
const xButton = document.getElementById("x-button")
const infoUser = document.getElementById("info-user")



xButton.addEventListener("click",()=>infoUser.style.display="none")

const pokeSet =(data)=>{
  let info = ""
  let name = data.name.toUpperCase()
  info += `
  <h2 id="name-h2">${name}</h2>
  <h2 id="id-h2">ID#: ${data.id}</h2>
  <h2 id="type-h2">Tipo: ${data.types.map((tipo) =>`<span class="${tipo.type.name}">${tipo.type.name.toUpperCase()}</span>`).join(" ")}</h2>
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
  pokeInfo.style.background="radial-gradient(circle, rgb(0, 0, 0), rgba(0, 0, 0, 0.267) 100%)"
  // "radial-gradient(circle, rgba(172,126,162,1) 0%, rgba(42,40,159,1) 49%, rgba(68,63,66,1) 92%)"
}

const showMessage =(text,num)=>{
    section.innerHTML=`<div id="error">${text}</div>`  
    setTimeout(()=>{
      section.innerHTML=""
      },num)
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
  else if(cont<899&&cont>0)callApi()
  else(showMessage("No se encontro ningun pokemon",2000))
}

button.addEventListener("click",()=>(valid()))

showMessage("Ingrese un numero y toque la lupa para buscar al pokemon por su id",5000)


