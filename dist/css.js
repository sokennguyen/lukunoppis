
function applyStylesToElement(element, styles) {
    for (let key in styles) {
        element.style[key] = styles[key];
    }
}

function styleBackGround(element, color, zindex, Opacity) {
    applyStylesToElement(element, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: "100vw",
        height: "100vh",
        transform: 'translate(-50%, -50%)',
        overflow: 'auto'
    });
    if (color) {
        applyStylesToElement(element, {
            backgroundColor: color
        });
    }
    if (zindex) {
        applyStylesToElement(element, {
            zIndex: zindex
        });
    }
    if (Opacity) {
        applyStylesToElement(element, {
            opacity: Opacity
        });
    }

}

let rootwidth = 45;
let rootgoldenRatio = rootwidth / 1.61803398875;

function trootCss() {
    let troot = document.getElementById("maintable");
    let background = document.getElementById("background");
    background.onclick = () => {
        bigBookOnCss(false);
    }

    let backgroundpicture = document.createElement("div");
    let backgroundcolor = document.getElementById("backgroundcolor");

    styleBackGround(troot);
    styleBackGround(background, "black", "-100", "0.5");

    styleBackGround(backgroundcolor, "honeydew", "-1","0.6");
    styleBackGround(backgroundpicture, null, "-5");

    // Generate a random zoom level between 100% and 150%
    let zoom = Math.floor(Math.random() * (150 - 100 + 1) + 100) + "%";

    // Generate a random position between 0% and 100% for X and Y
    let positionX = Math.floor(Math.random() * 101) + "%";
    let positionY = Math.floor(Math.random() * 101) + "%";

    applyStylesToElement(backgroundpicture, {
        backgroundImage: 'url(./images/background1.png)',
        backgroundSize: zoom,
        backgroundPosition: positionX + " " + positionY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: "1",
        pointerEvents: "none"
    });

    troot.appendChild(backgroundcolor)
    troot.appendChild(backgroundpicture);
    return troot;
}

function playerOnScreenCss() {
    for (let i = 0; i < pawnColors.length; i++) { 
        let canvas = document.createElement("canvas");
        canvas.setAttribute('id', "canvas" + i)
        canvas.style.pointerEvents = 'none';

        applyStylesToElement(canvas, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
            zIndex: "15",
                opacity: "1" 


        });
        //console.log(canvas)
        troot.appendChild(canvas)
      }
}
async function showPlayerCss(colourId) {
    for (let i = 0; i < pawnColors.length; i++) {
            let canvas = document.getElementById("canvas" + i);
            applyStylesToElement(canvas, {
                opacity: "0.0"            });
    }
    if (!hideAll) { 
    let canvas = document.getElementById("canvas" + colourId);
    applyStylesToElement(canvas, {
        opacity: "1"
    });
    }
    }

let boardPieceWidth = 5;
let boardPieceHeight = 5;

function bigBookCss() {
    let divElem = document.createElement("div");
    divElem.setAttribute("id", "bigBook");

    applyStylesToElement(divElem, {
        zIndex: "-110",
        position: 'absolute',
        right: '50%',
        top: '50%',
        width: '25vw',
        height: '25vw',
        backgroundImage: 'url(./images/Kirja.png)',
        backgroundSize: 'cover',
        transform: 'translate(50%, -50%)',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",


        // Styles for text inside the book:
        fontFamily: 'Roboto, sans-serif', // Using our playful font. Fall back to sans-serif if it doesn't load.
        fontSize: '4vw',  // Larger font size for easy readability
        color: '#000',    // Dark color for contrast, but can be adjusted as needed
        textShadow: '2px 2px 4px rgba(255,255,255,0.7)', // A soft shadow for depth and readability

                // Styles for text wrapping:
        padding: '10%', // Add some padding to ensure text doesn't touch the edges
        overflow: 'hidden', // Hide any overflow content
        whiteSpace: 'normal', // Allow text to wrap to next line
        textAlign: 'center', // Center align text
        wordWrap: 'break-word' // Break words if
    });

    document.body.appendChild(divElem);
    return divElem;
}

function bigBookOnCss(bool) {
    let div = document.getElementById("bigBook");
    let root = document.getElementById("background");
    if (bool) {
        applyStylesToElement(div, {
            zIndex: "10"
        });
        applyStylesToElement(root, {
            zIndex: "5",
        });
    }
    if (!bool) {
        applyStylesToElement(div, {
            zIndex: "-10"
        });
        applyStylesToElement(root, {
            zIndex: "-100"
        });
    }
    console.log(previousPlayer)
    console.log(players[previousPlayer].currentPos)
    console.log(players[previousPlayer])
    div.textContent = tasks[players[previousPlayer].currentPos - 1]

}


