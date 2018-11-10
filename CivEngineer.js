// STARTING - moving to the start point
// BUILDING - placing construction sites
// COMPLETE - looking for work
const RoadPlanner = require('RoadPlanner')

const {
  STATUS_COMPLETE,
  JOB_CIV_ENG,
  JOB_UPGRADE
} = require('Constants')

const CivEngineer = {
  init: creep => {
    creep.memory.job = JOB_CIV_ENG
    return OK
  },
  work: (creep, constructionStore) => {
    const { status } = creep.memory

    console.log('engineer work')
    if (status === STATUS_COMPLETE) {
      const roadPath = constructionStore.popRoad()
      if (roadPath.error) {
        creep.memory.job = 'JOB_UPGRADE'
      } else {
        RoadPlanner.init(creep, roadPath)
      }
    }

    if (creep.memory.job === JOB_CIV_ENG) {
      return RoadPlanner.work(creep)
    }

    return OK
  }
}

module.exports = CivEngineer
