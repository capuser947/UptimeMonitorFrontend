import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Activity, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react";
import { type ResponseLog } from "../types/responsetypes";

interface StatsCardsProps {
  logs: ResponseLog[];
}

export const StatsCards = ({ logs }: StatsCardsProps) => {
  const totalRequests = logs.length;
  const successfulRequests = logs.filter(log => log.success).length;
  const failedRequests = totalRequests - successfulRequests;
  const successRate = totalRequests > 0 ? (successfulRequests / totalRequests * 100).toFixed(1) : "0";
  
  const avgResponseTime = totalRequests > 0 
    ? (logs.reduce((sum, log) => sum + log.responseTimeMs, 0) / totalRequests).toFixed(0)
    : "0";

  const recentLogs = logs.slice(0, 10); // Last 10 requests
  const recentSuccessRate = recentLogs.length > 0 
    ? (recentLogs.filter(log => log.success).length / recentLogs.length * 100).toFixed(1)
    : "0";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRequests}</div>
          <p className="text-xs text-muted-foreground">
            All time monitoring data
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{successRate}%</div>
          <p className="text-xs text-muted-foreground">
            {successfulRequests} successful requests
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Failed Requests</CardTitle>
          <XCircle className="h-4 w-4 text-error" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-error">{failedRequests}</div>
          <p className="text-xs text-muted-foreground">
            Errors and timeouts
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgResponseTime}ms</div>
          <p className="text-xs text-muted-foreground">
            Recent: {recentSuccessRate}% success rate
          </p>
        </CardContent>
      </Card>
    </div>
  );
};