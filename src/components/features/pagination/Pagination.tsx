import { memo } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { MainBtn } from '@/components/shared';

import css from './pagination.module.scss';

interface IProps {
  totalProducts: number;
  currentPage: number;
  setPage: (page: number) => void;
  pageSize: number;
}

export const Pagination = memo(
  ({ totalProducts, currentPage, setPage, pageSize }: IProps) => {
    const totalPages = Math.ceil(totalProducts / pageSize);
    // const prevPages = [];
    // const nextPages = [];
    // for (let i = currentPage; i > 1 && prevPages.length < 2; i--) {
    //   prevPages.unshift(i - 1);
    // }
    // for (let i = currentPage; i < totalPages && nextPages.length < 2; i++) {
    //   nextPages.push(i + 1);
    // }

    const prevPages = Array.from(
      { length: Math.min(2, currentPage - 1) },
      (_, idx) => currentPage - idx - 1
    ).reverse();

    const nextPages = Array.from(
      { length: Math.min(2, totalPages - currentPage) },
      (_, idx) => currentPage + idx + 1
    );

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setPage(page);
      }
    };

    if (totalPages <= 1) return <div className={css.pagination} />;

    return (
      totalPages > 1 && (
        <div className={css.pagination}>
          <MainBtn
            icon={true}
            version="contain"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className={css.arrow} />
          </MainBtn>
          <MainBtn
            icon={true}
            version="contain"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className={css.arrow} />
          </MainBtn>
          {prevPages.map((page) => (
            <MainBtn
              key={page}
              version="outline"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </MainBtn>
          ))}
          <MainBtn version="contain">{currentPage}</MainBtn>
          {nextPages.map((page) => (
            <MainBtn
              key={page}
              version="outline"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </MainBtn>
          ))}
          <MainBtn
            icon={true}
            version="contain"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight className={css.arrow} />
          </MainBtn>
          <MainBtn
            icon={true}
            version="contain"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <ChevronsRight className={css.arrow} />
          </MainBtn>
        </div>
      )
    );
  }
);
