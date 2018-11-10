const Upgrade = require('Upgrade')
const Harvester = require('Harvester')
const RoadPlanner = require('RoadPlanner')
const Builder = require('Builder')
const ConstructionState = require('ConstructionState')
const ConstructionPlanner = require('ConstructionPlanner')
const CivEngineer = require('CivEngineer')

const {
  JOB_HARVESTER,
  JOB_UPGRADE,
  JOB_ROAD_PLANNER,
  JOB_BUILDER,
  JOB_CIV_ENG,
} = require('./Constants')

const cStore = new ConstructionState()

function work(creep) {
  switch (creep.memory.job) {
  case JOB_UPGRADE:
    return Upgrade.work(creep)
  case JOB_HARVESTER:
    return Harvester.work(creep)
  case JOB_ROAD_PLANNER:
    return RoadPlanner.work(creep)
  case JOB_BUILDER:
    return Builder.work(creep)
  case JOB_CIV_ENG:
    return CivEngineer.work(creep, cStore)
  }

  return ERR_INVALID_ARGS
}

module.exports.loop = function () {
  const spawns = Object.values(Game.spawns)
  spawns.forEach(spawn => cStore.addRoom(spawn.room))

  return Object.values(Game.creeps).forEach(creep => work(creep))
}
