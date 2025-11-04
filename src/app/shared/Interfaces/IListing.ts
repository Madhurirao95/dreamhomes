export interface IListing {
  text: string
  id: number
}

export interface IListingWithMediaFile extends IListing {
  media: string
  mediaType: string
}

export interface IListingWithMediaList extends IListing {
  price: number
  area: number
  longitude: number
  latitude: number
  mediaList: IListingWithMediaFile[]
}
