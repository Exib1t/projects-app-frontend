export interface IComment {
  id: number | null;
  author: ICommentAuthor;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface ICommentAuthor {
  id: number;
  first_name: string;
  last_name: string;
}
