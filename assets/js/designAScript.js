import { people } from "./people.js"
import { user1 } from "./users.js"

// change this to be the specific user for the participant in the experiment
const user = user1; 

const sortedPeople = handleFindingSimilarPeople();
const MAX_MATCHES = sortedPeople.length;

const container = document.getElementById("cardContainer");

let isDragging = false;
let startX = 0;
let startY = 0;
let currentCard = null;

/**
 * make card starting from least similar to similar
 * so the card of the person that's most similar to user
 * gets "drawn" last, thus it shows first
 */
for (let i = MAX_MATCHES - 1; i >= 0; i--) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundColor = "white";

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    fillPersonInformation(sortedPeople[i], cardContent);
    
    card.appendChild(cardContent);
    card.id = sortedPeople[i].id;
    container.appendChild(card);
}

document.getElementById('yesButton').addEventListener('click', () => {
    console.log("debug", currentCard);
    handleSwipeAsButtonClick(100);
    goToPersonPage(currentCard.id);
});

document.getElementById('noButton').addEventListener('click', () => {
    handleSwipeAsButtonClick(-100);
});

document.getElementById('saveLaterButton').addEventListener('click', () => {
    handleSaveLaterButton();
});

/** calculates the distance for when user started touching the screen and when they lifted their finger **/
container.addEventListener("mousedown", (e) => {
    currentCard = getTopCard();
    
    if (!currentCard) return;
    
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    currentCard.style.transition = "none";
});

