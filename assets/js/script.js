const playerCard = document.querySelectorAll(".fut-player-card");
const modal = document.getElementById("add-player-modal");
const closeModalBtn = document.getElementById("close-btn");
const addPlayerForm = document.getElementById("add-player-form");
const addPlayerBtn = document.getElementById("add-player-btn");
const sideBar = document.getElementById("side-bar");
const field = document.getElementById("field");
let error = document.querySelector(".error-message");
// console.log("error", error.innerHTML);
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
  addPlayerForm.reset();
}
closeModalBtn.addEventListener("click", hideModal);

//players array
fetch("../../players.json")
  .then((respense) => respense.json())
  .then((data) => {
    localStorage.setItem(`players`, JSON.stringify(data.players));
  });

const playersArray = JSON.parse(localStorage.getItem("players"));

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
  if (playerName.value === "" || playerName.value.length > 20) {
    showErrorMessage(playerName, "Enter a valid name");
  } else if (playerImage.value === "") {
    showErrorMessage(playerImage, "you have to upload an image");
  } else if (playerPosition.value === "none") {
    showErrorMessage(playerPosition, "you have to choose a valid position");
  } else if (
    playerNationality.value === "" ||
    playerNationality.value.length > 10
  ) {
    showErrorMessage(playerNationality, "Enter a valid nation");
  } else if (playerClub.value === "" || playerClub.value.length > 4) {
    showErrorMessage(playerClub, "the club must contain 4 letters maximum");
  } else if (playerRating.value === "" || playerRating.value <= 0) {
    showErrorMessage(playerRating, "invalid rating number");
  } else if (playerPace.value === "" || playerPace.value <= 0) {
    showErrorMessage(playerPace, "invalid pace number");
  } else if (playerShooting.value === "" || playerShooting.value <= 0) {
    showErrorMessage(playerShooting, "invalid shooting number");
  } else if (playerPassing.value === "" || playerPassing.value <= 0) {
    showErrorMessage(playerPassing, "invalid passing number");
  } else if (playerDriblling.value === "" || playerDriblling.value <= 0) {
    showErrorMessage(playerDriblling, "invalid dribling number");
  } else if (playerDefending.value === "" || playerDefending.value <= 0) {
    showErrorMessage(playerDefending, "invalid defendig number");
  } else if (playerPhysical.value === "" || playerPhysical.value <= 0) {
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

    error.innerHTML = "";
    console.log("rating", playerRating.value);
  }
};

//display players

//create card object function
function createPlayer(
  name,
  image,
  position,
  nat,
  club,
  rating,
  pace,
  dribbling,
  shooting,
  defencing,
  passing,
  physical
) {
  const player = {
    name: name,
    image: image,
    rating: rating,
    position: position,
    nationality: nat,
    club: club,
    pace: pace,
    driblling: dribbling,
    shooting: shooting,
    defencing: defencing,
    passing: passing,
    physical: physical,
  };
  rating.innerHTML = player.rating;
  console.log("rating", rating);
}

function displayPlayers(playersArray) {
  sideBar.innerHTML = "";
  playersArray.map((player, playerId) => {
    const player_Card = document.createElement("div");
    player_Card.className = "fut-player-card cursor-pointer";
    player_Card.id = `player-card${playerId}`;
    if (player.position != "GK") {
      player_Card.innerHTML = `
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
  `;
      sideBar.appendChild(player_Card);
      player_Card.addEventListener(
        "click",
        addPlayerToPosition(player, `player-card${playerId}`)
      );
    } else {
      player_Card.innerHTML = `
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
      </div>`;

      sideBar.appendChild(player_Card);
      player_Card.addEventListener(
        "click",
        addPlayerToPosition(player, `player-card${playerId}`)
      );
    }
  });
}

// function addPlayerToPosition(player, positionId) {
//   const positionElement = document.getElementById(positionId);

//   // Check if the position is already filled
//   // if (positionElement.children.length > 0) {
//   //   alert("This position is already filled!");
//   //   return;
//   // }

