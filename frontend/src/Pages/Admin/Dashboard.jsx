import React from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";
import AdminDashboardNavbar from "../../Layouts/AdminDashboardNavbar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex>
      <AdminDashboardNavbar
        handleSidebarToggle={handleSidebarToggle}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box
        w="100%"
        transition="margin-left 0.5s ease-in-out"
        margin={
          isMobile ? "50px 0 0 0" : isSidebarOpen ? "0 0 0 155px" : "0 0 0 85px"
        }
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;
