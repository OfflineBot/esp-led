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
    setCookie("red", red_val, 1, "None");
});
green.addEventListener('input', (event) => {
    green_val = green.value;
    render_preview();
    setCookie("green", green_val, 1, "None");
});
blue.addEventListener('input', (event) => {
    blue_val = blue.value;
    render_preview();
    setCookie("blue", blue_val, 1, "None");
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


function setCookie(name, value, days, sameSite) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    var sameSiteAttribute = sameSite ? "; SameSite=" + sameSite : "";

    // Include "Secure" attribute when SameSite is set to "None"
    var secureAttribute = sameSite === "None" ? "; Secure" : "";

    document.cookie = name + "=" + value + expires + "; path=/" + sameSiteAttribute + secureAttribute;
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return 0;
}


window.onload = function() {
    let red_value = getCookie("red");
    let green_value = getCookie("green");
    let blue_value = getCookie("blue"); 

    red.value = red_value;
    green.value = green_value;
    blue.value = blue_value; 
    red_val = red_value;
    green_val = green_value;
    blue_val = blue_value;
    render_preview();
};