import { createReq } from "./request";
const baseCcalRequest = createReq(process.env.baseApi || "/api");
const request = (api, type, data?, config?) => {
    return new Promise<{ ok: boolean; data: any }>((reslove, reject) => {
        baseCcalRequest[type](api, data, config)
            .then((res: any) => {
                const { code, data } = res || {};
                reslove({
                    ok: code == "200" ? true : false,
                    data: data || {},
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export default request;
