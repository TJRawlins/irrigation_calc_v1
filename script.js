"use strict";


/* -------------- VARIABLES --------------- */

const body = document.querySelector("body");
const mainContainer = document.querySelector(".main-container")
const btnAddNew = document.getElementById("add-new")
let cardList = document.getElementById("card-list")
const totalMonth = document.getElementById("total-month")
const totalYear = document.getElementById("total-year")
const totalPlants = document.getElementById("total-plants")
const errorModal = document.getElementById('error-modal')
const errorExitBtn = document.getElementById('error-exit')
const addModal = document.getElementById('add-modal')
const addExitBtn = document.getElementById('add-exit')
const addNameBtn = document.getElementById('add-name-btn')
const nameField = document.getElementById("name-field")
const btnAddNewZone = document.getElementById("add-zone")
const zoneName = document.querySelectorAll(".zone h1")
const zoneDeleteModal = document.getElementById("warning-modal")
const warningExitBtn = document.getElementById("warning-exit")
const deleteZoneBtn = document.getElementById("delete-zone")
const dontDeleteZoneBtn = document.getElementById("dont-delete-zone")



/* -------------- GET TARGET ELEMENT -------------- */

let targetEl = null;
let targetContainer = null;
let targetContainerZone = null;

document.addEventListener("click", (e)=> {
  targetEl = e.target;
  // console.log(targetEl);
  
  try {
  targetContainer = targetEl.parentElement.parentElement.parentElement.parentElement
  targetContainerZone = targetEl.parentElement
    // console.log(targetContainer);
    
    // console.log(targetContainer.getElementsByClassName('input-field')[0].value);
    // console.log(targetContainer.getElementsByClassName('plant-icon')[0].parentElement);
  } catch {
    // console.log('Could not find a card container');
  }
})


/* -------------- FUNCTIONS ---------------- */

// ADD NEW ZONE
btnAddNewZone.addEventListener("click", () => {
  // CREATE NEW ZONE ELEMENTS
  const newZoneEl= document.createElement("div");
  newZoneEl.classList.add("zone");

  // CREATE ZONE TITLE H1 ELEMENT
  const zoneH1 = document.createElement('h1');
  zoneH1.classList.add('zone-name')
  zoneH1.textContent = "New Zone"
  // CREATE ZONE TITLE EDIT ICON
  const zoneEditIcon = document.createElement('i')
  zoneEditIcon.classList.add('fa-solid')

  zoneEditIcon.classList.add('fa-pencil')
  // APPEND TITLE H1 TO ZONE
  zoneH1.appendChild(zoneEditIcon)
  newZoneEl.appendChild(zoneH1)

  // CREATE ZONE EDIT WRAPPER ELEMENT
  const zoneEditWrapper = document.createElement('div')
  zoneEditWrapper.classList.add('zone-edit-wrapper')
  zoneEditWrapper.innerHTML = `<input type="text" class="zone-edit" placeholder="Enter zone name..." require><button class="zone-btn">Save</button>`
  newZoneEl.appendChild(zoneEditWrapper)
                           
  // CREATE ZONE CONTAINER
  const zoneContainer = document.createElement("div");
  zoneContainer.classList.add("zone-container");
  zoneContainer.innerHTML = `<div class="total-zone">
                              <div id="total-container">
                                <ul>
                                  <li class="total-item prevent-select">Month:
                                    <label for="month" id="total-month">0.00</label>
                                  </li>
                                  <li class="total-item prevent-select">Year:
                                    <label for="year" id="total-year">0.00</label>
                                  </li>
                                  <li class="total-item prevent-select">Plants:
                                    <label for="plants" id="total-plants">0</label>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="delete-zone-btn"><i class="fa-regular fa-circle-xmark"></i></div><ul id="card-list"></ul>`;

  newZoneEl.appendChild(zoneContainer)

  // APPEND IT ALL TO THE MAIN CONTAINER
  mainContainer.appendChild(newZoneEl);
  // targetEl.style.display = "none";

  // SET VALUE FOR CARD LIST
  cardList = document.getElementById("card-list")
});

