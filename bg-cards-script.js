function renderEvents(results) {
  const eventsGrid = document.querySelector(".cards-container");
  eventsGrid.innerHTML = "";

  for (let i = 0; i < results.length; i++) {
    const startTime = new Date(results[i].start_iso);
    const endTime = new Date(results[i].slutt_iso);
    const month = startTime.toLocaleString("no-NO", { month: "short" });
    const weekday = startTime.toLocaleString("no-NO", { weekday: "short" });
    const day = startTime.toLocaleString("no-NO", { day: "numeric" });
    const hourMin = startTime.toLocaleString("no-NO", {
      timeStyle: "short",
    });
    const dayEnd = endTime.toLocaleString("no-NO", { day: "numeric" });
    const monthEnd = endTime.toLocaleString("no-NO", { month: "short" });
    const weekdayEnd = endTime.toLocaleString("no-NO", { weekday: "short" });


    eventsGrid.innerHTML += `
    <a href="${results[i].permalink}" target="_blank" class="event-card">
    <img src="${results[i].bilde_medium}" alt="Bilde for arrangement" class="thumbnail">
    <div class="overlay">
      <div class="dato-sted-wrapper">
        ${results[i].eventType === "Flerdagsarrangement" ? `<div class="dato-box dato-box__flerdags">
        <span class="dato-box__flerdags-tid">${weekday} ${day} ${month}</span>
        <span class="dato-box__flerdags-tid"> - </span>
        <span class="dato-box__flerdags-tid">${weekdayEnd} ${dayEnd} ${monthEnd}</span>
      </div>` : `<div class="dato-box dato-box__single">
      <span class="dato-box__single-dag">${weekday.replaceAll(".", "")}</span>
      <span class="dato-box__single-tid">${day} ${month}</span>
      <span class="dato-box__single-tid">kl. ${hourMin}</span>
    </div>`}
        
        ${results[i].sted === "Ikke oppgitt" ? `<div></div>` : `<div class="sted-box">
        <svg class="sted-box__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#383838" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <p class="sted-box__tekst">${results[i].sted}</p>
      </div>`}
      </div>
      
      <div class="detail-box">
        <p class="detail-box__tittel">${results[i].tittel}</p>
        <p class="detail-box__undertittel">${results[i].undertittel}</p>
      </div>
    </div>
</a>
    `;

    if (i === 8) {
      break;
    }
  }
}

const url = "https://alvdalkultur-api-production.up.railway.app/v1/kommende-eventer";

async function getEvents() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    renderEvents(results);
  } catch (error) {
    console.log(error);
  }
}

getEvents();
