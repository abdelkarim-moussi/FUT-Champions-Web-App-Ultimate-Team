const playerCard = document.querySelectorAll(".fut-player-card");
const modal = document.getElementById("add-player-modal");
const closeModalBtn = document.getElementById("close-btn");
const addPlayerForm = document.getElementById("add-player-form");
const addPlayerBtn = document.getElementById("add-player-btn");
const sideBar = document.getElementById("side-bar");
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

//players array
fetch("../../players.json")
  .then((respense) => respense.json())
  .then((data) => {
    localStorage.setItem(`players`, JSON.stringify(data.players));
  });

const playersArray = JSON.parse(localStorage.getItem("players"));

const rw = playersArray.filter((player) => player.position === "RW");
console.log("rw", rw);

playersArray.map((player) => {
  if (player.position != "GK") {
    sideBar.innerHTML += `
    <div class="fut-player-card cursor-pointer">
      <div class="player-card-top">
        <div class="player-master-info">
          <div class="player-rating">
            <span id="player-rating">${player.rating}</span>
          </div>
          <div class="player-position">
            <span id="player-position">${player.position}</span>
          </div>
          <div class="player-nation">
            <span id="player-nation"><img src="${player.flag}" alt="nation flag"></span>
          </div>
          <div class="player-club">
            <span id="player-club"><img src="${player.logo}" alt="club flag"></span>
          </div>
        </div>
        <div class="player-picture">
        <img src="${player.photo}" alt="player image"></div>
      </div>
      <div class="player-card-bottom">
        <div class="player-info">
          <div class="player-name ml-2">
            <span id="player-name">${player.name}</span>
          </div>
          <div class="player-features">
            <div class="player-features-col">
              <span>
                <div class="player-feature-value" id="pace">${player.pace}</div>
                <div class="player-feature-title">PAC</div>
              </span>
              <span>
                <div class="player-feature-value" id="shooting">${player.shooting}</div>
                <div class="player-feature-title">SHO</div>
              </span>
              <span>
                <div class="player-feature-value" id="passing">${player.passing}</div>
                <div class="player-feature-title">PAS</div>
              </span>
            </div>
            <div class="player-features-col">
              <span>
                <div class="player-feature-value" id="dribblling">${player.dribbling}</div>
                <div class="player-feature-title">DRI</div>
              </span>
              <span>
                <div class="player-feature-value" id="defending">${player.defending}</div>
                <div class="player-feature-title">DEF</div>
              </span>
              <span>
                <div class="player-feature-value" id="physical">${player.physical}</div>
                <div class="player-feature-title">PHY</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    sideBar.innerHTML += `
    <div class="fut-player-card cursor-pointer">
      <div class="player-card-top">
        <div class="player-master-info">
          <div class="player-rating">
            <span id="player-rating">${player.rating}</span>
          </div>
          <div class="player-position">
            <span id="player-position">${player.position}</span>
          </div>
          <div class="player-nation">
            <span id="player-nation"><img src="${player.flag}" alt="nation flag"></span>
          </div>
          <div class="player-club">
            <span id="player-club"><img src="${player.logo}" alt="club flag"></span>
          </div>
        </div>
        <div class="player-picture">
        <img src="${player.photo}" alt="player image"></div>
      </div>
      <div class="player-card-bottom">
        <div class="player-info">
          <div class="player-name ml-2">
            <span id="player-name">${player.name}</span>
          </div>
          <div class="player-features">
            <div class="player-features-col">
              <span>
                <div class="player-feature-value" id="diving">${player.diving}</div>
                <div class="player-feature-title">DIV</div>
              </span>
              <span>
                <div class="player-feature-value" id="handling">${player.handling}</div>
                <div class="player-feature-title">HAN</div>
              </span>
              <span>
                <div class="player-feature-value" id="passing">${player.kicking}</div>
                <div class="player-feature-title">KIC</div>
              </span>
            </div>
            <div class="player-features-col">
              <span>
                <div class="player-feature-value" id="dribblling">${player.reflexes}</div>
                <div class="player-feature-title">REF</div>
              </span>
              <span>
                <div class="player-feature-value" id="defending">${player.speed}</div>
                <div class="player-feature-title">SPE</div>
              </span>
              <span>
                <div class="player-feature-value" id="physical">${player.positioning}</div>
                <div class="player-feature-title">POS</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
});
