/* eslint-disable max-len */
import {HighPriorityTask, StandardPriorityTask, LowPriorityTask} from './timer';

export class ControllerTomato {
  constructor() {
    this.taskName = null;
    this.importance = null;
    this.createTask = null;
    this.interval = null;
    this.timerStartBtn = null;
    this.btnListener = null;
    this.taskEvents();
  }

  addTask(taskName, importance) {
    this.taskName = taskName;
    this.importance = importance;
    if (this.importance === 'default') {
      this.createTask = new StandardPriorityTask();
    } else if (this.importance === 'so-so') {
      this.createTask = new LowPriorityTask();
    } else if (this.importance === 'important') {
      this.createTask = new HighPriorityTask();
    }
    this.createTask.addTask(this.taskName);
  }

  taskEvents() {
    const tasksList = document.querySelector('.pomodoro-tasks__quest-tasks');

    tasksList.addEventListener('click', event => {
      const target = event.target;
      if (target.closest('.pomodoro-tasks__task-text')) {
        const taskId = target.parentNode.children[0].textContent;
        const timerBtnsWrapper = document.querySelector('.window__buttons');
        this.timerStartBtn = timerBtnsWrapper.children[0];
        this.timerStartBtn.textContent = 'Старт';
        this.timerStartBtn.style.backgroundColor = '#DC0D27';
        this.timerStartBtn.disabled = false;
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
        if (target.classList.contains('pomodoro-tasks__task-text_active')) {
          this.createTask.deactivateTask(taskId);
        } else {
          const timerTitle = document.querySelector('.window__panel-title');
          timerTitle.textContent = target.textContent;
          this.createTask.activateTask(taskId);
          if (this.btnListener) {
            const timerBtnsWrapper = document.querySelector('.window__buttons');
            timerBtnsWrapper.removeEventListener('click', this.btnListener);
          }
          this.timerEvents();
        }
      }

      if (target.closest('.pomodoro-tasks__task-button')) {
        const burgerMenuPopups = document.querySelectorAll('.burger-popup');
        const burgerMenu = target.parentNode.lastElementChild;

        if (burgerMenu.classList.contains('burger-popup_active')) {
          burgerMenu.classList.remove('burger-popup_active');
        } else {
          burgerMenuPopups.forEach(item => {
            item.classList.remove('burger-popup_active');
          });
          burgerMenu.classList.add('burger-popup_active');
        }

        const closeBurger = (bodyEvent) => {
          if (!bodyEvent.target.closest('.burger-popup') &&
          !bodyEvent.target.closest('.pomodoro-tasks__task-button')) {
            burgerMenuPopups.forEach(item => {
              item.classList.remove('burger-popup_active');
            });
            document.body.removeEventListener('click', closeBurger);
          }
        };
        document.body.addEventListener('click', closeBurger);
      }

      if (target.closest('.burger-popup')) {
        const taskName = target.parentNode.parentNode.children[2];
        const taskID = target.parentNode.parentNode.children[0].textContent;
        if (target.closest('.burger-popup__edit-button')) {
          taskName.contentEditable = true;
          const selection = window.getSelection();
          const range = document.createRange();
          selection.removeAllRanges();
          range.selectNodeContents(taskName);
          range.collapse(false);
          selection.addRange(range);
          taskName.focus();

          taskName.addEventListener('blur', () => {
            taskName.contentEditable = false;
            this.createTask.updateTaskName(taskID, taskName.textContent);
          });
        }

        if (target.closest('.burger-popup__delete-button')) {
          console.log(taskID);
          this.createTask.removeTask(taskID);
        }
      }
    });
  }

  timerEvents() {
    const timerBtnsWrapper = document.querySelector('.window__buttons');

    this.btnListener = (btnsEvent) => {
      if (btnsEvent.target.closest('.button-primary')) {
        this.timerStartBtn.disabled = true;
        this.startTimer();
      }

      if (btnsEvent.target.closest('.button-secondary')) {
        this.timerStartBtn.textContent = 'Продолжить';
        this.timerStartBtn.style.backgroundColor = '#A9BB30';
        this.timerStartBtn.disabled = false;
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
      }
    };

    timerBtnsWrapper.addEventListener('click', this.btnListener);
  }

  startTimer() {
    const pageMinutes = document.querySelector('.timer-minutes');
    const pageSeconds = document.querySelector('.timer-seconds');
    const activeStance = document.querySelector('.window__panel-title');

    let minutes = +pageMinutes.textContent;
    let seconds = +pageSeconds.textContent;
    this.interval = setInterval(() => {
      if (seconds < 1) {
        minutes -= 1;
        seconds = 60;
      }
      seconds -= 1;
      pageMinutes.textContent = minutes.toString().padStart(2, 0);
      pageSeconds.textContent = seconds.toString().padStart(2, 0);
      if (minutes <= -1) {
        if (activeStance.textContent === 'Перерыв') {
          this.createTask.tasksCounter(activeStance.textContent);
        } else {
          this.createTask.restTimer();
        }
        clearInterval(this.interval);
        this.interval = null;
        this.startTimer();
      }
    }, 1000);
  }
}
