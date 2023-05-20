let paper = document.querySelector("#paper");
let paintColor = "rgb(0, 0, 0)";
let eraserPressed = false;

/* Cleaning the grid 
const cleanGrid = () => {
    while(paper.childNodes.length >= 1 )
    {
        paper.removeChild(paper.firstChild);
    }
}
*/

/* Building the grid */
const buildGrid = (side) => {
    let squareSize = 800 / side;
    /*
    if(paper.hasChildNodes()){
        cleanGrid();
    }
    */

    for(let i = 0; i < side; i++){
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j = 0; j < side; j++){
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;
            square.addEventListener("mousedown", draw);
            square.addEventListener("mouseover", draw);
            row.appendChild(square);
        }
        paper.appendChild(row);
    }
}

let mouseClicked = false;
document.body.onmousedown = () => (mouseClicked = true)
document.body.onmouseup = () => (mouseClicked = false)

//Function to paint the squares
let draw = (square) => {
    if(square.type == "mouseover" && !mouseClicked) { return }
    square.target.style.backgroundColor = paintColor;
}

//Auxiliary function of menuEffects that unpulse all the pressed button before press the clicked one
let changePressed = () => {
    let alreadyPressed = document.querySelectorAll(".pressed");
        alreadyPressed.forEach((pressed) => {
            if(pressed.id != "grid"){
                pressed.classList.toggle("pressed");
            }
        })
}

//Function to make the effect of a pressed button
let menuEffects = document.querySelectorAll(".effect");
menuEffects.forEach((effect) => {
    effect.addEventListener("click", () => {
        if(effect.id != "grid" && !effect.classList.contains("pressed")){
            changePressed();
        }
        
        effect.classList.toggle("pressed");
    })
})

//Function to clean a square
let eraser = document.querySelector("#eraser");
eraser.addEventListener("click", () => {
    if(eraserPressed) {
        eraserPressed = false;
        paintColor = colorPicker.value;
    } else {
        eraserPressed = true;
        paintColor = "rgb(255, 255, 255)";
    }
});

//Function to select a colour with the input color
let colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("change", () => { 
    paintColor = colorPicker.value;
});

//Function to restart the drawing
let clean = document.querySelector("#clean");
clean.addEventListener("click", () => {
    let allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
        square.style.backgroundColor = "rgb(255, 255, 255)";
    })
})

window.onload = () => {
    buildGrid(16);
}