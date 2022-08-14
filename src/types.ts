export interface Auction {
    id: string;
    bidder: string;
    amount: string;
    endTime: number;
    settled: boolean;
    startTime: number;
    nftId: number;
    nftImg: string;
}
