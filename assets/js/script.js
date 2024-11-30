const playerCard = document.querySelectorAll(".fut-player-card");
const modal = document.getElementById("add-player-modal");
const closeModalBtn = document.getElementById("close-btn");
const addPlayerForm = document.getElementById("add-player-form");
const addPlayerBtn = document.getElementById("add-player-btn");
const sideBar = document.getElementById("side-bar");
const field = document.getElementById("field");
const addPlayerButton = document.getElementById("add-player-button");
let error = document.querySelector(".error-message");

// console.log("error", error.innerHTML);
//form inputs
let playerName = document.getElementById("f-name");
let playerImage = document.getElementById("f-image");
let playerPosition = document.getElementById("f-position");
let playerNationality = document.getElementById("f-nationality");
let playerCountryFlag = document.getElementById("f-flag");
let playerClub = document.getElementById("f-club");
let playerClubLogo = document.getElementById("f-logo");
let playerRating = document.getElementById("f-rating");
let playerPace = document.getElementById("f-pace");
let playerShooting = document.getElementById("f-shooting");
let playerPassing = document.getElementById("f-passing");
let playerDriblling = document.getElementById("f-driblling");
let playerDefending = document.getElementById("f-defending");
let playerPhysical = document.getElementById("f-physical");

//close modal
function hideModal() {
  modal.classList.add("hidden");
  addPlayerForm.reset();
}
closeModalBtn.addEventListener("click", hideModal);

addPlayerButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

//players array
fetch("../../players.json")
  .then((respense) => respense.json())
  .then((data) => {
    if(!localStorage){
      localStorage.setItem(`players`, JSON.stringify(data.players));
    }
  
  });

let playersArray = JSON.parse(localStorage.getItem("players"));

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
    showErrorMessage(playerImage, "you have to enter a valid url");
  } else if (playerPosition.value === "none") {
    showErrorMessage(playerPosition, "you have to choose a valid position");
  } else if (playerNationality.value === "") {
    showErrorMessage(playerNationality, "you have to enter a valid nationality");
  } else if (playerClub.value === "") {
  } else if (playerCountryFlag.value === "") {
    showErrorMessage(playerNationality, "you have to enter a valid url");
  } else if (playerClub.value === "") {
    showErrorMessage(playerClub, "enter a valid logo url");
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
    addPlayerForm.reset();
    hideModal();
  }
};

//display players

function adapteForm() {
  if (playerPosition.value === "gk") {
    playerPace.setAttribute("placeholder", "dividing");
    playerDriblling.setAttribute("placeholder", "handling");
    playerShooting.setAttribute("placeholder", "kicking");
    playerDefending.setAttribute("placeholder", "reflexes");
    playerPassing.setAttribute("placeholder", "speed");
    playerPhysical.setAttribute("placeholder", "positioning");
  } else {
    playerPace.setAttribute("placeholder", "pace");
    playerDriblling.setAttribute("placeholder", "driblling");
    playerShooting.setAttribute("placeholder", "shooting");
    playerDefending.setAttribute("placeholder", "defencing");
    playerPassing.setAttribute("placeholder", "passing");
    playerPhysical.setAttribute("placeholder", "physical");
  }
  console.log(playerPosition.value);
}
adapteForm();

// playerPosition.setAttribute("onSelect", "adapteForm(");

// function displayPlayers(playersArray) {
//   sideBar.innerHTML = "";
//   playersArray.map((player, playerId) => {
//     const player_Card = document.createElement("div");
//     player_Card.className = "fut-player-card cursor-pointer";
//     player_Card.id = `player-card${playerId}`;
//     if (player.position != "GK") {
//       player_Card.innerHTML = `
//    <div class="player-card-top">
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
//                 <div class="player-feature-value" id="pace">${player.pace}</div>
//                 <div class="player-feature-title">PAC</div>
//               </span>
//               <span>
//                 <div class="player-feature-value" id="shooting">${player.shooting}</div>
//                 <div class="player-feature-title">SHO</div>
//               </span>
//               <span>
//                 <div class="player-feature-value" id="passing">${player.passing}</div>
//                 <div class="player-feature-title">PAS</div>
//               </span>
//             </div>
//             <div class="player-features-col">
//               <span>
//                 <div class="player-feature-value" id="dribblling">${player.dribbling}</div>
//                 <div class="player-feature-title">DRI</div>
//               </span>
//               <span>
//                 <div class="player-feature-value" id="defending">${player.defending}</div>
//                 <div class="player-feature-title">DEF</div>
//               </span>
//               <span>
//                 <div class="player-feature-value" id="physical">${player.physical}</div>
//                 <div class="player-feature-title">PHY</div>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//   `;
//       sideBar.appendChild(player_Card);
//       player_Card.addEventListener(
//         "click",
//         addPlayerToPosition(player, `player-card${playerId}`)
//       );
//     } else {
//       player_Card.innerHTML = `
    
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

