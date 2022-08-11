class ArrayList {
  #storage = []

  set(key, value) {
    const obj = this.#getObject(key, value)
    this.#storage.push(obj)
    return this.#storage
  }

  has(key) {
    const obj = this.get(key);
    if (obj) {
      return true
    }
    return false
  }

  hasIndex(index) {
    const obj = this.#storage[index]
    if (obj) {
      return true
    }
    return false
  }

  get(key) {
    return this.#storage.find((el) => el.key === key) || null;
  }

  getByIndex(index) {
    return this.#storage[index]
  }

  remove(key) {
    const obj = this.get(key)
    if (obj) {
      this.#storage.splice(obj.index, 1)
      this.#setCorrectIndex()
    }
    return this.#storage;
  }

  size() {
    return this.#storage.length
  }

  forEach(fn) {
    this.#storage.forEach(fn)
    return this.#storage;
  }

  union(...maps) {
    maps.forEach((map) => {
      for (let i = 0; i < map.size(); i++) {
        const obj = map.getByIndex(i)
        this.set(obj.key, obj.value)
      }
    })
    return this.#storage;
  }

  uniq() {
    const arr = this.#storage.map((el) => el.value)
    return new Set(arr)
  }

  sort(fn) {
    return this.#storage.sort(fn)
  }

  setTo(index, key, value) {
    this.#storage.splice(index + 1, 0, this.#getObject(key, value))
    this.#setCorrectIndex()
    return this.#storage;
  }

  removeAt(index, count = 1) {
    this.#storage.splice(index + 1, count)
    return this.#storage;
  }

  #getObject(key, value) {
    return { key, value, index: this.size() }
  }

  #setCorrectIndex(){
    this.#storage = this.#storage.map((el, ind) => {     
      return { key: el.key, value: el.value, index: ind }
    })
  }
}


const list = new ArrayList()
console.log(list.set('Anna', 'QA'))

module.exports = { ArrayList };
