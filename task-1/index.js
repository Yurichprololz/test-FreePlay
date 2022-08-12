import * as Element_API from './app.js';


let pos = Element_API.create()
pos = Element_API.moveToWithSpeedUp(pos, [100, 300, 200], 2000)
  .then((data) => {
    return Element_API.moveTo(data, [300, 100, -500], 1500)
  })
  .then((pos) => {
    return Element_API.moveTo(pos, [100, 300, 300], 2000)
  })
  .then((pos) => {
    return Element_API.rotate(1, 1, 1, 360, 1000)
  })
  .then((pos) => {
    const screenWidth = window.screen.width
    return Element_API.moveToWithSpeedUp(pos, [screenWidth, 300, -300], 2000)
  })