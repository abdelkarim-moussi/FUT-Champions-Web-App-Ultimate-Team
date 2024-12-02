const playerCard = document.querySelectorAll(".fut-player-card");
const modal = document.getElementById("add-player-modal");
const closeModalBtn = document.getElementById("close-btn");
const addPlayerForm = document.getElementById("add-player-form");
const addPlayerBtn = document.getElementById("add-player-btn");
const sideBar = document.getElementById("side-bar");
const field = document.getElementById("field");
const addPlayerButton = document.getElementById("add-player-button");
const disponiblePlayers = document.getElementById("reserve")
const replacementContainer= document.getElementById("replacement")
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
let playerDriblling = document.getElementById("f-dribbling");
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
    if(!localStorage.getItem("players")){
      localStorage.setItem(`players`, JSON.stringify(data.players));
    }
  });

  let playersArray = JSON.parse(localStorage.getItem("players"));
  
  let replacementPlayers = [];
  if(!localStorage.getItem("replacementPlayers")){
  localStorage.setItem("replacementPlayers",JSON.stringify(replacementPlayers));
  }
  replacementPlayers = JSON.parse(localStorage.getItem("replacementPlayers"))
  
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
  if (playerPosition.value === "GK") {
    playerPace.setAttribute("placeholder", "dividing");
    playerDriblling.setAttribute("placeholder", "handling");
    playerShooting.setAttribute("placeholder", "kicking");
    playerDefending.setAttribute("placeholder", "reflexes");
    playerPassing.setAttribute("placeholder", "speed");
    playerPhysical.setAttribute("placeholder", "positioning");
  } else {
    playerPace.setAttribute("placeholder", "pace");
    playerDriblling.setAttribute("placeholder", "dribbling");
    playerShooting.setAttribute("placeholder", "shooting");
    playerDefending.setAttribute("placeholder", "defencing");
    playerPassing.setAttribute("placeholder", "passing");
    playerPhysical.setAttribute("placeholder", "physical");
  }
}
adapteForm();

//add player function

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

