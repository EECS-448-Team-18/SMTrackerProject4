//Selector
const smInput = document.querySelector(".sm-input");
const link = document.querySelector(".sm-url");
const smButton = document.querySelector(".sm-button");
const smList = document.querySelector(".sm-list");

//Event Listeners
smButton.addEventListener("click", addSm);
smList.addEventListener("click", deleteCheck);


//Functions
//Add a new social media in
function addSm(event) {
  event.preventDefault();
  console.log("H");
  const smDiv = document.createElement('div');
  smDiv.classList.add("sm");

  const newSm = document.createElement('li');
  newSm.innerText = smInput.value;
  newSm.classList.add('sm-item');
  smDiv.appendChild(newSm);

  const box = document.createElement('input');
  box.setAttribute("type", "checkbox");
  box.classList.add("box");
  smDiv.appendChild(box);

  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  smDiv.appendChild(trashButton);
  
  smList.appendChild(smDiv);
  smInput.value = "";
  link.value = "";
}

function deleteCheck(e){
    // console.log(e.target);
    const item = e.target;

    if(item.classList[0] === 'trash-btn'){
        const sm = item.parentElement;
        sm.remove();
    }
}