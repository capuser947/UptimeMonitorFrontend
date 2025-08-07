import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Search,
  RefreshCw,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { ResponseLogsTable } from "../components/ResponseLogsTable";
import { StatsCards } from "../components/StatsCard";
import type { ResponseLog } from "../types/response.type";
import { baseUrl } from "../lib/api";

// Mock data based on your backend model

const Dashboard = () => {
  const [logs, setLogs] = useState<ResponseLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLogs = async () => {
    try {
      const result = await fetch(`${baseUrl}/api/responseLog`);
      if (!result) {
        console.log("No data came");
      }
      const resData = await result.json();
      if (!resData) {
        console.log("No readable data");
      }
      console.log("res", resData);

      setLogs(resData);
    } catch {}
  };
  useEffect(() => {
    fetchLogs();
  }, []);
  const filteredLogs = logs.filter(
    (log) =>
      log.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.statusCode.toString().includes(searchTerm) ||
      log.errorMessage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => {
      resolve(fetchLogs());
    });
    setIsRefreshing(false);
  };

  return (
    <div className="w-full bg-background mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              Uptime Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor your endpoints and track response times
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards logs={logs} />

        {/* Response Logs Section */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Response Logs
                </CardTitle>
                <CardDescription>
                  Real-time monitoring data for all your endpoints
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">
                {filteredLogs.length} records
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Logs Table */}
            <div className="overflow-x-auto">
              <ResponseLogsTable logs={filteredLogs} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
