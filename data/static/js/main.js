let red = document.querySelector('.red-slider');
let green = document.querySelector('.green-slider');
let blue = document.querySelector('.blue-slider');
let brightness = document.querySelector('.brightness-slider')
let preview = document.getElementById('preview-color');

let red_val = red.value;
let green_val = green.value;
let blue_val = blue.value;
let brightness_val = 255;

render_preview();

let day_save = 1;

red.addEventListener('input', (event) => {
    red_val = red.value;
    render_preview();
    setLocalStorage("red", brightness_val);
});
green.addEventListener('input', (event) => {
    green_val = green.value;
    render_preview();
    setLocalStorage("green", brightness_val);
});
blue.addEventListener('input', (event) => {
    blue_val = blue.value;
    render_preview();
    setLocalStorage("blue", brightness_val);
});
brightness.addEventListener('input', (event) => {
    brightness_val = brightness.value; 
    setLocalStorage("brightness", brightness_val);
});

function rgbToHex(red, green, blue) {
    // Ensure values are within the valid range (0-255)
    red = Math.min(255, Math.max(0, red));
    green = Math.min(255, Math.max(0, green));
    blue = Math.min(255, Math.max(0, blue));

    // Convert decimal to hexadecimal
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    // Concatenate and return the hex color code
    return `#${redHex}${greenHex}${blueHex}`;
}

function render_preview() {
    let color = rgbToHex(red_val, green_val, blue_val);
    preview.style.borderColor = color;
}


function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
function getLocalStorage(key) {
    return localStorage.getItem(key);
}

window.onload = function() {
    let red_value = getLocalStorage("red");
    let green_value = getLocalStorage("green");
    let blue_value = getLocalStorage("blue"); 
    let brightness_value = getLocalStorage("brightness");

    red.value = red_value;
    green.value = green_value;
    blue.value = blue_value; 
    brightness.value = brightness_value;

    red_val = red_value;
    green_val = green_value;
    blue_val = blue_value;
    brightness_val = brightness_value;
    render_preview();
};