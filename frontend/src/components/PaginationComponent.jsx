import React, { useState } from "react";
import {
  FaChevronCircleDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const PaginationComponent = ({
  pages: total_page_no,
  page: currentPage,
  isAdmin = false,
  keyword = "",
}) => {
  // pagination variables
  //   const [items_per_page, set_items_per_page] = useState(10);
  //   const index_of_last_item = current_page * items_per_page;
  //   const index_of_first_item = index_of_last_item - items_per_page;
  //   const current_data = data.slice(index_of_first_item, index_of_last_item);
  //   const total_page_no = Math.ceil(data.length / items_per_page);
  const [current_page, set_current_page] = useState(currentPage);

  const [page_no_limit, set_page_no_limit] = useState(3);
  const [max_page_no_limit, set_max_page_no_limit] = useState(3);
  const [min_page_no_limit, set_min_page_no_limit] = useState(0);

  const array_of_pages = [...Array(total_page_no).keys()].map((i) => i + 1);
  // handle next button
  const nextButton = () => {
    if (current_page + 1 <= total_page_no) {
      set_current_page(current_page + 1);
    }

    if (current_page + 1 > max_page_no_limit) {
      set_max_page_no_limit(max_page_no_limit + page_no_limit);
      set_min_page_no_limit(min_page_no_limit + page_no_limit);
    }
  };

  // handle previous button
  const previousButton = () => {
    if (current_page - 1 >= 1) {
      set_current_page(current_page - 1);
    }

    if ((current_page - 1) % page_no_limit == 0) {
      set_max_page_no_limit(max_page_no_limit - page_no_limit);
      set_min_page_no_limit(min_page_no_limit - page_no_limit);
    }
  };

  return (
    total_page_no > 1 && (
      <div
        className="w-[100%] mx-auto flex flex-col mini:flex-row justify-between items-center my-4"
        aria-label="Pagination navigation"
      >
        {/* 1/3 */}
        {/* <p
          className="mb-2 w-12 h-12 rounded-full bg-[#001233] text-white flex flex-row items-center justify-center font-bold text-[12px]"
          role="status"
          aria-label={`Page ${current_page} of ${total_page_no}`}
        >
          <span className="text-[#FF595A]">{current_page}&nbsp;</span>/&nbsp;
          {total_page_no}
        </p> */}

        <div className="mb-2 flex flex-row rounded-full bg-[#001233] px-2 border-[#001233] border-2">
          <Link
            className="w-8 h-8 mini:w-10 mini:h-10 border-r border-white flex flex-row justify-center items-center"
            onClick={previousButton}
            disabled={current_page == 1 ? true : false}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${current_page - 1}`
                  : `/page/${current_page - 1}`
                : `/admin/productslist/${current_page - 1}`
            }
          >
            <FaChevronLeft className="text-[#FF595A] text-2xl" />
          </Link>

          {/* left ellipses */}
          {min_page_no_limit >= 1 ? (
            <Link
              className="w-8 h-8 mini:w-10 mini:h-10 flex border-r border-white flex-row items-center justify-center font-bold text-white text-2xl text-center"
              onClick={previousButton}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${current_page - 1}`
                    : `/page/${current_page - 1}`
                  : `/admin/productslist/${current_page - 1}`
              }
            >
              {"..."}
            </Link>
          ) : (
            ""
          )}

          {array_of_pages.map((item, index) =>
            item < max_page_no_limit + 1 && item > min_page_no_limit ? (
              <Link
                key={index}
                aria-label={`Go to page ${item}`}
                onClick={() => set_current_page(item)}
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${item}`
                      : `/page/${item}`
                    : `/admin/productslist/${item}`
                }
                aria-pressed={current_page === item ? "true" : "false"}
                className={`w-8 h-8 mini:w-10 mini:h-10 border-r border-white text-center
              flex flex-row items-center justify-center font-bold text-[14px] 
              ${current_page === item ? "text-[#FF595A]" : "text-white"}
              `}
              >
                {item}
              </Link>
            ) : (
              ""
            )
          )}

          {/* right ellipse */}
          {array_of_pages.length > max_page_no_limit ? (
            <Link
              className="w-8 h-8 mini:w-10 mini:h-10 border-r border-white flex flex-row items-center justify-center font-bold text-white text-2xl pt-0  "
              onClick={nextButton}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${current_page + 1}`
                    : `/page/${current_page + 1}`
                  : `/admin/productslist/${current_page + 1}`
              }
            >
              ...
            </Link>
          ) : null}
          <button
            className="w-8 h-8 mini:w-10 mini:h-10 font-bold flex flex-row items-center justify-center"
            onClick={nextButton}
            disabled={current_page === total_page_no ? true : false}
          >
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${current_page + 1}`
                    : `/page/${current_page + 1}`
                  : `/admin/productslist/${current_page + 1}`
              }
            >
              <FaChevronRight className=" text-[#FF595A] text-2xl" />
            </Link>
          </button>
        </div>
      </div>
    )
  );
};

export default PaginationComponent;
