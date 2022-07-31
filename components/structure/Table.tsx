import { FunctionComponent } from "react";
import moment from "moment";

import Text from "../base/Text";

import { ArrowUp, ArrowDown } from "@/utils/icons";

const Table: FunctionComponent<any> = (props) => {
  const columnHeader = props.column;
  const filteredTableData = props.data;
  const onSort = props.onSort;

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {columnHeader.map((col: any, index: number) => {
            return (
              <th
                onClick={() => onSort(index)}
                key={index}
                className="select-none text-left text-dark w-auto font-[600] py-3 px-4 border-b-2 border-b-light cursor-pointer"
              >
                <div className="inline-flex items-center space-x-3">
                  <Text content={col.label} />
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
                {row.logId || <Text color="text-gray-200" content={`-/-`} />}
              </td>
              <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                {row.applicationType || (
                  <Text color="text-gray-200" content={`-/-`} />
                )}
              </td>
              <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                {row.applicationId || (
                  <Text color="text-gray-200" content={`-/-`} />
                )}
              </td>
              <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                {row.actionType || (
                  <Text color="text-gray-200" content={`-/-`} />
                )}
              </td>
              <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                {row.actionType || (
                  <Text color="text-gray-200" content={`-/-`} />
                )}
              </td>
              <td className="px-4 text-left text-dark text-sm w-auto font-[400] py-3">
                {moment(row.creationTimestamp).format("YY-MM-DD / HH:mm:ss")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
