export const breadcrumbs = [
  {
    label: "Home",
    link: "/",
    current: false,
  },
  {
    label: "Administrator",
    link: "#!",
    current: false,
  },
  {
    label: "Logger Search",
    link: "/logger-search",
    current: false,
  },
];

export const filterOptions = [
  {
    label: "Log ID",
    placeholder: "eg. 906468196730134",
    name: "logId",
    type: "input",
  },
  {
    label: "Action Type",
    placeholder: "",
    name: "actionType",
    type: "select",
  },
  {
    label: "Application Type",
    placeholder: "",
    name: "applicationType",
    type: "select",
  },
  {
    label: "From Date",
    placeholder: "Select Date",
    name: "fromCreationTimestamp",
    type: "date",
  },
  {
    label: "To Date",
    placeholder: "Select Date",
    name: "toCreationTimestamp",
    type: "date",
  },
  {
    label: "Application Id",
    placeholder: "eg. 219841/2021",
    name: "applicationId",
    type: "input",
  },
];

export const colHeader = [
  {
    label: "Log ID",
    sortDirection: "asc",
    name: "logId",
  },
  {
    label: "Application Type",
    sortDirection: "asc",
    name: "applicationType",
  },
  {
    label: "Application ID",
    sortDirection: "asc",
    name: "applicationId",
  },
  {
    label: "Action",
    sortDirection: "asc",
    name: "actionType",
  },
  {
    label: "Action Details",
    sortDirection: "asc",
    name: "actionType",
  },
  {
    label: "Date:Time",
    sortDirection: "asc",
    name: "creationTimestamp",
  },
];
