const playerCard = document.querySelectorAll(".fut-player-card");
const modal = document.getElementById("add-player-modal");
const closeModalBtn = document.getElementById("close-btn");
const addPlayerForm = document.getElementById("add-player-form");
const addPlayerBtn = document.getElementById("add-player-btn");

//form inputs
let playerName = document.getElementById("f-name");
let playerImage = document.getElementById("f-image");
let playerPosition = document.getElementById("f-position");
let playerNationality = document.getElementById("f-nationality");
let playerClub = document.getElementById("f-club");
let playerRating = document.getElementById("f-rating");
let playerPace = document.getElementById("f-pace");
let playerShooting = document.getElementById("f-shooting");
let playerPassing = document.getElementById("f-passing");
let playerDriblling = document.getElementById("f-driblling");
let playerDefending = document.getElementById("f-defending");
let playerPhysical = document.getElementById("f-physical");

//player card informations variables declaration

let rating = document.getElementById("player-rating");

console.log(rating);
console.log("p-name", playerName.value);
console.log("rating", playerRating.value);
console.log("pace", playerPace);
//close modal
function hideModal() {
  modal.classList.add("hidden");
}
closeModalBtn.addEventListener("click", hideModal);

//stop the default behavior of the form on submit by using preventdefault method

addPlayerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();
});

function showErrorMessage(element, message) {
  const inputControl = element.parentElement;
  const displayError = inputControl.querySelector(".error-message");
  displayError.innerHTML = message;
}
let validateForm = () => {
  console.log("name", playerName.value);
  if (playerName.value === "" || playerName.value.length > 10) {
    showErrorMessage(playerName, "Enter a valid name");
  } else if (playerImage.value === "") {
    showErrorMessage(playerImage, "you have to upload an image");
  } else if (
    playerNationality.value === "" ||
    playerNationality.value.length > 10
  ) {
    showErrorMessage(playerNationality, "Enter a valid nation");
  } else if (playerClub.value === "" || playerClub.value.length > 4) {
    showErrorMessage(playerClub, "the club must contain 4 letters maximum");
  } else if (playerRating.value === "") {
    showErrorMessage(playerRating, "invalid rating number");
  } else if (playerPace.value === "") {
    showErrorMessage(playerPace, "invalid pace number");
  } else if (playerShooting.value === "") {
    showErrorMessage(playerShooting, "invalid shooting number");
  } else if (playerPassing.value === "") {
    showErrorMessage(playerPassing, "invalid passing number");
  } else if (playerDriblling.value === "") {
    showErrorMessage(playerDriblling, "invalid dribling number");
  } else if (playerDefending.value === "") {
    showErrorMessage(playerDefending, "invalid defendig number");
  } else if (playerPhysical.value === "") {
    showErrorMessage(playerPhysical, "invalid physical number");
  } else {
    rating.innerHTML = playerRating.value;
    // playerName.value = "";
    // playerImage.value = "";
    // playerPosition.value = "";
    // playerNationality.value = "";
    // playerClub.value = "";
    // playerRating.value = "";
    // playerPace.value = "";
    // playerShooting.value = "";
    // playerPassing.value = "";
    // playerDriblling.value = "";
    // playerDefending.value = "";
    // playerPhysical.value = "";
    addPlayerForm.reset();
    hideModal();
  }
};

playerCard.forEach((card) => {
  card.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
});
