import { Box, ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "./Redux/Authentication/action";
import { fetchStripeApiKey } from "./Redux/StripeApiKey/action";

function App() {
  const { ToastContainer, toast } = createStandaloneToast();
  const url = useLocation();
  const isDashboard = url.pathname.startsWith("/dashboard");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProfile(url.pathname === "/" ? toast : undefined));

      await dispatch(fetchStripeApiKey());
    };

    fetchData();
  }, [dispatch]);

  return (
    <ChakraProvider>
      <Box mt={isDashboard ? 0 : "65px"}>
        <AllRoutes />
      </Box>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
