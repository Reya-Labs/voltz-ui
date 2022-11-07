import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export declare namespace CommunitySBT {
    type RootInfoStruct = {
        merkleRoot: PromiseOrValue<BytesLike>;
        baseMetadataURI: PromiseOrValue<string>;
        startTimestamp: PromiseOrValue<BigNumberish>;
        endTimestamp: PromiseOrValue<BigNumberish>;
    };
    type RootInfoStructOutput = [string, string, number, number] & {
        merkleRoot: string;
        baseMetadataURI: string;
        startTimestamp: number;
        endTimestamp: number;
    };
    type LeafInfoStruct = {
        account: PromiseOrValue<string>;
        metadataURI: PromiseOrValue<string>;
    };
    type LeafInfoStructOutput = [string, string] & {
        account: string;
        metadataURI: string;
    };
}
export interface CommunitySBTInterface extends utils.Interface {
    functions: {
        "addNewRoot((bytes32,string,uint32,uint32))": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "getApproved(uint256)": FunctionFragment;
        "getTokenIdHash(address,string)": FunctionFragment;
        "invalidateRoot(bytes32)": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "locked(uint256)": FunctionFragment;
        "multiRedeem((address,string)[],bytes32[][],bytes32[])": FunctionFragment;
        "name()": FunctionFragment;
        "owner()": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "redeem((address,string),bytes32[],bytes32)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "safeTransferFrom(address,address,uint256)": FunctionFragment;
        "safeTransferFrom(address,address,uint256,bytes)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "symbol()": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
        "totalSupply()": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "validRoots(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addNewRoot" | "approve" | "balanceOf" | "getApproved" | "getTokenIdHash" | "invalidateRoot" | "isApprovedForAll" | "locked" | "multiRedeem" | "name" | "owner" | "ownerOf" | "redeem" | "renounceOwnership" | "safeTransferFrom(address,address,uint256)" | "safeTransferFrom(address,address,uint256,bytes)" | "setApprovalForAll" | "supportsInterface" | "symbol" | "tokenURI" | "totalSupply" | "transferFrom" | "transferOwnership" | "validRoots"): FunctionFragment;
    encodeFunctionData(functionFragment: "addNewRoot", values: [CommunitySBT.RootInfoStruct]): string;
    encodeFunctionData(functionFragment: "approve", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getTokenIdHash", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "invalidateRoot", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "locked", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "multiRedeem", values: [
        CommunitySBT.LeafInfoStruct[],
        PromiseOrValue<BytesLike>[][],
        PromiseOrValue<BytesLike>[]
    ]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "redeem", values: [
        CommunitySBT.LeafInfoStruct,
        PromiseOrValue<BytesLike>[],
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "validRoots", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "addNewRoot", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokenIdHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "invalidateRoot", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "multiRedeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validRoots", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "InvalidatedRoot(bytes32)": EventFragment;
        "Locked(uint256)": EventFragment;
        "NewValidRoot(tuple)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "RedeemCommunitySBT(tuple,uint256)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
        "Unlocked(uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "InvalidatedRoot"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Locked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewValidRoot"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RedeemCommunitySBT"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unlocked"): EventFragment;
}
export interface ApprovalEventObject {
    owner: string;
    approved: string;
    tokenId: BigNumber;
}
export declare type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export interface ApprovalForAllEventObject {
    owner: string;
    operator: string;
    approved: boolean;
}
export declare type ApprovalForAllEvent = TypedEvent<[
    string,
    string,
    boolean
], ApprovalForAllEventObject>;
export declare type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;
export interface InvalidatedRootEventObject {
    merkleRoot: string;
}
export declare type InvalidatedRootEvent = TypedEvent<[
    string
], InvalidatedRootEventObject>;
export declare type InvalidatedRootEventFilter = TypedEventFilter<InvalidatedRootEvent>;
export interface LockedEventObject {
    tokenId: BigNumber;
}
export declare type LockedEvent = TypedEvent<[BigNumber], LockedEventObject>;
export declare type LockedEventFilter = TypedEventFilter<LockedEvent>;
export interface NewValidRootEventObject {
    rootInfo: CommunitySBT.RootInfoStructOutput;
}
export declare type NewValidRootEvent = TypedEvent<[
    CommunitySBT.RootInfoStructOutput
], NewValidRootEventObject>;
export declare type NewValidRootEventFilter = TypedEventFilter<NewValidRootEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface RedeemCommunitySBTEventObject {
    leafInfo: CommunitySBT.LeafInfoStructOutput;
    tokenId: BigNumber;
}
export declare type RedeemCommunitySBTEvent = TypedEvent<[
    CommunitySBT.LeafInfoStructOutput,
    BigNumber
], RedeemCommunitySBTEventObject>;
export declare type RedeemCommunitySBTEventFilter = TypedEventFilter<RedeemCommunitySBTEvent>;
export interface TransferEventObject {
    from: string;
    to: string;
    tokenId: BigNumber;
}
export declare type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface UnlockedEventObject {
    tokenId: BigNumber;
}
export declare type UnlockedEvent = TypedEvent<[BigNumber], UnlockedEventObject>;
export declare type UnlockedEventFilter = TypedEventFilter<UnlockedEvent>;
export interface CommunitySBT extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: CommunitySBTInterface;
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
        addNewRoot(rootInfo: CommunitySBT.RootInfoStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getTokenIdHash(account: PromiseOrValue<string>, metadataURI: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
        invalidateRoot(merkleRoot: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        multiRedeem(leafInfos: CommunitySBT.LeafInfoStruct[], proofs: PromiseOrValue<BytesLike>[][], merkleRoots: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        redeem(leafInfo: CommunitySBT.LeafInfoStruct, proof: PromiseOrValue<BytesLike>[], merkleRoot: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        validRoots(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    addNewRoot(rootInfo: CommunitySBT.RootInfoStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getTokenIdHash(account: PromiseOrValue<string>, metadataURI: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
    invalidateRoot(merkleRoot: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    multiRedeem(leafInfos: CommunitySBT.LeafInfoStruct[], proofs: PromiseOrValue<BytesLike>[][], merkleRoots: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    redeem(leafInfo: CommunitySBT.LeafInfoStruct, proof: PromiseOrValue<BytesLike>[], merkleRoot: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    symbol(overrides?: CallOverrides): Promise<string>;
    tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    validRoots(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        addNewRoot(rootInfo: CommunitySBT.RootInfoStruct, overrides?: CallOverrides): Promise<void>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getTokenIdHash(account: PromiseOrValue<string>, metadataURI: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        invalidateRoot(merkleRoot: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        multiRedeem(leafInfos: CommunitySBT.LeafInfoStruct[], proofs: PromiseOrValue<BytesLike>[][], merkleRoots: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<BigNumber[]>;
        name(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        redeem(leafInfo: CommunitySBT.LeafInfoStruct, proof: PromiseOrValue<BytesLike>[], merkleRoot: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        symbol(overrides?: CallOverrides): Promise<string>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        validRoots(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        "InvalidatedRoot(bytes32)"(merkleRoot?: null): InvalidatedRootEventFilter;
        InvalidatedRoot(merkleRoot?: null): InvalidatedRootEventFilter;
        "Locked(uint256)"(tokenId?: null): LockedEventFilter;
        Locked(tokenId?: null): LockedEventFilter;
        "NewValidRoot(tuple)"(rootInfo?: null): NewValidRootEventFilter;
        NewValidRoot(rootInfo?: null): NewValidRootEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        "RedeemCommunitySBT(tuple,uint256)"(leafInfo?: null, tokenId?: null): RedeemCommunitySBTEventFilter;
        RedeemCommunitySBT(leafInfo?: null, tokenId?: null): RedeemCommunitySBTEventFilter;
        "Transfer(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
        Transfer(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
        "Unlocked(uint256)"(tokenId?: null): UnlockedEventFilter;
        Unlocked(tokenId?: null): UnlockedEventFilter;
    };
    estimateGas: {
        addNewRoot(rootInfo: CommunitySBT.RootInfoStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getTokenIdHash(account: PromiseOrValue<string>, metadataURI: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        invalidateRoot(merkleRoot: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        multiRedeem(leafInfos: CommunitySBT.LeafInfoStruct[], proofs: PromiseOrValue<BytesLike>[][], merkleRoots: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        redeem(leafInfo: CommunitySBT.LeafInfoStruct, proof: PromiseOrValue<BytesLike>[], merkleRoot: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        validRoots(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        addNewRoot(rootInfo: CommunitySBT.RootInfoStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTokenIdHash(account: PromiseOrValue<string>, metadataURI: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        invalidateRoot(merkleRoot: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        locked(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        multiRedeem(leafInfos: CommunitySBT.LeafInfoStruct[], proofs: PromiseOrValue<BytesLike>[][], merkleRoots: PromiseOrValue<BytesLike>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        redeem(leafInfo: CommunitySBT.LeafInfoStruct, proof: PromiseOrValue<BytesLike>[], merkleRoot: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        validRoots(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=CommunitySBT.d.ts.map