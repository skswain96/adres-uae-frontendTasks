import { FunctionComponent } from "react";
import ReactPaginate from "react-paginate";
import { ChevronRight, ChevronLeft } from "@/utils/icons";

import Text from "../base/Text";

const Pagination: FunctionComponent<any> = (props) => {
  const onPageChange = props.onPageChange;
  const pageCount = props.pageCount;

  return (
    <div className="py-4 w-full h-auto inline-flex justify-center items-center">
      <ReactPaginate
        breakLabel={<Text content="..." size="text-sm" color="text-gray-500" />}
        nextLabel={
          <div className="text-gray-500 h-4 w-4 inline-flex items-center justify-center">
            {ChevronRight}
          </div>
        }
        containerClassName="inline-flex items-center justify-center space-x-3"
        pageClassName="rounded-md text-gray-500 w-7 h-7 text-xs text-center inline-flex items-center justify-center"
        activeClassName="font-[700] !text-dark bg-light"
        onPageChange={onPageChange}
        pageRangeDisplayed={7}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={
          <div className="text-gray-500 h-4 w-4 inline-flex items-center justify-center">
            {ChevronLeft}
          </div>
        }
      />
    </div>
  );
};

export default Pagination;
