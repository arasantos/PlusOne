import { attendeeList, currentFilter, renderAttendeeList } from "./designBScript.js";

//button handler declaration

const filterButton = document.getElementById('design-b-filter-button')
const applyButton = document.getElementById('design-b-filter-apply')
const cancelButton = document.getElementById('design-b-filter-cancel')

const genderCheckboxes = document.querySelectorAll(".design-b-filter-gender-check");
const preferenceCheckboxes = document.querySelectorAll(".design-b-filter-preference-check");

const filterPanel = document.getElementById("design-b-filter-panel");
const filterOverlay = document.getElementById('design-b-filter-overlay');

filterButton.addEventListener('click', handleFilterButtonOnClick);
applyButton.addEventListener('click', handleApplyButtonOnClick);
cancelButton.addEventListener('click', handleCancelButtonOnClick);

//on click handler
function handleFilterButtonOnClick() {
    restoreSelections();
    filterPanel.classList.remove("hidden");
    filterOverlay.classList.remove("hidden");
}

function handleCancelButtonOnClick() {
    closeFilter();
}

function handleApplyButtonOnClick() {
    const selectedGender = [...genderCheckboxes]
        .filter(c => c.checked)
        .map(c => c.value);

    const selectedPreference = [...preferenceCheckboxes]
        .filter(c => c.checked)
        .map(c => c.value);

    currentFilter.gender = selectedGender;
    currentFilter.preference = selectedPreference;

    renderAttendeeList(attendeeList, currentFilter);
    closeFilter();
}


//helper 
function closeFilter() {
    filterPanel.classList.add("hidden");
    filterOverlay.classList.add("hidden");
}

function restoreSelections() {
    genderCheckboxes.forEach(c => {
        c.checked = currentFilter.gender.includes(c.value);
    });

    preferenceCheckboxes.forEach(c => {
        c.checked = currentFilter.preference.includes(c.value);
    });
}
