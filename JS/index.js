let paper = document.querySelector("#paper");
let allSquares = null;

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
            square.style.height = `${squareSize}px`
            row.appendChild(square);
        }
        paper.appendChild(row);
    }

    let squares = document.querySelectorAll(".square");
    allSquares = squares;
}
buildGrid(16);