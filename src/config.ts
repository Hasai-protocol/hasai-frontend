export const HTTP_PROVIDER =
    "https://goerli.infura.io/v3/b5de8d90f0c74e918fd4d7202182e8c2";

export enum Tabs {
    MY_NFT = "1",
    USER_BORROW = "2",
}

export enum Filter {
    OnAuction,
    Normal,
    Pending,
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
    "shared Pool" = 2,
    // middle not exact number big than one is share pool
}
export const getRepayCount = (amount) => {
    return amount.add(amount.div(400));
};
export const dateFormat = "MMM DD hh:mma";
export const testSlugHex = {
    "0x3a09804793800172f840c8f00b9af6efd98a878f": "cool-cats-nft",
    "0x27f2b6dbbb89ef678f9813835f79d7bd9f6578db": "azuki",
    "0x85678a5e7a3b08d9994a9cd3a9629cd2418cc892": "clonex",
    "0x052c40d385ef7a278fb66346be0639b182bc8eb6": "otherdeed",
    "0x70f590a2b3219ad71b0b3414f74f24436daaebe5": "moonrunnersnft",
    "0x019faaed5d64f9baf348c379fab6023a4cf65656": "proof-moonbirds",
    "0xe98ee1e371fa6071ee18ff65898eee5c0a6d0284": "bad-influence-0x",
};
export const testNft = [
    {
        address: "0x3a09804793800172f840c8f00b9af6efd98a878f",
        name: "cool-cats-nft",
    },
    {
        address: "0x27f2b6dbbb89ef678f9813835f79d7bd9f6578db",
        name: "azuki",
    },
    {
        address: "0x85678a5e7a3b08d9994a9cd3a9629cd2418cc892",
        name: "clonex",
    },
    {
        address: "0x019faaed5d64f9baf348c379fab6023a4cf65656",
        name: "proof-moonbirds",
    },
    {
        address: "0x052c40d385ef7a278fb66346be0639b182bc8eb6",
        name: "otherdeed",
    },
    // {
    //     address: "0x70f590a2b3219ad71b0b3414f74f24436daaebe5",
    //     name: "moonrunnersnft",
    // },
    // {
    //     address: "0xE98ee1E371FA6071Ee18Ff65898Eee5C0A6D0284",
    //     name: "bad-influence-0x",
    // },
];
export const staticPoolInfo = {
    // 0: {
    //     supplyRate: 0x033b2e3c9fd0803ce8000000,
    //     nfts: ["0x3a09804793800172f840c8f00b9af6efd98a878f"],
    //     data: {
    //         configuration:
    //             "0x100278d0000070800070867531000000012c0000015180000a07d0",
    //         liquidityIndex: "0x033b2e3c9fd0803ce8000000",
    //         variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
    //         currentLiquidityRate: "0x00",
    //         currentVariableBorrowRate: "0x52b7d2dcc80cd2e4000000",
    //         currentStableBorrowRate: "0x52b7d2dcc80cd2e4000000",
    //         lastUpdateTimestamp: 1662553500,
    //         hTokenAddress: "0xfF573d915d964c8113624a29Eb8Aaa99eAF9a43b",
    //         stableDebtTokenAddress:
    //             "0x47aae0126BC8bE8B1304f0C9da9aB177Cb004636",
    //         variableDebtTokenAddress:
    //             "0xDAeF655D9cfeFA8393a40E37188E6D0270627615",
    //         interestRateStrategyAddress:
    //             "0x080c6aA2e3bfd9E9b617361486bB9eBb1Ddcf892",
    //         id: "0x00",
    //     },
    // },
    1: {
        supplyRate: 0x033b2e3c9fd0803ce8000000,
        nfts: [
            "0x27f2b6dbbb89ef678f9813835f79d7bd9f6578db",
            "0xe98ee1e371fa6071ee18ff65898eee5c0a6d0284",
            "0x052c40d385ef7a278fb66346be0639b182bc8eb6",
        ],
        data: {
            configuration:
                "0x200278d0000070800070867531000000012c0000015180000a07d0",
            liquidityIndex: "0x033b2e3c9fd0803ce8000000",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x00",
            currentVariableBorrowRate: "0x52b7d2dcc80cd2e4000000",
            currentStableBorrowRate: "0x52b7d2dcc80cd2e4000000",
            lastUpdateTimestamp: 1662553608,
            hTokenAddress: "0xc9a4e9859cf652c86c01F1Bde8de7a536bc9bFEe",
            stableDebtTokenAddress:
                "0x896aa15F57947de88890ef2C05E15006b4afa623",
            variableDebtTokenAddress:
                "0x92B76E23623338b6433b4876bCE513205BFf4304",
            interestRateStrategyAddress:
                "0x080c6aA2e3bfd9E9b617361486bB9eBb1Ddcf892",
            id: "0x01",
        },
    },
    2: {
        supplyRate: 0x033b2e3c9fd0803ce8000000,
        nfts: ["0x85678a5e7a3b08d9994a9cd3a9629cd2418cc892"],
        data: {
            configuration:
                "0x0278d0000070800070867531000000012c0000015180000a07d0",
            liquidityIndex: "0x033b2e3c9fd0803ce8000000",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x00",
            currentVariableBorrowRate: "0x52b7d2dcc80cd2e4000000",
            currentStableBorrowRate: "0x52b7d2dcc80cd2e4000000",
            lastUpdateTimestamp: 1662553812,
            hTokenAddress: "0xC618F5aBAE775E76d7ed477898c40f19a5feD76A",
            stableDebtTokenAddress:
                "0x845CCc28A917E939495e3a56947225b88b53fe78",
            variableDebtTokenAddress:
                "0x92E84718B2223918f7Ba431Cedf2CAd45a2aE748",
            interestRateStrategyAddress:
                "0x080c6aA2e3bfd9E9b617361486bB9eBb1Ddcf892",
            id: "0x02",
        },
    },
    3: {
        supplyRate: 0x033b2e3c9fd0803ce8000000,
        nfts: ["0x019faaed5d64f9baf348c379fab6023a4cf65656"],
        data: {
            configuration:
                "0x0278d0000070800070867531000000012c0000015180000a07d0",
            liquidityIndex: "0x033b2e3c9fd0803ce8000000",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x00",
            currentVariableBorrowRate: "0x52b7d2dcc80cd2e4000000",
            currentStableBorrowRate: "0x52b7d2dcc80cd2e4000000",
            lastUpdateTimestamp: 1662557064,
            hTokenAddress: "0x6B5Ee414263D9f5cA92CAd1aa462d6a902b0870c",
            stableDebtTokenAddress:
                "0xF6FB06c1F8A6690098511f28E8d8584296A9e776",
            variableDebtTokenAddress:
                "0x65bf58feF09C2923648F7093424246D0C6128Dbd",
            interestRateStrategyAddress:
                "0x080c6aA2e3bfd9E9b617361486bB9eBb1Ddcf892",
            id: "0x03",
        },
    },
    4: {
        supplyRate: 0x033b2e3c9fd0803ce8000000,
        nfts: ["0x052c40d385ef7a278fb66346be0639b182bc8eb6"],
        data: {
            configuration:
                "0x0278d0000070800070867531000000012c0000015180000a07d0",
            liquidityIndex: "0x033b2e3c9fd0803ce8000000",
            variableBorrowIndex: "0x033b2e3c9fd0803ce8000000",
            currentLiquidityRate: "0x00",
            currentVariableBorrowRate: "0x52b7d2dcc80cd2e4000000",
            currentStableBorrowRate: "0x52b7d2dcc80cd2e4000000",
            lastUpdateTimestamp: 1662557808,
            hTokenAddress: "0x1f5cbDCE5098BBbA72Cb7dcc23bF0Ae566865014",
            stableDebtTokenAddress:
                "0xe14859840349f086cB63bf510537Bbb0608a58B5",
            variableDebtTokenAddress:
                "0x3E78Bf8698Fcc01d213f75e8e4323ac5A99865A9",
            interestRateStrategyAddress:
                "0x080c6aA2e3bfd9E9b617361486bB9eBb1Ddcf892",
            id: "0x04",
        },
    },
};
export const seconds2Year = 60 * 60 * 24 * 365;

