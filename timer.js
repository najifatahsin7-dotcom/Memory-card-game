//Game Timer

export class GameTimer {
  constructor(duration, onTick, onEnd) {
    this.duration = duration;
    this.timeLeft = duration;
    this.onTick = onTick;
    this.onEnd = onEnd;
    this.timer = null;
  }

  start() {
    this.stop();
    this.timeLeft = this.duration;

    this.timer = setInterval(() => {
      this.timeLeft--;
      this.onTick(this.timeLeft);

      if (this.timeLeft <= 0) {
        this.stop();
        if (this.onEnd) this.onEnd();
      }
    }, 1000);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
  }
}

  
  