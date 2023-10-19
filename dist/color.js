const pawnColors = [["./images/pawns/black.png", false], ["./images/pawns/blue.png", false], ["./images/pawns/brown.png", false], ["./images/pawns/gray.png", false], ["./images/pawns/green.png", false], ["./images/pawns/pink.png", false], ["./images/pawns/purple.png", false], ["./images/pawns/red.png", false], ["./images/pawns/white.png", false], ["./images/pawns/yellow.png", false]];
const bookColors = ["./images/black.png", "./images/blue.png", "./images/brown.png", "./images/gray.png", "./images/green.png", "./images/pink.png", "./images/purple.png", "./images/red.png", "./images/white.png", "./images/yellow.png"];
const colors = bookColors.map(path => {             // ["black", "blue".. etc
    return path.split('/').pop().split('.')[0];
});


function rgbToHex(rgb) {
    const hex = x => {
        const hexValue = x.toString(16);
        return hexValue.length === 1 ? '0' + hexValue : hexValue;
    };

    return `#${hex(rgb[0])}${hex(rgb[1])}${hex(rgb[2])}`;
}

function hexToRgb(hex) {
    return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function generateShades(colorName) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = colorName;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

    const colorHex = rgbToHex([r, g, b]);

    function darkenColor(hex, factor = 20) {
        let [r, g, b] = hexToRgb(hex);
        r = Math.max(r - factor, 0);
        g = Math.max(g - factor, 0);
        b = Math.max(b - factor, 0);
        return rgbToHex([r, g, b]);
    }

function lightenColor(hex, factor = 100) {
    let [r, g, b] = hexToRgb(hex);
    r = Math.min(r + factor, 255);
    g = Math.min(g + factor, 255);
    b = Math.min(b + factor, 255);
    return rgbToHex([r, g, b]);
}

// Generate shades
const darkerShade = darkenColor(colorHex);
const lighterShade = lightenColor(colorHex);

return [darkerShade, lighterShade];
}

function loadColor() {
    if (hideAll) { return }

    let backgroundcolor = document.getElementById("backgroundcolor")
    let curColor = players[previousPlayer].color;
    applyStylesToElement(backgroundcolor, {
        backgroundColor: colors[curColor]
    });


    let div = document.getElementById("addPlayerdiv");
    const [darker, lighter] = generateShades(colors[curColor]);
    applyStylesToElement(div, {
        backgroundColor: lighter,
        border: "4px solid " + darker
    });


}
// Example usage:
const colorName = "blue";
const [darker, lighter] = generateShades(colorName);

//console.log(darker, lighter);  // This will log two shades of blue, one darker and one lighter.
