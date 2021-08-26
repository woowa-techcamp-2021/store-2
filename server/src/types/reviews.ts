export interface IReviewBody {
  itemId: number;
  title: string;
  contents: string;
  score: number;
  image: Blob;
}

export interface IReviewQuery {
  itemId: string;
  pageId: string;
}

export interface Review {
  title: string;
  score: number;
  contents: string;
  imgUrl: string;
  userId: string;
}

export interface IReview {
  reviews: Review[];
  totalCount: number;
  pageCount: number;
}
