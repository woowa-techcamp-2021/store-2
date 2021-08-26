export interface IReview {
  id: number;
  score: number;
  title: string;
  content: string;
  imgUrl: string;
  userId: string;
}

export interface IRieviewPost {
  score: number;
  title: string;
  content: string;
  file: File;
}
