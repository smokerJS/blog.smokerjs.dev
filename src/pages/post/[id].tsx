import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Post, Category } from 'models/Post';
import PostRepository from 'repositories/PostRepository';
import Head from 'next/head';
import Title from 'components/post/Title';
import Content from 'components/post/Content';
import Comment from 'components/post/Comment';
import Pagination from 'components/post/Pagination';

interface PostDetailPageProps {
  post: Post;
  category: Category;
}

const PostDetailPage: NextPage<PostDetailPageProps> = props => {
  const {
    post: { id, title, tags, description, date, contentHtml },
    category: { name, postSummaries },
  } = props;

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        {tags && <meta name="keywords" content={tags} />}
      </Head>
      <Title id={id} title={title} description={description} date={date} />
      <Content contentHtml={contentHtml} />
      <Comment id={id} title={title} />
      <Pagination name={name} postSummaries={postSummaries} curruntId={id} />
    </React.Fragment>
  );
};

export async function getStaticPaths() {
  const paths = PostRepository.findAllIds().map(id => ({
    params: { id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  PostDetailPageProps
> = async props => {
  const { params } = props;
  const post: Post = (!!params?.id &&
    PostRepository.findById(params.id.toString())) || {
    id: '',
    title: '',
    date: '',
    tags: '',
    description: '',
    categoryName: '',
    contentHtml: '',
  };
  const category = PostRepository.findCategoryByName(post.categoryName);
  return { props: { post, category } };
};

export default PostDetailPage;
