var data = [{
    "Nom":"Lycée Litrée",
    "text":"Le lycée Litrée est un lycée de la manche situé dans la ville d'Avranches, Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem fugiat voluptates quo rerum voluptatem at amet, ipsum quam earum ducimus unde autem consequuntur voluptate esse?",
    "dataset":{
        "lat":"48.6785835286019",
        "lng":"-1.3595749669243617"
    }
},{
    "Nom":"Collège Challemel Lacour",
    "text":"Le collège Challemel Lacour est un collège de la manche situé dans la ville d'Avranches, Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem fugiat voluptates quo rerum voluptatem at amet, ipsum quam earum ducimus unde autem consequuntur voluptate esse?",
    "dataset":{
        "lat":"48.68339364956827",
        "lng":"-1.3625707317904994"
    }
},{
    "Nom":"Ecole Primaire André Parisy",
    "text":"L'Ecole Primaire André Parisy est une école primaire de la manche situé dans la ville d'Avranches, Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem fugiat voluptates quo rerum voluptatem at amet, ipsum quam earum ducimus unde autem consequuntur voluptate esse?",
    "dataset":{
        "lat":"48.696571589190576",
        "lng":"-1.3469369619505416"
}
}]

var NumeroCard = 0
var Marker = []

window.onload = ()=>{
    let title = document.getElementsByClassName("card-title")[0]
    title.textContent = data[NumeroCard]['Nom']
    let text = document.getElementsByClassName("card-text")[0]
    text.textContent = data[NumeroCard]['text']
    let contener = document.getElementsByClassName("card-text-contener")[0]
    contener.setAttribute("data-lat",data[NumeroCard]["dataset"]["lat"])
    contener.setAttribute("data-lng",data[NumeroCard]["dataset"]["lng"])
}

let $map = document.querySelector('#map')

class GoogleMap {

    constructor() {
        this.map = null
    }

    /**
     * Charge la carte sur un élément
     * @param {HTMLElement} Element 
     */
    async load(Element) {
        return new Promise((resolve, reject)=> {
            $script('https://maps.googleapis.com/maps/api/js', () => {
                let center = { lat: 48.6785835286019, lng: -1.3595749669243617 };
                this.map = new google.maps.Map(Element,{
                    zoom: 14.5,
                    center: center,
                })
                resolve()
            })
        })
    }

    /**
     * Ajoute un marker sur la map
     * @param {string} lat 
     * @param {string} lng 
     */
    addMarker (lat, lng) {
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lng),
            map:this.map,
            title:'Position'
        })
        Marker.push(marker)
    }

    /**
     * Supprime le marker
     */
    delMarker() {
        Marker[0].setMap(null)
        Marker = []
    }

    /**
     * Recentre la caméra de la map, les paramêtres sont des string car on les convertis par 
     * la suite ainsi pour éviter toute erreur ne pas mettre de number
     * @param {string} lat 
     * @param {string} lng 
     */
    center(lat, lng) {
        let center = { lat: parseFloat(lat), lng: parseFloat(lng)};
        this.map.setCenter(center,15)
    }
}

var map = new GoogleMap()

const initMap = async function() {
    await map.load($map)
    Array.from(document.querySelectorAll(".item")).forEach(function (item) {
            map.addMarker(item.dataset.lat, item.dataset.lng)
    })
}

if (map !== null) {
    initMap()
    BtnDisable()
}

function CardCreator() {
    let title = document.getElementsByClassName("card-title")[0]
    title.textContent = data[NumeroCard]['Nom']
    let text = document.getElementsByClassName("card-text")[0]
    text.textContent = data[NumeroCard]['text']
    let contener = document.getElementsByClassName("card-text-contener")[0]
    contener.setAttribute("data-lat",data[NumeroCard]["dataset"]["lat"])
    contener.setAttribute("data-lng",data[NumeroCard]["dataset"]["lng"])
} 

function BtnDisable() {
    if(NumeroCard==0) {
        let btn = document.getElementsByClassName("btn-previous")[0]
        btn.setAttribute("disabled","true")
        if (btn.hasAttribute("enabled")==true) {
            btn.removeAttribute("enabled")
        }
    }
    if(NumeroCard!=0) {
        let btn = document.getElementsByClassName("btn-previous")[0]
        btn.setAttribute("enabled","true")
        if (btn.hasAttribute("disabled")==true) {
            btn.removeAttribute("disabled")
        }
    }
    if(NumeroCard== data.length-1) {
        let btn = document.getElementsByClassName("btn-next")[0]
        btn.setAttribute("disabled","true")
        if (btn.hasAttribute("enabled")==true) {
            btn.removeAttribute("enabled")
        }
    }
    if(NumeroCard!= data.length-1) {
        let btn = document.getElementsByClassName("btn-next")[0]
        btn.setAttribute("enabled","true")
        if (btn.hasAttribute("disabled")==true) {
            btn.removeAttribute("disabled")
        }
    }
}

function NextCard() {
    if (NumeroCard != data.length-1) {
        map.delMarker()
        NumeroCard += 1
        CardCreator()
        let contener = document.getElementsByClassName("card-text-contener")[0]
        map.addMarker(contener.dataset.lat, contener.dataset.lng)
        map.center(contener.dataset.lat, contener.dataset.lng)
        BtnDisable()
    }
}

function PreviousCard() {
    if (NumeroCard != 0) {
        map.delMarker()
        NumeroCard -= 1
        CardCreator()
        let contener = document.getElementsByClassName("card-text-contener")[0]
        map.addMarker(contener.dataset.lat, contener.dataset.lng)
        map.center(contener.dataset.lat, contener.dataset.lng)
        BtnDisable()
    }
}