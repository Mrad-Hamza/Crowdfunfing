import React from "react";
import { FeaturedCarousal } from "../HomeComponents/FeaturedCarousal";
import ProjectCard from "../HomeComponents/ProjectCard";
import { CollectionsItem } from "../HomeComponents/CollectionsItem";
import { CrowdfundingBanner } from "../HomeComponents/CrowdfundingBanner";
import { Categories } from "../HomeComponents/Categories";
import { Curious } from "../HomeComponents/Curious";

/*
<FeaturedCarousal />
      <ProjectCard />
      <CollectionsItem />
      <CrowdfundingBanner />
      <Categories />
      <Curious />
*/
const Home = () => {
  return (
    <div>
    <FeaturedCarousal />
     <ProjectCard/>
    <CollectionsItem />
    <CrowdfundingBanner />
    <Categories />
    <Curious /> 

    </div>
  );
};

export { Home };
