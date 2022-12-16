import React, { useRef, useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Post, Category } from 'models/Post';
import PostRepository from 'repositories/PostRepository';
import Head from 'next/head';
import Title from 'components/post/Title';
import Content from 'components/post/Content';
import Comment from 'components/post/Comment';
import Pagination from 'components/post/Pagination';
import useTouchMove, { TouchMoveHandler } from 'hooks/useTouchMove';
import { useRecoilState } from 'recoil';
import { isVisibleContentsSelector } from 'states/UIState';
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

  const [isVisibleContents, setIsVisibleContents] = useRecoilState(
    isVisibleContentsSelector
  );

  const $ContentsWrap = useRef<HTMLElement>(null);
  const { asPath } = useRouter();

  const handleTouchMove: TouchMoveHandler = ({ deltaY }) => {
    if (deltaY > 0) {
      if (!isVisibleContents) {
        $ContentsWrap.current?.scrollTo(0, 0);
        setIsVisibleContents(true);
      }
    } else {
      $ContentsWrap.current?.scrollTop === 0 && setIsVisibleContents(false);
    }
  };

  const { handleTouchStart, handleTouchEnd } = useTouchMove(handleTouchMove);

  useEffect(() => {
    const searchId = `${asPath}`.split('#')[1];
    searchId && document.getElementById(searchId) && setIsVisibleContents(true);
  }, []);

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
          onTouchMove={handleTouchMove}
        />
        <$.ContentsWrap
          isVisible={isVisibleContents}
          ref={$ContentsWrap}
          onWheel={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
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
