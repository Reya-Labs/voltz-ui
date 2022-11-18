import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface IERC5192Interface extends utils.Interface {
    functions: {
        "locked(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "locked"): FunctionFragment;
    encodeFunctionData(functionFragment: "locked", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
    events: {
        "Locked(uint256)": EventFragment;
        "Unlocked(uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Locked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unlocked"): EventFragment;
}
export interface LockedEventObject {
    tokenId: BigNumber;
}
export declare type LockedEvent = TypedEvent<[BigNumber], LockedEventObject>;
export declare type LockedEventFilter = TypedEventFilter<LockedEvent>;
export interface UnlockedEventObject {
    tokenId: BigNumber;
}
export declare type UnlockedEvent = TypedEvent<[BigNumber], UnlockedEventObject>;
export declare type UnlockedEventFilter = TypedEventFilter<UnlockedEvent>;
export interface IERC5192 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IERC5192Interface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "Locked(uint256)"(tokenId?: null): LockedEventFilter;
        Locked(tokenId?: null): LockedEventFilter;
        "Unlocked(uint256)"(tokenId?: null): UnlockedEventFilter;
        Unlocked(tokenId?: null): UnlockedEventFilter;
    };
    estimateGas: {
        locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IERC5192.d.ts.map