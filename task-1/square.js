import { getDate, getEndPoints, getPassedTimeByPercent, parseTransform } from './helpers.js'

//There's the element is rendering 
const create = () => {
  const body = document.body
  const sq = document.createElement('div')
  sq.classList.add('square')
  body.append(sq)
  return [0, 0]
}

const moveTo = (from, to, duration) => {
  const element = document.querySelector('.square')
  const { rotate } = parseTransform(element.style.transform)
  return new Promise((res) => {
    let [x1, y1] = from;
    const [endXPoint, endYPoint] = getEndPoints(x1, y1, to)
    const [start, finish] = getDate(duration)

    //I've chosen requestAnimationFrame 'cause it better for rendering elements
    let requestId = requestAnimationFrame(animate);

    function animate() {
      const passedTimeByPercent = getPassedTimeByPercent(start, duration)
      const x = Math.floor(x1 + endXPoint * passedTimeByPercent);
      const y = Math.floor(y1 + endYPoint * passedTimeByPercent);
      element.style.transform = `translate(${x}px, ${y}px) ${rotate || ''}`;

      requestId = requestAnimationFrame(animate);

      if (finish < Date.now()) {
        cancelAnimationFrame(requestId);
        // so I return coords 'cause requestAnimationFrame returns ID
        res([x, y])
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
      const passedTimeByPercent = getPassedTimeByPercent(start, duration)
      const currentDeg = Math.floor(deg * passedTimeByPercent)
      element.style.transform = `${translate || ''} rotate3d(${x}, ${y}, ${z}, ${currentDeg}deg)`;

      requestId = requestAnimationFrame(animate);

      if (finish < Date.now()) {
        cancelAnimationFrame(requestId);
        res(coords || [0, 0])
      }
    }

    animate();
  })
}

export { create, moveTo, rotate }