export interface PostSummary {
  id: string;
  title: string;
  date: string;
  description: string;
}
export interface Post extends PostSummary {
  tags: string;
  categoryName: string;
  contentHtml: string;
}

export interface Category {
  name: string;
  postSummaries: PostSummary[];
}
