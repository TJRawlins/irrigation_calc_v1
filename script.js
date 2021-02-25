// "use strict";

const btn = document.getElementById("calc");
const input = document.querySelector(".main-input");
const annualRadio = document.getElementById("annual");
const hourRadio = document.getElementById("hourly");
const results = document.querySelectorAll(".results-container label span");
const resultLabels = document.querySelectorAll(".results-container label");

input.focus();

btn.addEventListener("click", () => {
  let entry = parseFloat(input.value).toFixed(2);
  if (annualRadio.checked) {
    resultLabels[3].style.border = "0";
    resultLabels[0].style.border = "var(--gradient-secondary) 1px solid";
    results[0].innerText = parseFloat(entry + 0).toFixed(2);
    results[1].innerText = parseFloat(entry / 12).toFixed(2);
    results[2].innerText = parseFloat(entry / 12 / 4).toFixed(2);
    results[3].innerText = parseFloat(entry / 12 / 4 / 40).toFixed(2);
  } else if (hourRadio.checked) {
    results[0].innerText = parseFloat(entry * 40 * 4 * 12).toFixed(2);
    results[1].innerText = parseFloat(entry * 40 * 4).toFixed(2);
    results[2].innerText = parseFloat(entry * 40).toFixed(2);
    results[3].innerText = parseFloat(entry + 0).toFixed(2);
    resultLabels[3].style.border = "var(--gradient-secondary) 1px solid";
    resultLabels[0].style.border = "0";
  } else {
    alert('Please select "Annual" or "Hourly".');
  }
});
