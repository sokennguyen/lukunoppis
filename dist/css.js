
function applyStylesToElement(element, styles) {
    for (let key in styles) {
        element.style[key] = styles[key];
    }
}
let rootwidth = 45;
let rootgoldenRatio = rootwidth / 1.61803398875;


function trootCss() {
    let troot = document.getElementById("maintable");
    let backgroundcolor = document.getElementById("background");
    let width = rootwidth;
    let goldenRatio = width / 1.61803398875;

    applyStylesToElement(troot, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: "100vw",
        height: "100vh",
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        backgroundColor: "deepskyblue"

    });
    applyStylesToElement(backgroundcolor, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: "100vw",
        height: "100vh",
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        backgroundColor: "black",
        zIndex: "-100"
    });
    return troot;
}

function addPlayerdivCss() {
    let div = document.getElementById("addPlayerdiv");
    let height = rootwidth * 0.3;;
    let goldenRatio = rootgoldenRatio / 1.61803398875;

    applyStylesToElement(div, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${rootgoldenRatio}vw`,
        height: `${rootwidth}vw`,
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        backgroundColor: "white",
        zIndex: "-1"

    });
    return div
}
function canvasCss() {
    let canvas = document.createElement("canvas");
    applyStylesToElement(canvas, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: "10"

    });

    return canvas;
}
let boardPieceWidth = 5;
let boardPieceHeight = 5;

function pawnCss() {
    let canvas = document.createElement("canvas");
    applyStylesToElement(canvas, {
        position: "absolute",
        top: '50%',  
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: `${boardPieceWidth}vw`,
        height: `${boardPieceHeight}vw`,
    });

    return canvas;
}
function squareCss() {
    let img = document.createElement("img");
    img.src = 'kirja.png';  
    applyStylesToElement(img, {
        position: 'absolute',
        right: '0%',
        top: '0%',
        width: '10vw',
        height: '8vw',
    });
    return img;
}

function pawnCss() {
    let img = document.createElement("canvas");
    applyStylesToElement(img, {
        position: 'absolute',
        right: '0%',
        top: '0%',
        width: '10vw',
        height: '10vw',
    });
    return img;
}
function playerOnCss(bool) {
    let div = document.getElementById("addPlayerdiv");
    let root = document.getElementById("background");
    if (bool) {  
    applyStylesToElement(div, {
        zIndex: "10"
    });
    applyStylesToElement(root, {
        zIndex: "1",
        opacity: "0.4" 
    });
    }
    if (!bool) {
        applyStylesToElement(div, {
            zIndex: "-1"
        });
        applyStylesToElement(root, {
            zIndex: "-1",
        });
    }
}


