import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import CustomizedTables from "../components/tables/CustomizedTables";
const Projects = () => {
  return (
    <div>
      <CustomizedTables />
    </div>
  );
};
export default Projects;
