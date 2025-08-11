import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Activity, CheckCircle } from "lucide-react";

const ProjectsStatCard = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Total Projects</div>
            <p className="text-xs text-muted-foreground">
              All time monitoring data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Total Projects</div>
            <p className="text-xs text-muted-foreground">
              All time monitoring data
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProjectsStatCard;
