/*
eslint-disable
fp/no-class, fp/no-mutation, fp/no-this, fp/no-mutating-methods,
fp/no-unused-expression
*/

const ConstructionPlanner = require('ConstructionPlanner')

class ConstructionState {
  /* eslint-disable fp/no-nil */
  constructor() {
    this.rooms = []
    this.roadQueue = []
  }
  /* eslint-enable fp/no-nil */

  addRoom(room) {
    const names = this.rooms.map(r => r.name)
    if (names.indexOf(room.name) !== -1) {
      return ERR_NAME_EXISTS
    }
    
    this.rooms.push(room)
    this.roadQueue = _.concat(
      this.roadQueue,
      ConstructionPlanner.findRoadPaths(room)
    )

    return OK
  }

  popRoad() {
    if (this.roadQueue.length === 0) {
      return {error: ERROR_NOT_FOUND}
    }

    return this.roadQueue.pop()
  }
}

module.exports = ConstructionState
