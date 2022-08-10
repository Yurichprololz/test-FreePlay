const getPassedTimeByPercent = (start, duration) => {
  const now = Date.now();
  return (now - start) / duration
}

const getDate = (duration) => {
  const now = Date.now()
  return [now, now + duration]
}

const getVector = (from, to) => {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const catX = Math.pow(x2 - x1, 2)
  const catY = Math.pow(y2 - y1, 2)
  return Math.floor(Math.sqrt(catX + catY))
}

const getEndPoints = (x1, y1, to) => {
  let [x2, y2] = to;
  const endXPoint = x2 - x1
  const endYPoint = y2 - y1
  return [endXPoint, endYPoint]
}

export { getDate, getPassedTimeByPercent, getEndPoints }