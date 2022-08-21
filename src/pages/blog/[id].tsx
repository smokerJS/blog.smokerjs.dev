import React, { useState, useRef } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Post, Category } from 'models/Post';
import PostRepository from 'repositories/PostRepository';
import Head from 'next/head';
import Title from 'components/post/Title';
import Content from 'components/post/Content';
import Comment from 'components/post/Comment';
import Pagination from 'components/post/Pagination';
import * as $ from './DetailPage.styled';
import useTouchScroll, { TouchMoveHandler } from 'hooks/useTouchScroll';
import { useRecoilState } from 'recoil'
import UIState from 'states/UIState'

interface DetailPageProps {
  post: Post;
  category: Category;
}

const DetailPage: NextPage<DetailPageProps> = props => {
  const {
    post: { id, title, tags, description, date, contentHtml },
    category: { name, postSummaries },
  } = props;

  const [{
    blog: {
      isVivsibleContents
    }
  }, setUIState] = useRecoilState(UIState);

  const $ContentsWrap = useRef<HTMLElement>(null);

  const onWheelHandler: TouchMoveHandler = ({deltaY}) => {
    if (deltaY > 0) {
      if(!isVivsibleContents) {
        $ContentsWrap.current?.scrollTo(0, 0)
        setUIState(state => {
          return {
            ...state,
            blog: {
              isVivsibleContents: true
            }
          }
        });
      }
    }else {
      $ContentsWrap.current?.scrollTop === 0 && setUIState(state => {
        return {
          ...state,
          blog: {
            isVivsibleContents: false
          }
        }
      });
    }
  };

  const { onTouchStartHandler, onTouchEndHandler } = useTouchScroll(onWheelHandler);


  return (
    <>
      <Head>
        <title>{title}</title>
        {tags && <meta name="keywords" content={tags} />}
      </Head>
      <$.Wrap>
        <Title
          id={id}
          title={title}
          description={description}
          date={date}
          onWheel={onWheelHandler}
        />
        <$.ContentsWrap isVisible={isVivsibleContents} ref={$ContentsWrap} onWheel={onWheelHandler} onTouchStart={onTouchStartHandler} onTouchEnd={onTouchEndHandler}>
          <$.ContentsConainer>
            <Content contentHtml={contentHtml} />
            <Comment id={id} title={title} />
            <Pagination
              name={name}
              postSummaries={postSummaries}
              curruntId={id}
            />
          </$.ContentsConainer>
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
