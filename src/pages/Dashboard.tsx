import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, RefreshCw, Activity, CheckCircle, XCircle, Clock } from "lucide-react";
import { ResponseLogsTable } from "../components/ResponseLogsTable";
import { StatsCards } from "../components/StatsCard";
import type { ResponseLog } from "../types/responsetypes";

// Mock data based on your backend model

const mockLogs: ResponseLog[] = [
  {
    id: "1",
    endpointId: "endpoint_1",
    endpointUrl: "https://api.example.com/health",
    timeStamp: new Date("2024-01-15T10:30:00Z"),
    statusCode: "200",
    responseTimeMs: 245,
    success: true,
  },
  {
    id: "2",
    endpointId: "endpoint_2",
    endpointUrl: "https://api.example.com/users",
    timeStamp: new Date("2024-01-15T10:29:30Z"),
    statusCode: "500",
    responseTimeMs: 1250,
    success: false,
    errorMessage: "Internal Server Error",
  },
  {
    id: "3",
    endpointId: "endpoint_1",
    endpointUrl: "https://api.example.com/health",
    timeStamp: new Date("2024-01-15T10:29:00Z"),
    statusCode: "200",
    responseTimeMs: 189,
    success: true,
  },
  {
    id: "4",
    endpointId: "endpoint_3",
    endpointUrl: "https://api.example.com/orders",
    timeStamp: new Date("2024-01-15T10:28:30Z"),
    statusCode: "404",
    responseTimeMs: 456,
    success: false,
    errorMessage: "Endpoint not found",
  },
  {
    id: "5",
    endpointId: "endpoint_2",
    endpointUrl: "https://api.example.com/users",
    timeStamp: new Date("2024-01-15T10:28:00Z"),
    statusCode: "200",
    responseTimeMs: 312,
    success: true,
  },
];

const fetchLogs = async ()=>{
  
}

const Dashboard = () => {
  const [logs, setLogs] = useState<ResponseLog[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredLogs = logs.filter(log => 
    log.endpointUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.statusCode.includes(searchTerm) ||
    log.errorMessage?.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
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
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
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
            <ResponseLogsTable logs={filteredLogs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;