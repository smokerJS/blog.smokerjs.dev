import React, { FC } from 'react';
import { Category } from 'models/Post';
import * as $ from './Pagination.styled';
import Link from 'next/link';
import usePagination from 'hooks/usePagination';

const PAGE_SIZE = 5;

interface PaginationProps extends Category {
  curruntId: string;
}

const Pagination: FC<PaginationProps> = props => {
  const { name, postSummaries, curruntId } = props;
  const { curruntList } = usePagination(postSummaries, PAGE_SIZE);

  return (
    <$.Wrap>
      <$.CategoryName>{name}</$.CategoryName>
      <$.Posts>
        {curruntList.map(({ id, title, date }) => (
          <$.Post key={`${name}-post-${id}`}>
            <Link href={`/post/${id}`}>
              <>
                <$.PostTitle>{title}</$.PostTitle>
                <$.PostDate>{date}</$.PostDate>
              </>
            </Link>
          </$.Post>
        ))}
      </$.Posts>
    </$.Wrap>
  );
};

export default Pagination;
