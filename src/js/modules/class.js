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
