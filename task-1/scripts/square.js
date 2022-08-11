import { getDate, getEndPoints, getPassedTimeByPercent, parseTransform, brakingWithEaseInOut } from './helpers.js'
import { SPEED_UP_BRAKING_TIMING } from './varible.js'

//There's the element is rendering 
const create = () => {
  const body = document.body
  const sq = document.createElement('div')
  sq.classList.add('square')
  body.append(sq)
  return [0, 0, 0]
}

const moveTo = (from, to, duration, timing = false) => {
  const element = document.querySelector('.square')
  const { rotate } = parseTransform(element.style.transform)
  
  return new Promise((res) => {
    let [x1, y1, z1] = from;
    const [endXPoint, endYPoint, endZPoint] = getEndPoints(x1, y1, z1, to)
    const [start, finish] = getDate(duration)

    //I've chosen requestAnimationFrame 'cause it better for rendering elements
    let requestId = requestAnimationFrame(animate);

    function animate() {
      let timeFraction = getPassedTimeByPercent(start, duration)

      if (timing && timing === SPEED_UP_BRAKING_TIMING) {
        timeFraction = brakingWithEaseInOut(timeFraction)
      }

      const x = Math.floor(x1 + endXPoint * timeFraction);
      const y = Math.floor(y1 + endYPoint * timeFraction);
      const z = Math.floor(z1 + endZPoint * timeFraction);
      element.style.transform = `perspective(800px) translate3d(${x}px, ${y}px, ${z}px) ${rotate || ''}`;

      requestId = requestAnimationFrame(animate);

      if (finish < Date.now()) {
        cancelAnimationFrame(requestId);
        // I return coords so 'cause requestAnimationFrame returns ID
        res([x, y, z])
      }
    }

    animate();
  })

}

const rotate = (x, y, z, deg, duration) => {
  const element = document.querySelector('.square')

  // I parse coords 'cause functions must return it
  const { translate, coords } = parseTransform(element.style.transform)

  return new Promise((res) => {
    const [start, finish] = getDate(duration)

    let requestId = requestAnimationFrame(animate);

    function animate() {
      const timeFraction = getPassedTimeByPercent(start, duration)
      const currentDeg = Math.floor(deg * timeFraction)
      element.style.transform = `perspective(800px) ${translate || ''} rotate3d(${x}, ${y}, ${z}, ${currentDeg}deg)`;

      requestId = requestAnimationFrame(animate);

      if (finish < Date.now()) {
        cancelAnimationFrame(requestId);
        res(coords || [0, 0, 0])
      }
    }

    animate();
  })
}

const moveToWithSpeedUp = (from, to, duration) => {
  return moveTo(from, to, duration, SPEED_UP_BRAKING_TIMING)
    .then((data) => data)
}

export { create, moveTo, rotate, moveToWithSpeedUp }