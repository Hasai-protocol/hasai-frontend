export const HTTP_PROVIDER =
    "https://kovan.infura.io/v3/c7a306b346024098b99d06b2d1181569";

export const TopTabs = [
    {
        TabIndex: 0,
        TabName: "Home",
        path: "/",
    },
    {
        TabIndex: 1,
        TabName: "Account",
        path: "/account",
    },
    {
        TabIndex: 2,
        TabName: "Test",
        path: "/test",
    },
];

export enum Tabs {
    MY_NFT = "1",
    USER_BORROW = "2",
}

export enum Filter {
    OnAuction,
    Normal,
}

export enum Status {
    BORROW,
    REPAY,
    AUCTION,
    WITHDRAW,
}
export enum InterestRateMode {
    stableDebt = 1,
    Variable = 2,
}
export enum PoolType {
    "Permissionless" = 0,
    "Blue Chip" = 1,
    // middle not exact number big than one is middle pool
}
export const getRepayCount = (amount) => {
    return amount.add(amount.div(400));
};
export const dateFormat = "MMM DD hh:mma";
export const testSlugHex = {
    "0x48d44cab156d0cbb79dce88631a23510b1a21b3a": "cool-cats-nft",
    "0x8e359866f55fbf90e41ee97d3e4b22305ff29dc1": "azuki",
    "0xca996ab5c31968dca2e2435c9b588be8eb10e968": "clonex",
    "0x36b028832c3013d4e0f2d445d1423f70a1ee2fea": "otherdeed",
    "0xa3040ad14de4cd226d9213e96146c8275dd98c90": "proof-moonbirds",
    "0x49f6c6a7dcf021fd331ecd5b7b9d71969cacba1f": "bad-influence-0x",
    "0x9b61997354d48af54b4ab8eae67d5277b5586a82": "moonrunnersnft",
};
export const testNft = [
    {
        address: "0x48d44cab156d0cbb79dce88631a23510b1a21b3a",
        name: "cool-cats-nft",
    },
    {
        address: "0x8e359866f55fbf90e41ee97d3e4b22305ff29dc1",
        name: "azuki",
    },
    {
        address: "0xca996ab5c31968dca2e2435c9b588be8eb10e968",
        name: "clonex",
    },
    {
        address: "0x36b028832c3013d4e0f2d445d1423f70a1ee2fea",
        name: "otherdeed",
    },
    {
        address: "0xa3040ad14de4cd226d9213e96146c8275dd98c90",
        name: "proof-moonbirds",
    },
    {
        address: "0x9b61997354d48af54b4ab8eae67d5277b5586a82",
        name: "moonrunnersnft",
    },
    {
        address: "0x49f6c6a7dcf021fd331ecd5b7b9d71969cacba1f",
        name: "bad-influence-0x",
    },
];
export const staticPoolInfo = {
    0: {
        supplyRate: 0x033b7d1cfece19c4828a1d88,
        nfts: ["0x8e359866f55fbf90e41ee97d3e4b22305ff29dc1"],
        data: {
            configuration:
                "0x100278d0000070800005a67531000000012c000003f480000507d0",
            liquidityIndex: "0x033b2e4873de37453f451f89",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x0c297789cd992ee9a66862",
            currentVariableBorrowRate: "0x034a62120c117fb78c10027b",
            currentStableBorrowRate: "0x034a62120c117fb78c10027b",
            lastUpdateTimestamp: 1659015220,
            hTokenAddress: "0x4107cb4b178b82af9f0f4061d34a6f83ef4f1a1e",
            stableDebtTokenAddress:
                "0x2aa7205e7ab8d31f90700116db40258c72dc2a2b",
            variableDebtTokenAddress:
                "0x4f33a896cf459f7cd45e8fc0af6daff12937208e",
            interestRateStrategyAddress:
                "0xc0ad6b3b0e579bfaba01cbb1e776aba94299f283",
            id: "0x00",
        },
    },
    1: {
        supplyRate: 0x033b6648d9fd99c97a326f2f,
        nfts: [
            "0x48d44cab156d0cbb79dce88631a23510b1a21b3a",
            "0xa3040ad14de4cd226d9213e96146c8275dd98c90",
        ],
        data: {
            configuration:
                "0x200278d0000070800070867531000000012c000002a300000507d0",
            liquidityIndex: "0x033b6648d9fd99c97a326f2f",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x00",
            currentVariableBorrowRate: "0x033b2e3c9fd0803ce8000000",
            currentStableBorrowRate: "0x033b2e3c9fd0803ce8000000",
            lastUpdateTimestamp: 1659020380,
            hTokenAddress: "0x8c655469b0f257d80cff54317db1def0a751f1b3",
            stableDebtTokenAddress:
                "0x1faa6122e8fc85b8ade06a7208bbeeeea0b4c29d",
            variableDebtTokenAddress:
                "0x9aa09eba518e2d3195aeb8148edf83e8930cebc0",
            interestRateStrategyAddress:
                "0xc0ad6b3b0e579bfaba01cbb1e776aba94299f283",
            id: "0x01",
        },
    },
    2: {
        supplyRate: 0x033b706aaf7b1301bb81bdb5,
        nfts: ["0xca996ab5c31968dca2e2435c9b588be8eb10e968"],
        data: {
            configuration:
                "0x0278d0000070800070867531000000012c000002a300000507d0",
            liquidityIndex: "0x033b2e3c9fd0803ce8000000",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x1939db57db635ae503f0fe",
            currentVariableBorrowRate: "0x035ab68ecda2bc6e8644ed3d",
            currentStableBorrowRate: "0x035ab68ecda2bc6e8644ed3d",
            lastUpdateTimestamp: 1659085124,
            hTokenAddress: "0x70489c67fd4c5cf501af403f5375e394f240adc9",
            stableDebtTokenAddress:
                "0x0b689884f99efd52e7bc119848e85aa4b5ce9363",
            variableDebtTokenAddress:
                "0x4d1de558397ad5c7d20a036cc0df2e96b4e160ea",
            interestRateStrategyAddress:
                "0xc0ad6b3b0e579bfaba01cbb1e776aba94299f283",
            id: "0x02",
        },
    },
    3: {
        supplyRate: 0x033bb58ad9a7a74c5de44956,
        nfts: ["0xa3040ad14de4cd226d9213e96146c8275dd98c90"],
        data: {
            configuration:
                "0x0278d0000005a00005a67531000000012c00000000b4000107d0",
            liquidityIndex: "0x033b2ec8450e80907b3c50a3",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x0c27a4b3774ed416c46936",
            currentVariableBorrowRate: "0x034a3dff880d45f444550ecc",
            currentStableBorrowRate: "0x034a3dff880d45f444550ecc",
            lastUpdateTimestamp: 1659085928,
            hTokenAddress: "0x9f7d19e6b350a35e6c8a66461197bb37167870ca",
            stableDebtTokenAddress:
                "0x15cb08995c502c319a26244417eb95fcdc18a9da",
            variableDebtTokenAddress:
                "0x583166a9d99e09e796cf80676d6e25e731d5fa9f",
            interestRateStrategyAddress:
                "0xc0ad6b3b0e579bfaba01cbb1e776aba94299f283",
            id: "0x03",
        },
    },
    4: {
        supplyRate: 0x033bc04544a0fda755681273,
        nfts: ["0x36b028832c3013d4e0f2d445d1423f70a1ee2fea"],
        data: {
            configuration:
                "0x0278d00000708000e1027531000000012c0000015180000107d0",
            liquidityIndex: "0x033b3072434d43507024abfa",
            variableBorrowIndex: "0x033ca5dfbecb4cb0497c028d",
            currentLiquidityRate: "0x0cf63315cf965737e775b0",
            currentVariableBorrowRate: "0x034b13c741bf1f6b722df25d",
            currentStableBorrowRate: "0x034b13c741bf1f6b722df25d",
            lastUpdateTimestamp: 1659084816,
            hTokenAddress: "0xebfd2235d6299f95de5d99c6968495557caab155",
            stableDebtTokenAddress:
                "0x421f66d2ff5999a7e7335312510cb3d9e370a1de",
            variableDebtTokenAddress:
                "0xc9b90f513f9ebfd5862d866637fbae715525dce7",
            interestRateStrategyAddress:
                "0xc0ad6b3b0e579bfaba01cbb1e776aba94299f283",
            id: "0x04",
        },
    },
    5: {
        supplyRate: 0x033b3041262a52ef899e7b26,
        nfts: ["0x9b61997354d48af54b4ab8eae67d5277b5586a82"],
        data: {
            configuration:
                "0x0278d00000708000e1027531000000012c0000015180000107d0",
            liquidityIndex: "0x033b2e3c9fd0803ce8000000",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x2e92f1b63936aaf029df",
            currentVariableBorrowRate: "0x033b687035999b26b39cd436",
            currentStableBorrowRate: "0x033b687035999b26b39cd436",
            lastUpdateTimestamp: 1659085504,
            hTokenAddress: "0xe77c9ad6e8065ad4381db95d2a10d2da84043159",
            stableDebtTokenAddress:
                "0x624a7b862d5299047d35d009d017d8f2749fec0f",
            variableDebtTokenAddress:
                "0x9f84e5ca586c1cd1fad7be34597c3453afba4a03",
            interestRateStrategyAddress:
                "0xc0ad6b3b0e579bfaba01cbb1e776aba94299f283",
            id: "0x05",
        },
    },
    6: {
        supplyRate: 0x033b2e3c9fd0803ce8000000,
        nfts: ["0x49f6c6a7dcf021fd331ecd5b7b9d71969cacba1f"],
        data: {
            configuration:
                "0x0278d0000070800070867531000000012c0000015180000107d0",
            liquidityIndex: "0x033b2e3c9fd0803ce8000000",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x00",
            currentVariableBorrowRate: "0x033b2e3c9fd0803ce8000000",
            currentStableBorrowRate: "0x033b2e3c9fd0803ce8000000",
            lastUpdateTimestamp: 1659076680,
            hTokenAddress: "0x6503eb69f51ee3e4ec662f36ebd2a12ab588cfdc",
            stableDebtTokenAddress:
                "0xfd6a245ab0e4f5da77877786af477c0fbcde2f3d",
            variableDebtTokenAddress:
                "0xb33e4ecc523360dc085bdc926fba938843d5d54a",
            interestRateStrategyAddress:
                "0xc0ad6b3b0e579bfaba01cbb1e776aba94299f283",
            id: "0x06",
        },
    },
};
export const seconds2Year = 60 * 60 * 24 * 365;

