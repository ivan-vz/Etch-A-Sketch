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

/* Building the grid */
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

//Function to add 10 in the rgb parts
let lighter = (rgbColor) => {
    console.log("entre a lighter");
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
    console.log("entre a darker");
  let rgbValues = rgbColor.match(/\d+/g);
  rgbValues = rgbValues.map((num) => {
    let newVal = parseInt(num) - 10;
    if (newVal < 0) {
      newVal = 0;
    }
    return newVal;
  });
  //console.log(`rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`)
  return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
};

//Function to paint the squares
let draw = (square) => {
    if(square.type == "mouseover" && !mouseClicked) { return }
    if (obscurePressed){ 
        paintColor = darker(square.target.style.backgroundColor); }
    if(illuminatePressed){ 
        paintColor = lighter(square.target.style.backgroundColor); 
    }

    square.target.style.backgroundColor = paintColor;

    if(!gridPressed){
        square.target.style.borderColor = paintColor;
    }
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
    if(illuminatePressed) { illuminate.click(); }
    if(obscurePressed) { obscure.click(); }

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
    if(eraserPressed) { eraser.click(); }
    if(illuminatePressed) { illuminate.click(); }
    if(obscurePressed) { obscure.click(); }
    paintColor = colorPicker.value;
});

//Function to restart the drawing
let clean = document.querySelector("#clean");
clean.addEventListener("click", () => {
    if(eraserPressed) { eraser.click(); }
    if(illuminatePressed) { illuminate.click(); }
    if(obscurePressed) { obscure.click(); }

    let allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
        square.style.backgroundColor = "rgb(255, 255, 255)";
        square.style.borderColor = "rgb(255, 255, 255)";
    })
})

//Function to illuminate a color
let illuminate = document.querySelector("#illuminate");
illuminate.addEventListener("click", () => {
    if(eraserPressed) { eraser.click(); }
    if(obscurePressed) { obscure.click(); }

    if(illuminatePressed){
        illuminatePressed = false;
    } else {
        illuminatePressed = true;
    }
})

//Function to obscure a color
let obscure = document.querySelector("#obscure");
obscure.addEventListener("click", () => {
    if(eraserPressed) { eraser.click(); }
    if(illuminatePressed) { illuminate.click(); }

    if(obscurePressed){
        obscurePressed = false;
    } else {
        obscurePressed = true;
    }
})

//Function to show the grid
let grid = document.querySelector("#grid");
grid.addEventListener('click', () => {
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
});

//Function to create a new grid with a selected size
let newGrid = document.querySelector("#newGrid");
newGrid.addEventListener("click", () => {
    
    let size = prompt("Enter the size of the new paper: ");
    if(size === null || size === "") { return };
    while(size <= 0 || size > 100) {
        size = prompt("Wrong kind of number, try again: ");
    }

    if(eraserPressed) { eraser.click(); }
    if(illuminatePressed) { illuminate.click(); }
    if(obscurePressed) { obscure.click(); }
    if(gridPressed) { grid.click(); }
    buildGrid(size);
})

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

window.onload = () => {
    buildGrid(16);
}