import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";
import { type ResponseLog } from "../types/response.type";

interface ResponseLogsTableProps {
  logs: ResponseLog[];
}

export const ResponseLogsTable = ({ logs }: ResponseLogsTableProps) => {
  console.log("Response timne check", logs);
  const formatupdatedAt = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (statusCode: number, success: boolean) => {
    if (success && statusCode < 300 && statusCode >= 200) {
      return (
        <Badge variant="outline" className="bg-success text-success-foreground">
          Success
        </Badge>
      );
    } else if (statusCode >= 500) {
      return (
        <Badge
          variant="destructive"
          className="bg-warning text-warning-foreground"
        >
          Client Error
        </Badge>
      );
    } else if (statusCode < 500 && statusCode > 400) {
      return (
        <Badge variant="destructive" className="bg-error text-error-foreground">
          Server Error
        </Badge>
      );
    } else {
      return <Badge variant="secondary">{statusCode}</Badge>;
    }
  };

  const getresponseTimeColor = (responseTime: number) => {
    if (responseTime < 200) return "text-success";
    if (responseTime < 500) return "text-warning";

    return "text-error";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Endpoint</TableHead>
            <TableHead>Response Code</TableHead>
            <TableHead>Response Time</TableHead>
            <TableHead>updatedAt</TableHead>
            <TableHead>Error Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                No logs found
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/50 group">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {log.success ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-error" />
                    )}
                    {getStatusBadge(log.statusCode, log.success)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 max-w-xs">
                    <span className="truncate font-mono text-sm">
                      {log.url}
                    </span>
                    <a className="group-hover:visible invisible" href={log.url}>
                      <ExternalLink className="h-3.5" />
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {log.statusCode}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span
                      className={`font-mono ${getresponseTimeColor(
                        log.responseTime
                      )}`}
                    >
                      {log.responseTime}ms
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-sm">
                  {formatupdatedAt(new Date(log.updatedAt))}
                </TableCell>
                <TableCell>
                  {log.errorMessage ? (
                    <Badge variant="destructive" className="max-w-xs truncate">
                      {log.errorMessage}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
