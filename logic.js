//Game Logic

export class GameLogic {
  constructor() {
    this.flippedCards = [];
    this.matches = 0;
  }

  reset() {
    this.flippedCards = [];
    this.matches = 0;
  }

  flipCard(card, onMatch, onMismatch) {
    if (this.flippedCards.length === 2 || card.classList.contains("flipped"))
      return;

    card.classList.add("flipped");
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      const [c1, c2] = this.flippedCards;

      if (c1.dataset.image === c2.dataset.image) {
        this.matches++;
        this.flippedCards = [];
        onMatch(this.matches);
      } else {
        setTimeout(() => {
          c1.classList.remove("flipped");
          c2.classList.remove("flipped");
          this.flippedCards = [];
          onMismatch();
        }, 800);
      }
    }
  }
}
