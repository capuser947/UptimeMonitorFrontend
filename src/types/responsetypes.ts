export type ResponseLog = {
  id: string;
  endpointId: string;
  timeStamp: Date;
  statusCode: string;
  responseTimeMs: number;
  success: boolean;
  errorMessage?: string;
  endpointUrl?: string;
};