//add player to the position
function addPlayerToPosition(players) {
  sideBar.innerHTML = "";
  players.map((player) => {
    let playerCard1 = document.createElement("div");
    playerCard1.setAttribute("ondblclick", "addPlayerToField(this,this.id)");
    playerCard1.className = "fut-player-card cursor-pointer z-0";
    playerCard1.id = player.id;

    if (player.position != "GK") {
      playerCard1.innerHTML = `
      <div class="player-card-top">
          <div class="absolute md:top-2 top-0 right-1 z-10 flex flex-col items-center gap-1">
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full md:w-[20px] md:h-[20px]  p-[2px] md:p-2" onclick="removePlayer(this,${player.id})"><i class="fa fa-trash w-[8px] h-[8px] md:w-[18px] md:h-[12px]"></i></button>
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full md:w-[20px] md:h-[20px]  p-[2px] md:p-2" onclick="editPlayer(this)"><i class="fa-solid fa-pen-to-square w-[8px] h-[8px] md:w-[18px] md:h-[12px]"></i></button>
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full  md:w-[20px] md:h-[20px] p-[2px] md:p-2" onclick="replacePlayer(this)"><i class="fa-solid fa-rotate w-[8px] h-[8px] md:w-[18px] md:h-[12px]"></i></button>
          </div>
           <div class="player-master-info">
             <div class="player-rating">
               <span id="player-rating" class="text-sm md:text-md">${player.rating}</span>
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
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full md:w-[20px] md:h-[20px]  p-1" onclick="removePlayer(this)"><i class="fa fa-trash w-[8px] h-[8px] md:w-[18px] md:h-[12px]"></i></button>
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full md:w-[20px] md:h-[20px]  p-1" onclick="editPlayer(this)"><i class="fa-solid fa-pen-to-square w-[8px] h-[8px] md:w-[18px] md:h-[12px]"></i></button>
          <button type="button" class="flex items-center justify-center text-black text-xs bg-[#5ce1e6] rounded-full  md:w-[20px] md:h-[20px]  p-1" oclick = "replacePlayer(this)"><i class="fa-solid fa-rotate w-[8px] h-[8px] md:w-[18px] md:h-[12px]"></i></button>
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

  
//add player to field function
function addPlayerToField(div, cardId) {
  const Index = playersArray.findIndex((player) => player.id == cardId);
  let player = playersArray[Index];
  console.log(Index)
  console.log(player.position)
  switch (player.position) {
    case "LW":
      if (document.getElementById("LW").children.length == 0) {
        document.getElementById("LW").innerHTML = div.innerHTML;
        div.remove();
        // playersArray.splice(Index, 1);
      }
      else if(replacementPlayers.filter(p => p.position === "LW").length < 1 && replacementPlayers.length < 7){
          // console.log(true)
          // replacementPlayers.push(playersArray[Index]);
          // updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
          replacementPlayers.push(playersArray[Index]);
          localStorage.setItem("replacementPlayers",JSON.stringify(replacementPlayers))
          replacementContainer.appendChild(div);
         }
      
      break;
    case "ST":
      if (document.getElementById("ST").children.length == 0) {
        document.getElementById("ST").innerHTML = div.innerHTML;

        div.remove();
        // playersArray.splice(Index, 1);
      }
      else if(replacementPlayers.filter(p => p.position ==="ST").length < 1 && replacementPlayers.length < 7){
        // replacementPlayers.push(playersArray[Index]);
        // updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
        replacementPlayers.push(playersArray[Index]);
          localStorage.setItem("replacementPlayers",JSON.stringify(replacementPlayers))
          replacementContainer.appendChild(div);
        replacementContainer.appendChild(div);
      }
      break;
    case "RW":
      if (document.getElementById("RW").children.length == 0) {
        document.getElementById("RW").innerHTML = div.innerHTML;
        div.remove();
        // playersArray.splice(Index, 1);
      }
      else if(replacementPlayers.filter(p => p.position ==="RW").length < 1 && replacementPlayers.length < 7){
          // replacementPlayers.push(playersArray[Index]);
          // updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
          replacementPlayers.push(playersArray[Index]);
          localStorage.setItem("replacementPlayers",JSON.stringify(replacementPlayers))
          replacementContainer.appendChild(div);
          replacementContainer.appendChild(div);
      }
      break;
    case "CMG":
      if (document.getElementById("CMG").children.length == 0) {
        document.getElementById("CMG").innerHTML = div.innerHTML;
        div.remove();
        // playersArray.splice(Index, 1);
      } 
      else if(replacementPlayers.filter(p => p.position === "CMG").length < 1 && replacementPlayers.length < 7){
        console.log(true)
        replacementPlayers.push(playersArray[Index]);
        updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
        replacementContainer.appendChild(div);
        }
      
      break
    case "CMC" : if(document.getElementById("CMC").children.length == 0) {
            document.getElementById("CMC").innerHTML = div.innerHTML;
            div.remove();
            // playersArray.splice(Index, 1);
    }
    else if(replacementPlayers.filter(p => p.position === "CMC").length < 1 && replacementPlayers.length < 7){
      replacementPlayers.push(playersArray[Index]);
      updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
      replacementContainer.appendChild(div);
    }
      break;
    case "CMD" : if(document.getElementById("CMD").children.length == 0) {
            document.getElementById("CMD").innerHTML = div.innerHTML;
            div.remove();
            // playersArray.splice(Index, 1);
    }
    else if(replacementPlayers.filter(p => p.position === "CMD").length < 1 && replacementPlayers.length < 7){
      replacementPlayers.push(playersArray[Index]);
      updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
      replacementContainer.appendChild(div);
    }
      break;
    case "LB":
      if (document.getElementById("LB").children.length == 0) {
        document.getElementById("LB").innerHTML = div.innerHTML;
        div.remove();
        // playersArray.splice(Index, 1);
      }
      else if(replacementPlayers.filter(p => p.position === "LB").length < 1 && replacementPlayers.length < 7){
        replacementPlayers.push(playersArray[Index]);
        updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
        replacementContainer.appendChild(div);
      }
      break;
    case "CBG":
      if (document.getElementById("CBG").children.length == 0) {
        document.getElementById("CBG").innerHTML = div.innerHTML;
        div.remove();
        // playersArray.splice(Index, 1);
      }
      else if(replacementPlayers.filter(p => p.position === "CBG").length < 1 && replacementPlayers.length < 7){
        replacementPlayers.push(playersArray[Index]);
        updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
        replacementContainer.appendChild(div);
      }
      break;
    case "CBD" : if (document.getElementById("CBD").children.length == 0) {
        document.getElementById("CBD").innerHTML = div.innerHTML;
        div.remove();
        // playersArray.splice(Index, 1);
       }
       else if(replacementPlayers.filter(p => p.position === "CBD").length < 1 && replacementPlayers.length < 7){
        replacementPlayers.push(playersArray[Index]);
        updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
        replacementContainer.appendChild(div);
      }
      break;
    case "RB":
      if (document.getElementById("RB").children.length == 0) {
        document.getElementById("RB").innerHTML = div.innerHTML;
        div.remove();
        // playersArray.splice(Index, 1);
      }
      else if(replacementPlayers.filter(p => p.position === "RB").length < 1 && replacementPlayers.length < 7){
        replacementPlayers.push(playersArray[Index]);
        updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
        replacementContainer.appendChild(div);
      }
      break;
    case "GK":
      if (document.getElementById("GK").children.length == 0) {
        document.getElementById("GK").innerHTML = div.innerHTML;
        div.remove();
        // playersArray.splice(Index, 1);
      }
      else if(replacementPlayers.filter(p => p.position === "GK").length < 1 && replacementPlayers.length < 7){
        replacementPlayers.push(playersArray[Index]);
        updateLocalStroage("replacementPlayers",replacementPlayers,player,"add");
        replacementContainer.appendChild(div);
      }
      break;

      default : console.log("default")
      break;
  }

}



//delete player function
function removePlayer(element,id) {
  element.parentElement.parentElement.parentElement.innerHTML = ""
  // let player = playersArray.filter(p => p.id == id)
  console.log("id",id)
  updateLocalStroage("players",playersArray,id,"sup")
  // console.log("players", playersArray);
}

const updatePlayerBtn = document.createElement("button");
updatePlayerBtn.className = "text-white bg-[#5ce1e6] px-2 py-1 rounded-md mt-2 focus:outline-none focus:border-none";
updatePlayerBtn.innerText = "Update Player";


//edit player function
var play;
function editPlayer(element) {
  console.log(element.parentElement.parentElement.parentElement.id);
  let id = element.parentElement.parentElement.parentElement.id;
  console.log("cardId",id)
  modal.classList.remove("hidden");

    addPlayerBtn.remove()
    addPlayerForm.appendChild(updatePlayerBtn);

    for(let i = 0;i < playersArray.length;i++){
      if (playersArray[i].position == id) {
        console.log("true")
        if(playersArray[i].position != "GK"){
          console.log("true")
          playerName.value = playersArray[i].name;
          playerImage.value = playersArray[i].photo;
          playerNationality.value = playersArray[i].nationality;
          playerCountryFlag.value = playersArray[i].flag;
          playerClub.value = playersArray[i].club;
          playerClubLogo.value = playersArray[i].logo;
          playerPosition.value = playersArray[i].position;
          playerRating.value = playersArray[i].rating;
          playerPace.value = playersArray[i].pace;
          playerShooting.value = playersArray[i].shooting;
          playerPassing.value = playersArray[i].passing;
          playerDriblling.value = playersArray[i].dribbling;
          playerDefending.value = playersArray[i].defending;
          playerPhysical.value = playersArray[i].physical;
          play = playersArray[i];
          break;
        }
        
        else{
          playerName.value = playersArray[i].name;
          playerImage.value = playersArray[i].photo;
          playerNationality.value = playersArray[i].nationality;
          playerCountryFlag.value = playersArray[i].flag;
          playerClub.value = playersArray[i].club;
          playerClubLogo.value = playersArray[i].logo;
          playerPosition.value = playersArray[i].position;
          playerRating.value = playersArray[i].rating;
          playerPace.value = playersArray[i].diving;
          playerShooting.value = playersArray[i].handling;
          playerPassing.value = playersArray[i].kicking;
          playerDriblling.value = playersArray[i].reflexes;
          playerDefending.value = playersArray[i].speed;
          playerPhysical.value = playersArray[i].positioning;
          play = playersArray[i];
          break;
        }
      }
    }
    
}

updatePlayerBtn.addEventListener("click",()=>{
  updatePlayerInfo(play)
  updateLocalStroage("players",playersArray,play.id,"update");
  // playersArray.splice(playersArray.findIndex( p => p.id == play.id),1);
  console.log("playId",play.id)
} )


function updatePlayerInfo(player){
  playersArray.map(p=>{
    if(player.id == p.id){
      if(player.position != "GK"){
        console.log(true)
        player.name = playerName.value ;
        player.photo = playerImage.value;
        player.nationality = playerNationality.value;
        player.flag = playerCountryFlag.value;
        player.club = playerClub.value ;
        player.logo = playerClubLogo.value;
        player.position = playerPosition.value;
        player.rating = playerRating.value;
        player.pace = playerPace.value;
        player.shooting = playerShooting.value;
        player.passing = playerPassing.value;
        player.dribbling = playerDriblling.value;
        player.defending = playerDefending.value;
        player.physical = playerPhysical.value;
      }
      else{
        player.name = playerName.value ;
        player.photo = playerImage.value;
        player.nationality = playerNationality.value;
        player.flag = playerCountryFlag.value;
        player.club = playerClub.value ;
        player.logo = playerClubLogo.value;
        player.position = playerPosition.value;
        player.rating = playerRating.value;
        player.diving = playerPace.value;
        player.handling = playerShooting.value;
        player.kicking = playerPassing.value;
        player.reflexes = playerDriblling.value;
        player.speed = playerDefending.value;
        player.positioning = playerPhysical.value;
      }
    }
  })
  
}


//display disponible players
function displayAllPlayers(container,array){
array.forEach((player) => {
  let resevedPlayer = document.createElement("div");
  resevedPlayer.className = "fut-player-card"
  if(player.position != "GK"){
    resevedPlayer.innerHTML = `
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
  
    `;
  }
  else {
    resevedPlayer.innerHTML = `
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
  }
  container.appendChild(resevedPlayer);
});
}

