import { events } from "./events.js";
import { people } from "./people.js";

const eventsList = document.getElementById("eventsList");

function renderEvents() {
    if (!eventsList) return;

    eventsList.innerHTML = events.map((event) => {

        const badge = event.isViewed
            ? `<div class="event-badge viewed">VIEWED</div>`
            : `<div class="event-badge">NEW</div>`;

        return `
            <a class="event-card" href="pages/eventDetails.html?eventId=${encodeURIComponent(event.id)}">
                <div class="event-media">
                    ${event.image ? `<img src="${event.image}" alt="${event.name}">` : ""}
                    ${badge}
                </div>

                <div class="event-info">
                    <div class="event-name">${event.name}</div>

                    <div class="event-row">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${event.location}</span>
                    </div>

                    <div class="event-meta">
                        <div>Posted by: ${event.postedByName}</div>
                        <div>Event on: ${event.eventDate}</div>
                    </div>
                </div>
            </a>
        `;
    }).join("");
}

renderEvents();