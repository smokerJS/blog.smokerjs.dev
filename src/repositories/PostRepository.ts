import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import showdown from 'showdown';
import { Post, PostSummary, Category } from 'models/Post';

export default class PostRepository {
  private static readonly POST_DIRECTORY = path.join(
    process.cwd(),
    'src/public/posts'
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
          const post = matter(fileContents);
          posts.push({
            ...(post.data as Post),
            contentHtml: post.content,
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

  public static findAllCategoryNames() {
    return [...new Set(this.POSTS.map(({ categoryName }) => categoryName))];
  }

  public static findCategoryByName(findName: string): Category {
    const postSummaries: PostSummary[] = [];
    this.POSTS.forEach(
      ({ categoryName, id, title, date, description }) =>
        categoryName === findName &&
        postSummaries.push({ id, title, date, description })
    );
    return {
      name: findName,
      postSummaries,
    };
  }

  public static findAllCategories(): Category[] {
    const categories: Category[] = [];
    const categoryMap = new Map<string, PostSummary[]>();
    this.POSTS.forEach(({ categoryName, id, title, date, description }) =>
      categoryMap.has(categoryName)
        ? categoryMap.get(categoryName)?.push({ id, title, date, description })
        : categoryMap.set(categoryName, [{ id, title, date, description }])
    );
    categoryMap.forEach((postSummaries, categoryName) =>
      categories.push({
        name: categoryName,
        postSummaries,
      })
    );
    return categories;
  }
}
