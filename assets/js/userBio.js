import { people } from "./people.js";

const profileImage = document.getElementById("profileImage");
const profileName = document.getElementById("profileName");
const profileGender = document.getElementById("profileGender");
const likesList = document.getElementById("likesList");
const dislikesList = document.getElementById("dislikesList");
const hobbiesList = document.getElementById("hobbiesList");
const addFriendBtn = document.getElementById("addFriendBtn");
const profileCard = document.querySelector(".profile-card");

function getPersonIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function fixImagePath(path) {
  if (!path) return "";

  if (path.startsWith("../")) return path;
  if (path.startsWith("./")) return `../${path.slice(2)}`;
  if (path.startsWith("/")) return path;

  return `../${path}`;
}

function fillTagList(container, items, type) {
  container.innerHTML = "";

  items.forEach((item) => {
    const span = document.createElement("span");
    span.classList.add("profile-tag-item");

    if (type === "likes") span.classList.add("likes-tag");
    if (type === "dislikes") span.classList.add("dislikes-tag");
    if (type === "hobbies") span.classList.add("hobbies-tag");

    span.textContent = item;
    container.appendChild(span);
  });
}

function renderProfile(person) {
  const correctedImagePath = fixImagePath(person.image);

  profileName.textContent = person.name;
  profileGender.textContent = person.gender;
  profileImage.src = correctedImagePath;
  profileImage.alt = `${person.name} profile picture`;

  fillTagList(likesList, person.likes, "likes");
  fillTagList(dislikesList, person.dislikes, "dislikes");
  fillTagList(hobbiesList, person.hobbies, "hobbies");
}

function renderNotFound(message = "Profile not found.") {
  profileCard.innerHTML = `
        <div class="profile-not-found">
            <p>${message}</p>
        </div>
    `;
}

function setupAddFriend(person) {
  let requestSent = false;

  addFriendBtn.addEventListener("click", () => {
    if (!requestSent) {
      addFriendBtn.textContent = `Request sent to ${person.name.split(" ")[0]}`;
      addFriendBtn.classList.add("added");
      requestSent = true;
    } else {
      addFriendBtn.textContent = "Add Friend";
      addFriendBtn.classList.remove("added");
      requestSent = false;
    }
  });
}

const personId = getPersonIdFromURL();

if (!personId) {
  renderNotFound("No profile id was provided in the URL.");
} else {
  const person = people.find((p) => p.id === personId);

  if (!person) {
    renderNotFound(`No person found with id "${personId}".`);
  } else {
    renderProfile(person);
    setupAddFriend(person);
  }
}
