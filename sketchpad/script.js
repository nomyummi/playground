//Grid constants
const GRID_HEIGHT = 960;
const GRID_WIDTH = 960;
const INIT_ROWS = 16;
const INIT_COLS = 16;
const DEFAULT_COLOR = "#21b11c";

//Remove all squares in the grid container
function removeSquares(){
    mousedownID = -1;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    return;
}

//Add squares in the grid container according to the specified grid size
function addSquares(numRows,numCols){
    container.style.setProperty("grid-template-columns",`repeat(${numCols},${Math.round(GRID_WIDTH/numCols)}px)`);
    container.style.setProperty("grid-template-rows",`repeat(${numRows},${Math.round(GRID_HEIGHT/numRows)}px)`);
    let newSquare;
    for (let i = 0; i < numRows; i++){
        for (let j = 0; j < numCols; j++){
            newSquare = document.createElement("div")
            newSquare.classList.add("grid-square");
            container.appendChild(newSquare);
        }
    }
    return;
}

//Prompt user for the grid size
function getNewGridSize() {
    let gridSize = prompt("Input a new grid size:");
    if (isNaN(parseInt(gridSize,10)) || gridSize > 100 || gridSize < 0){
        alert("Not a valid number. Please choose a number between 1-100.");
        return getNewGridSize();
    }
    return gridSize;
}


//Mouse down ID of -1 indicates that a mouse button is not being held down. Mouse down ID of 1 indicates that a mouse button is held down. 
let mousedownID = -1;  

//When a grid square is hovered over while a mouse button is not held down, fill the square with the color according to the color picker.
//When a grid square is hovered over while a mouse button is held down, clear the grid color (with white).
function draw(){
    const allGridSquares = document.querySelectorAll(".grid-square");
    allGridSquares.forEach((gridSquare)=>{
        gridSquare.addEventListener("mousedown", (event)=>{
            event.preventDefault();
            if(mousedownID == -1){ 
                mousedownID = 1;
                gridSquare.style.setProperty("background-color","white");
            }
        });

        gridSquare.addEventListener("mouseup", (event)=>{
            event.preventDefault();
            if(mousedownID != -1) {  
                mousedownID = -1;
              }
        });
        gridSquare.addEventListener("mouseover",(event)=>{
            event.preventDefault();
            if (mousedownID == -1){
                gridSquare.style.setProperty("background-color",color);
            }
            else {
                gridSquare.style.setProperty("background-color","white");
            }
        });
    });
}



//Set initial button parameters
const buttons = document.querySelector("#buttons");
buttons.style.setProperty("grid-template-columns",`repeat(3,${Math.round(GRID_WIDTH/3)}px)`);

//Set initial container parameters
const container = document.querySelector("#container");
container.style.setProperty("max-height",GRID_HEIGHT + "px");
container.style.setProperty("max-width",GRID_WIDTH + "px");

//Set initial color picker parameters
let color = DEFAULT_COLOR;
const colorPicker = document.querySelector("#color-picker");
colorPicker.style.setProperty("value",color);

//Sets the drawn color when a color is picked in the color picker.
colorPicker.addEventListener("input",(e)=> {
    mousedownID = -1;
    color = e.target.value;
});

//Create the initial grid
addSquares(INIT_ROWS,INIT_COLS);
draw();

//Resize the grid when the Resize Grid button is pressed.
const newGrid = document.querySelector("#resize-grid");
newGrid.addEventListener("click",()=> {
    let newGridSize = parseInt(getNewGridSize(),10);
    removeSquares();
    addSquares(newGridSize,newGridSize);
    draw();
});

//Clear the grid when the Resize Grid button is pressed.
const clearGrid = document.querySelector("#clear-grid");
clearGrid.addEventListener("click",()=> {
    const allGridSquares = document.querySelectorAll(".grid-square");
    allGridSquares.forEach((gridSquare)=>{
        mousedownID = -1;
        gridSquare.style.setProperty("background-color","white");
    })
    draw();
});