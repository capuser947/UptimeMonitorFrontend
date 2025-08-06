import React from "react";
import { Title } from "../components/ui/title";
import type { Project } from "../types/ProjectTypes";
import { Card, CardHeader } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export const mockProjects: Project[] = [
  {
    id: "1",
    projectName: "Website Redesign",
    priority: "High",
  },
  {
    id: "2",
    projectName: "Mobile App Development",
    priority: "Medium",
  },
  {
    id: "3",
    projectName: "API Integration",
    priority: "Low",
  },
  {
    id: "4",
    projectName: "Internal Dashboard",
    priority: "Medium",
  },
  {
    id: "5",
    projectName: "Customer Onboarding Flow",
    priority: "High",
  },
];

const Home = () => {
    const navigate=useNavigate();
    const handleNavigationToProject=(id:string)=>{

        navigate(`/dashboard/${id}`)
    }
  return (
    <div className="text-center mx-auto px-10 space-y-7">
      {/* This is for the header */}
      <Title className="py-5" text="Projects" />
      {mockProjects && (
        <>
          <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {mockProjects.map((item) => (
              <Card onClick={()=>handleNavigationToProject(item.id)} className="" id={item.id}>
                <CardHeader  className="text-xl font-medium">{item.projectName}</CardHeader>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
