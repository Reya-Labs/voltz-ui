import { BigNumber, providers } from "ethers";

const provider = new providers.JsonRpcProvider('http://0.0.0.0:8545/');

export async function advanceTime(_duration: BigNumber | number) {
  const duration =
    typeof _duration === "number" ? _duration : _duration.toNumber();
  await provider.send("evm_increaseTime", [duration]);
  await provider.send("evm_mine", []);
}

export async function mineBlock(count?: number) {
  if (count == null) count = 1;
  while (count-- > 0) {
    await provider.send("evm_mine", []);
  }
}

export async function advanceTimeAndBlock(time: BigNumber, blockCount: number) {
  if (blockCount < 1) {
    return;
  }
  await advanceTime(time);
  await mineBlock(blockCount - 1);
}
