//Game board

export class GameBoard {
    constructor(boardElement) {
      this.boardElement = boardElement; 
    }
  
    setupBoard(gridSize) {
      // sets up how many columns based on difficulty
      if (gridSize === 8) this.boardElement.style.gridTemplateColumns = "repeat(4, 100px)";
      else if (gridSize === 12) this.boardElement.style.gridTemplateColumns = "repeat(6, 100px)";
      else this.boardElement.style.gridTemplateColumns = "repeat(6, 100px)";
    }
  
    clearBoard() {
      this.boardElement.innerHTML = ""; 
    }
  
    renderCards(cards) {
      this.clearBoard(); 
      cards.forEach(card => this.boardElement.appendChild(card)); 
    }
  }
  