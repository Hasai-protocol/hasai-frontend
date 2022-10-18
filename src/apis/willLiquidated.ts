import request from "./index";

export const queryWillLiquidated = (data) =>
    request(`will/liquidated`, "get", data);