//function to add a new player 
function addNewPlayer(){
  let newPlayer;
  if(playerPosition.value != "GK"){
     newPlayer = {
      id : playersArray.length+1,
      name: playerName.value,
      photo : playerImage.value,
      position : playerPosition.value,
      nationality : playerNationality.value,
      flag : playerCountryFlag.value,
      club : playerClub.value,
      logo : playerClubLogo.value,
      rating: parseInt(playerRating.value),
      pace: parseInt(playerPace.value),
      shooting: parseInt(playerShooting.value),
      passing: parseInt(playerPassing.value),
      dribbling: parseInt(playerDriblling.value),
      defending: parseInt(playerDefending.value),
      physical: parseInt(playerPhysical.value),
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
    rating: parseInt(playerRating.value),
    diving: parseInt(playerPace.value),
    handling: parseInt(playerShooting.value),
    kicking: parseInt(playerPassing.value),
    reflexes: parseInt(playerDriblling.value),
    speed: parseInt(playerDefending.value),
    positioning: parseInt(playerPhysical.value),
  }
  }
  playersArray.push(newPlayer);
  // playersArray.sort((a,b)=> a.id - b.id);
  localStorage.setItem("players",JSON.stringify(playersArray))
  console.log(newPlayer)
  console.log(playersArray)
}

function updateLocalStroage(arrayKey,array,id,mod){
  let Index = array.findIndex(p => p.id == id)
  console.log("idi",id)
    console.log("Index",Index)  
  if(mod === "sup"){
    array.splice(Index,1);
    localStorage.setItem(arrayKey,JSON.stringify(array))
    console.log(arrayKey,array)
    alert("player deleted succefully")
  }
  else if(mod==="update"){
    array.push(array[Index]);
    array.splice(array.findIndex( p => p.id == play.id),1);
    array.sort((a,b)=> a.id - b.id);
    localStorage.setItem(arrayKey,JSON.stringify(array))
    console.log(arrayKey,array)
  }
  else if(mod === "add"){
    array.push(array[Index]);
    localStorage.setItem(arrayKey,JSON.stringify(array))
    console.log(arrayKey,array)
  }
}

addPlayerBtn.addEventListener("click",addNewPlayer);


function replacePlayer(element){
  let id = element.parentElement.parentElement.parentElement.id;
  replacementPlayers.forEach(player=>{
    if(player.id == id){
      console.log()
      displayAllPlayers(replacementContainer,replacementPlayers);
    }
  })
}



displayAllPlayers(disponiblePlayers,playersArray);

