import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { StrictMode } from "react";
import React from "react";
import { OpenAPI } from "./client";
import theme from "./theme";
import "./styles/global.css";
import { WagmiProvider } from "wagmi"
OpenAPI.BASE = "https://apis.iconluxury.today";
OpenAPI.TOKEN = async () => localStorage.getItem("access_token") || "";
import { wagmiConfig, queryClient } from './client/core/appkit';
const queryClient = new QueryClient();
const router = createRouter({ routeTree });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  </StrictMode>
);