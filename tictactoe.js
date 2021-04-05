const selectBox = document.querySelector(".select-box");
const selectXBtn = selectBox.querySelector(".options .playerx");
const selectOBtn = selectBox.querySelector(".options .playero");
const board = document.querySelector(".board");
const all = document.querySelectorAll("section span");
const players = document.querySelector(".players");

window.onload = ()=>
{
    /* add action for each squre in the game */
    for (let index = 0; index < all.length; index++)
    {
        all[index].setAttribute("onclick","clickedBox(this)");
    }
    /*
     * hide -> hiiding the choose option after the user choose X or O
     * show -> show the board game after the user choose X or O
     */
   selectXBtn.onclick = ()=>
   { 
       selectBox.classList.add("hide");
       board.classList.add("show");
   } 
   selectOBtn.onclick = ()=>
   { 
       selectBox.classList.add("hide");
       board.classList.add("show");
       players.setAttribute("class","players active player");
   } 
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";

/* when the user press, insert X or O icon */
function clickedBox(element)
{
    if(players.classList.contains("player"))
    {
        element.innerHTML=`<i class="${playerOIcon}"></i>`; 
        players.classList.add("active");
    }
    else
    {
        element.innerHTML=`<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
    }
    element.style.pointerEvents="none"; //after choosing a box, the box can't be selected again
    /* setting a random time delay so the function bot() will delay randomaly
     * setTimeout -> calling the function bot() with the random delay time.
     */
    let delayTimeForRandom = (Math.random()*1000+200).toFixed();
    setTimeout(()=>
    {
        bot();
    },delayTimeForRandom);
}

function bot()
{
    let unselectedBox = []; //store the unselected box index
    for (let index = 0; index < all.length; index++) 
    {
       if(all[index].childElementCount==0) //if span has no any child element
       {
             unselectedBox.push(index);
       }
    }
    /* getting random index from thr unselectedBox so the function will select random unselected box */
    let randBox = unselectedBox[Math.floor(Math.random()*unselectedBox.length)];
    if(unselectedBox.length>0)
    {
        if(players.classList.contains("player"))
        {
            all[randBox].innerHTML=`<i class="${playerXIcon}"></i>`; 
            players.classList.add("active");
        }
        else
        {
            all[randBox].innerHTML=`<i class="${playerOIcon}"></i>`;
            players.classList.add("active");
        }
    }
}