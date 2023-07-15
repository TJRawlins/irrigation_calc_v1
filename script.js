"use strict";


/* -------------- VARIABLES --------------- */

const body = document.querySelector("body");
const btnAddNew = document.getElementById("add-new")
const cardList = document.getElementById("card-list")
const totalMonth = document.getElementById("total-month")
const totalYear = document.getElementById("total-year")
const errorModal = document.getElementById('error-modal')
const errorExitBtn = document.getElementById('error-exit')
const addModal = document.getElementById('add-modal')
const addExitBtn = document.getElementById('add-exit')
const addNameBtn = document.getElementById('add-name-btn')
const nameField = document.getElementById("name-field")


/* -------------- GET TARGET ELEMENT -------------- */

let targetEl = null;
let targetContainer = null;

document.addEventListener("click", (e)=> {
  targetEl = e.target;
  // console.log(targetEl);
  
  try {
  targetContainer = targetEl.parentElement.parentElement.parentElement.parentElement
    // console.log(targetContainer);
    
    // console.log(targetContainer.getElementsByClassName('input-field')[0].value);
    // console.log(targetContainer.getElementsByClassName('result-label')[1].parentElement);
  } catch {
    // console.log('Could not find a card container');
  }
})

// console.log(targetContainer);



/* -------------- FUNCTIONS --------------- */

// ADD NEW CARD
btnAddNew.addEventListener('click', () => {
  // SHOW AND HIDE MODAL
  addModal.classList.remove('active')
});

addExitBtn.addEventListener('click', ()=> {
  addModal.classList.add('active'); 
  nameField.value = "";
});  

// ADD CARD
addNameBtn.addEventListener("click", () => {
  // SET INPUT TO EMPTY STRING
  let cardTitle = "";
  if (nameField.value === "") {
    alert('Please enter a name.')
  } else {
    cardTitle = document.getElementById("name-field").value
    nameField.value = null;
    addModal.classList.add('active')

    // CREATE NEW CARD ELEMENTS
    const newListItem = document.createElement("li")
    const newCard = document.createElement("div");
    newCard.classList.add('card-container')

    newCard.innerHTML = `<h1><i class="fa-solid fa-tree"></i>  <span>${cardTitle}</span><button class="collapse"><i class="fa-solid fa-angle-right"></i></button></h1>
                        <form class="card-form">
                      
                          <!-- RESULTS CONTAINER -->
                          <div class="results-container">
                            <label>Yearly: <span id="yearly" class="result-label">0.00</span></label>
                            <label>Monthly: <span id="monthly" class="result-label">0.00</span></label>
                            <label>Weekly: <span class="result-label">0.00</span></label>
                            <label>Per Runtime: <span class="result-label">0.00</span></label>
                            <label>Per Minute:  <span class="result-label">0.00</span></label>
                            <label>Per Emitter GPM: <span class="result-label">0.00</span></label>
                          </div>
                      
                          <!-- TEXT INPUT -->
                          <div class="input-container">
                            <div id="text-input">
                              <input type="number" placeholder="Gallons per plant..." class="input-field" id="gallons-input" required/>
                              <label for="">Gals / Plant</label>
                              <input type="number" placeholder="Emitter count per plant..." class="input-field" id="emitters-input" required/>
                              <label for="">Emitter Ct.</label>
                              <input type="number" placeholder="Plant count..." class="input-field" id="trees-input"/>
                              <label for="">Plant Ct.</label>
                              <input type="number" placeholder="Runtime minutes..." class="input-field" id="minutes-input" required/>
                              <label for="">Minutes</label>
                              <input type="number" placeholder="Times per week..." class="input-field" id="times-input" required/>
                              <label for="">Per week</label>
                            </div>
                          </div>

                          <!-- TEXT INPUT SAVED -->
                          <div class="input-container saved active">
                            <div id="saved-input">
                              <div class="saved-input-field"></div><label>Gals per plant</label>
                              <div class="saved-input-field"></div><label>Emitter Ct.</label>
                              <div class="saved-input-field"></div><label>Plant Ct.</label>
                              <div class="saved-input-field"></div><label>Minutes</label>
                              <div class="saved-input-field"></div><label>Per week</label>
                              <div class="saved-edit">CLICK TO EDIT</div>
                            </div>
                          </div>
                      
                          <!-- BUTTONS -->
                          <div class="btn-container">
                            <button type="button" class="btn" id="calc"><i class="fa-solid fa-calculator"></i></button>
                            <button type="button" class="btn" id="clear"><i class="fa-solid fa-trash"></i></button>
                            <button type="button" class="btn" id="save"><i class="fa-solid fa-save"></i></button>
                          </div>
                        </form>`;
    newListItem.appendChild(newCard)
    cardList.appendChild(newListItem)
    cardTitle = "";
    nameField.value = "";
  }
});

