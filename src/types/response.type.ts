export type ResponseLog = {
  id: string;
  projectTeamId: string;
  updatedAt: Date;
  statusCode: number;
  responseTime: number;
  success: boolean;
  errorMessage?: string;
  url?: string;
};
