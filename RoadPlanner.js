const { adjacent } = require('util.Range')

const {
  JOB_ROAD_PLANNER,
  STATUS_START,
  STATUS_BUILD,
  STATUS_COMPLETE
} = require('Constants')

const RoadPlanner = {
  build: creep => {
    const pos = creep.memory.path.pop()

    if (!pos.error) {
      creep.moveTo(pos.x, pos.y)
      return creep.room.createConstructionSite(pos, STRUCTURE_ROAD)
    }

    creep.memory.status = STATUS_COMPLETE
    return OK
  },
  /* eslint-disable fp/no-unused-expression */
  drawRoad: (room, path) => {
    path.forEach(step, i => {
      const x1 = path[i].x
      const y1 = path[i].y
      const x2 = path[i+1].x
      const y2 = path[i+1].y
      const options = {style: {lineStyle: 'dotted'}}

      return room.visual.line(x1, y1, x2, y2, options)
    })

    return OK
  },
  /* eslint-enable fp/no-unused-expression */
  init: (creep, path)  => {
    console.log('road planner init')
    creep.memory.job = JOB_CIV_ENG
    creep.memory.status = STATUS_START
    creep.memory.roadPath = path

    RoadPlanner.drawRoad(creep.room, path)

    return OK
  },
  start: creep => {
    const firstPos = creep.memory.roadPath[0]

    if (!adjacent(creep, {pos: firstPos})) {
      return creep.moveTo(firstPos.x, firstPos.y)
    }

    creep.memory.status = STATUS_BUILD
    return OK
  },
  work: creep => {
    switch (creep.memory.status) {
    case STATUS_START:
      return RoadPlanner.start(creep)
    case STATUS_BUILD:
      return RoadPlanner.build(creep)
    }

    return OK
  }
}

module.exports = RoadPlanner
