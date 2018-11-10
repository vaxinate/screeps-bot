module.exports = (creep) => {
  const { gathering } = creep.memory
  const weight = _.sum(creep.carry)

  if (gathering && weight === creep.carryCapacity) {
    creep.memory.gathering = false
    return false
  }

  if (!gathering && weight === 0) {
    creep.memory.gathering = true
    return true
  }

  return ERR_INVALID_ARGS
}
