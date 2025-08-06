export type ResponseLog = {
  id: string;
  projectTeamId: string;
  timeStamp: Date;
  statusCode: string;
  responseTimeMs: number;
  success: boolean;
  errorMessage?: string;
  url?: string;
};
