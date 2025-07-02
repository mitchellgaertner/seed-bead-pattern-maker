var patternMaker = (typeof patternMaker == "undefined" || !patternMaker) ? {} : patternmaker;

patternMaker.makeTopRows = async (quantity, length) => {
    let pattern = "";

    for(let i = 0; i < quantity; i++){
        pattern += `<table id="top-${i}"><tr>`
        if (i % 2 == 0 ){
            pattern += `<td class="bufferBlock"></td>`
        } 
        for (let j = 1; j <= length; j++){
            pattern += `<td class="patternBlock" id="top-td-${i}-${j}"><button class="colorBtn"><input class="beadColor vHid" type="color" value="#ffffff"></button></td>`
        }
        pattern += `</tr></table>`
    }

    document.querySelector(".topRows").innerHTML = pattern;

}

patternMaker.makeBottomRows = async (quantity, length) => {
    let pattern = "";

    for(let i = 0; i < quantity; i++){
        pattern += `<table id="bot-${i}"><tr>`
        for (let j = 0; j <= length; j++){
            pattern += `<td class="patternBlock" id="bot-td-${i}-${j}"><button class="colorBtn"><input class="beadColor vHid" type="color" value="#ffffff"></button></td>`
        }
        pattern += `</tr></table>`
    }

    document.querySelector(".bottomRows").innerHTML = pattern;
}

patternMaker.removeRow = (id) => {

}

patternMaker.reset = () => {

}

patternMaker.getPatternJSON = () => {
    let out = {}
    out.top = {};
    out.bot = {};
    let nodes = document.querySelectorAll(".patternBlock")
    for(let node of nodes){
        let half = (node.id.split('-')[0] == 'top') ? "top" : "bot";
        let row = (node.id.split('-')[2]);

        if (!out[half]["row" + row]){
            out[half]["row" + row] = []
        }
        out[half]["row" + row].push(node.firstChild.firstChild.value);

    }
    return out;
}

patternMaker.export = (filename) => {
  var element = document.createElement('a');
  let text = JSON.stringify(patternMaker.getPatternJSON());

  element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename + '.json');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

}

patternMaker.import = async () => {
    let pattern = await document.querySelector("#upload").files[0].text()
    pattern = JSON.parse(pattern);
    await patternMaker.makeTopRows(Object.keys(pattern.top).length, pattern.top.row0.length);
    await patternMaker.makeBottomRows(Object.keys(pattern.bot).length, pattern.bot.row0.length - 1);
    
    document.querySelectorAll('.colorBtn').forEach(i => {
        i.addEventListener('click', (e) => {
            let locked = document.querySelector('#colorLockBool').checked
            if (!locked){
                e.target.querySelector('*').showPicker();
            } else {
                e.target.querySelector('*').value = document.querySelector('#colorLock').value
                let newColor = e.target.querySelector('*').value;
                e.target.style = "background-color: " + newColor;
            }
            
        })
        i.querySelector('*').addEventListener('change', (e) => {
            i.style = 'background-color:' + e.target.value;
        })
    })

    let topKeys = Object.keys(pattern.top)
    for (let key of topKeys){
        let row = pattern.top[key];
        for(let i = 0; i<row.length; i++){
            let selector = "#top-td-" + key.replace(/\D/g, '') + "-" + (i + 1);
            document.querySelector(selector).firstChild.firstChild.value = row[i];
            document.querySelector(selector).firstChild.style = 'background-color:' + row[i];
        }
    }
    let botKeys = Object.keys(pattern.bot);
    for (let key of botKeys){
        let row = pattern.bot[key];
        for(let i = 0; i < row.length; i++){
            let selector = "#bot-td-" + key.replace(/\D/g, '') + "-" + (i);
            let el = document.querySelector(selector);
            el.firstChild.firstChild.value = row[i];
            el.firstChild.style = 'background-color:' + row[i];
        }
    }
}

patternMaker.setColor = (id) => {

}