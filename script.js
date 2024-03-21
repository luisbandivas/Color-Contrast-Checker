let tColor = document.getElementById("t-color");
let bColor = document.getElementById("b-color");
let result = document.querySelector(".display-contrast");
let contrastRef = document.getElementById("contrast-rate");

//Function to convert hex value to RGB array
function hexToRGB(colorValue) {
const red = parseInt(colorValue.substring(1, 3), 16);
const green = parseInt(colorValue.substring(3, 5), 16);
const blue = parseInt(colorValue.substring(5, 7), 16);
return [red, green, blue];
}

let getRelativeLuminance = (color) => {
const sRGB = color.map((val) => {
    const s = val / 255;
    return s < 0.03928 ? s / 12 / 92 : Math.pow((s + 0.055) / 1.055, 2.4);
});
return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
};

let calculateContrastRatio = (color1, color2) => {
const luminance1 = getRelativeLuminance(color1);
const luminance2 = getRelativeLuminance(color2);

const light = Math.max(luminance1, luminance2);
const dark = Math.min(luminance1, luminance2);
const contrast = (light + 0.05) / (dark + 0.05);
return contrast;
};

let calcRating = (contrastVal) => {
    let rating = "";
    if (contrastVal > 12) {
        result.style.backgroundColor = "#69eb67";
        rating = "😍 Super";
    } else if (contrastVal > 7) {
        result.style.backgroundColor = "#b7ea84";
        rating = "😊 Very Good";
    } else if (contrastVal > 5) {
        result.style.backgroundColor = "#f7d658";
        rating = "😀 Good";
    } else if (contrastVal > 3) {
        result.style.backgroundColor = "#f17a55";
        rating = "😐 Poor";
    } else {
        result.style.backgroundColor = "#f24646";
        rating = "😔 Very Poor";
    }
    return rating;
};

let contrastChecker = () => {
    let textColorValue = tColor.value;
    let textColorRGBArray = hexToRGB(textColorValue);

    let bgColorValue = bColor.value;
    let bgColorRGBArray = hexToRGB(bgColorValue);

    const contrast = calculateContrastRatio(textColorRGBArray, bgColorRGBArray);

    contrastRef.innerText = contrast.toFixed(2);
    contrastRef.innerText = calcRating(contrast);
    result.style.color = textColorValue;
    result.style.backgroundColor = bgColorValue;

    let textColorHex = textColorValue.toUpperCase();
    let bgColorHex = bgColorValue.toUpperCase();
    document.querySelectorAll('.out')[0].innerText = textColorHex;
    document.querySelectorAll('.out')[1].innerText = bgColorHex;
};

let swapColors = () => {
    let tempColor = tColor.value;
    tColor.value = bColor.value;
    bColor.value = tempColor;
    
    contrastChecker();
};
let swapButton = document.querySelector(".swap");


tColor.addEventListener("input", contrastChecker);
bColor.addEventListener("input", contrastChecker);
window.addEventListener("load", contrastChecker);
swapButton.addEventListener("click", swapColors);