//       sideBar.appendChild(player_Card);
//       player_Card.addEventListener(
//         "click",
//         addPlayerToPosition(player, `player-card${playerId}`)
//       );
//     }
//   });
// }

function add_Player(pos) {
  let lwPLayers = playersArray.filter((player) => {
    return player.position === pos;
  });
  switch (pos) {
    case "LW":
      addPlayerToPosition(lwPLayers);
      console.log(lwPLayers);
      break;
    case "ST":
      addPlayerToPosition(lwPLayers);
      break;
    case "RW":
      addPlayerToPosition(lwPLayers);
      break;
    case "CMG":
      addPlayerToPosition(lwPLayers);
      break;
    case "CMC":
      addPlayerToPosition(lwPLayers);
      break;
    case "CMD":
      addPlayerToPosition(lwPLayers);
      break;
    case "LB":
      addPlayerToPosition(lwPLayers);
      break;
    case "CBG":
      addPlayerToPosition(lwPLayers);
      break;
    case "CBD":
      addPlayerToPosition(lwPLayers);
      break;
    case "RB":
      addPlayerToPosition(lwPLayers);
      break;
    case "GK":
      addPlayerToPosition(lwPLayers);
      break;
  }
  
}

function addPlayerToPosition(players) {
  sideBar.innerHTML = "";
  players.map((player) => {
    let playerCard1 = document.createElement("div");
    playerCard1.setAttribute("ondblclick", "addPlayerToField(this,this.id)");
    playerCard1.className = "fut-player-card cursor-pointer";
    playerCard1.id = player.id;

    if (player.position != "GK") {
      playerCard1.innerHTML = `
      <div class="player-card-top">
          <div class="absolute top-5 right-1 z-10 flex flex-col items-center gap-2">
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full w-[20px] h-[20px]  p-2" onclick="removePlayer(this)"><i class="fa fa-trash"></i></button>
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full w-[20px] h-[20px]  p-2" onclick="editPlayer(this)"><i class="fa-solid fa-pen-to-square"></i></button>
          </div>
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
    } else {
      playerCard1.innerHTML = `
    <div class="player-card-top">
          <div class="absolute top-5 right-1 z-10 flex flex-col items-center gap-2">
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full w-[20px] h-[20px]  p-2" onclick="removePlayer(this)"><i class="fa fa-trash"></i></button>
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full w-[20px] h-[20px]  p-2" onclick="editPlayer(this)"><i class="fa-solid fa-pen-to-square"></i></button>
          </div>
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
    }
    sideBar.appendChild(playerCard1);
  });
}

function addPlayerToField(div, cardId) {
  const Index = playersArray.findIndex((player) => player.id == cardId);
  let player = playersArray[Index];
  console.log(player);
  // console.log(player.id);
  // if (cardId === player.id) {
  // console.log("pId", player.id);
  switch (player.position) {
    case "LW":
      if (document.getElementById("player-lw").children.length == 0) {
        document.getElementById("player-lw").innerHTML = div.innerHTML;
        div.remove();
        playersArray.splice(Index, 1);
      }
      break;
    case "ST":
      if (document.getElementById("player-st").children.length == 0) {
        document.getElementById("player-st").innerHTML = div.innerHTML;

        div.remove();
        playersArray.splice(Index, 1);
      }

      break;
    case "RW":
      if (document.getElementById("player-rw").children.length == 0) {
        document.getElementById("player-rw").innerHTML = div.innerHTML;
        div.remove();
        playersArray.splice(Index, 1);
      }
      break;
    case "CMG":
      if (document.getElementById("player-cm-g").children.length == 0) {
        document.getElementById("player-cm-g").innerHTML = div.innerHTML;
        div.remove();
        playersArray.splice(Index, 1);
      } 
      break
    case "CMC" : if(document.getElementById("player-cm-c").children.length == 0) {
            document.getElementById("player-cm-c").innerHTML = div.innerHTML;
            div.remove();
            playersArray.splice(Index, 1);
    }
      break;
    case "CMD" : if(document.getElementById("player-cm-d").children.length == 0) {
            document.getElementById("player-cm-d").innerHTML = div.innerHTML;
            div.remove();
            playersArray.splice(Index, 1);
    }
      break;
    case "LB":
      if (document.getElementById("player-lb").children.length == 0) {
        document.getElementById("player-lb").innerHTML = div.innerHTML;
        div.remove();
        playersArray.splice(Index, 1);
      }
      break;
    case "CBG":
      if (document.getElementById("player-cb-g").children.length == 0) {
        document.getElementById("player-cb-g").innerHTML = div.innerHTML;
        div.remove();
        playersArray.splice(Index, 1);
      }
      break;
    case "CBD" : if (document.getElementById("player-cb-d").children.length == 0) {
        document.getElementById("player-cb-d").innerHTML = div.innerHTML;
        div.remove();
        playersArray.splice(Index, 1);
       }
      break;
    case "RB":
      if (document.getElementById("player-rb").children.length == 0) {
        document.getElementById("player-rb").innerHTML = div.innerHTML;
        div.remove();
        playersArray.splice(Index, 1);
      }
      break;
    case "GK":
      if (document.getElementById("player-gk").children.length == 0) {
        document.getElementById("player-gk").innerHTML = div.innerHTML;

        div.remove();
        playersArray.splice(Index, 1);
      }
      break;
  }
  // }
}

