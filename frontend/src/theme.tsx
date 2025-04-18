import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Special Gothic Expanded One', sans-serif",
    body: "'DM Sans', sans-serif",
    glitch: "'Rubik Glitch', system-ui",
  },
  colors: {
    gray: {
      50: "#F5F6F5",
      100: "#E0E2E0",
      200: "#C4C8C4",
      300: "#A8ADA8",
      400: "#8D938D",
      500: "#737A73",
      600: "#5C635C",
      700: "#464E46",
      800: "#2E3532",
      900: "#1C2526",
    },
    gold: {
      300: "#FFD966",
      400: "#E8B923",
      500: "#D4A017",
      600: "#B8860B",
      700: "#9C6D08",
    },
    emerald: {
      300: "#66B266",
      400: "#4A914A",
      500: "#2A6041",
      600: "#1F4A33",
      700: "#173827",
    },
    purple: {
      300: "#B794F4",
      400: "#9F7AEA",
      500: "#6B46C1",
      600: "#553C9A",
      700: "#432B7A",
    },
    cyan: {
      300: "#4DD0E1",
      400: "#26C6DA",
      500: "#00BCD4",
      600: "#00ACC1",
      700: "#0097A7",
    },
    black: {
      900: "#0A0A0A",
    },
    white: "#FFFFFF",
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
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
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "'Special Gothic Expanded One', sans-serif",
        fontWeight: "normal",
        color: "gold.500",
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
      variants: {
        logo: {
          fontFamily: "'Special Gothic Expanded One', sans-serif",
          fontWeight: "normal",
          color: "gold.500",
          letterSpacing: "2px",
          textTransform: "uppercase",
        },
        glitch: {
          fontFamily: "'Rubik Glitch', system-ui",
          fontWeight: "normal",
          color: "cyan.500",
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "'DM Sans', sans-serif",
        color: "gray.300",
        lineHeight: "base",
      },
    },
    Button: {
      baseStyle: {
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: "bold",
        borderRadius: "md",
        paddingX: 6,
        paddingY: 3,
        transition: "all 0.3s ease",
      },
      variants: {
        solid: {
          bg: "gold.500",
          color: "black.900",
          _hover: {
            bg: "gold.600",
            _disabled: {
              bg: "gold.500",
            },
          },
          _active: {
            bg: "gold.700",
          },
        },
        outline: {
          border: "2px solid",
          borderColor: "gold.500",
          color: "gold.500",
          bg: "transparent",
          _hover: {
            bg: "gold.500",
            color: "black.900",
          },
          _active: {
            bg: "gold.600",
          },
        },
        ghost: {
          color: "gold.500",
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
          fontFamily: "'DM Sans', sans-serif",
          color: "white",
          bg: "gray.900",
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
              borderColor: "gold.500",
              boxShadow: "0 0 0 1px #D4A017",
            },
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        fontFamily: "'DM Sans', sans-serif",
        color: "white",
        bg: "gray.900",
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
            color: "gold.500",
            fontFamily: "'Special Gothic Expanded One', sans-serif",
          },
          description: {
            color: "gray.300",
            fontFamily: "'DM Sans', sans-serif",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        fontFamily: "'DM Sans', sans-serif",
        color: "purple.500",
        _hover: {
          color: "purple.400",
          textDecoration: "underline",
        },
      },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "black.900",
        color: "white",
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: "base",
        scrollBehavior: "smooth",
      },
      "*": {
        boxSizing: "border-box",
      },
      "a": {
        color: "purple.500",
        textDecoration: "none",
        _hover: {
          color: "purple.400",
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