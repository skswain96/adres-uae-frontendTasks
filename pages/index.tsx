import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import moment from "moment";

import SelectInput from "@/components/structure/SelectInput";
import Breadcrumbs from "@/components/structure/Breadcrumbs";
import TextInput from "@/components/structure/TextInput";
import Button from "@/components/base/Button";
import Table from "@/components/structure/Table";
import Pagination from "@/components/structure/Pagination";

import { Props, FilterOptionType, ResponseInterface } from "@/types/home";

import {
  API_URL,
  breadcrumbs,
  filterOptions,
  colHeader,
} from "@/utils/configs";

const Home: NextPage = (props: Props) => {
  // define props
  const logReportData = props.data;
  const itemsPerPage = 10;
  const pageFilterOptions = props.options;

  // define initial values
  const filterOptionsInitialValues: FilterOptionType = {
    logId: "",
    applicationType: "",
    applicationId: "",
    actionType: "",
    fromCreationTimestamp: "",
    toCreationTimestamp: "",
  };

  // define initial states
  const [data, setData] = useState<Array<ResponseInterface>>([]);
  const [filteredTableData, setFilteredTableData] = useState<
    Array<ResponseInterface>
  >([]);
  const [columnHeader, setColumnHeader] = useState(colHeader);
  const [itemOffset, setItemOffset] = useState(0);
  const [filterOptionValues, setFilterOptionValues] =
    useState<FilterOptionType>(filterOptionsInitialValues);

  const handlePageClick = (event: any) => {
    if (logReportData && logReportData.recordsFiltered) {
      const totalRecord = logReportData.recordsFiltered;
      const newOffset = (event.selected * itemsPerPage) % totalRecord;

      setItemOffset(newOffset);
    }
  };

  const renderTableData = (offset: number, arr: any) => {
    let tableArray = [...arr];
    const endOffset = offset + itemsPerPage;
    tableArray = tableArray.slice(offset, endOffset);
    setFilteredTableData(() => [...tableArray]);
  };

  const filterTable = () => {
    let tableArray = [...logReportData?.auditLog];

    const filteredData = tableArray.filter((item: any) => {
      return Object.keys(item).some((key: string) =>
        Object.keys(filterOptionValues).some((k: string) => {
          if (item[key] && filterOptionValues[k]) {
            let lowercasedFilter = `${filterOptionValues[k]}`.toLowerCase();

            if (k === "fromCreationTimestamp") {
              let start = moment(item.creationTimestamp).format("YY-MM-DD");
              if (start === lowercasedFilter) {
                return `${item["creationTimestamp"]}`
                  .toLowerCase()
                  .includes(lowercasedFilter);
              }
            }

            if (k === "toCreationTimestamp") {
              let end = moment(item.creationTimestamp).format("YY-MM-DD");
              if (end === lowercasedFilter) {
                return `${item["creationTimestamp"]}`
                  .toLowerCase()
                  .includes(lowercasedFilter);
              }
            }

            return `${item[key]}`.toLowerCase().includes(lowercasedFilter);
          }
        })
      );
    });

    if (filteredData.length > 0) {
      renderTableData(itemOffset, filteredData);
    }

    if (filteredData.length === 0) {
      renderTableData(itemOffset, data);
    }
  };

  const onSort = (column: number) => {
    const direction =
      columnHeader[column]?.sortDirection === "asc" ? "desc" : "asc";

    let sortedTableData: any = filteredTableData.sort((a: any, b: any): any => {
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

  const handleInputChange = (opt: any, value: any) => {
    let obj = { ...filterOptionValues };
    if (opt.name === "logId") {
      obj.logId = value;
    }

    if (opt.name === "applicationId") {
      obj.applicationId = value;
    }

    if (opt.name === "actionType") {
      obj.actionType = value.toString();
    }

    if (opt.name === "applicationType") {
      obj.applicationType = value.toString();
    }

    if (opt.name === "fromCreationTimestamp") {
      obj.fromCreationTimestamp = moment(value).format("YY-MM-DD");
    }

    if (opt.name === "toCreationTimestamp") {
      obj.toCreationTimestamp = moment(value).format("YY-MM-DD");
    }

    setFilterOptionValues(obj);
  };

  useEffect(() => {
    renderTableData(itemOffset, logReportData?.auditLog);
  }, [itemOffset]);

  useEffect(() => {
    if (logReportData) {
      renderTableData(0, logReportData?.auditLog);
      setData(() => [...logReportData?.auditLog]);
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
          {pageFilterOptions.map((opt: any, index: number) => {
            if (opt.type === "select") {
              return (
                <SelectInput
                  key={`${opt.name + index}`}
                  instanceId={`${opt.name + index}`}
                  label={opt.label}
                  placeholder={opt.placeholder}
                  options={opt.options}
                  onChange={(res: any) => {
                    let value = res.value;
                    handleInputChange(opt, value);
                  }}
                />
              );
            }

            return (
              <TextInput
                key={index}
                type={opt.type}
                label={opt.label}
                placeholder={opt.placeholder}
                onChange={(value: string) => {
                  handleInputChange(opt, value);
                }}
              />
            );
          })}

          <Button onClick={filterTable} label="Search Logger" />
        </div>

        {/* filters end */}

        {filteredTableData.length > 0 && (
          <div className="inline-flex flex-col w-full h-auto space-y-2 rounded-lg shadow-[0_6px_45px_-25px_rgba(0,0,0,0.3)] mt-3">
            {/* table start */}

            <Table
              column={columnHeader}
              data={filteredTableData}
              onSort={onSort}
            />

            {/* table end */}

            {/* pagination start */}

            {logReportData && logReportData.recordsFiltered && (
              <Pagination
                onPageChange={handlePageClick}
                pageCount={logReportData.recordsFiltered}
              />
            )}

            {/* pagination end */}
          </div>
        )}
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let options: any = []; // filter options

  const response: any = await axios.get(
    API_URL + "a2fbc23e-069e-4ba5-954c-cd910986f40f"
  );

  if (response) {
    let auditLog = response?.data?.result?.auditLog;

    const uniqueActionTypeArray = auditLog
      .filter((value: any, index: number) => {
        const _actionTypeValue = value.actionType.toString();

        if (_actionTypeValue !== "null") {
          return (
            index ===
            auditLog.findIndex((obj: any) => {
              return obj.actionType.toString() === _actionTypeValue;
            })
          );
        }
      })
      // .map((d: any) => ({ value: d.actionType, label: d.actionType }));
      .map((d: any) => {
        return {
          value: d.actionType,
          label: d.actionType,
        };
      });

    const uniqueApplicationTypeArray = auditLog
      .filter((value: any, index: number) => {
        const _applicationTypeValue = JSON.stringify(value.applicationType);
        if (_applicationTypeValue !== "null") {
          return (
            index ===
            auditLog.findIndex((obj: any) => {
              return (
                JSON.stringify(obj.applicationType) === _applicationTypeValue
              );
            })
          );
        }
      })
      .map((d: any) => ({
        value: d.applicationType,
        label: d.applicationType,
      }));

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
  }

  const _props: Props = {
    data: response.data.result,
    options: options,
  };

  return {
    props: _props,
  };
};

export default Home;
