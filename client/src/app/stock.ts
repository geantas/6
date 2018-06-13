export class Stock {
    constructor(
        public _id: string,
        public stockName: string,
        public stockAuthor: string,
        public stockPrice: number,
        public stockTimestamp: any,
    )
     {  }
}


export class updatedStock {
    constructor(
        public _id: string,
        public stockName: string,
        public stockAuthor: string,
        public updatedStockPrice: number,
        public updatedStockTimestamp: any
    )
    {  }
}
