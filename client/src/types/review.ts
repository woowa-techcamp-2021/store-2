export interface IReview {
  score: number;
  title: string;
  contents: string;
  imgUrl: string;
  userId: string;
}

export interface IListReview {
  reviews: IReview[];
  totalCount: number;
  pageCount: number;
}

export interface IReviewState {
  itemId: number;
  pageId?: number;
}

export interface IReviewData {
  data: FormData;
}
