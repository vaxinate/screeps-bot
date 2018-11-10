const findPath = _.curry((posA, posB) => posA.pos.findPathTo(posB.pos))

const findPathsBetween = (setA, setB) => {
  const paths2d = _.map(setA, posA => setB.map(findPath(posA)))

  return _.flatten(paths2d)
}

const findRoadCandidates = (room) => {
  const { controller } = room
  const sources = room.find(FIND_SOURCES_ACTIVE)
  const spawns = room.find(FIND_MY_SPAWNS)
  const sourcePaths =

  console.log(spawns)
  console.log(sources)
  console.log(controller)

  return findPathsBetween(spawns, [controller]).concat(findPathsBetween(spawns, sources))
}

const hasContinuousRoad = (path, room) => {
  const roadFilter = obj => obj.structureType === STRUCTURE_ROAD

  return pathPositions().reduce(pos, memo => {
    if (memo === false) {
      return memo
    }

    const objects = _.concat(
      pos.lookFor(LOOK_CONSTRUCTION_SITES) || [],
      pos.lookFor(LOOK_STRUCTURES) || []
    )

    return objects.some(roadFilter)
  })
}

const pathPositions = (path, room) => {
  return path.map(step => new RoomPosition(step.x, step.y, room.name))
}

const ConstructionPlanner = {
  findRoadPaths: (room) => {
    const candidates = findRoadCandidates(room)
    const noRoomRoad = _.curry(path => !hasContinuousRoad(_, room))

    return candidates.filter(noRoomRoad)
  }
}

module.exports = ConstructionPlanner
