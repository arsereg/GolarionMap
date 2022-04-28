let svgMap = document.getElementById('svgMap');

let selectedNodes = [];
let arcosElements = {};
let nodosElements = {};

let ruta = document.getElementById('ruta');
let peso = document.getElementById('peso');

ruta.innerText = " "
peso.innerText = " El peso total de los arcos es: 0"





function agregarNodo($evento) {

    let keys = Object.keys(arcosElements);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let element = arcosElements[key];
        element.setAttribute('style', 'stroke:black');
    }

    let keysNodos = Object.keys(nodosElements);

    for (let i = 0; i < keysNodos.length; i++) {
        let key = keysNodos[i];
        let element = nodosElements[key];
        element.setAttribute('style', 'fill:white');
    }

    ruta.innerText = " "
    peso.innerText = " El peso total de los arcos es: 0"



    let name = $evento.path[0].id;
    if (selectedNodes.length == 2) {
        selectedNodes = [];
    } else if (selectedNodes.includes(name)) {
        selectedNodes = selectedNodes.filter(e => e !== name);
    } else {
        selectedNodes.push(name);
        selectedNodes.forEach(e => {
            let element = nodosElements[e];
            element.setAttribute('style', 'fill:red');
        });
    }

    if (selectedNodes.length == 2) {

        //Make http request with params
        let url = 'http://localhost:8080/api/graph/shortest-path?';
        let params = {
            origin: selectedNodes[0],
            destination: selectedNodes[1]
        };

        fetch(url + new URLSearchParams(params), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                res.json().then(result => {
                    for (let i = 0; i < result.arcos.length; i++) {
                        console.log(result.arcos[i]);
                        if (arcosElements[result.arcos[i]]) {
                            arcosElements[result.arcos[i]].setAttribute('style', 'stroke:red');
                        } else {
                            let array = result.arcos[i].split('-');
                            let aux = `${array[1]}-${array[0]}`;
                            arcosElements[aux].setAttribute('style', 'stroke:red');
                        }
                    }
                    ruta.innerText = selectedNodes[0] + " -> " + selectedNodes[1];
                    peso.innerText = "Peso: " + result.weight;



                })
            })
            .catch(error => console.error('Error:', error))
    }
}



svgMap.addEventListener("load", function() {

    var svgDoc = svgMap.contentDocument;

    let nodos = [
        "nerosyan",
        "starfall",
        "blackHorse",
        "chessed",
        "scrapwall",
        "hollowGarden",
        "chitterhome",
        "chokingTower",
        "marstol",
        "iadenveigh",
        "kuratown",
        "deadbridge",
        "hajoth",
        "blackpipe",
        "castleOfKnives",
        "mormouth",
        "falheart",
        "portIce",
        "sunderHorn",
        "egede",
        "hernesOak",
        "fortPortolmaeus",
        "boudor",
        "starKeep",
        "kenabres"
    ]
    for (let i = 0; i < nodos.length; i++) {
        let nodo = nodos[i];
        let node = svgDoc.getElementById(nodo);
        node.addEventListener("click", agregarNodo);
    }


    let arcos = [
        'kenabres-fortPortolmaeus',
        'kenabres-boudor',
        'fortPortolmaeus-starKeep',
        'starKeep-nerosyan',
        'nerosyan-starfall',
        'kenabres-egede',
        'egede-hernesOak',
        'egede-chessed',
        'portIce-sunderHorn',
        'sunderHorn-chitterhome',
        'scrapwall-hollowGarden',
        'chitterhome-falheart',
        'falheart-castleOfKnives',
        'kuratown-marstol',
        'marstol-iadenveigh',
        'iadenveigh-deadbridge',
        'iadenveigh-chokingTower',
        'chokingTower-blackpipe',
        'blackpipe-hajoth',
        'blackpipe-blackHorse',
        'blackHorse-mormouth',
        'chessed-scrapwall',
        'scrapwall-chitterhome',
        'fortPortolmaeus-scrapwall',
        'deadbridge-hajoth',
        'hajoth-castleOfKnives',
        'hollowGarden-chokingTower',
        'kuratown-deadbridge'
    ]

    for (let i = 0; i < arcos.length; i++) {
        let arc = arcos[i];
        let arcSvg = svgDoc.getElementById(arc);
        if (arcSvg === null) {
            console.log(`Arco nulo: ${arc}`);
        } else {
            arcosElements[arc] = arcSvg;
        }
    }

    for (let i = 0; i < nodos.length; i++) {
        let nodo = nodos[i];
        let nodoSvg = svgDoc.getElementById(nodo);
        if (nodoSvg === null) {
            console.log(`Nodo nulo: ${nodo}`);
        } else {
            nodosElements[nodo] = nodoSvg;
        }
    }



})