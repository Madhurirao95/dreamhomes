import {
  IListingWithMediaFile
} from './Interfaces/IListing';

export function getMediaList(item: any): IListingWithMediaFile[] {
  const medialList: IListingWithMediaFile[] = [];
  item.documentList.forEach((document: any) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const media = {} as IListingWithMediaFile;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    media.media = `data:${document.documentType};base64,${document.documentBase64}`;
    if (document.documentType.includes('video')) {
      media.mediaType = 'video';
    } else if (document.documentType.includes('image')) {
      media.mediaType = 'image';
    }

    medialList.push(media);
  });
  return medialList;
}