// INITIATE ADD NEW CARD
btnAddNew.addEventListener('click', () => {
  let zone = document.querySelector(".zone")
  if(zone) {
    // SHOW MODAL
    addModal.classList.remove('hide')
  } else {
    alert("You need at least 1 zone before adding plants.")
  }

});
// EXIT ADD NEW CARD MODAL 
addExitBtn.addEventListener('click', ()=> {
  addModal.classList.add('hide'); 
  nameField.value = "";
});  

// ADD NEW CARD
addNameBtn.addEventListener("click", () => {
  // SET INPUT TO EMPTY STRING
  let cardTitle = "";
  if (nameField.value === "") {
    alert('Please enter a name.')
  } else {
    // GENERATE A RANDOM CARD ID
    let  min = 10000;
    let max = 90000
    let randInt = Math.random() * (max - min) + min;
    cardTitle = document.getElementById("name-field").value
    nameField.value = null;
    addModal.classList.add('hide')

    // CREATE NEW CARD ELEMENTS
    const newListItem = document.createElement("li")
    newListItem.setAttribute('item-id', parseInt(randInt))
    newListItem.setAttribute("draggable", "true")
    newListItem.classList.add('draggable')
    const newCard = document.createElement("div");
    newCard.classList.add('card-container')

    newCard.innerHTML = `<h1><i class="plant-icon fa-solid"></i><span class="plant-count"></span><span class="card-title">${cardTitle.toUpperCase()}</span><button class="collapse"><i class="fa-solid fa-angle-right hide"></i><i class="fa-solid fa-angle-down"></i></button></h1>
                        <form class="card-form">
                      
                          <!-- RESULTS CONTAINER -->
                          <div class="results-container">
                            <label id="yearly-label" class:"prevent-select">Yearly: <span id="yearly" class="result-label">0.00</span></label>
                            <label id="monthly-label" class:"prevent-select">Monthly: <span id="monthly" class="result-label">0.00</span></label>
                            <label id="weekly-label" class:"prevent-select">Weekly: <span class="result-label">0.00</span></label>
                            <label id="runtime-label" class:"prevent-select">Per Runtime: <span class="result-label">0.00</span></label>
                            <label id="minutes-label" class:"prevent-select">Per Minute:  <span class="result-label">0.00</span></label>
                            <label id="emitters-label" class:"prevent-select">Per Emitter GPM: <span class="result-label">0.00</span></label>
                            <label id="emitters-oz-label class:"prevent-select"">Per Emitter OZ per 15s: <span class="result-label">0.00</span></label>
                          </div>
                      
                          <!-- TEXT INPUT -->
                          <div class="input-container">
                            <div id="text-input">
                              <input type="number" placeholder="Gallons per week per plant..." class="input-field" id="gallons-input" required/>
                              <input type="number" placeholder="Emitter count per plant..." class="input-field" id="emitters-input" required/>
                              <input type="number" placeholder="Plant count..." class="input-field" id="trees-input"/>
                              <input type="number" placeholder="Runtime minutes..." class="input-field" id="minutes-input" required/>
                              <input type="number" placeholder="Times per week..." class="input-field" id="times-input" required/>
                            </div>
                            <div class="radio-group">
                              <label class="radio">
                                <i class="fa-solid fa-tree"></i>
                                <span class="radio-input">
                                  <input type="radio" class="radio-button" id="tree-card" name="wage" value="tree-card" />
                                  <span class="radio-control"></span>
                                </span>
                              </label>
                              <label class="radio">
                                <i class="fa-solid fa-cloud"></i>
                                <span class="radio-input">
                                  <input type="radio" class="radio-button" id="shrub-card" name="wage" value="shrub-card" />
                                  <span class="radio-control"></span>
                                </span>
                              </label>
                            </div>
                          </div>

                          <!-- TEXT INPUT SAVED -->
                          <div class="input-container saved hide">
                            <div id="saved-input">
                              <div class="saved-input-field"></div><label>Gals per plant</label>
                              <div class="saved-input-field"></div><label>Emitters per plant</label>
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
  let plants = document.querySelectorAll(".plant-count")
  let monthTotal = 0;
  let yearTotal = 0;
  let plantTotal = 0;
  for(let i = 0; i < monthly.length; i++) {
    monthTotal = Number(monthly[i].innerHTML) + monthTotal
    yearTotal = Number(yearly[i].innerHTML) + yearTotal
    plantTotal = Number(plants[i].innerHTML) + plantTotal
  totalMonth.innerHTML = monthTotal 
  totalYear.innerHTML = yearTotal
  totalPlants.innerHTML = plantTotal
}
}, 2000);


// MAIN DOCUMENT LISTENER
document.addEventListener("click", ()=> {

/* --------------  EDIT ZONE NAME ------------- */
  if(targetEl.classList.contains('zone-name')) {
  
    if(targetEl.nodeName === "H1") {

      // zone name h1 element
      targetEl.style.display = "none";
      // zone edit input element
      targetEl.nextElementSibling.style.display = "flex";
      // focus on input field
      targetEl.nextElementSibling.getElementsByClassName("zone-edit")[0].focus()

      //save edit
      targetContainerZone.getElementsByClassName("zone-btn")[0].addEventListener("click", ()=> {

        // get the zone name element
        let zoneH1 = null;
        let zoneEdit = null;
          if(targetContainerZone.classList.contains("zone")) {
            // targetContainerZone grabs the zone element
            zoneH1 = targetContainerZone.getElementsByClassName("zone-name")[0]
            zoneEdit = targetContainerZone.getElementsByClassName("zone-edit")[0]
          } else if (targetContainerZone.classList.contains("zone-edit-wrapper")) {
            // targetContainerZone grabs the zone edit wrapper element so need to jump up to parent (zone)
            zoneH1 = targetContainerZone.parentElement.getElementsByClassName("zone-name")[0]
            zoneEdit = targetContainerZone.parentElement.getElementsByClassName("zone-edit")[0]
          } else {
            alert("Target element not found")
          }

        if(zoneEdit.value !== "") {
        zoneH1.innerHTML = `${zoneEdit.value}<i class="fa-solid fa-pencil"></i>`;      
        zoneH1.style.display = "block"
        zoneEdit.parentElement.style.display = "none";
        } else {
          // DISPLAY ERROR MODAL
          errorModal.classList.remove('hide')
          // REMOVE ERROR MODAL
          errorExitBtn.addEventListener("click", ()=> {errorModal.classList.add('hide')});
        } 
      })
    } 
  }


  /* --------------- DELETE ZONE ----------------*/
  if(targetEl.classList.contains('fa-circle-xmark')) {
    const zoneEl = targetEl.parentElement.parentElement.parentElement

    // SHOW MODAL
    zoneDeleteModal.classList.remove('hide')

    // HIDE MODAL IF EXIT ICON CLICKED
    warningExitBtn.addEventListener('click', ()=> {
      zoneDeleteModal.classList.add('hide');
    });

    deleteZoneBtn.addEventListener("click", () => {
      // HIDE MODAL
      zoneDeleteModal.classList.add('hide');
      // DELETE ZONE ELEMENT AND EVERYTHING IN IT
      zoneEl.remove()
      // SET VALUE FOR CARD LIST
      cardList = document.getElementById("card-list")
    })

    dontDeleteZoneBtn.addEventListener('click', () => {
      // HIDE MODAL
      zoneDeleteModal.classList.add('hide');
    })

  }



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

    // RADIO BUTTONS LIST
    const radioBtn = [];
    radioBtn[0] = targetContainer.getElementsByClassName('radio-button')[0];
    radioBtn[1] = targetContainer.getElementsByClassName('radio-button')[1];

    // INPUT CONTAINERS TARGET
    let inputContainer = targetContainer.getElementsByClassName('input-container')[0];
    let savedContainer = targetContainer.getElementsByClassName('input-container')[1];
    
    if(input.includes("") || !radioBtn[0].checked && !radioBtn[1].checked) {
    // DISPLAY ERROR MODAL
    errorModal.classList.remove('hide')
    
    // REMOVE ERROR MODAL
    errorExitBtn.addEventListener("click", ()=> {errorModal.classList.add('hide')});

    } else {

      // RADIO BUTTON CONDITION
      let plantIcon = targetContainer.getElementsByClassName('plant-icon')[0]
      
      if(radioBtn[0].checked) {
        plantIcon.classList.remove('fa-cloud')
        plantIcon.classList.add('fa-tree')
      } else if(radioBtn[1].checked) {
        plantIcon.classList.remove('fa-tree')
        plantIcon.classList.add('fa-cloud')
      }

      // ADD CALCULATION VALUES TO RESULTS CONTAINER FIELDS
      // Year 
      targetContainer.getElementsByClassName('result-label')[0].textContent = parseFloat((entryGph * entryTrees) * 52).toFixed(2);
      // Month
      targetContainer.getElementsByClassName('result-label')[1].textContent  = parseFloat((entryGph * entryTrees) * 4).toFixed(2);
      // Week
      targetContainer.getElementsByClassName('result-label')[2].textContent  = parseFloat(entryGph * entryTrees).toFixed(2);
      // Runtime
      targetContainer.getElementsByClassName('result-label')[3].textContent  = parseFloat((entryGph * entryTrees) / entryTimes).toFixed(2);
      // Min
      targetContainer.getElementsByClassName('result-label')[4].textContent  = parseFloat(((entryGph * entryTrees) / entryTimes) / entryMins).toFixed(2);
      // Emitters
      targetContainer.getElementsByClassName('result-label')[5].textContent  = parseFloat(((entryGph / entryTimes) / entryMins) / entryEmit).toFixed(2);
      // Emitters OZ
      targetContainer.getElementsByClassName('result-label')[6].textContent  = parseFloat(((((entryGph / entryTimes) / entryMins) / entryEmit)*128)/4).toFixed(2);
      

      // ADD INPUT VALUES TO SAVED CONTAINER FIELDS
      targetContainer.getElementsByClassName('saved-input-field')[0].innerHTML = targetContainer.getElementsByClassName('input-field')[0].value
      targetContainer.getElementsByClassName('saved-input-field')[1].innerHTML = targetContainer.getElementsByClassName('input-field')[1].value
      targetContainer.getElementsByClassName('saved-input-field')[2].innerHTML = targetContainer.getElementsByClassName('input-field')[2].value
      targetContainer.getElementsByClassName('saved-input-field')[3].innerHTML = targetContainer.getElementsByClassName('input-field')[3].value
      targetContainer.getElementsByClassName('saved-input-field')[4].innerHTML = targetContainer.getElementsByClassName('input-field')[4].value

      // ADD TREE COUNT TO PLANT ICON
      let plantCount = targetContainer.getElementsByClassName('plant-count')[0]
      plantCount.textContent = parseInt(entryTrees)

      // SHOW RESULTS CONTAINER
      targetContainer.getElementsByClassName('results-container')[0].style.display = 'flex'

      // HIDE/SHOW INPUT CONTAINER
      inputContainer.classList.toggle("hide")

      // HIDE/SHOW INPUT CONTAINER
      savedContainer.classList.toggle("hide")
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
      inputContainer.classList.toggle("hide")

      // HIDE/SHOW INPUT CONTAINER
      savedContainer.classList.toggle("hide")
    }
  } catch {
    console.log('EDIT INPUT FIELDS: Element not found');
  }


  /* -------------- TRASH --------------- */
  if(targetEl.classList.contains('fa-trash')) {
    targetContainer.remove();
  }


  /* -------------- COLLAPSE --------------- */
  if(targetEl.classList.contains('fa-angle-right') || targetEl.classList.contains('fa-angle-down')) {
    if (targetEl.classList.contains('fa-angle-right')) {
      targetEl.classList.toggle('hide')
      targetEl.nextElementSibling.classList.toggle('hide')
      targetContainer.getElementsByClassName('card-form')[0].classList.toggle("hide")
    } else {
      targetEl.classList.toggle('hide')
      targetEl.previousElementSibling.classList.toggle('hide')
      targetContainer.getElementsByClassName('card-form')[0].classList.toggle("hide")
    }
  }


  /* -------------- SAVE --------------- */
    if(targetEl.classList.contains('fa-save')) {
      const listState = mainContainer.innerHTML;
      let listStateSerialized = JSON.stringify(listState);
      localStorage.setItem("savedListIC", listStateSerialized);
      cardList = document.getElementById("card-list")
    }

});


  /* -------------- LOAD --------------- */
window.addEventListener("load", () => {
  if (localStorage.getItem("savedListIC")) {
    let listStateDeserialized = JSON.parse(localStorage.getItem("savedListIC"));
    mainContainer.innerHTML = listStateDeserialized;
    cardList = document.getElementById("card-list")
  }
});

