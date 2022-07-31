import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Select from "react-select";

import Breadcrumbs from "@/components/structure/Breadcrumbs";
import TextInput from "@/components/structure/TextInput";
import Button from "@/components/base/Button";

import { customSelectStyles } from "@/styles/select.style";

import { breadcrumbs, filterOptions, colHeader } from "@/utils/configs";

import { ArrowUp, ArrowDown, ChevronRight, ChevronLeft } from "@/utils/icons";

type Props = {
  data?: any;
  options?: any;
};

const Home: NextPage = (props: Props) => {
  const logReportData = props.data;
  const itemsPerPage = 10;
  const pageFilterOptions = props.options;

  const [data, setData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [columnHeader, setColumnHeader] = useState(colHeader);
  const [itemOffset, setItemOffset] = useState(0);
  const [filterOptionValues, setFilterOptionValues] = useState({
    logId: "",
    applicationType: "",
    applicationId: "",
    actionType: "",
    fromCreationTimestamp: "",
    toCreationTimestamp: "",
  });

  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % logReportData.recordsFiltered;

    setItemOffset(newOffset);
  };

  const renderTableData = (offset: number) => {
    let tableArray = [...logReportData?.auditLog];
    const endOffset = offset + itemsPerPage;
    tableArray = tableArray.slice(offset, endOffset);
    setData(() => [...tableArray]);
    setFilteredTableData(() => [...tableArray]);
  };

  const filterTable = () => {
    let tableArray = [...logReportData?.auditLog];
    // const lowercasedFilter = `${filterOptionValues.logId}`.toLowerCase();

    const filteredData = tableArray.filter((item: any) => {
      return Object.keys(item).some((key) =>
        Object.keys(filterOptionValues).some((k) => {
          if (item[key] && filterOptionValues[k]) {
            let lowercasedFilter = `${filterOptionValues[k]}`.toLowerCase();
            return `${item[key]}`.toLowerCase().includes(lowercasedFilter);
          }
        })
      );
    });

    if (filteredData.length > 0) {
      setFilteredTableData(() => [...filteredData]);
    }

    if (filteredData.length === 0) {
      setFilteredTableData(() => [...data]);
    }
  };

  // `${item[key]}`.toLowerCase().includes(lowercasedFilter)

  const onSort = (column: number) => {
    const direction =
      columnHeader[column]?.sortDirection === "asc" ? "desc" : "asc";

    let sortedTableData: any = filteredTableData.sort((a: any, b: any) => {
      Object.keys(a).forEach(function eachKey(key) {
        if (key === colHeader[column].name) {
          const nameA = a[key];
          const nameB = b[key];

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }
      });
    });

    if (direction === "desc") {
      sortedTableData.reverse();
    }

    if (direction === "asc") {
      sortedTableData.reverse();
    }

    let header = [...columnHeader];

    header = header.map((d: any, i: number) => {
      if (i === column) {
        return {
          ...d,
          sortDirection: direction,
        };
      }
      return {
        ...d,
      };
    });

    setColumnHeader(() => [...header]);

    setFilteredTableData(() => [...sortedTableData]);
  };

  useEffect(() => {
    renderTableData(itemOffset);
  }, [itemOffset]);

  useEffect(() => {
    if (logReportData) {
      renderTableData(0);
    }
  }, [logReportData]);

  return (
    <React.Fragment>
      <Head>
        <title>Frontend Task</title>
        <meta name="description" content="Frontend Task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen w-screen relative inline-flex flex-col overflow-hidden px-12 py-3">
        {/* breadcrumbs start */}
        <div className="inline-flex w-full relative py-3 border-b-2 border-b-light">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        {/* breadcrumbs end */}

        {/* filters start */}

        <div className="inline-flex justify-between space-x-6 items-end w-full relative py-3">
          {pageFilterOptions.map((opt, index) => {
            if (opt.type === "select") {
              return (
                <Select
                  key={index}
                  styles={customSelectStyles}
                  placeholder={opt.placeholder}
                  options={opt.options}
                  onChange={(value: any) => {
                    let obj = { ...filterOptionValues };
                    if (opt.name === "actionType") {
                      obj.actionType = value.toString();
                    }

                    if (opt.name === "applicationType") {
                      obj.applicationType = value.toString();
                    }

                    setFilterOptionValues(obj);
                  }}
                />
              );
            }

            return (
              <TextInput
                key={index}
                label={opt.label}
                placeholder={opt.placeholder}
                onChange={(value: string) => {
                  let obj = { ...filterOptionValues };
                  if (opt.name === "logId") {
                    obj.logId = value;
                  }

                  if (opt.name === "actionType") {
                    obj.actionType = value;
                  }

                  if (opt.name === "applicationType") {
                    obj.applicationType = value;
                  }

                  if (opt.name === "applicationId") {
                    obj.applicationId = value;
                  }

                  if (opt.name === "fromCreationTimestamp") {
                    obj.fromCreationTimestamp = value;
                  }

                  if (opt.name === "toCreationTimestamp") {
                    obj.toCreationTimestamp = value;
                  }

                  setFilterOptionValues(obj);
                }}
              />
            );
          })}

          <Button onClick={filterTable} label="Search Logger" />
        </div>

        {/* filters end */}

        <div className="inline-flex flex-col w-full h-auto space-y-2 rounded-lg shadow-[0_6px_45px_-25px_rgba(0,0,0,0.3)] mt-3">
          {/* table start */}
          <table className="table-auto">
            <thead>
              <tr>
                {columnHeader.map((col, index) => {
                  return (
                    <th
                      onClick={() => onSort(index)}
                      key={index}
                      className="select-none text-left text-dark w-auto font-[600] py-3 px-4 border-b-2 border-b-light cursor-pointer"
                    >
                      <div className="inline-flex items-center space-x-3">
                        <span>{col.label}</span>
                        <div className="rounded-full w-5 h-5 px-[1px] py-1[1px] bg-light inline-flex items-center justify-center text-primary">
                          {col.sortDirection === "asc" ? ArrowDown : ArrowUp}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filteredTableData.map((row: any, index: number) => {
                return (
                  <tr key={index} className="border-b-2 border-b-light">
                    <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                      {row.logId || <span className="text-gray-200">-/-</span>}
                    </td>
                    <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                      {row.applicationType || (
                        <span className="text-gray-200">-/-</span>
                      )}
                    </td>
                    <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                      {row.applicationId || (
                        <span className="text-gray-200">-/-</span>
                      )}
                    </td>
                    <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                      {row.actionType || (
                        <span className="text-gray-200">-/-</span>
                      )}
                    </td>
                    <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                      {row.actionType || (
                        <span className="text-gray-200">-/-</span>
                      )}
                    </td>
                    <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                      {moment(row.creationTimestamp).format(
                        "YY-MM-DD / HH:mm:ss"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* table end */}

          {/* pagination start */}
          <div className="py-4 w-full h-auto inline-flex justify-center items-center">
            <ReactPaginate
              breakLabel={<span className="text-sm text-gray-500">...</span>}
              nextLabel={
                <div className="text-gray-500 h-4 w-4 inline-flex items-center justify-center">
                  {ChevronRight}
                </div>
              }
              containerClassName="inline-flex items-center justify-center space-x-3"
              pageClassName="rounded-md text-gray-500 w-7 h-7 text-xs text-center inline-flex items-center justify-center"
              activeClassName="font-[700] !text-dark bg-light"
              onPageChange={handlePageClick}
              pageRangeDisplayed={7}
              marginPagesDisplayed={1}
              pageCount={logReportData.recordsFiltered}
              previousLabel={
                <div className="text-gray-500 h-4 w-4 inline-flex items-center justify-center">
                  {ChevronLeft}
                </div>
              }
            />
          </div>
          {/* pagination end */}
        </div>
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response: any = await axios.get(
    "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
  );

  let auditLog = response.data.result.auditLog;
  let options: any = [];

  auditLog = auditLog.filter((a: any) => {
    if (a.applicationType && a.actionType) {
      return a;
    }
  });

  const uniqueActionTypeArray = auditLog
    .filter((value: any, index: number) => {
      const _actionTypeValue = JSON.stringify(value.actionType);

      return (
        index ===
        auditLog.findIndex((obj: any) => {
          return JSON.stringify(obj.actionType) === _actionTypeValue;
        })
      );
    })
    .map((d: any) => ({ value: d.actionType, label: d.actionType }));

  const uniqueApplicationTypeArray = auditLog
    .filter((value: any, index: number) => {
      const _applicationTypeValue = JSON.stringify(value.applicationType);

      return (
        index ===
        auditLog.findIndex((obj: any) => {
          return JSON.stringify(obj.applicationType) === _applicationTypeValue;
        })
      );
    })
    .map((d: any) => ({ value: d.applicationType, label: d.applicationType }));

  options = filterOptions.map((d: any) => {
    if (d.name === "actionType") {
      return {
        ...d,
        options: uniqueActionTypeArray,
      };
    }

    if (d.name === "applicationType") {
      return {
        ...d,
        options: uniqueApplicationTypeArray,
      };
    }

    return {
      ...d,
    };
  });

  const _props: Props = {
    data: response.data.result,
    options: options,
  };

  return {
    props: _props,
  };
};

export default Home;
