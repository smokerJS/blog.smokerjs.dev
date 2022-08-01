import React, { useState, useEffect, useRef } from 'react';

interface UsePagination {
  <T>(list: T[], size: number): {
    hasNext: boolean;
    hasPrev: boolean;
    curruntList: T[];
    next: () => void;
    prev: () => void;
    lastPage: number;
  };
}

const usePagination: UsePagination = (list, size) => {
  const [divisionList, setDivisionList] = useState<any[][]>([[]]);
  const $page = useRef(0);

  const lastPage = divisionList.length;
  const currentPage = $page.current + 1;
  const hasNext = lastPage !== currentPage;
  const hasPrev = currentPage !== 1;

  const next = () => {
    hasNext && $page.current++;
  };

  const prev = () => {
    hasPrev && $page.current--;
  };

  const division = (list: any[], listSize: number) => {
    const data = list.slice();
    const result = [];
    while (data.length) {
      result.push(data.splice(0, listSize));
    }
    return result;
  };

  useEffect(() => {
    setDivisionList(division(list, size));
  }, []);

  return {
    hasNext,
    hasPrev,
    curruntList: divisionList[$page.current],
    next,
    prev,
    currentPage: $page.current + 1,
    lastPage,
  };
};

export default usePagination;
