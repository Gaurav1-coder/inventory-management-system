import React, { useState } from "react";

const Table = (props) => {
  const initDataShow =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;

  const [dataShow, setDataShow] = useState(initDataShow);

  let pages = 1;

  let range = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData.slice(start, end));

    setCurrPage(page);
  };

  return (
    <div className="w-full">
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {props.headData && props.renderHead ? (
              <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                <tr>
                  {props.headData.map((item, index) =>
                    props.renderHead(item, index)
                  )}
                </tr>
              </thead>
            ) : null}
            {props.bodyData && props.renderBody ? (
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {dataShow.map((item, index) => props.renderBody(item, index))}
              </tbody>
            ) : null}
          </table>
        </div>
      </div>
      {pages > 1 ? (
        <div className="flex items-center justify-center gap-2 mt-6">
          {range.map((item, index) => (
            <button
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 ${
                currPage === index 
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-110" 
                  : "bg-white/80 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-100 dark:border-white/10"
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
