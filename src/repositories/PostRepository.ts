import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import showdown from 'showdown';
import { Post, PostSummary, PostSummariesInCategory } from 'types/Post';

export default class PostRepository {
  private static readonly POST_DIRECTORY = path.join(
    process.cwd(),
    'public/posts'
  );

  private static readonly POSTS = this.findAll();

  private static findAll(): Post[] {
    try {
      const posts: Post[] = [];
      const postPaths: Array<string> = fs
        .readdirSync(this.POST_DIRECTORY)
        .filter((x: string) => !isNaN(Number(x)));
      const converter = new showdown.Converter();
      postPaths.forEach(postPath => {
        try {
          const fullPath = path.join(
            this.POST_DIRECTORY,
            `${postPath}/index.md`
          );
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { id, title, date, tags, category, contentHtml } = matter(
            fileContents
          ).data as Post;
          posts.push({
            id,
            title,
            date,
            tags,
            category,
            contentHtml: converter.makeHtml(contentHtml),
          });
        } catch (error) {
          console.error(error);
        }
      });
      return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static findAllIds() {
    return this.POSTS.map(({ id }) => id);
  }

  public static findById(findId: string) {
    return this.POSTS.find(({ id }) => id === findId);
  }

  public static findAllCategories() {
    return [...new Set(this.POSTS.map(({ category }) => category))];
  }

  public static findAllPostSummariesByCategory(
    findCategory: string
  ): PostSummariesInCategory {
    const postSummaries: PostSummary[] = [];
    this.POSTS.forEach(
      ({ category, id, title, date }) =>
        category === findCategory && postSummaries.push({ id, title, date })
    );
    return {
      category: findCategory,
      postSummaries,
    };
  }

  // public static findAllPostSummaries(
  //   findCategory: string
  // ): PostSummariesInCategory[] {
  //   const postSummaries: PostSummariesInCategory[] = [];
  //   const categories = this.findAllCategories();

  //   this.POSTS.forEach(
  //     ({ category, id, title, date }) =>
  //       category === findCategory && postSummaries.push({ id, title, date })
  //   );
  //   return {
  //     category: findCategory,
  //     postSummaries,
  //   };
  // }
}