export const nftPostDetail = {
    "0x3a09804793800172f840c8f00b9af6efd98a878f": {
        banner_image_url:
            "https://lh3.googleusercontent.com/H4Iu36XQNJqVlF99-0BuQna0sUlUcIrHt97ss3le_tAWw8DveEBfTktX3S0bP6jpC9FhN1CKZjoYzZFXpWjr1xZfQIwSSLeDjdi0jw=s2500",
        image_url:
            "https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=s120",
        name: "Cool Cats NFT",
        stats: {
            one_day_volume: 9.850000000000001,
            one_day_change: -0.2452107279693486,
            one_day_sales: 5,
            one_day_average_price: 1.9700000000000002,
            one_day_difference: -3.1999999999999993,
            seven_day_volume: 113.2832,
            seven_day_change: -0.3798968472650756,
            seven_day_sales: 49,
            seven_day_average_price: 2.311902040816326,
            seven_day_difference: -69.40124451600005,
            thirty_day_volume: 1029.318244516,
            thirty_day_change: 0.023496188795654384,
            thirty_day_sales: 422,
            thirty_day_average_price: 2.4391427595165878,
            thirty_day_difference: 23.629844515999594,
            total_volume: 111724.26793153916,
            total_sales: 29909,
            total_supply: 9952,
            count: 9952,
            num_owners: 5632,
            average_price: 3.7354731997572355,
            num_reports: 1,
            market_cap: 23008.04911020408,
            floor_price: 1.9777,
        },
    },
    "0x27f2b6dbbb89ef678f9813835f79d7bd9f6578db": {
        banner_image_url:
            "https://lh3.googleusercontent.com/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A=s2500",
        image_url:
            "https://lh3.googleusercontent.com/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT=s120",
        name: "Azuki",
        stats: {
            one_day_volume: 22.45,
            one_day_change: -0.4768728882675056,
            one_day_sales: 3,
            one_day_average_price: 7.483333333333333,
            one_day_difference: -20.465000000000007,
            seven_day_volume: 275.3105,
            seven_day_change: -0.5792572729896454,
            seven_day_sales: 32,
            seven_day_average_price: 8.603453125,
            seven_day_difference: -379.0335500000003,
            thirty_day_volume: 3092.986750000003,
            thirty_day_change: 0.08190953819561142,
            thirty_day_sales: 356,
            thirty_day_average_price: 8.688165028089896,
            thirty_day_difference: 234.16478679000238,
            total_volume: 260202.04209893226,
            total_sales: 27279,
            total_supply: 10000,
            count: 10000,
            num_owners: 5068,
            average_price: 9.538547677661654,
            num_reports: 1,
            market_cap: 86034.53125,
            floor_price: 7.5,
        },
    },
    "0x85678a5e7a3b08d9994a9cd3a9629cd2418cc892": {
        banner_image_url:
            "https://lh3.googleusercontent.com/4elUtz8UyFYDH34vDxd4hpQX8S-EdkFq8s9ombkuQTDBWLwHvsjRM_RXWT2zX8Vt2bAiO2BHslwN57FyTW1JIn_FyFI0BsZfmvmeJQ=s2500",
        image_url:
            "https://lh3.googleusercontent.com/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg=s120",
        name: "CLONE X - X TAKASHI MURAKAMI",
        stats: {
            one_day_volume: 141.9084,
            one_day_change: -0.1352790738345087,
            one_day_sales: 17,
            one_day_average_price: 8.34755294117647,
            one_day_difference: -22.200500000000005,
            seven_day_volume: 981.2358009259258,
            seven_day_change: -0.44390599544479764,
            seven_day_sales: 121,
            seven_day_average_price: 8.109386784511784,
            seven_day_difference: -783.2784590520748,
            thirty_day_volume: 5100.101480903929,
            thirty_day_change: 0.07930260648310286,
            thirty_day_sales: 600,
            thirty_day_average_price: 8.500169134839881,
            thirty_day_difference: 374.7339609249302,
            total_volume: 229065.17753042694,
            total_sales: 18713,
            total_supply: 19378,
            count: 19378,
            num_owners: 9512,
            average_price: 12.24096497250184,
            num_reports: 6,
            market_cap: 157143.69711026934,
            floor_price: 6.1,
        },
    },
    "0x019faaed5d64f9baf348c379fab6023a4cf65656": {
        banner_image_url:
            "https://lh3.googleusercontent.com/ouzjfA0LotbHC92vuDph9JDeg7Z4ZFo12Pr9GJpfSAZSrnXDOubJn0eTvinwzUTPsWhnLLq5ocjcDSrpNV0_MYIjueVJrzFlE6p0=s2500",
        image_url:
            "https://lh3.googleusercontent.com/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75=s120",
        name: "Moonbirds",
        stats: {
            one_day_volume: 70.4842,
            one_day_change: 0.07922523350176082,
            one_day_sales: 6,
            one_day_average_price: 11.747366666666666,
            one_day_difference: 5.174199999999999,
            seven_day_volume: 575.5312000000001,
            seven_day_change: -0.6484615195077278,
            seven_day_sales: 45,
            seven_day_average_price: 12.789582222222226,
            seven_day_difference: -1061.6471800000006,
            thirty_day_volume: 5669.0008880000905,
            thirty_day_change: -0.0890721085697218,
            thirty_day_sales: 404,
            thirty_day_average_price: 14.032180415841808,
            thirty_day_difference: -554.3247356110205,
            total_volume: 169850.34237955074,
            total_sales: 9381,
            total_supply: 10000,
            count: 10000,
            num_owners: 6571,
            average_price: 18.10578215324067,
            num_reports: 2,
            market_cap: 127895.82222222225,
            floor_price: 10.75,
        },
    },
    "0xe98ee1e371fa6071ee18ff65898eee5c0a6d0284": {
        banner_image_url:
            "https://i.seadn.io/gcs/files/23936276dfa4595e882005e97d2d6f9a.png?w=500&auto=format",
        image_url:
            "https://i.seadn.io/gcs/files/1992dd428b2cb23e4b8aaf3cf85d2298.png?w=500&auto=format",
        name: "Bad Influence 0x",
        stats: {
            one_day_volume: 7.959487999999999,
            one_day_change: 9.378930979581138,
            one_day_sales: 45,
            one_day_average_price: 0.17687751111111108,
            one_day_difference: 7.192598999999999,
            seven_day_volume: 13.763195,
            seven_day_change: 0.17705573467659896,
            seven_day_sales: 75,
            seven_day_average_price: 0.18350926666666667,
            seven_day_difference: 2.0702950000000033,
            thirty_day_volume: 60.817963531662066,
            thirty_day_change: -0.9149500865170536,
            thirty_day_sales: 269,
            thirty_day_average_price: 0.22608908376082554,
            thirty_day_difference: -654.2675790757011,
            total_volume: 775.9035061390257,
            total_sales: 3855,
            total_supply: 4000,
            count: 4000,
            num_owners: 1222,
            average_price: 0.20127198602828164,
            num_reports: 1,
            market_cap: 734.0370666666666,
            floor_price: 0.195,
        },
    },
    "0x052c40d385ef7a278fb66346be0639b182bc8eb6": {
        banner_image_url:
            "https://lh3.googleusercontent.com/E_XVuM8mX1RuqBym2JEX4RBg_sj9KbTFBAi0qU4eBr2E3VCC0bwpWrgHqBOaWsKGTf4-DBseuZJGvsCVBnzLjxqgq7rAb_93zkZ-=s2500",
        image_url:
            "https://lh3.googleusercontent.com/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI=s120",
        name: "Otherdeed for Otherside",
        stats: {
            one_day_volume: 1068.3918999999003,
            one_day_change: 0.39234377921834546,
            one_day_sales: 73,
            one_day_average_price: 14.63550547945069,
            one_day_difference: 301.0584899999002,
            seven_day_volume: 3219.5567179989002,
            seven_day_change: 0.8446906250963796,
            seven_day_sales: 501,
            seven_day_average_price: 6.426260914169462,
            seven_day_difference: 1474.2468680988998,
            thirty_day_volume: 11141.77427818472,
            thirty_day_change: -0.2332129266513019,
            thirty_day_sales: 2691,
            thirty_day_average_price: 4.140384347151512,
            thirty_day_difference: -3388.6927385929266,
            total_volume: 341557.8611972216,
            total_sales: 45270,
            total_supply: 100000,
            count: 100000,
            num_owners: 34342,
            average_price: 7.544905261701383,
            num_reports: 1,
            market_cap: 642626.0914169461,
            floor_price: 1.69,
        },
    },
};
