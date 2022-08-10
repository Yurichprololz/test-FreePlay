import { getDate, getEndPoints, getPassedTimeByPercent } from './helpers.js'

const create = () => {
  const body = document.body
  const sq = document.createElement('div')
  sq.classList.add('square')
  body.append(sq)
  return [0, 0]
}

const moveTo = (from, to, duration) => {
  const el = document.querySelector('.square')
  return new Promise((res) => {
    let [x1, y1] = from;
    const [endXPoint, endYPoint] = getEndPoints(x1, y1, to)
    const [start, finish] = getDate(duration)

    let requestId = requestAnimationFrame(animate);

    function animate() {
      const passedTimeByPercent = getPassedTimeByPercent(start, duration)
      const x = x1 + endXPoint * passedTimeByPercent;
      const y = y1 + endYPoint * passedTimeByPercent;
      el.style.transform = `translate(${x}px, ${y}px)`;

      requestId = requestAnimationFrame(animate);

      if (finish < Date.now()) {
        cancelAnimationFrame(requestId);
        res([x, y])
      }
    }

    animate();
  })

}





export { create, moveTo }