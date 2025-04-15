// theme.js
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Plus Jakarta Sans', sans-serif",
    body: "'Outfit', sans-serif",
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
    white: "#FFFFFF",
    black: "#000000",
  },
  breakpoints: {
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
    "2xl": "96em", // 1536px
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.7,
    tall: 1.625,
    taller: 2,
  },
  space: {
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    md: "0.5rem", // 8px
    lg: "1rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: "extrabold",
        color: "white",
        lineHeight: "short",
      },
      sizes: {
        "4xl": { fontSize: "6xl" },
        "3xl": { fontSize: "5xl" },
        "2xl": { fontSize: "4xl" },
        xl: { fontSize: "3xl" },
        lg: { fontSize: "2xl" },
        md: { fontSize: "xl" },
        sm: { fontSize: "lg" },
        xs: { fontSize: "md" },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "'Outfit', sans-serif",
        color: "gray.300",
        lineHeight: "base",
      },
    },
    Button: {
      baseStyle: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: "bold",
        borderRadius: "md",
        paddingX: 6,
        paddingY: 3,
        transition: "all 0.3s ease",
      },
      variants: {
        solid: {
          bg: "purple.500",
          color: "white",
          _hover: {
            bg: "purple.600",
            _disabled: {
              bg: "purple.500",
            },
          },
          _active: {
            bg: "purple.700",
          },
        },
        outline: {
          border: "2px solid",
          borderColor: "purple.500",
          color: "purple.500",
          bg: "transparent",
          _hover: {
            bg: "purple.500",
            color: "white",
          },
          _active: {
            bg: "purple.600",
          },
        },
        ghost: {
          color: "purple.500",
          bg: "transparent",
          _hover: {
            bg: "gray.800",
          },
          _active: {
            bg: "gray.700",
          },
        },
      },
      sizes: {
        lg: {
          fontSize: "lg",
          paddingX: 8,
          paddingY: 4,
          minHeight: "48px",
        },
        md: {
          fontSize: "md",
          paddingX: 6,
          paddingY: 3,
          minHeight: "40px",
        },
        sm: {
          fontSize: "sm",
          paddingX: 4,
          paddingY: 2,
          minHeight: "32px",
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          fontFamily: "'Outfit', sans-serif",
          color: "white",
          bg: "gray.800",
          borderRadius: "md",
          _placeholder: {
            color: "gray.400",
          },
        },
      },
      variants: {
        outline: {
          field: {
            border: "1px solid",
            borderColor: "gray.600",
            _hover: {
              borderColor: "gray.500",
            },
            _focus: {
              borderColor: "purple.500",
              boxShadow: "0 0 0 1px #805AD5",
            },
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        fontFamily: "'Outfit', sans-serif",
        color: "white",
        bg: "gray.800",
        borderRadius: "md",
        _placeholder: {
          color: "gray.400",
        },
      },
    },
    Alert: {
      variants: {
        subtle: {
          container: {
            bg: "gray.800",
            borderRadius: "md",
            boxShadow: "lg",
          },
          title: {
            color: "white",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          },
          description: {
            color: "gray.300",
            fontFamily: "'Outfit', sans-serif",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        fontFamily: "'Outfit', sans-serif",
        color: "purple.400",
        _hover: {
          color: "purple.300",
          textDecoration: "underline",
        },
      },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "gray.900",
        color: "white",
        fontFamily: "'Outfit', sans-serif",
        lineHeight: "base",
        scrollBehavior: "smooth",
      },
      "*": {
        boxSizing: "border-box",
      },
      "a": {
        color: "purple.400",
        textDecoration: "none",
        _hover: {
          color: "purple.300",
        },
      },
      "button": {
        transition: "all 0.3s ease",
      },
      "img": {
        maxWidth: "100%",
        height: "auto",
      },
    },
  },
});

export default theme;