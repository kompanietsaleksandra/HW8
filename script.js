class GetJsonData {

    constructor() {}

    async getData (url) {
        return await new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function() {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.send();
        });
    }
}

class WriteJsonToDocument {

    constructor(json, elemId) {
        this.json = json;
        this.elemId = elemId;
        this.init();
    }

    init() {
        const targetElement = document.getElementById(this.elemId);
        Object.keys(this.json.planets).forEach((k) => {

            let planetCont = document.createElement('div');
            planetCont.className = 'planet-container';
            targetElement.appendChild(planetCont);

            let divCont = document.createElement('div');
            divCont.className = 'image-container';
            planetCont.appendChild(divCont);

            let img = document.createElement('img');
            img.src = this.json.planets[k].url;
            divCont.appendChild(img);

            let textCont = document.createElement('div');
            textCont.className = 'text-container';
            planetCont.appendChild(textCont);

            let title = document.createElement('div');
            title.className = 'title';
            title.innerText = this.json.planets[k].title;
            textCont.appendChild(title);

            let listCont = document.createElement('div');
            listCont.className = 'list-container';
            textCont.appendChild(listCont);

            this.json.planets[k].info.forEach((el)=> {
                let listEl = document.createElement('div');
                listEl.className = 'list-container';
                listEl.innerText = el;
                listCont.appendChild(listEl);
            })
        })
    }
}

function writeData() {
    return new GetJsonData().getData("https://trevadim.github.io/vue/data/data.json").then(
        response => new WriteJsonToDocument(JSON.parse(response), 'container'),
        error => alert(`Rejected: ${error}`)
    );
}

writeData();

