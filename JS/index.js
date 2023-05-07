let container = document.querySelector(".container");

/* Cleaning the grid */
const cleanGrid = () => {
    while(container.childNodes.length >= 1 )
    {
        container.removeChild(container.firstChild);
    }
}

/* Building the grid */
const buildGrid = (side) => {
    if(container.hasChildNodes()){
        cleanGrid();
    }

    for(let i = 0; i < side; i++){
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j = 0; j < side; j++){
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.style.width = `calc(880px / ${side})`
            square.style.height = `calc(880px / ${side})`
            row.appendChild(square);
        }
        container.appendChild(row);
    }

    let squares = document.querySelectorAll(".square");
    draw(squares);
}

/* changing the background color as if we were drawing */
const draw = (squares) => {
    squares.forEach((square) => {
        square.addEventListener("mouseover", (e) => {
            square.style.backgroundColor = "#1f2124";
            e.stopPropagation;
        });
    })
}

/* Creating a new grid */
let newGridButtop = document.querySelector("#new");

newGridButtop.addEventListener("click", () => {
    let side = prompt("Size of the new grid: ");
    while((side <= 1) || (side > 100)){
        side = prompt("Enter a number greater than 0 and less than or equal to 100: ");
    }

    buildGrid(side);
})

buildGrid(16);