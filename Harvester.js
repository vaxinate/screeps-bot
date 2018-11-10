const moveTo = require('util.moveTo')
const updateGatherState = require('util.updateGatherState')
const { adjacent } = require('util.Range')

const Harvester = {
  findTarget: (creep) => {
    const { gathering = true } = creep.memory
    const finder = gathering ? FIND_SOURCES_ACTIVE : FIND_MY_SPAWNS

    return  creep.pos.findClosestByRange(finder)
  },
  harvest: (creep, source) => {
    if (adjacent(creep, source)) {
      return creep.harvest(source)
    }

    return ERR_NOT_IN_RANGE
  },
  transfer: (creep, spawn) => {
    if (adjacent(creep, spawn)) {
      const result = creep.transfer(spawn, RESOURCE_ENERGY)
      spawn.renewCreep(creep) // eslint-disable-line fp/no-unused-expression
      return result
    }

    return ERR_NOT_IN_RANGE
  },

  work: (creep) => {
    const { harvest, transfer, findTarget } = Harvester
    const { gathering } = creep.memory
    const action = gathering ? harvest : transfer
    const target = findTarget(creep)

    moveTo(creep, adjacent, target)

    const result = action(creep, target)

    updateGatherState(creep)

    return result
  }

}

module.exports = Harvester
