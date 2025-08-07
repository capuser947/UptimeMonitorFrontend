export type Project = {
  id: string;
  projectName: string;
  Urls:string[];
  interval:number;
  teamMembers:{id:string,role:string}
  environment:string
};