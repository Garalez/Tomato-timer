/* eslint-disable max-len */
export class RenderTomato {
  render(task) {
    const tasksList = document.querySelector('.pomodoro-tasks__quest-tasks');
    tasksList.insertAdjacentHTML('afterbegin', `
      <li class="pomodoro-tasks__list-task ${task.importance}">
        <span class="task-id" style="display:none">${task.id}</span>
        <span class="count-number">${task.count}</span>
        <button class="pomodoro-tasks__task-text">${task.title}</button>
        <button class="pomodoro-tasks__task-button"></button>
        <div class="burger-popup">
          <button class="popup-button burger-popup__edit-button">Редактировать</button>
          <button class="popup-button burger-popup__delete-button">Удалить</button>
        </div>
      </li>
    `);
  }

  activateTask(task) {
    const pageTaskId = document.querySelectorAll('.task-id');
    const pageTaskTitle = document.querySelectorAll('.pomodoro-tasks__task-text');

    pageTaskTitle.forEach(item => {
      item.classList.remove('pomodoro-tasks__task-text_active');
    });

    pageTaskId.forEach(item => {
      if (item.textContent === task.id) {
        const pageTaskName = item.parentElement.children[2];
        pageTaskName.classList.add('pomodoro-tasks__task-text_active');
      }
    });
    this.setTimer(task.taskTimer);
  }

  deactivateTask(id) {
    const pageTaskId = document.querySelectorAll('.task-id');
    pageTaskId.forEach(item => {
      if (item.textContent === id) {
        const pageTaskName = item.parentElement.children[2];
        pageTaskName.classList.remove('pomodoro-tasks__task-text_active');
      }
    });

    const timer = document.querySelector('.window__timer-text');
    timer.textContent = '0:00';

    const taskTitle = document.querySelector('.window__panel-title');
    taskTitle.textContent = '';
  }

  increaseCount() {
    const pageCountNumber = document.querySelector('.count-number');
    pageCountNumber.textContent = +pageCountNumber.textContent + 1;
  }

  setTimer(minutes) {
    const pageTimer = document.querySelector('.window__timer-text');
    pageTimer.textContent = '';
    pageTimer.insertAdjacentHTML('afterbegin', `
    <span class="timer-minutes">${minutes}</span>:<span class="timer-seconds">00</span>`);
  }

  restTimer(minutes) {
    const activeStance = document.querySelector('.window__panel-title');
    activeStance.textContent = 'Перерыв';
    this.setTimer(minutes);
  }

  taskTimer(taskTitle, minutes) {
    const activeStance = document.querySelector('.window__panel-title');
    activeStance.textContent = taskTitle;
    this.setTimer(minutes);
  }

  removeTask(id) {
    const pageTaskId = document.querySelectorAll('.task-id');
    pageTaskId.forEach(item => {
      if (item.textContent === id) {
        item.closest('li').remove();
      }
    });
  }
}