//CALCULATE TOTAL
setInterval(()=> {
  let yearly = document.querySelectorAll("#yearly")
  let monthly = document.querySelectorAll("#monthly")
  let monthTotal = 0;
  let yearTotal = 0;
  for(let i = 0; i < monthly.length; i++) {
    monthTotal = Number(monthly[i].innerHTML) + monthTotal
    yearTotal = Number(yearly[i].innerHTML) + yearTotal
  totalMonth.innerHTML = monthTotal 
  totalYear.innerHTML = yearTotal
}
}, 2000);


// MAIN DOCUMENT LISTENER
document.addEventListener("click", ()=> {

/* -------------- CALCULATE --------------- */
  if(targetEl.classList.contains('fa-calculator')) {
  
    let entryGph = parseFloat(targetContainer.getElementsByClassName('input-field')[0].value).toFixed(2);
    let entryEmit = parseFloat(targetContainer.getElementsByClassName('input-field')[1].value).toFixed(2);
    let entryTrees = parseFloat(targetContainer.getElementsByClassName('input-field')[2].value).toFixed(2);
    let entryMins = parseFloat(targetContainer.getElementsByClassName('input-field')[3].value).toFixed(2);
    let entryTimes = parseFloat(targetContainer.getElementsByClassName('input-field')[4].value).toFixed(2);

    // INPUT VARIABLE LIST
    const input = [];
    input[0] = targetContainer.getElementsByClassName('input-field')[0].value;
    input[1] = targetContainer.getElementsByClassName('input-field')[1].value;
    input[2] = targetContainer.getElementsByClassName('input-field')[2].value;
    input[3] = targetContainer.getElementsByClassName('input-field')[3].value;
    input[4] = targetContainer.getElementsByClassName('input-field')[4].value;

    // INPUT CONTAINERS TARGET
    let inputContainer = targetContainer.getElementsByClassName('input-container')[0];
    let savedContainer = targetContainer.getElementsByClassName('input-container')[1];
    
    if(input.includes("")) {
    // DISPLAY ERROR MODAL
    errorModal.classList.remove('active')
    
    // REMOVE ERROR MODAL
    errorExitBtn.addEventListener("click", ()=> {errorModal.classList.add('active')});

    // break;
    } else {
      // ADD CALCULATION VALUES TO RESULTS CONTAINER FIELDS
      // Year 
      targetContainer.getElementsByClassName('result-label')[0].textContent = parseFloat((((entryGph * entryTrees) * entryTimes) * 4) * 12).toFixed(2);
      // Month
      targetContainer.getElementsByClassName('result-label')[1].textContent  = parseFloat(((entryGph * entryTrees) * entryTimes) * 4).toFixed(2);
      // Week
      targetContainer.getElementsByClassName('result-label')[2].textContent  = parseFloat((entryGph * entryTrees) * entryTimes).toFixed(2);
      // Runtime
      targetContainer.getElementsByClassName('result-label')[3].textContent  = parseFloat(entryGph * entryTrees).toFixed(2);
      // Min
      targetContainer.getElementsByClassName('result-label')[4].textContent  = parseFloat((entryGph * entryTrees) / entryMins).toFixed(2);
      // Emitters
      targetContainer.getElementsByClassName('result-label')[5].textContent  = parseFloat((entryGph / entryMins) / entryEmit).toFixed(2);

      // ADD INPUT VALUES TO SAVED CONTAINER FIELDS
      targetContainer.getElementsByClassName('saved-input-field')[0].innerHTML = targetContainer.getElementsByClassName('input-field')[0].value
      targetContainer.getElementsByClassName('saved-input-field')[1].innerHTML = targetContainer.getElementsByClassName('input-field')[1].value
      targetContainer.getElementsByClassName('saved-input-field')[2].innerHTML = targetContainer.getElementsByClassName('input-field')[2].value
      targetContainer.getElementsByClassName('saved-input-field')[3].innerHTML = targetContainer.getElementsByClassName('input-field')[3].value
      targetContainer.getElementsByClassName('saved-input-field')[4].innerHTML = targetContainer.getElementsByClassName('input-field')[4].value

      // SHOW RESULTS CONTAINER
      targetContainer.getElementsByClassName('results-container')[0].style.display = 'flex'

      // HIDE/SHOW INPUT CONTAINER
      inputContainer.classList.toggle("active")

      // HIDE/SHOW INPUT CONTAINER
      savedContainer.classList.toggle("active")
    }    
  }

  /* -------------- EDIT INPUT FIELDS --------------- */
  try {  

    if(targetEl.classList.contains('saved-edit')) {

      // INPUT CONTAINERS TARGET
      let inputContainer = targetContainer.getElementsByClassName('input-container')[0];
      let savedContainer = targetContainer.getElementsByClassName('input-container')[1];

      // ADD SAVED VALUES TO INPUT CONTAINER FIELDS
      targetContainer.getElementsByClassName('input-field')[0].value = targetContainer.getElementsByClassName('saved-input-field')[0].innerHTML
      targetContainer.getElementsByClassName('input-field')[1].value = targetContainer.getElementsByClassName('saved-input-field')[1].innerHTML
      targetContainer.getElementsByClassName('input-field')[2].value = targetContainer.getElementsByClassName('saved-input-field')[2].innerHTML
      targetContainer.getElementsByClassName('input-field')[3].value = targetContainer.getElementsByClassName('saved-input-field')[3].innerHTML
      targetContainer.getElementsByClassName('input-field')[4].value = targetContainer.getElementsByClassName('saved-input-field')[4].innerHTML

      // HIDE/SHOW INPUT CONTAINER
      inputContainer.classList.toggle("active")

      // HIDE/SHOW INPUT CONTAINER
      savedContainer.classList.toggle("active")
    }
  } catch {
    console.log('EDIT INPUT FIELDS: Element not found');
  }


  /* -------------- TRASH --------------- */
  if(targetEl.classList.contains('fa-trash')) {
    targetContainer.remove();
  }


  /* -------------- COLLAPSE --------------- */
  if(targetEl.classList.contains('fa-angle-right')) {
    targetEl.classList.add("fa-angle-down")
    targetEl.classList.remove("fa-angle-right")
    targetContainer.getElementsByClassName('card-form')[0].classList.toggle("active")
  } else if (targetEl.classList.contains('fa-angle-down')) {
    targetContainer.getElementsByClassName('card-form')[0].classList.toggle("active")
    targetEl.classList.remove("fa-angle-down")
    targetEl.classList.add("fa-angle-right")
  }

  /* -------------- SAVE --------------- */
    if(targetEl.classList.contains('fa-save')) {
      const listState = cardList.innerHTML;
      let listStateSerialized = JSON.stringify(listState);
      localStorage.setItem("savedListIC", listStateSerialized);
    }

});


  /* -------------- LOAD --------------- */
window.addEventListener("load", () => {
  if (localStorage.getItem("savedListIC")) {
    let listStateDeserialized = JSON.parse(localStorage.getItem("savedListIC"));
    cardList.innerHTML = listStateDeserialized;
  }
});

