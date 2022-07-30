export interface PostSummary {
  id: string;
  title: string;
  date: string;
}

export interface Category {
  name: string;
  postSummaries: PostSummary[];
}

export type Post = {
  id: string;
  title: string;
  date: string;
  tags: string;
  categoryName: string;
  contentHtml: string;
};
