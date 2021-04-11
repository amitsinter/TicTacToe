const selectBox = document.querySelector(".select-box");
const selectXBtn = selectBox.querySelector(".options .playerx");
const selectOBtn = selectBox.querySelector(".options .playero");
const board = document.querySelector(".board");
const all = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result");
const wonText = document.querySelector(".won-text");
const presentBtn = document.querySelector("button");

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
let playerSign = "X";
let runBot = true;

/* when the user press, insert X or O icon */
function clickedBox(element)
{
    if(players.classList.contains("player"))
    {
        playerSign="O";
        element.innerHTML=`<i class="${playerOIcon}"></i>`; 
        players.classList.add("active");
        element.setAttribute("id",playerSign);
    }
    else
    {
        element.innerHTML=`<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id",playerSign);
    }
    winner();
    element.style.pointerEvents="none"; //after choosing a box, the box can't be selected again
    board.style.pointerEvents="none";
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
 if(runBot)
 {
    playerSign="O";
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
            playerSign="X";
            all[randBox].innerHTML=`<i class="${playerXIcon}"></i>`; 
            players.classList.remove("active");
            all[randBox].setAttribute("id",playerSign);
        }
        else
        {
            all[randBox].innerHTML=`<i class="${playerOIcon}"></i>`;
            players.classList.remove("active");
            all[randBox].setAttribute("id",playerSign);
        }
        winner();
    }
    all[randBox].style.pointerEvents = "none"; //when the box selected,can't select again or click
    board.style.pointerEvents="auto";
    playerSign="X";
 }
}

/* return the name of the class by the id */
function getId(idName)
{
    return document.querySelector(".box" + idName).id;
}

/* checking if there is 3 boxes that match
 * need to check : (1,2,3),(4,5,6),(7,8,9)
 * (1,4,7),(2,5,8),(3,6,9)
 * (1,5,9),(3,5,7)
 */
function checkTree(val1,val2,val3,sign)
{
    if(getId(val1) == sign && getId(val2) == sign && getId(val3) == sign )
    {
        return true;
    }
}

function winner()
{ 
    /* checking the rows */
    if(checkTree(1,2,3,playerSign) || checkTree(4,5,6,playerSign) || checkTree(7,8,9,playerSign))
    {
        runBot = false;
        bot(runBot);
    }
    /* checking the columns */
    if(checkTree(1,4,7,playerSign) || checkTree(2,5,8,playerSign) || checkTree(3,6,9,playerSign))
    {
        runBot = false;
        bot(runBot);
    } 
     /* checking the Diagonals */
    if(checkTree(1,5,9,playerSign) || checkTree(3,5,7,playerSign))
    {
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            board.classList.remove("show");
            resultBox.classList.add("show");
        },700);
    }
  
}
