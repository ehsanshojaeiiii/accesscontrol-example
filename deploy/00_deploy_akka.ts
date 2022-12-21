import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function ({getNamedAccounts,deployments}: HardhatRuntimeEnvironment) {
  const {deploy}=deployments
  const {deployer}=await getNamedAccounts()
  await deploy('Akka',{
    from:deployer,
    log:true,
  })
};
export default func;