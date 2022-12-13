export const filterList = [
    {
        title: "All",
        index: 0,
        poolType: -1,
        des: `Browse to the "Deposit" section and click on
        "Deposit" for the Pools you want to deposit. Select
        the amount you'd like to deposit and submit your
        transaction. Once the transaction is confirmed, your
        deposit is successfully re gistered and you begin
        earning interest.`,
    },
    {
        title: "Blue-Chip Pools",
        index: 1,
        poolType: 1,
        des: `Hasai's initial Blue-Chip Pools will support NFTs from the following collections as collateral: BAYC、MAYC、CryptoPunks、Azuki、CLONE-X、Doodles
        NFT collections supported in the Shared Pool can be promoted to Blue-Chip Pools.`,
    },
    {
        title: "Shared Pools",
        index: 2,
        poolType: 2,
        des: `The emerging NFT collections will share the Shared Pool as the lending pool. All supported NFT collections in this pool share the same risk factor, lending ratio, liquidation factors, and other parameters.`,
    },
    {
        title: "Permissionless Pools",
        index: 3,
        poolType: 0,
        des: `Anyone can create Permissionless Pool. One Permissionless Pool cannot be created by the same NFT collections repeatedly and cannot be destroyed after the creation. The original parameters of Permissionless Pools are determined by creators themselves. `,
    },
];
