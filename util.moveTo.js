const Constants = require('Constants')

function moveTo(creep, inRange, target) {
  if (!inRange(creep, target)) {
    return creep.moveTo(target)
  }

  return Constants.NO_MOVE_OK
}

module.exports = moveTo
