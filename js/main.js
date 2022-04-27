
let svgMap = document.getElementById('svgMap');

//lista arcos
let nerosyanStarfall;

let selectedNodes = [];

function agregarNodo($evento){
  let name = $evento.path[0].id;
  if(selectedNodes.length == 2){
    selectedNodes = [];
  }else if(selectedNodes.includes(name)){
    selectedNodes = selectedNodes.filter(e => e !== name);
  }else{
    selectedNodes.push(name);
  }

  if(selectedNodes.length == 2){
    nerosyanStarfall.setAttribute('style','stroke:green')

  }
  console.log(selectedNodes);
}



svgMap.addEventListener("load", function(){

  var svgDoc = svgMap.contentDocument;

  svgDoc.getElementById("nerosyan").addEventListener('click', agregarNodo);
  svgDoc.getElementById("starfall").addEventListener('click', agregarNodo);

  nerosyanStarfall = svgDoc.getElementById('nerosyan-starfall');


})
