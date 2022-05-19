const DominionDAO = artifacts.require('DominionDAO')

module.exports = async function (deployer) {
  await deployer.deploy(DominionDAO)
}
