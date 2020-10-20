export default class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.wrapper = document.querySelector(this.selector);
    this.days = this.wrapper.querySelector('[data-value="days"]');
    this.hours = this.wrapper.querySelector('[data-value="hours"]');
    this.mins = this.wrapper.querySelector('[data-value="mins"]');
    this.secs = this.wrapper.querySelector('[data-value="secs"]');
    this.timerId = null;
    this.isTimerActiv = false;
  }
  start() {
    if (this.isTimerActiv) return;
    this.isTimerActiv = true;
    this.timerId = setInterval(() => {
      const time = this.targetDate - Date.now();
      this.updateInterface(time);
    }, 1000);
  }
  stop() {
    this.isTimerActiv = false;
    clearInterval(this.timerId);
    this.updateInterface(0);
  }
  updateInterface(time) {
    const { days, hours, mins, secs } = this.getTimeComponents(time);
    this.days.textContent = days;
    this.hours.textContent = hours;
    this.mins.textContent = mins;
    this.secs.textContent = secs;
  }
  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}
