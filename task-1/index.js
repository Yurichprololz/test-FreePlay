import * as Square from './square.js';


(async function () {
  let pos = Square.create()
  pos = await Square.rotate(1, 1, 1, 90, 2000)

  // pos = await Square.moveTo(pos, [100, 300], 2000)
  //   .then(async (data) => {
  //     return await Square.moveTo(data, [300, 100], 2000)
  //   })
  //   .then(async (pos) => {
  //    return await Square.rotate(1, 1, 1, 90, 2000)
  //   })
  //   .then(async (pos) => {
  //     return await Square.moveTo(pos, [100, 300], 2000)
  //   })
    
  console.log(pos)
})()