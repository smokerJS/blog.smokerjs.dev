import React, { useState, UIEventHandler, useRef } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Post, Category } from 'models/Post';
import PostRepository from 'repositories/PostRepository';
import Head from 'next/head';
import Title from 'components/post/Title';
import Content from 'components/post/Content';
import Comment from 'components/post/Comment';
import Pagination from 'components/post/Pagination';
import * as $ from './DetailPage.styled';

interface DetailPageProps {
  post: Post;
  category: Category;
}

const DetailPage: NextPage<DetailPageProps> = props => {
  const {
    post: { id, title, tags, description, date, contentHtml },
    category: { name, postSummaries },
  } = props;

  const $ContentsWrap = useRef<HTMLElement>(null);
  const $Wrap = useRef<HTMLElement>(null);
  const $progress = useRef(false);

  const onContentsRollUpHandler: UIEventHandler = event => {
    event.preventDefault();
    if (!$progress.current) {
      $progress.current = true;
      window.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth',
      });
      setTimeout(() => {
        $progress.current = false;
      }, 1500);
    }
    // if (event.wheelDelta > 0) {
    // window.scrollTo({
    //   top: window.innerHeight,
    //   left: 0,
    //   behavior: 'smooth',
    // });
    // }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        {tags && <meta name="keywords" content={tags} />}
      </Head>
      <button type="button" onClick={onContentsRollUpHandler}>
        test
      </button>
      <$.Wrap ref={$Wrap}>
        <Title
          id={id}
          title={title}
          description={description}
          date={date}
          onRollUp={onContentsRollUpHandler}
        />
        <$.ContentsWrap ref={$ContentsWrap}>
          <Content contentHtml={contentHtml} />
          <Comment id={id} title={title} />
          <Pagination
            name={name}
            postSummaries={postSummaries}
            curruntId={id}
          />
        </$.ContentsWrap>
      </$.Wrap>
    </>
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

export const getStaticProps: GetStaticProps<DetailPageProps> = async props => {
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

export default DetailPage;
