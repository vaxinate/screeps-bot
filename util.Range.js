module.exports = {
  adjacent: (creep, target) => creep.pos.inRangeTo(target, 1),
  upgrade: (creep, target) => creep.pos.inRangeTo(target, 3),
}
