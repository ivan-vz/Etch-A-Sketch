let paper = document.querySelector("#paper");
let paintColor = "rgb(0, 0, 0)";
let borderColor = "rgb(255, 255, 255)";
let eraserPressed = false;
let obscurePressed = false;
let illuminatePressed = false;
let gridPressed = false;

//Function to clean the grid 
const cleanGrid = () => {
    while(paper.childNodes.length >= 1 )
    {
        paper.removeChild(paper.firstChild);
    }
}

//Function to build the grid
const buildGrid = (side) => {
    let squareSize = 800 / side;
    if(paper.hasChildNodes()){
        cleanGrid();
    }

    for(let i = 0; i < side; i++){
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j = 0; j < side; j++){
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;
            square.style.border = `2px solid ${borderColor}`;
            square.style.backgroundColor = `rgb(255, 255, 255)`;
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
    if (obscurePressed){ 
        square.target.style.backgroundColor = darker(square.target.style.backgroundColor);
        if(!gridPressed){
            square.target.style.borderColor =  darker(square.target.style.backgroundColor);
        }
    } else if(illuminatePressed){ 
        square.target.style.backgroundColor = lighter(square.target.style.backgroundColor);
        if(!gridPressed){
            square.target.style.borderColor = lighter(square.target.style.backgroundColor);
        } 
    } else {
        square.target.style.backgroundColor = paintColor;
        if(!gridPressed){
            square.target.style.borderColor = paintColor;
        }
    }
}

let effectMode = ["eraser", "illuminate", "obscure", "grid"];
let globalMode = ['newGrid', "clean", "colorPicker"];
//Function to cancel all the effects
let allActions = document.querySelectorAll(".button");
allActions.forEach((action) => {
    action.addEventListener("click", () => {
        if(globalMode.includes(action.id)){
            disableAll();
            if(action.id === "newGrid"){
                if(gridPressed) { grid(); }
                newGrid();
            }
            if(action.id === "clean"){
                clean();
            }
        
        } else {
            if(action.id === "grid"){
                grid();
                disableJustActions(action.id);
            }
            if(action.id === "eraser"){
                if(eraserPressed){
                    eraserPressed = false;
                    paintColor = colorPicker.value;
                } else {
                    disableJustActions(action.id);
                    eraserPressed = true;
                    paintColor = "rgb(255, 255, 255)";
                }
            }
            if(action.id === "illuminate"){
                if(illuminatePressed){
                    illuminatePressed = false;
                } else {
                    disableJustActions(action.id);
                    illuminatePressed = true;
                }
            }
            if(action.id === "obscure"){
                if(obscurePressed){
                    obscurePressed = false;
                } else {
                    disableJustActions(action.id);
                    obscurePressed = true;
                }
            }

            action.classList.toggle("pressed");
        }
    })
})

//Auxiliary function that unpulse all the pressed button before press the clicked one (only visually)
let changePressed = () => {
    let alreadyPressed = document.querySelectorAll(".pressed");
    alreadyPressed.forEach((pressed) => {
        if(pressed.id != "grid"){
            pressed.classList.toggle("pressed");
        }
    })
}

//Function to disable all the buttons
let disableAll = () => {
    let alreadyPressed = document.querySelectorAll(".pressed");
    alreadyPressed.forEach((pressed) => {

        switch (pressed.id) {
            case "eraser": {
                eraserPressed = false;
                break;
            }
            case "illuminate": {
                illuminatePressed = false;
                break;
            }
            case "obscure": {
                obscurePressed = false;
                break;
            }
        }

        pressed.classList.toggle("pressed");
    })
}

//Function to disable the effects buttons except for the one that was just pressed
let disableJustActions = (id) => {
    let alreadyPressed = document.querySelectorAll(".pressed");
    alreadyPressed.forEach((pressed) => {
        if(pressed.id != "grid"){
            pressed.classList.toggle("pressed");
        }
      
        if ((pressed.id == "eraser") && (id != "eraser")) {
            eraserPressed = false;
        }

        if ((pressed.id == "illuminate") && (id != "illuminate")) {
            illuminatePressed = false;
        }

        if ((pressed.id == "obscure") && (id != "obscure")) {
            obscurePressed = false;
        }
    })
}

//Function to select a colour with the input color
let colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("change", () => {
    paintColor = colorPicker.value;
});

//Function to restart the drawing
let clean = () => {
    let allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
        square.style.backgroundColor = "rgb(255, 255, 255)";
        square.style.borderColor = "rgb(255, 255, 255)";
    })
}

//Function to show the grid
let grid = () => {
    let allSquares = document.querySelectorAll(".square");

    allSquares.forEach((square) => {
        if(gridPressed) {
            borderColor = square.style.backgroundColor;
        } else {
            borderColor = "rgb(0, 0, 0)";
        }
        square.style.borderColor = borderColor;
    })

    if(gridPressed){
        gridPressed = false;
    } else {
        gridPressed = true;
    }
}

//Function to create a new grid with a selected size
let newGrid =  () => {
    let size = prompt("Enter the size of the new paper: ");
    if(size === null || size === "") { return };
    while(size <= 0 || size > 100) {
        size = prompt("Wrong kind of number, try again: ");
    }

    buildGrid(size);
}

//Function to traslate a rgb number to an hex number
let rgbToHex = (red, green, blue) => {
    var r = red.toString(16).padStart(2, '0');
    var g = green.toString(16).padStart(2, '0');
    var b = blue.toString(16).padStart(2, '0');
    var hex = '#' + r + g + b;
    return hex;
}

//Function to get a random color by using the mouse wheel
window.onwheel = () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    colorPicker.value = rgbToHex(red, green, blue);
    paintColor =  `rgb(${red}, ${green}, ${blue})`;
}

//Function to add 10 in the rgb parts
let lighter = (rgbColor) => {
    let rgbValues = rgbColor.match(/\d+/g);
    rgbValues = rgbValues.map((num) => {
      let newVal = parseInt(num) + 10;
      if (newVal > 255) {
        newVal = 255;
      }
      return newVal;
    });
    return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
  };

//Function to subtract 10 in the rgb parts
let darker = (rgbColor) => {
  let rgbValues = rgbColor.match(/\d+/g);
  rgbValues = rgbValues.map((num) => {
    let newVal = parseInt(num) - 10;
    if (newVal < 0) {
      newVal = 0;
    }
    return newVal;
  });
  return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
};

window.onload = () => {
    buildGrid(16);
}