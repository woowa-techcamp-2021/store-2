export interface IReview {
  score: number;
  title: string;
  content: string;
  imgUrl: string;
  userId: string;
}

export interface IListReview {
  reviews: IReview[];
  totalCount: number;
  pageCount: number;
}

export interface IRieviewPost {
  score: number;
  title: string;
  content: string;
  file: File;
  ItemId?: number;
}

export interface IReviewState {
  itemId: number;
  pageId?: number;
}
