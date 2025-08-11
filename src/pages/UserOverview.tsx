import React, { useEffect, useState } from "react";
import { Title } from "../components/ui/title";
import type { Project } from "../types/project.type";
import { Card, CardHeader } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const UserOverview = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const { token } = useAuth();
  const fetchProjectsBasedOnUser = async () => {
    const res = await fetch(`${baseUrl}/api/Team/68933406813ef6e38288e7b1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    console.log("all project", result);

    setProjects(result);
  };
  useEffect(() => {
    fetchProjectsBasedOnUser();
  }, []);
  const handleNavigationToProject = (id: string) => {
    console.log("Id sent to user dashboard ", id);
    navigate(`/userdashboard/${id}`);
  };
  return (
    <div className="text-center mx-auto px-10 space-y-7">
      {/* This is for the header */}
      <Title className="py-5" text="Projects" />
      {projects && (
        <>
          <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {projects.map((item) => (
              <Card
                onClick={() => handleNavigationToProject(item.id)}
                className=""
                key={item.id}
              >
                <CardHeader className="text-xl font-medium">
                  {item.projectName}
                </CardHeader>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOverview;
