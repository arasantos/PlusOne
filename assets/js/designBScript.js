import { people } from "./people.js"
import { events } from "./events.js"
import { PREFERENCES } from "./preferences.js";

//taken from eventDetailsScript.js ---
function getEventIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("eventId");
}

function renderNotFound() {
    const container = document.getElementById("eventDetailContainer");
    if (container) container.innerHTML = `<p>Event not found.</p>`;
}

const eventId = getEventIdFromUrl();
const selectedEvent = events.find(e => e.id === eventId);

//design B variables

let attendeeList = [];
let currentFilter = { gender: [], preference: [] };

//design B function

//return list of "attendees" which is basically a flat object for the people attributes needed
function getAttendees(event) {
    let toReturn = [];
    event.people.forEach(
        attendee => {
            const person = people.find(person => person.id === attendee.peopleId);
            if (person) {
                toReturn.push(
                    {
                        id: person.id,
                        name: person.name,
                        gender: person.gender,
                        image: person.image,
                        preferenceLabel: attendee.preference.label,
                        preferenceId: attendee.preference.id,
                        preferenceIcon: attendee.preference.icon,
                    }
                )
            }
        }
    );
    return toReturn;
}

//render attendee object to li
function renderAttendee(attendee) {
    console.log("renderAttendee(%o)", attendee);
    let toReturn = document.createElement('div');
    toReturn.classList.add("design-b-row-attendee");
    if (attendee) {
        //avatar
        let avatarDiv = document.createElement('div');
        avatarDiv.classList.add("design-b-col-avatar");
        let avatarImg;
        if (attendee.image && attendee.img !== "") {
            avatarImg = document.createElement('img');
            avatarImg.src = attendee.image;
        } else {
            avatarImg = document.createElement('i');
            avatarImg.classList.add(...['fa', 'fa-user']);
        }
        avatarImg.alt = `${attendee.name}'s avatar`;
        avatarDiv.appendChild(avatarImg);

        //name
        let nameDiv = document.createElement('div');
        nameDiv.classList.add('design-b-col-name')
        nameDiv.textContent = attendee.name;

        //gender
        let genderDiv = document.createElement('div');
        genderDiv.classList.add('design-b-col-gender');
        genderDiv.textContent = attendee.gender;

        //preference
        let preferenceDiv = document.createElement('div');
        preferenceDiv.classList.add('design-b-col-preference');
        let preferenceIcon = document.createElement('i');
        preferenceIcon.classList.add(...attendee.preferenceIcon.split(' '));
        preferenceDiv.appendChild(preferenceIcon)
        let preferenceText = document.createElement('p');
        preferenceText.textContent = attendee.preferenceLabel;
        preferenceDiv.appendChild(preferenceText);

        //container div
        toReturn.setAttribute('id', attendee.id);

        toReturn.appendChild(avatarDiv);
        toReturn.appendChild(nameDiv);
        toReturn.appendChild(genderDiv);
        toReturn.appendChild(preferenceDiv);
        return toReturn;
    } else {
        toReturn.textContent("attenndee not found");
    }
}

function renderAttendeeList(attendeeList, filter = { gender: [], preference: [] }) {
    console.log("updateAttendeeList: %o, %o", attendeeList, filter)
    const attendeeContainer = document.getElementById('design-b-attendee-container');
    attendeeContainer.innerHTML = "";

    let toRender = attendeeList;

    if (filter.gender.length > 0) {
        toRender = toRender.filter(a =>
            filter.gender.includes(a.gender)
        )
    }

    // keys.length -1 since flexible is not a part of the filter
    if (filter.preference.length > 0 && filter.preference.length < Object.keys(PREFERENCES).length - 1) {
        toRender = toRender.filter(a =>
            a.preferenceId == PREFERENCES.FLEXIBLE ||
            filter.preference.includes(a.preferenceId)
        )
    }

    toRender.forEach(a => { attendeeContainer.appendChild(renderAttendee(a)) })
}

function renderDesignB(event) {
    attendeeList = getAttendees(event);
    renderAttendeeList(attendeeList);
}


if (!eventId || !selectedEvent) {
    console.info("Event not found")
    renderNotFound();
} else {
    console.log(selectedEvent)
    console.log(people)
    renderDesignB(selectedEvent);
}

export {
    attendeeList,
    currentFilter,
    renderAttendee,
    renderAttendeeList,
}