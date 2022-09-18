/* eslint-disable max-len */
export class Tomato {
  constructor({
    taskTimer,
    pauseTimer,
    bigPauseTimer,
    tasks = [],
  } = {
    taskTimer: 25,
    pauseTimer: 5,
    bigPauseTimer: 15,
  }) {
    this.taskTimer = taskTimer;
    this.pauseTimer = pauseTimer;
    this.bigPauseTimer = bigPauseTimer;
    this.tasks = tasks;
    this.activeTask = null;
  }

  taskTimerСountdown() {
    let minutes = this.taskTimer;
    let seconds = 60;
    minutes -= 1;
    const timerId = setInterval(() => {
      seconds -= 1;
      console.log(`Осталось времени на задачу: ${minutes} минут ${seconds} секунд`);
      if (seconds < 1) {
        minutes -= 1;
        seconds = 60;
      }
      if (minutes <= -1) {
        clearInterval(timerId);
        this.tasksCounter(this.activeTask.id);
        if (this.activeTask.count % 3) {
          console.log(`Вы завершили ${this.activeTask.count} задач. Время на отдых: ${this.pauseTimer} мин.`);
          this.restTimer(this.pauseTimer);
        } else {
          console.log(`Вы завершили ${this.activeTask.count} задачи. Время на отдых увеличилось до: ${this.bigPauseTimer} мин.`);
          this.restTimer(this.bigPauseTimer);
        }
      }
    }, 1000);
  }

  addTask(task) {
    this.tasks.push(task);
  }

  activateTask(id) {
    this.activeTask = this.tasks.find(task => task.id === id.toString());
  }

  startTask() {
    if (!this.activeTask) {
      console.log('Активируйте задачу');
    } else {
      console.log(`Выполняется задача: 
      ${this.activeTask.title}, время на задачу ${this.taskTimer} мин.`);
      this.taskTimerСountdown();
    }
  }

  tasksCounter(id) {
    const task = this.tasks.find(task => task.id === id.toString());
    task.count += 1;
  }

  restTimer(timer) {
    let seconds = 60;
    timer -= 1;
    const timerId = setInterval(() => {
      seconds -= 1;
      console.log(`До конца отдыха осталось: ${timer} минут ${seconds} секунд`);
      if (seconds < 1) {
        timer -= 1;
        seconds = 60;
      }
      if (timer <= -1) {
        console.log('Время отдыха окончено');
        clearInterval(timerId);
        this.startTask();
      }
    }, 1000);
  }
}

const timer = new Tomato({
  taskTimer: 1,
  pauseTimer: 2,
  bigPauseTimer: 5,
});

timer.addTask({
  id: '1',
  title: 'Сходить в магазин',
  count: 0,
});

timer.addTask({
  id: '2',
  title: 'Сходить в прачечную',
  count: 0,
});

timer.addTask({
  id: '3',
  title: 'Сходить в бассейн',
  count: 0,
});

timer.activateTask(2);
timer.startTask();
