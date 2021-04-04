const selectBox = document.querySelector(".select-box");
const selectXBtn = selectBox.querySelector(".playerx");
const selectOBtn = selectBox.querySelector(".playero");
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
       players.setAttribute("class","players active");
   } 
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";


function clickedBox(e)
{

}