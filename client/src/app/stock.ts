export class Stock {
    constructor(
        public _id: string,
        public stockName: string,
        public stockAuthor: string,
        public stockPrice: string,
        public stockTimestamp: any,
        public updatedStockPrice : string,
        public updatedStockAuthor: string,
        public updatedStockTimestamp: any

    )
     {  }
}

export class updatedStock {
    constructor(
        public _id: string,
        public stockName: string,
        public updatedStockPrice: string,
        public updatedStockAuthor: string,
        public updatedStockTimestamp: any
    )
    {  }
}

export class deleteableStock {
    constructor(
        public _id: string,
        public stockName: string
    )
    {  }
}

