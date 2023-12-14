let red = document.querySelector('.red-slider');
let green = document.querySelector('.green-slider');
let blue = document.querySelector('.blue-slider');
let preview = document.getElementById('preview-color');

let red_val = red.value;
let green_val = green.value;
let blue_val = blue.value;

render_preview();

red.addEventListener('input', (event) => {
    red_val = red.value;
    render_preview();
});
green.addEventListener('input', (event) => {
    green_val = green.value;
    render_preview();
});
blue.addEventListener('input', (event) => {
    blue_val = blue.value;
    render_preview();
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

