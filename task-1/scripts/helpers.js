const getPassedTimeByPercent = (start, duration) => {
  const now = Date.now();
  return (now - start) / duration
}

const getDate = (duration) => {
  const now = Date.now()
  return [now, now + duration]
}

const getEndPoints = (x1, y1, z1, to) => {
  let [x2, y2, z2] = to;
  const endXPoint = x2 - x1
  const endYPoint = y2 - y1
  const endZPoint = z2 - z1
  return [endXPoint, endYPoint, endZPoint]
}

const parseTransform = (string) => {
  let translate = string.match(/translate3d\(\w+, \w+\, \w+\)/i)
  let rotate = string.match(/rotate3d\(\w+, \w+, \w+, \w+\)/i)
  translate = translate ? translate.toString() : null;
  rotate = rotate ? rotate.toString() : null;
  const coords = translate ? parseCoords(translate) : null;
  return { translate, rotate, coords }
}

const parseCoords = (string) => {
  const [x, y, z] = string.match(/\d{1,3}px/ig)
  return [parseInt(x), parseInt(y), parseInt(z)]
}

const timeFractionWithBraking = (time) => {
  return 1 - Math.sin(Math.acos(time))
}
const makeEaseInOut = (timing) => {
  return function (timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

const brakingWithEaseInOut = makeEaseInOut(timeFractionWithBraking)

export { getDate, getPassedTimeByPercent, getEndPoints, parseTransform, brakingWithEaseInOut }