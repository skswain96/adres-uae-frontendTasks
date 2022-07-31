export type Props = {
  data?: LogReportInterface;
  options?: any;
};

export type FilterOptionType = {
  [key: string]: string;
};

export interface LogReportInterface {
  auditLog?: Array<ResponseInterface> | any;
  number?: number | bigint | string;
  recordsFiltered?: number;
  recordsTotal?: number | bigint | string;
  totalPages?: number | bigint | string;
}

export interface ResponseInterface {
  actionType: string;
  applicationId: string;
  applicationType: string;
  companyId: string;
  creationTimestamp: string;
  ip: string | number;
  logId: number | string;
  logInfo: string;
  ownerId: string;
  source: string;
  userAgent: string;
  userId: number | string;
}
