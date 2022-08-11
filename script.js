function renderEvents(results) {
  const eventsGrid = document.querySelector(".cards-container");
  eventsGrid.innerHTML = "";

  for (let i = 0; i < results.length; i++) {
    const startTime = new Date(results[i].start_iso);
    const month = startTime.toLocaleString("no-NO", { month: "short" });
    const weekday = startTime.toLocaleString("no-NO", { weekday: "long" });
    const day = startTime.toLocaleString("no-NO", { day: "numeric" });
    const hourMin = startTime.toLocaleString("no-NO", {
      timeStyle: "short",
    });

    eventsGrid.innerHTML += `
  <a href="${results[i].permalink}" target="_blank" class="event-card">
  <img src="${results[i].bilde_small}" alt="Bilde for arrangement" class="thumbnail">
  <div class="date-time">
      <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <p class="date-text">${weekday} ${day} ${month}</p>
      </div>
      <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <p class="date-text">kl. ${hourMin}</p>
      </div>
  </div>
  <div class="place">
  <div>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#272727" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      <p>${results[i].sted}</p>
  </div>
</div>
  <h3 class="event-title">${results[i].tittel}</h3>
  <p class="event-subtitle">${results[i].undertittel}</p>
  
    </a>
    `;

    if (i === 2) {
      break;
    }
  }
}

const url = "https://alvdalkultur-api.herokuapp.com/v2/kommende-eventer";

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
