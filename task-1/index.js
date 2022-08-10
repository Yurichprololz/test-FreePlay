import * as Square from './square.js';


(async function () {
  let pos = Square.create()
  pos = await Square.moveTo(pos, [100, 300], 2000)
    .then(async (pos2) => {
      console.log(pos2)
      return await Square.moveTo(pos2, [300, 100], 2000)
    })
  console.log(pos)
})()