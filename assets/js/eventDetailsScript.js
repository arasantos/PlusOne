import { events } from "./events.js";

function getEventIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("eventId");
}

function renderEventDetail(event) {
    const title = document.getElementById("eventTitle");
    const meta = document.getElementById("eventMeta");
    const location = document.getElementById("eventLocation");

    if (title) title.textContent = event.name;
    if (location) location.textContent = event.location;

    if (meta) {
        meta.innerHTML = `
            <div>Posted by: ${event.postedByName}</div>
            <div>Event on: ${event.eventDate}</div>
        `;
    }
}

function renderNotFound() {
    const container = document.getElementById("eventDetailContainer");
    if (container) {
        container.innerHTML = `<p>Event not found.</p>`;
    }
}

const eventId = getEventIdFromUrl();
const selectedEvent = events.find(e => e.id === eventId);

if (!eventId || !selectedEvent) {
    renderNotFound();
} else {
    renderEventDetail(selectedEvent);
}