export const nftPostDetail = {
    "0x8e359866f55fbf90e41ee97d3e4b22305ff29dc1": {
        banner_image_url:
            "https://lh3.googleusercontent.com/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A=s2500",
        image_url:
            "https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s120",
        name: "Azuki",
        stats: {
            one_day_volume: 66.71,
            one_day_change: -0.31123844922822774,
            one_day_sales: 7,
            one_day_average_price: 9.53,
            seven_day_volume: 539.609,
            seven_day_change: -0.24925563323660738,
            seven_day_sales: 55,
            seven_day_average_price: 9.811072727272728,
            thirty_day_volume: 3828.028704851853,
            thirty_day_change: -0.507788765611437,
            thirty_day_sales: 301,
            thirty_day_average_price: 12.71770333837825,
            total_volume: 255765.03868572056,
            total_sales: 26786,
            total_supply: 10000,
            count: 10000,
            num_owners: 5101,
            average_price: 9.54845959403123,
            num_reports: 1,
            market_cap: 98110.72727272728,
            floor_price: 8.7,
        },
    },
    "0x48d44cab156d0cbb79dce88631a23510b1a21b3a": {
        banner_image_url:
            "https://lh3.googleusercontent.com/H4Iu36XQNJqVlF99-0BuQna0sUlUcIrHt97ss3le_tAWw8DveEBfTktX3S0bP6jpC9FhN1CKZjoYzZFXpWjr1xZfQIwSSLeDjdi0jw=s2500",
        image_url:
            "https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=s120",
        name: "Cool Cats NFT",
        stats: {
            one_day_volume: 44.377,
            one_day_change: 0.0851634579880324,
            one_day_sales: 14,
            one_day_average_price: 3.1697857142857147,
            seven_day_volume: 217.28449999999995,
            seven_day_change: -0.05826802572372919,
            seven_day_sales: 58,
            seven_day_average_price: 3.74628448275862,
            thirty_day_volume: 1028.0834890000006,
            thirty_day_change: -0.5371257906630784,
            thirty_day_sales: 246,
            thirty_day_average_price: 4.17920117479675,
            total_volume: 110320.5919126733,
            total_sales: 29366,
            total_supply: 9941,
            count: 9941,
            num_owners: 5607,
            average_price: 3.7567456212175068,
            num_reports: 3,
            market_cap: 37241.81404310344,
            floor_price: 3.1,
        },
    },
    "0xa3040ad14de4cd226d9213e96146c8275dd98c90": {
        banner_image_url:
            "https://lh3.googleusercontent.com/ouzjfA0LotbHC92vuDph9JDeg7Z4ZFo12Pr9GJpfSAZSrnXDOubJn0eTvinwzUTPsWhnLLq5ocjcDSrpNV0_MYIjueVJrzFlE6p0=s2500",
        image_url:
            "https://lh3.googleusercontent.com/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75=s120",
        name: "Moonbirds",
        stats: {
            one_day_volume: 278.22,
            one_day_change: 0.2424973204715972,
            one_day_sales: 12,
            one_day_average_price: 23.185000000000002,
            seven_day_volume: 1531.1499999999999,
            seven_day_change: 0.5407923965168211,
            seven_day_sales: 69,
            seven_day_average_price: 22.190579710144924,
            thirty_day_volume: 7922.514023611104,
            thirty_day_change: -0.11033567205308754,
            thirty_day_sales: 303,
            thirty_day_average_price: 26.146910969013543,
            total_volume: 160817.8077915507,
            total_sales: 8784,
            total_supply: 10000,
            count: 10000,
            num_owners: 6579,
            average_price: 18.308038227635553,
            num_reports: 1,
            market_cap: 221905.79710144925,
            floor_price: 20.45,
        },
    },
    "0xca996ab5c31968dca2e2435c9b588be8eb10e968": {
        banner_image_url:
            "https://lh3.googleusercontent.com/4elUtz8UyFYDH34vDxd4hpQX8S-EdkFq8s9ombkuQTDBWLwHvsjRM_RXWT2zX8Vt2bAiO2BHslwN57FyTW1JIn_FyFI0BsZfmvmeJQ=s2500",
        image_url:
            "https://lh3.googleusercontent.com/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg=s120",
        name: "CLONE X - X TAKASHI MURAKAMI",
        stats: {
            one_day_volume: 143.816319999999,
            one_day_change: -0.13576701288150536,
            one_day_sales: 15,
            one_day_average_price: 9.5877546666666,
            seven_day_volume: 1328.671919999999,
            seven_day_change: -0.03790209999845801,
            seven_day_sales: 127,
            seven_day_average_price: 10.461983622047237,
            thirty_day_volume: 6479.533019979995,
            thirty_day_change: -0.43894328490702034,
            thirty_day_sales: 495,
            thirty_day_average_price: 13.089965696929282,
            total_volume: 222420.7169995225,
            total_sales: 17956,
            total_supply: 19354,
            count: 19354,
            num_owners: 9469,
            average_price: 12.386985798592253,
            num_reports: 1,
            market_cap: 202481.23102110223,
            floor_price: 8.99,
        },
    },
    "0x36b028832c3013d4e0f2d445d1423f70a1ee2fea": {
        banner_image_url:
            "https://lh3.googleusercontent.com/E_XVuM8mX1RuqBym2JEX4RBg_sj9KbTFBAi0qU4eBr2E3VCC0bwpWrgHqBOaWsKGTf4-DBseuZJGvsCVBnzLjxqgq7rAb_93zkZ-=s2500",
        image_url:
            "https://lh3.googleusercontent.com/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI=s120",
        name: "Otherdeed for Otherside",
        stats: {
            one_day_volume: 424.5829821499998,
            one_day_change: 0.4711061063202638,
            one_day_sales: 89,
            one_day_average_price: 4.770595305056178,
            seven_day_volume: 3256.8596268803967,
            seven_day_change: -0.4829573760322766,
            seven_day_sales: 690,
            seven_day_average_price: 4.720086415768691,
            thirty_day_volume: 18909.31290620795,
            thirty_day_change: -0.17439616330838192,
            thirty_day_sales: 3575,
            thirty_day_average_price: 5.289318295442783,
            total_volume: 328002.25932849734,
            total_sales: 41553,
            total_supply: 100000,
            count: 100000,
            num_owners: 34949,
            average_price: 7.8935879317617825,
            num_reports: 1,
            market_cap: 472008.64157686906,
            floor_price: 2.3,
        },
    },
    "0x9b61997354d48af54b4ab8eae67d5277b5586a82": {
        banner_image_url:
            "https://openseauserdata.com/files/cb77e7dfb3f926cf2f6c63400a0a66c6.png",
        image_url:
            "https://openseauserdata.com/files/8bb5a3faa8de2761782f03b9ecc8e785.png",
        name: "Moonrunners Official",
        stats: {
            one_day_volume: 14.922599989999988,
            one_day_change: 0.7054103344625233,
            one_day_sales: 138,
            one_day_average_price: 0.1081347825362318,
            seven_day_volume: 86.49057207999981,
            seven_day_change: -0.44115689400658964,
            seven_day_sales: 709,
            seven_day_average_price: 0.12198952338504909,
            thirty_day_volume: 3285.2816424486705,
            thirty_day_change: -0.38559278582872925,
            thirty_day_sales: 10042,
            thirty_day_average_price: 0.32715411695366164,
            total_volume: 8632.356948001669,
            total_sales: 25936,
            total_supply: 9473,
            count: 9473,
            num_owners: 3878,
            average_price: 0.33283301002474047,
            num_reports: 4,
            market_cap: 1155.60675502657,
            floor_price: 0.1,
        },
    },
    "0x49f6c6a7dcf021fd331ecd5b7b9d71969cacba1f": {
        banner_image_url:
            "https://openseauserdata.com/files/23936276dfa4595e882005e97d2d6f9a.png",
        image_url:
            "https://openseauserdata.com/files/1992dd428b2cb23e4b8aaf3cf85d2298.png",
        name: "Bad Influence 0x",
        stats: {
            one_day_volume: 170.5268128958901,
            one_day_change: 2.005739175997331,
            one_day_sales: 983,
            one_day_average_price: 0.1734759032511598,
            seven_day_volume: 353.4994048038896,
            seven_day_change: 0,
            seven_day_sales: 1850,
            seven_day_average_price: 0.19108075935345384,
            thirty_day_volume: 353.4994048038896,
            thirty_day_change: 0,
            thirty_day_sales: 1850,
            thirty_day_average_price: 0.19108075935345384,
            total_volume: 353.4994048038896,
            total_sales: 1850,
            total_supply: 4000,
            count: 4000,
            num_owners: 1396,
            average_price: 0.19108075935345384,
            num_reports: 0,
            market_cap: 764.3230374138153,
            floor_price: 0.13,
        },
    },
};
