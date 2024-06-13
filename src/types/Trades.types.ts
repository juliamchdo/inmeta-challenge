import { Cards } from "./Cards.types";

export interface Trades{
    createdAt: Date,
    id: string,
    tradeCards: TradeCards[],
    user: {
        name: string
    },
    userId: string
}

export interface TradeCards {
    card: Cards,
    cardId: string,
    id: string,
    tradeId: string,
    type: string
}