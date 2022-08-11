const { ArrayList } = require('../app.js');

let list = new ArrayList()

test('add an object', () => {
  const array = list.set('Anna', 'QA')

  expect(array[0].index).toBe(0)
  expect(array).toEqual([{ key: 'Anna', value: 'QA', index: 0 }])
});

test('add the 2nd object', () => {
  const array = list.set('Pavel', 'Developer')

  expect(array[1].index).toBe(1)
  expect(array).toEqual([{ key: 'Anna', value: 'QA', index: 0 }, { key: 'Pavel', value: 'Developer', index: 1 }])
});

test('get by key', () => {
  const [anna, pavel, diana] = [list.get('Anna'), list.get('Pavel'), list.get('Diana')]

  expect(anna.index).toBe(0)
  expect(pavel.value).toBe('Developer')
  expect(pavel.index).toBe(1)
  expect(diana).toBeFalsy()
});

test('get by index', () => {
  const [anna, pavel, diana] = [list.getByIndex(0), list.getByIndex(1), list.getByIndex(2)]

  expect(anna.value).toBe('QA')
  expect(pavel.value).toBe('Developer')
  expect(pavel.index).toBe(1)
  expect(diana).toBeFalsy()
});

test('has', () => {
  const [first, second, third] = [list.has('Anna'), list.has('Pavel'), list.has('Diana')]

  expect(first).toBeTruthy()
  expect(second).toBeTruthy()
  expect(third).toBeFalsy()
});

test('hasIndex', () => {
  const [first, second, third] = [list.hasIndex(0), list.hasIndex(1), list.hasIndex(2)]

  expect(first).toBeTruthy()
  expect(second).toBeTruthy()
  expect(third).toBeFalsy()
});

test('remove', () => {
  list.set('Diana', 'UI/UX')
  list.remove('Pavel')
  const array = list.remove(1)

  expect(array[0].key).toBe('Anna')
  expect(array[0].index).toBe(0)
  expect(array[1].key).toBe('Diana')
  expect(array[1].index).toBe(1)
  expect(array[2]).toBeFalsy()
});

test('union', () => {
  const list2 = new ArrayList()
  list2.set('Eugen', 'Skinner')
  const secondList = list2.set('Andrew', 'Carpenter')

  expect(secondList[0].value).toBe('Skinner')
  expect(secondList[1].key).toBe('Andrew')

  list.union(list2)

  expect(list.size()).toBe(4)
  expect(list.hasIndex(3)).toBeTruthy()
  expect(list.getByIndex(3).key).toBe('Andrew')
});

test('uniq', () => {
  const array = Array.from(list.uniq())
  expect(array).toEqual(['QA', 'UI/UX', 'Skinner', 'Carpenter'])

  list.set('Lada', 'QA')
  const array2 = Array.from(list.uniq())
  expect(array2).toEqual(['QA', 'UI/UX', 'Skinner', 'Carpenter'])
});

test('uniq', () => {
  const array = Array.from(list.uniq())
  expect(array).toEqual(['QA', 'UI/UX', 'Skinner', 'Carpenter'])

  list.set('Lada', 'QA')
  const array2 = Array.from(list.uniq())
  expect(array2).toEqual(['QA', 'UI/UX', 'Skinner', 'Carpenter'])
});

test('setTo', () => {
  const previousSecond = list.getByIndex(2)
  const array = list.setTo(1, 'Paul', 'Developer')
  const paul = list.get('Paul')

  expect(paul.index).toEqual(2)
  expect(previousSecond.key).toEqual('Eugen')
  expect(array[2].key).toEqual('Paul')
});

test('removeAt', () => {
  list.removeAt(1, Infinity)

  expect(list.size()).toEqual(2)
});