function squareCss() {
    let img = document.createElement("img");
    img.src = './images/Kirja.png';
    applyStylesToElement(img, {
        position: 'absolute',
        right: '0%',
        top: '0%',
        width: '10vw',
        height: '8vw',
        //boxShadow: "inset 5px 5px 5px rgba(0, 0, 0, 0.3)",
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
        zIndex: "9",
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


function addPlayerdivCss() {
    // Retrieve the images by ID
    const img4 = document.getElementById("4");
    const img5 = document.getElementById("5");
    const img7 = document.getElementById("7");
    const img8 = document.getElementById("8");
    const img10 = document.getElementById("10");
    const img11 = document.getElementById("11");

    // Calculate the boundaries
    const topEdge = Math.max(img4.offsetTop + img4.offsetHeight, img5.offsetTop + img5.offsetHeight);
    const bottomEdge = Math.min(img10.offsetTop, img11.offsetTop);
    const rightBoundary = window.innerWidth - (img7.offsetLeft);  // This calculates the distance from the right edge of the screen to the left side of the leftmost image
    const leftBoundary = window.innerWidth - (img4.offsetLeft + img4.offsetWidth);  // This calculates the distance from the right edge of the screen to the right side of the rightmost image

    let div = document.getElementById("addPlayerdiv");
    let height = rootwidth * 0.3; // Assuming rootwidth is defined somewhere in your code
    let goldenRatio = rootgoldenRatio / 1.61803398875; // Assuming rootgoldenRatio is defined

    let reducedWidth = (leftBoundary - rightBoundary) * 0.9;
    let reducedHeight = (bottomEdge - topEdge) * 0.6;

    const [darker, lighter] = generateShades("white");
    applyStylesToElement(div, {
        position: 'absolute',
        top: `calc(${topEdge}px + 5%)`,  // Centered vertically
        right: `calc(${rightBoundary}px + 5%)`,  // Centered horizontally
        width: `${reducedWidth}px`,
        height: `${reducedHeight}px`,
        //overflow: 'auto',
        backgroundColor: lighter,
        border: "4px solid " + darker,
        borderRadius: "15px",
        fontFamily: "'Comic Sans MS', sans-serif",
        zIndex: "1",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)"
    });
    return div;
}

function inputPlayerNameCss() {
    let div = document.getElementById("addPlayerdiv");

    // Create inputDiv and style it
    let inputDiv = document.createElement("div");
    applyStylesToElement(inputDiv, {
        height: '12%',
        margin: '8px 0',
        width: "100%",
    });

    // Create input element and style it
    let inp = document.getElementById("input-playername");
    inp.type = "text";
    applyStylesToElement(inp, {
        width: '50%',
        height:"100%",
        padding: '12px 20px',
        display: 'inline-block',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        float: 'left'  // Use float to place it side by side with the button
    });
    createButton()
    // Create the Add Player button
    let addButton = document.getElementById("addPlayer");
    addButton.innerHTML = "Add";
    applyStylesToElement(addButton, {
        float: 'right'  // Use float to place it side by side with the input
    });


    // Create the select element (dropdown)
    let colorDropdown = createColorDropdown(colors);
    colorDropdown.id = "colorSelection";  // You can give it an id for easier referencing later on
 
    

    // Append the elements to their respective parents
    inputDiv.appendChild(inp);
    inputDiv.appendChild(addButton);

    inputDiv.appendChild(colorDropdown);  // Adding the dropdown to the div
    div.appendChild(inputDiv);
}


function createButton() {
    // Button creation and styling
    let button = document.getElementById("addPlayer");
    const [darker, lighter] = generateShades("black");
    const [wdarker, wlighter] = generateShades("white");

    applyStylesToElement(button, {
        backgroundColor: wdarker,
        color: darker,
        width: "30%",
        height: "100%",
        top: "0%",
        border: lighter + " 0.2em solid",
        borderRadius: "11px",
        textAlign: "right",
        transition: "all 0.6s ease",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",

    });
    button.onmouseover = function () {
        applyStylesToElement(button, {
            backgroundColor: wdarker,
            cursor: "pointer"
        });
    }
    button.onmouseout = function () {
        applyStylesToElement(button, {
            backgroundColor: wlighter
        });
    }
    // Text creation and styling
    let textDiv = document.createElement("div");
    textDiv.className = "text";
    textDiv.innerText = "Add";
    applyStylesToElement(textDiv, {
        margin: "0 1.5em",
    });
    button.appendChild(textDiv);



   
    // Append button to the desired container or body
    document.body.appendChild(button);

    return button;  // if you need a reference to the button later
}
function createColorDropdown(colors) {
    // Main dropdown container
    const dropdown = document.createElement('div');
    applyStylesToElement(dropdown, {
        position: 'relative',
        width: '25px',
        height: '25px',
        border: '1px solid #ccc',
        float: "right",
        border:  " 0.05em solid",
        borderRadius: "11px",
    });

    // Selected color display
    const selectedcolor = document.createElement('div');
    applyStylesToElement(selectedcolor, {
        width: '100%',
        height: '100%'
    });
    dropdown.appendChild(selectedcolor);

    // Options container
    const optionsContainer = document.createElement('div');
    applyStylesToElement(optionsContainer, {
        position: 'absolute',
        top: '100%',
        left: '0',
        display: 'none',
        border: '1px solid #ccc'
    });
    dropdown.appendChild(optionsContainer);

    dropdown.addEventListener('mouseover', () => {
        applyStylesToElement(optionsContainer, {
            display: 'block'
        });
    });

    dropdown.addEventListener('mouseout', () => {
        applyStylesToElement(optionsContainer, {
            display: 'none'
        });
    });


    colors.forEach((color, index) => {
        const option = document.createElement('div');
        applyStylesToElement(option, {
            backgroundColor: color,
            width: '20px',
            height: '20px',
            margin: '5px'
        });
        option.addEventListener('click', () => {
            applyStylesToElement(selectedcolor, {
                backgroundColor: color
            });
            selectedColor = index;
        });
        optionsContainer.appendChild(option);
    });

    return dropdown;
}

// Example usage:
