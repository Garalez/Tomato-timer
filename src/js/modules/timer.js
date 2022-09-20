/* eslint-disable max-len */
import {ControllerTomato} from './controllerTomato';
import {RenderTomato} from './renderTomato';
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
    if (Tomato.instance) {
      return Tomato.instance;
    }
    this.taskTimer = taskTimer;
    this.pauseTimer = pauseTimer;
    this.bigPauseTimer = bigPauseTimer;
    this.tasks = tasks;
    this.activeTask = null;
    this.renderTomato = null;
    Tomato.instance = this;
  }

  addTask(taskTitle) {
    const taskObj = {
      id: Date.now().toString(),
      title: taskTitle,
      taskTimer: this.taskTimer,
      pauseTimer: this.pauseTimer,
      bigPauseTimer: this.bigPauseTimer,
      importance: this.importance,
      activeTask: this.activeTask,
      count: 0,
    };
    this.tasks.push(taskObj);
    this.renderTomato = new RenderTomato();
    this.renderTomato.render(taskObj);
  }

  activateTask(id) {
    this.activeTask = this.tasks.find(task => {
      if (task.id === id.toString()) {
        task.activeTask = true;
        return task;
      }
    });
    this.renderTomato.activateTask(this.activeTask);
  }

  deactivateTask(id) {
    this.activeTask = this.tasks.find(task => {
      if (task.id === id.toString()) {
        task.activeTask = null;
        return task;
      }
    });
    this.renderTomato.deactivateTask(id);
  }

  updateTaskName(id, updatedTitle) {
    this.tasks.find(task => {
      if (task.id === id.toString()) {
        task.title = updatedTitle;
      }
    });
  }

  removeTask(id) {
    this.renderTomato.removeTask(id);
    this.tasks.splice(this.tasks.findIndex(task => task.id === id.toString()), 1);
  }

  tasksCounter() {
    this.renderTomato.taskTimer(this.activeTask.title, this.activeTask.taskTimer - 1);
  }

  restTimer() {
    this.activeTask.count += 1;
    this.renderTomato.increaseCount();
    if (this.activeTask.count % 3) {
      this.renderTomato.restTimer(+this.activeTask.pauseTimer - 1);
    } else {
      this.renderTomato.restTimer(+this.activeTask.bigPauseTimer - 1);
    }
  }
}

export class HighPriorityTask extends Tomato {
  constructor(taskTimer, pauseTimer, bigPauseTimer, tasks) {
    super(taskTimer, pauseTimer, bigPauseTimer, tasks);
    this.importance = 'important';
  }
}

export class StandardPriorityTask extends Tomato {
  constructor(taskTimer, pauseTimer, bigPauseTimer, tasks) {
    super(taskTimer, pauseTimer, bigPauseTimer, tasks);
    this.importance = 'default';
  }
}

export class LowPriorityTask extends Tomato {
  constructor(taskTimer, pauseTimer, bigPauseTimer, tasks) {
    super(taskTimer, pauseTimer, bigPauseTimer, tasks);
    this.importance = 'so-so';
  }
}

const addTaskBtn = document.querySelector('.task-form__add-button');
const controller = new ControllerTomato();

addTaskBtn.addEventListener('click', event => {
  event.preventDefault();
  const taskName = document.querySelector('.task-name');
  const importanceBtn = document.querySelector('.button-importance');

  if (!taskName.value) {
    alert('Введите название задачи!');
    return;
  }
  const importance = importanceBtn.className.split(' ')[2];
  controller.addTask(taskName.value, importance);
  taskName.value = '';
});
