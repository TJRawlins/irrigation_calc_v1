setTimeout(()=> {
    const draggables = document.querySelectorAll('#card-list li')
    const droppables = document.querySelectorAll('#card-list')
    
    draggables.forEach((card) => {
        card.setAttribute("draggable", "true")
        card.addEventListener("dragstart", ()=> {
            card.classList.add("is-dragging");
        });
        card.addEventListener("dragend", ()=> {
            card.classList.remove("is-dragging");
        });
    });

    droppables.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();

            const bottomCard = insertAboveCard(zone, e.clientY);
            const curCard = document.querySelector(".is-dragging")

            if (!bottomCard) {
                zone.appendChild(curCard)
            } else {
                zone.insertBefore(curCard, bottomCard);
            }
        });
    });

    const insertAboveCard = (zone, mouseY) => {
        const els = zone.querySelectorAll("#card-list li:not(.is-dragging)");

        let closestCard = null;
        let closestOffset = Number.NEGATIVE_INFINITY

        els.forEach((card) => {
            // get top of card
            const { top } = card.getBoundingClientRect();

            const offset = mouseY - top;

            // find closest card
            if(offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closestCard = card;
            }
        })
        
        return closestCard;
    }



}, 1000)

