
const cards = document.querySelectorAll('#card-list li')
const zones = document.querySelectorAll('#card-list')

let draggedItem = null;
let zoneList = null;
let targetCard = null;
let dragStartIndex;
let dragEndIndex;

document.addEventListener('dragstart', (e)=>{
    draggedItem = e.target;
    setTimeout(()=> {
        draggedItem.style.display = "none"
    }, 0)

    // get item-id value for card that you are dragging
    if(e.target.nodeName === "LI") {
        dragStartIndex = +e.target.getAttribute('item-id')
    }
    
    
    
})

document.addEventListener('dragend', (e) => {
    setTimeout(()=> {
        draggedItem.style.display = "block"
        draggedItem = null;
    }, 0)
    
})

document.addEventListener('dragover', (e)=> {
    e.preventDefault();
    if(e.target.nodeName === "UL") {
 
    }

    // get item-id value for card that you are dragging over
    if(e.target.nodeName === "LI") {
        dragEndIndex = +e.target.getAttribute('item-id')
    }
    
})

document.addEventListener('dragenter', (e)=> {
    e.preventDefault();
    if(e.target.nodeName === "UL" && e.target.hasAttribute('id')) {
        e.target.style.backgroundColor = "rgba(128, 128, 128, 0.4)"
    }
    
})

document.addEventListener('dragleave', (e)=> {
    e.preventDefault();
    if(e.target.nodeName === "UL" && e.target.hasAttribute('id')) {
        e.target.style.backgroundColor = "rgba(128, 128, 128, 0.449)"
    }
})

document.addEventListener('drop', (e)=> {
    if(e.target.nodeName === "UL" && e.target.hasAttribute('id')) {
        // zoneList = e.target
        e.target.append(draggedItem)
        // zoneList = null;
        e.target.style.backgroundColor = "rgba(128, 128, 128, 0.449)"


        
    } else {

        // get item 1 and 2 based on their item-id
        const itemOne = document.querySelector(`[item-id="${dragStartIndex}"]`)
        const itemTwo = document.querySelector(`[item-id="${dragEndIndex}"]`)
        try {
            // swap item 1 and 2
            itemTwo.parentNode.insertBefore(itemOne, itemTwo)
            // console.log(itemOne, itemTwo, itemTwo.parentNode);
            console.log('Swapped');
        } catch {
            console.log('No parent node found.');
            
        }
    }

    
})



