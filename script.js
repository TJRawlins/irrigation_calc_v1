"use strict";

/* -------------- VARIABLES --------------- */

const body = document.querySelector("body");
const btnAddNew = document.getElementById("add-new")
const cardList = document.getElementById("card-list")
const totalMonth = document.getElementById("total-month")
const totalYear = document.getElementById("total-year")


/* -------------- GET TARGET ELEMENT --------------- */

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
function addNewCard() {
  const newInputModalDiv = document.createElement("div");
  newInputModalDiv.innerHTML = `<div class="modal-container">
                                <div id="new-input">
                                  <i class="fa-solid fa-tree"></i>
                                  <h2>Please enter plant name:</h2>
                                  <input type="text" id="name-field">
                                  <i class="fas fa-times exit"></i>
                                </div>
                            </div>`;
  body.appendChild(newInputModalDiv);

  document
        .querySelector("i.exit")
        .addEventListener("click", () => newInputModalDiv.remove());

  let cardTitle = "";

  // ADD CARD
  document.addEventListener("keyup", (event) => {
    if (event.code === 'Enter') {
      if (document.getElementById("name-field").value == "") {
        alert("Please enter a plant name.")
      } else {
        cardTitle = document.getElementById("name-field").value
        document.querySelector(".modal-container").remove()

        const newListItem = document.createElement("li")
        const newCard = document.createElement("div");
        newCard.classList.add('card-container')
        
        let cardId = cardTitle.replace(/\s/g, '-')
        newCard.setAttribute("id",`${cardId.toLowerCase()}`)

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
                                  <button type="button" class="btn" id="calc">
                                    <i class="fa-solid fa-calculator"></i>
                                  </button>
                                  <button type="button" class="btn" id="clear">
                                    <i class="fa-solid fa-trash"></i>
                                  </button>
                                  <button type="button" class="btn" id="clear">
                                    <i class="fa-solid fa-save"></i>
                                  </button>
                                </div>
                              </form>`;
        newListItem.appendChild(newCard)
        cardList.appendChild(newListItem)
        cardTitle = "";
      }
    }
  });
}


// CALCULATE
document.addEventListener("click", ()=> {

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
    
  
    for(let i = 0; i < input.length; i++){
      if (input[i] == ""){
        // DISPLAY ERROR MODAL
        const errorModalDiv = document.createElement("div");
        errorModalDiv.innerHTML = `<div class="modal-container">
                                    <div id="invalid-input">
                                      <i class="fas fa-exclamation-triangle alert"></i>
                                      <h2>Please enter all fields.</h2>
                                      <i class="fas fa-times exit"></i>
                                    </div>
                                  </div>`;
        body.appendChild(errorModalDiv);
        // REMOVE ERROR MODAL
        document
          .querySelector("i.exit")
          .addEventListener("click", () => errorModalDiv.remove());
  
          break;
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


// EDIT INPUT FIELDS
document.addEventListener("click", ()=> {
  
  // INPUT CONTAINERS TARGET
  let inputContainer = targetContainer.getElementsByClassName('input-container')[0];
  let savedContainer = targetContainer.getElementsByClassName('input-container')[1];
  console.log(inputContainer);
  console.log(savedContainer);

  // ADD SAVED VALUES TO INPUT CONTAINER FIELDS
  targetContainer.getElementsByClassName('input-field')[0].value = targetContainer.getElementsByClassName('saved-input-field')[0].innerHTML
  targetContainer.getElementsByClassName('input-field')[1].value = targetContainer.getElementsByClassName('saved-input-field')[1].innerHTML
  targetContainer.getElementsByClassName('input-field')[2].value = targetContainer.getElementsByClassName('saved-input-field')[2].innerHTML
  targetContainer.getElementsByClassName('input-field')[3].value = targetContainer.getElementsByClassName('saved-input-field')[3].innerHTML
  targetContainer.getElementsByClassName('input-field')[4].value = targetContainer.getElementsByClassName('saved-input-field')[4].innerHTML
  

  if(targetEl.classList.contains('saved-edit')) {

    // HIDE/SHOW INPUT CONTAINER
    inputContainer.classList.toggle("active")

    // HIDE/SHOW INPUT CONTAINER
    savedContainer.classList.toggle("active")
  }
});

// TRASH
document.addEventListener("click", ()=> {

  if(targetEl.classList.contains('fa-trash')) {
    targetContainer.remove();
  }
});


// COLLAPSE
document.addEventListener("click", ()=> {
  if(targetEl.classList.contains('fa-angle-right')) {
    targetEl.classList.add("fa-angle-down")
    targetEl.classList.remove("fa-angle-right")
    targetContainer.getElementsByClassName('card-form')[0].classList.toggle("active")
  } else if (targetEl.classList.contains('fa-angle-down')) {
    targetContainer.getElementsByClassName('card-form')[0].classList.toggle("active")
    targetEl.classList.remove("fa-angle-down")
    targetEl.classList.add("fa-angle-right")
  }
});



/* -------------- EVENTS --------------- */

// Add New Card
btnAddNew.addEventListener("click", addNewCard)


/* ---------------  Save & Load task list ----------------------- */
window.addEventListener("load", () => {
  if (localStorage.getItem("savedListIC")) {
    let listStateDeserialized = JSON.parse(localStorage.getItem("savedListIC"));
    cardList.innerHTML = listStateDeserialized;
  }
});

document.addEventListener("click", ()=> {
  if(targetEl.classList.contains('fa-save')) {
    const listState = cardList.innerHTML;
    let listStateSerialized = JSON.stringify(listState);
    localStorage.setItem("savedListIC", listStateSerialized);
  }
});