container.addEventListener("mousemove", (e) => {
    if (!isDragging || !currentCard) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    // only apply horizontal swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        currentCard.style.transform = `translateX(${deltaX}px) rotate(${
            deltaX / 10
        }deg)`;
    }
});

container.addEventListener("mouseup", (e) => {
    if (!isDragging || !currentCard) return;
    
    const deltaX = e.clientX - startX;
    handleHorizontalSwipe(deltaX);
});

container.addEventListener("touchstart", (e) => {
    currentCard = getTopCard();
    
    if (!currentCard) return;
    
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentCard.style.transition = "none";
});

container.addEventListener("touchmove", (e) => {
    if (!isDragging || !currentCard) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    
    // only apply horizontal swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        e.preventDefault(); // prevent scrolling when swiping horizontally
        currentCard.style.transform = `translateX(${deltaX}px) rotate(${
            deltaX / 10
        }deg)`;
    }
});

container.addEventListener("touchend", (e) => {
    if (!isDragging || !currentCard) return;
    
    const deltaX = e.changedTouches[0].clientX - startX;
    handleHorizontalSwipe(deltaX);
});
/*********************************************************************************************************/

/**
 * create an array of people with only the similarities they have with the user
 * then sort the array based on how many things they have in common with the user
 * @returns void
 */
function handleFindingSimilarPeople() {
    const similarPeople = [];

    people.forEach(person => {
        let addPersonToFront = false;
        
        const commonLikes = person.likes.filter(like => user.likes.includes(like));
        const commonDislikes = person.dislikes.filter(dislike => user.dislikes.includes(dislike));
        const commonHobbies = person.hobbies.filter(hobby => user.hobbies.includes(hobby));
        const commonCount = commonLikes.length + commonDislikes.length + commonHobbies.length;
        
        // check if there are any common interests
        if (commonLikes.length > 0 || commonDislikes.length > 0 || commonHobbies.length > 0) {
            addPersonToFront = true;
        }
        
        // create a modified person object with only common interests
        // similarityCount to be used for sorting
        const modifiedPerson = {
            ...person,
            likes: commonLikes.length > 0 ? commonLikes : [],
            dislikes: commonDislikes.length > 0 ? commonDislikes : [],
            hobbies: commonHobbies.length > 0 ? commonHobbies : [],
            similarityCount: commonCount
        };

        similarPeople.push(modifiedPerson);
    });

    // sorts in descending order
    // makes the person with most similarities as user, be shown first
    similarPeople.sort((personA, personB) => personB.similarityCount - personA.similarityCount);
    return similarPeople;
}

function fillPersonInformation(person, cardContent) {
    const imageContainer = document.createElement("div");
    imageContainer.className = "img-container";

    const image = document.createElement("img");
    image.src = "../" + person.image;

    imageContainer.appendChild(image);

    const personHeader = document.createElement("div");
    personHeader.className = "person-header";

    const name = document.createElement("p");
    name.className = "name";
    name.textContent = person.name;

    const gender = document.createElement("div");
    gender.className = "gender-pill";
    gender.textContent = person.gender;

    personHeader.appendChild(name);
    personHeader.appendChild(gender);

    let alsoLikes;
    let likes;
    if (person.likes?.length > 0) {
        alsoLikes = document.createElement("p");
        alsoLikes.textContent = "Also likes";
        alsoLikes.className = "details-title"

        likes = document.createElement("ul");
        likes.className = "likes";
        person.likes.forEach(like => {
            const li = document.createElement("li");
            li.textContent = like;
            likes.appendChild(li);
        });
    }
    
    let alsoDislikes;
    let dislikes;
    if (person.dislikes?.length > 0) {
        alsoDislikes = document.createElement("p");
        alsoDislikes.textContent = "Also dislikes";
        alsoDislikes.className = "details-title"
        
        dislikes = document.createElement("ul");
        dislikes.className = "dislikes";
        person.dislikes.forEach(dislike => {
            const li = document.createElement("li");
            li.textContent = dislike;
            dislikes.appendChild(li);
        });
    }
    
    let alsoHasHobbies;
    let hobbies;
    if (person.hobbies?.length > 0) {
        alsoHasHobbies = document.createElement("p");
        alsoHasHobbies.textContent = "Also has hobbies";
        alsoHasHobbies.className = "details-title"

        hobbies = document.createElement("ul");
        hobbies.className = "hobbies";
        person.hobbies.forEach(hobby => {
            const li = document.createElement("li");
            li.textContent = hobby;
            hobbies.appendChild(li);
        });
    }

    cardContent.appendChild(imageContainer);
    cardContent.appendChild(personHeader);
    if (alsoLikes) cardContent.appendChild(alsoLikes);
    if (likes) cardContent.appendChild(likes);
    if (alsoDislikes) cardContent.appendChild(alsoDislikes);
    if (dislikes) cardContent.appendChild(dislikes);
    if (alsoHasHobbies) cardContent.appendChild(alsoHasHobbies);
    if (hobbies) cardContent.appendChild(hobbies);
}

function getTopCard() {
    return container.querySelector(".card:last-child");
}

function handleEmptyCardStack() {
    const remainingCards = container.querySelectorAll(".card");
    
    if (remainingCards.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "empty-card-content";
        emptyMessage.textContent = "There's no more people to choose from. Come back later!";
        container.appendChild(emptyMessage);
    }
}

/**
 * swipes the card to left or right if user swiped with enough distance
 * otherwise, puts the card back to the stack
 * @param {float} deltaX: the distance between where the user started and ended their touch to swipe
 * @returns void
 */
function handleHorizontalSwipe(deltaX) {
    const sensitivity = 100;

    if (!currentCard) return;

    if (Math.abs(deltaX) >= sensitivity) {
        currentCard.style.transition = "transform 0.9s ease, opacity 0.4s ease";

        currentCard.style.transform = `translateX(${
            deltaX > 0 ? 1000 : -1000
        }px) rotate(${deltaX > 0 ? 45 : -45}deg)`;
        
        currentCard.style.opacity = 0;
        
        if (deltaX > 0) {
            goToPersonPage(currentCard.id);
        }

        else {
            setTimeout(() => {
                currentCard.remove();
                currentCard = null;
                handleEmptyCardStack();
            }, 400);
        }
    } else {
        currentCard.style.transition = "transform 0.3s ease";
        currentCard.style.transform = "translateX(0) rotate(0)";
    }

    isDragging = false;
}

function swipeUp() {
    currentCard.style.transition = "transform 1.3s ease, opacity 0.4s ease";
    currentCard.style.transform = `translateY(-1000px)`;

    currentCard.style.opacity = 0;

    setTimeout(() => {
        currentCard.remove();
        handleEmptyCardStack();
        currentCard = null;
    }, 400);
}

/**
 * triggers the swiping animation by button click
 * if negative direction, slides the card to the left as X was pressed
 * the direction must be bigger than 50 (swipe right) or smaller than -50 (swipe left)
 * @param {int} direction: 100 if right, -100 if left
 */
function handleSwipeAsButtonClick(direction) {
    currentCard = getTopCard();
    if (!currentCard) return;

    handleHorizontalSwipe(direction);
}

function handleSaveLaterButton() {
    currentCard = getTopCard();
    if (!currentCard) return;

    swipeUp();
}

function goToPersonPage(personId) {
    setTimeout(() => {
        window.location.href = `userBio.html?id=${personId}`;
    }, 800);
}