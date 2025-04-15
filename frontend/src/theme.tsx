import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Figtree', sans-serif",
    body: "'Figtree', sans-serif",
  },
  colors: {
    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
    purple: {
      300: "#B794F4",
      400: "#9F7AEA",
      500: "#805AD5",
      600: "#6B46C1",
      700: "#553C9A",
    },
    pink: {
      300: "#FBB6CE",
      400: "#F687B3",
      500: "#ED64A6",
      600: "#D53F8C",
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "extrabold",
        color: "white",
      },
    },
    Text: {
      baseStyle: {
        color: "gray.300",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "purple.500",
          color: "white",
          _hover: {
            bg: "purple.600",
          },
        },
        outline: {
          borderColor: "purple.500",
          color: "purple.500",
          _hover: {
            bg: "purple.500",
            color: "white",
          },
        },
      },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "gray.900",
        color: "white",
      },
    },
  },
});

export default theme;