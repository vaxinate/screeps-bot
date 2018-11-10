const JOB_BUILDER = 'JOB_BUILDER'
const STATUS_STARTING = 'STATUS_STARTING'

const Builder = {
  localConstructionSite(creep) {
    const foundSite = creep.pos.lookFor(LOOK_CONSTRUCTION_SITES)[0]

    if (!foundSite) {
      const result = creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)

      if (result === OK) {
        return creep.pos.lookFor(LOOK_CONSTRUCTION_SITES)[0]
      }

      return { error: result }
    }

    return foundSite
  },
  build: creep => {
    const site = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES)
    const result = creep.build(site)

    if (result === ERR_NOT_IN_RANGE) {
      return creep.moveTo(site)
    } else if (result === ERR_NOT_ENOUGH_ENERGY) {
      creep.memory.gathering = true
    }

    return result
  },
  gather: creep => {
    const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
    const result = creep.withdraw(spawn, RESOURCE_ENERGY)

    if (result === ERR_NOT_IN_RANGE) {
      return creep.moveTo(spawn)
    } else if (result === ERR_FULL) {
      creep.memory.gathering = false
    }

    spawn.renewCreep(creep)

    return result
  },
  work: (creep) => {
    const { status, gathering } = creep.memory
    const { gather, build } = Builder

    return gathering ? gather(creep) : build(creep)
  },
}

module.exports = Builder
