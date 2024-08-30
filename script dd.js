// script.js

// Function to clear the display
function clearDisplay() {
    document.getElementById("display").innerText = "0";
}

// Function to delete the last character in the display
function deleteLast() {
    let display = document.getElementById("display").innerText;
    if (display.length > 1) {
        document.getElementById("display").innerText = display.slice(0, -1);
    } else {
        document.getElementById("display").innerText = "0";
    }
}

// Function to append a character to the display
function appendToDisplay(value) {
    let display = document.getElementById("display").innerText;
    if (display === "0" && value !== ".") {
        document.getElementById("display").innerText = value;
    } else {
        document.getElementById("display").innerText += value;
    }
}

// Function to calculate the result
function calculateResult() {
    let display = document.getElementById("display").innerText;
    try {
        document.getElementById("display").innerText = eval(display);
    } catch (e) {
        document.getElementById("display").innerText = "Error";
    }
}
