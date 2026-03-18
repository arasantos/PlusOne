import { events } from "./events.js";

let isGoing = false;
const peopleCount = document.getElementById("eventPeopleCount");

function getPeopleCount() {
    if (!peopleCount) return 0;
    const match = peopleCount.textContent.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
}

function setPeopleCount(n) {
    if (!peopleCount) return;
    peopleCount.textContent = `${n} people are coming`;
}

function getEventIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("eventId");
}

function renderNotFound() {
    const container = document.getElementById("eventDetailContainer");
    if (container) container.innerHTML = `<p>Event not found.</p>`;
}

function renderEventDetail(event) {
    const hero = document.getElementById("eventHero");
    const title = document.getElementById("eventTitle");
    const location = document.getElementById("eventLocation");
    const date = document.getElementById("eventDate");
    const time = document.getElementById("eventTime");
    const desc = document.getElementById("eventDescription");
    const postedBy = document.getElementById("eventPostedBy");

    if (hero) {
        if (event.image) {
            const imgSrc = event.image.startsWith("http")
                ? event.image
                : `../${event.image}`;

            hero.innerHTML = `<img src="${imgSrc}" alt="${event.name}">`;
        } else {
            hero.innerHTML = "";
        }
    }

    if (title) title.textContent = event.name;
    if (location) location.textContent = event.location;
    if (date) date.textContent = event.eventDate;
    if (time) time.textContent = event.time;
    if (desc) desc.textContent = event.description || "";
    if (postedBy) {
        postedBy.innerHTML = `<strong>Posted by:</strong> ${event.postedByName}`;
    }
}

function updateUI(eventId) {
    const imComingBtn = document.getElementById("imComingBtn");
    const viewBtn = document.getElementById("viewAttendeesBtn");

    if (!imComingBtn || !viewBtn) return;

    if (isGoing) {
        imComingBtn.textContent = "Leave Event";
        imComingBtn.classList.add("going");
        imComingBtn.classList.remove("not-going");

        viewBtn.classList.remove("hidden");
        viewBtn.href = `designA.html`;
    } else {
        imComingBtn.textContent = "Join Event";
        imComingBtn.classList.add("not-going");
        imComingBtn.classList.remove("going");

        viewBtn.classList.add("hidden");
        viewBtn.href = "#";
    }
}

const eventId = getEventIdFromUrl();
const selectedEvent = events.find(e => e.id === eventId);

if (!eventId || !selectedEvent) {
    renderNotFound();
} else {
    renderEventDetail(selectedEvent);
    updateUI(eventId);

    const imComingBtn = document.getElementById("imComingBtn");
    imComingBtn?.addEventListener("click", () => {
        const current = getPeopleCount();
        isGoing = !isGoing;

        if (isGoing) {
            setPeopleCount(current + 1);
        } else {
            setPeopleCount(Math.max(0, current - 1));
        }

        updateUI(eventId);
    });
}