import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import theme from "./styles/theme";
import HomePage from "./pages/Home";
import "./styles/global.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <ChakraProvider theme={theme}>
    <HomePage />
  </ChakraProvider>
);