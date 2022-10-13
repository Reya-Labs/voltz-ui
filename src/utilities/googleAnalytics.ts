/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Agents, SwapFormSubmitButtonHintStates } from "@contexts";
import { isUndefined } from "lodash";
import AugmentedAMM from "./augmentedAmm";
import isBorrowing from "./isBorrowing";

declare global {
    interface Window {
      dataLayer?: any;
    }
}

export const getPoolButtonId = ( marginAction: string, liquidityAction: string, notionalAction: string, agent: Agents, amm?: AugmentedAMM, borrow?: boolean ): string => {
    const protocol = amm ? amm.protocol : "";
    let showBorrow = "";
    if (isUndefined(borrow)) {
        if (amm) showBorrow = isBorrowing(amm.rateOracle.protocolId) ? "_borrow" : "";
    } else {
        showBorrow = borrow ? "_borrow" : "";
    }
    const showAgent = (agent == Agents.LIQUIDITY_PROVIDER) ? "lp" : (agent === Agents.FIXED_TRADER ? "ft" : "vt");
    return ("Protocol:"+protocol + showBorrow 
        + "_MarginAction:" + marginAction 
        + "_LiquidityAction:" + liquidityAction 
        + "_NotionalAction:" + notionalAction 
        + "_Agent:" + showAgent);
}

export const getRowButtonId = (isLp: boolean, protocol: string, borrow?: boolean ): string => {
    const showBorrow = borrow ? "_borrow" : "";
    const showAgent = isLp ? "lp" : "trader";
    return ("ROW_Protocol:" + protocol + showBorrow 
        + "_Agent:" + showAgent);
}

export const getNotionalActionFromHintState = (hint: SwapFormSubmitButtonHintStates): string => {
    switch(hint){
        case SwapFormSubmitButtonHintStates.REMOVE_AND_ADD:
        case SwapFormSubmitButtonHintStates.REMOVE_AND_REMOVE:
            return "REMOVE";
        case SwapFormSubmitButtonHintStates.ADD_AND_ADD:
        case SwapFormSubmitButtonHintStates.ADD_AND_REMOVE:
            return "ADD";
        default:
            return "";
    }
}

export const pushEvent = (eventName: string, eventValue: string | number, sessionId?: string, amm?: AugmentedAMM, agent?: string) => {
    // with context
    if (amm) {
        const pool = amm.protocol + (amm.rateOracle.protocolId === 5 || amm.rateOracle.protocolId === 6 ? "_borrow" : "" );
        window.dataLayer.push({'event': eventName, 'value': eventValue, 'sessionId': sessionId, 'pool': pool, 'agent': agent});
    } else { // without context
        window.dataLayer.push({'event': eventName, 'value': eventValue, 'sessionId': sessionId});
    }
}

export const pushTxSubmition = (
    eventName: string, 
    notional: number | undefined,
    margin: number | undefined,
    action: string,
    sessionId: string,
    amm: AugmentedAMM,
    agent?: string | number,
    failMessage?: string
) => {
    let agentType = "";
    if ( typeof agent === "string") {
        agentType = agent;
    } else {
        switch (agent) {
            case 1: 
                agentType = "Fixed Trader"; 
                break;
            case 2: 
                agentType = "Variable Trader"; 
                break;
            case 3: 
                agentType = "Liquidity Provider"; 
                break;
            default: agentType = "";
        }
    }
    const pool = amm.protocol + (amm.rateOracle.protocolId === 5 || amm.rateOracle.protocolId === 6 ? "_borrow" : "" );
    window.dataLayer.push({
        'event': eventName,
        'notional': notional,
        'margin': margin,
        'action':  action,
        'sessionId': sessionId,
        'pool': pool,
        'agent': agentType,
        'failMessage': failMessage
    });
}
