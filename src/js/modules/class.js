class Counter {
  _id;
  _title;
  _counter;
  constructor(title, counter = 0) {
    this._id = Date.now().toString();
    this._title = title;
    this._counter = counter;
    Object.preventExtensions(this);
  }

  addCount() {
    this._counter += 1;
  }

  changeTitle(text) {
    this._title = text;
  }
}
const apple = new Counter('apple');

console.log(apple);
apple.title = 'asd';
apple.id = '4';
apple.counter = 4;
apple.addCount();
console.log(apple);

apple.addCount();

apple.changeTitle('qwe');
console.log(apple);