//delete player function
function removePlayer(element) {
  const index = playersArray.findIndex(
    (player) =>
      player.id == element.parentElement.parentElement.parentElement.id
  );
  console.log("index", index);
  element.parentElement.parentElement.parentElement.innerHTML = "";
  playersArray.splice(index, 1);
  console.log("players", playersArray);
}

function editPlayer(element) {
  // console.log(element.parentElement.parentElement.parentElement);
  let id = element.parentElement.parentElement.parentElement.id;
  modal.classList.remove("hidden");
  playersArray.map((player) => {

    if (player.id == id) {
      console.log(player.id);
      playerName.value = player.name;
      playerImage.value = player.photo;
      playerNationality.value = player.nationality;
      playerCountryFlag.value = player.flag;
      playerClub.value = player.club;
      playerClubLogo.value = player.logo;
      playerPosition.value = player.position;
      playerRating.value = player.rating;
      playerPace.value = player.pace;
      playerShooting.value = player.shooting;
      playerPassing.value = player.passing;
      playerDriblling.value = player.dribbling;
      playerDefending.value = player.defending;
      playerPhysical.value = player.physical;
      
    }
    console.log("pos",playerPosition.value)
  });
}

playersArray.forEach((player) => {
  document.getElementById("reserve").innerHTML += `
  <div class="fut-player-card">
  <div class="player-card-top">
          <div class="absolute top-5 right-1 z-10 flex flex-col items-center gap-2">
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full w-[20px] h-[20px]  p-2" onclick="removePlayer(this)"><i class="fa fa-trash"></i></button>
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full w-[20px] h-[20px]  p-2" onclick="editPlayer(this)"><i class="fa-solid fa-pen-to-square"></i></button>
          </div>
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
         </div></div>
  `;
});

//function to add a new player 

function addNewPlayer(){
  let newPlayer;
  if(playerPosition.value != "gk"){
     newPlayer = {
      id : playersArray.length+1,
      name: playerName.value,
      photo : playerImage.value,
      position : playerPosition.value,
      nationality : playerNationality.value,
      flag : playerCountryFlag.value,
      club : playerClub.value,
      logo : playerClubLogo.value,
      rating: playerRating.value,
      pace: playerPace.value,
      shooting: playerShooting.value,
      passing: playerPassing.value,
      driblling: playerDriblling.value,
      defending: playerDefending.value,
      physical: playerPhysical.value,
    }
  }

  else {
    newPlayer = {
    id : playersArray.length+1,
    name: playerName.value,
    photo : playerImage.value,
    position : playerPosition.value,
    nationality : playerNationality.value,
    flag : playerCountryFlag.value,
    club : playerClub.value,
    logo : playerClubLogo.value,
    rating: playerRating.value,
    diving: playerPace.value,
    handling: playerShooting.value,
    kicking: playerPassing.value,
    reflexes: playerDriblling.value,
    speed: playerDefending.value,
    positioning: playerPhysical.value,
  }
  }
  updateLocalStroage(newPlayer,"add")
}

function updateLocalStroage(player,mod){
  if(mod === "sup"){
    const index = findIndex(p => p.id == player.id);
    playersArray.splice(index,1);
    localStorage.setItem("players",JSON.stringify(playersArray))
    console.log("players",playersArray)
  }
  else {
    playersArray.push(player);
    localStorage.setItem("players",JSON.stringify(playersArray))
    console.log("players",playersArray)
  }
}

addPlayerBtn.addEventListener("click",addNewPlayer);