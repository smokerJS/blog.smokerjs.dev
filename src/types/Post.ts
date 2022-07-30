export interface PostSummary {
  id: string;
  title: string;
  date: string;
}

export interface PostSummariesInCategory {
  category: string;
  postSummaries: PostSummary[];
}

export type Post = {
  id: string;
  title: string;
  date: string;
  tags: string;
  category: string;
  contentHtml: string;
};
