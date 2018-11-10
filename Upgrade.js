const moveTo = require('util.moveTo')
const updateGatherState = require('util.updateGatherState')
const { adjacent } = require('util.Range')

const Upgrade =  {
  findTarget: (creep) => {
    const { gathering = true} = creep.memory
    return (
      gathering
        ? creep.pos.findClosestByRange(FIND_MY_SPAWNS)
        : creep.room.controller
    )
  },
  upgrade: (creep, controller) => {
    if (adjacent(creep, controller)) {
      return creep.upgradeController(controller)
    }

    return ERR_NOT_IN_RANGE
  },
  withdraw: (creep, spawn) => {
    if (adjacent(creep, spawn)) {
      const result = creep.withdraw(spawn, RESOURCE_ENERGY)
      spawn.renewCreep(creep) // eslint-disable-line fp/no-unused-expression

      return result
    }

    return ERR_NOT_IN_RANGE
  },
  work: (creep) => {
    const { upgrade, withdraw } = Upgrade
    const { gathering } = creep.memory
    const action = gathering ? withdraw : upgrade
    const target = Upgrade.findTarget(creep)

    moveTo(creep, adjacent, target)

    const result = action(creep, target)

    updateGatherState(creep)

    return result
  }
}
module.exports = Upgrade
