var patternMaker = (typeof patternMaker == "undefined" || !patternMaker) ? {} : patternmaker;

patternMaker.makeTopRows = (quantity, length) => {
    let pattern = "";

    for(let i = 0; i <= quantity; i++){
        pattern += `<table id="top-${i}"><tr>`
        if (i % 2 == 0 ){
            pattern += `<td class="bufferBlock"></td>`
        } 
        for (let j = (i % 2 == 0) ? 1 : 0; j <= length; j++){
            pattern += `<td class="patternBlock id="td-${i}-${j}"><input class="beadColor" type="color" value="#ffffff"></td>`
        }
        pattern += `</tr></table>`
    }

    document.querySelector(".topRows").innerHTML = pattern;

}

patternMaker.makeBottomRows = (quantity, length) => {
    let pattern = "";

    for(let i = 0; i <= quantity; i++){
        pattern += `<table id="top-${i}"><tr>`
        for (let j = 0; j <= length; j++){
            pattern += `<td class="patternBlock id="td-${i}-${j}"><input class="beadColor" type="color" value="#ffffff"></td>`
        }
        pattern += `</tr></table>`
    }

    document.querySelector(".bottomRows").innerHTML = pattern;
}

patternMaker.removeRow = (id) => {

}

patternMaker.reset = () => {

}

patternMaker.save = () => {

}

patternMaker.export = () => {

}

patternMaker.import = (obj) => {

}

patternMaker.setColor = (id) => {

}