export interface IListing {
  text: string
  id: number
}

export interface IListingWithSource extends IListing {
  source: string
  sourceType: string
}

export interface IListingWithSourceList extends IListing {
  price: number
  area: number
  sourceList: IListingWithSource[]
}