//   // Create a new card for the player
//   const playerCard1 = document.createElement("div");
//   playerCard1.className = "fut-player-card cursor-pointer";
//   playerCard1.innerHTML = `
//     <div class="player-card-top">
//         <div class="player-master-info">
//           <div class="player-rating">
//             <span id="player-rating">${player.rating}</span>
//           </div>
//           <div class="player-position">
//             <span id="player-position">${player.position}</span>
//           </div>
//           <div class="player-nation">
//             <span id="player-nation"><img src="${player.flag}" alt="nation flag"></span>
//           </div>
//           <div class="player-club">
//             <span id="player-club"><img src="${player.logo}" alt="club flag"></span>
//           </div>
//         </div>
//         <div class="player-picture">
//         <img src="${player.photo}" alt="player image"></div>
//       </div>
//       <div class="player-card-bottom">
//         <div class="player-info">
//           <div class="player-name ml-2">
//             <span id="player-name">${player.name}</span>
//           </div>
//           <div class="player-features">
//             <div class="player-features-col">
//               <span>
//                 <div class="player-feature-value" id="diving">${player.diving}</div>
//                 <div class="player-feature-title">DIV</div>
//               </span>
//               <span>
//                 <div class="player-feature-value" id="handling">${player.handling}</div>
//                 <div class="player-feature-title">HAN</div>
//               </span>
//               <span>
//                 <div class="player-feature-value" id="passing">${player.kicking}</div>
//                 <div class="player-feature-title">KIC</div>
//               </span>
//             </div>
//             <div class="player-features-col">
//               <span>
//                 <div class="player-feature-value" id="dribblling">${player.reflexes}</div>
//                 <div class="player-feature-title">REF</div>
//               </span>
//               <span>
//                 <div class="player-feature-value" id="defending">${player.speed}</div>
//                 <div class="player-feature-title">SPE</div>
//               </span>
//               <span>
//                 <div class="player-feature-value" id="physical">${player.positioning}</div>
//                 <div class="player-feature-title">POS</div>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>`;
//   // Append the player card to the specified position
//   positionElement.appendChild(playerCard1);
// }

// function addPlayer(player) {
//   playersArray.forEach((player) => {
//     player.addEventListener("click", () => {
//       displayPlayers();
//     });
//   });
// }

function add_Player(pos) {
  let lwPLayers = playersArray.filter((player) => {
    return player.position === pos;
  });

  console.log(lwPLayers);
  addPlayerToPosition(lwPLayers);
}

function addPlayerToPosition(arr) {
  sideBar.innerHTML = "";
  arr.map((player, playerId) => {
    let playerCard1 = document.createElement("div");
    playerCard1.setAttribute("onclick", "addPlayerToF(this)");
    playerCard1.className = "fut-player-card cursor-pointer";
    playerCard1.id = playerId;
    playerCard1.innerHTML = `
    <div class="player-card-top">f
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
   `;
    sideBar.appendChild(playerCard1);
  });
}

function addPlayerToF(div) {
  document.getElementById("player-lw").innerHTML = div.innerHTML;
}

// playerCard.forEach((card) => {
//   card.addEventListener("click", () => {
//     switch (card.id) {
//       case "player-lw":
//         let lwPLayers = playersArray.filter((player) => {
//           return player.position === "LW";
//         });
//         displayPlayers(lwPLayers);
//         break;
//       case "player-st":
//         let stPLayers = playersArray.filter((player) => {
//           return player.position === "ST";
//         });
//         displayPlayers(stPLayers);
//         break;
//       case "player-rw":
//         let rwPLayers = playersArray.filter((player) => {
//           return player.position === "RW";
//         });
//         displayPlayers(rwPLayers);

//         break;
//       case "player-cm-g":
//         let cmgPLayers = playersArray.filter((player) => {
//           return player.position === "CM";
//         });
//         displayPlayers(cmgPLayers);
//         break;
//       case "player-cm-c":
//         let cmcPLayers = playersArray.filter((player) => {
//           return player.position === "CM";
//         });
//         displayPlayers(cmcPLayers);
//         break;
//       case "player-cm-d":
//         let cmdPLayers = playersArray.filter((player) => {
//           return player.position === "CM";
//         });
//         displayPlayers(cmdPLayers);
//         break;
//       case "player-lb":
//         let lbPLayers = playersArray.filter((player) => {
//           return player.position === "LB";
//         });
//         displayPlayers(lbPLayers);
//         break;
//       case "player-cb-g":
//         let cbgPLayers = playersArray.filter((player) => {
//           return player.position === "CB";
//         });
//         displayPlayers(cbgPLayers);
//         break;
//       case "player-cb-d":
//         let cbdPLayers = playersArray.filter((player) => {
//           return player.position === "CB";
//         });
//         displayPlayers(cbdPLayers);
//         break;
//       case "player-rb":
//         let rbPLayers = playersArray.filter((player) => {
//           return player.position === "RB";
//         });
//         displayPlayers(rbPLayers);
//         break;
//       case "player-gk":
//         let gkPLayers = playersArray.filter((player) => {
//           return player.position === "GK";
//         });
//         displayPlayers(gkPLayers);
//         break;
//       default:
//         displayPlayers(playersArray);
//         break;
//     }
//   });
// });
