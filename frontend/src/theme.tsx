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
    glitch: "'Dela Gothic One', sans-serif",
  },
  colors: {
    gray: {
      50: "#E6E6E6",  // Off-white
      100: "#D4D4D4", // Very light gray
      200: "#B2B2B2", // Light gray
      300: "#A0A0A0", // Neutral gray for body text
      400: "#8A8A8A", // Medium-light gray
      500: "#6B6B6B", // Medium gray
      600: "#525252", // Medium-dark gray
      700: "#404040", // Dark gray (replaces blue-gray for --color-border)
      800: "#2E2E2E", // Very dark gray
      900: "#1A1A1A", // Near-black gray (replaces blue-gray for --color-secondary)
    },
    primary: {
      300: "#FFB266",
      500: "#FF9900", // Orange for primary text
      600: "#CC7A00", // Slightly darker for focus/active states
      700: "#994C00", // Darker
    },
    green: {
      300: "#7bff8cd9",
      400: "#6afe7dd9",
      500: "#58fb6cd9", // Green for hover (matches --color-primary-hover)
      600: "#3cd950d9",
      700: "#2bb33cd9",
    },
    orange: {
      500: "#fbac58d9", // Orange for glitch
    },
    cyan: {
      500: "#00e5ffd9", // Cyan for glitch
    },
    white: "#FFFFFF",
    black: {
      900: "#0A0A0A", // Deep black (matches --color-background)
    },
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
    "8xl": "5.5rem", // For hero text
    "9xl": "6.5rem", // Larger for glitch variant
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
    base: 1.7, // Matches --line-height-base
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
    sm: "0.125rem", // Matches --border-radius-sm
    md: "0.5rem", // Matches --border-radius-md
    lg: "1rem", // Matches --border-radius-lg
    full: "9999px", // Matches --border-radius-full
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.2)", // Matches --shadow-sm
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)", // Matches --shadow-md
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)", // Matches --shadow-lg
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "'Special Gothic Expanded One', sans-serif",
        fontWeight: "normal",
        color: "#FF9900",
        lineHeight: "short",
        textTransform: "uppercase", // Transforms text to uppercase
      },
      sizes: {
        "9xl": { fontSize: "9xl" },
        "8xl": { fontSize: "8xl" },
        "7xl": { fontSize: "7xl" },
        "6xl": { fontSize: "6xl" },
        "5xl": { fontSize: "5xl" },
        "4xl": { fontSize: "4xl" },
        "3xl": { fontSize: "3xl" },
        "2xl": { fontSize: "2xl" },
        xl: { fontSize: "xl" },
        lg: { fontSize: "lg" },
        md: { fontSize: "md" },
        sm: { fontSize: "sm" },
        xs: { fontSize: "xs" },
      },
      variants: {
        logo: {
          fontFamily: "'Special Gothic Expanded One', sans-serif",
          fontWeight: "normal",
          color: "primary.500", // Updated to blue-grey
          letterSpacing: "2px",
          textTransform: "uppercase",
        },
        glitch: {
          fontFamily: "'Dela Gothic One', sans-serif",
          fontWeight: "normal",
          color: "primary.500", // Updated to blue-grey
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "'DM Sans', sans-serif",
        color: "primary.300", 
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
          bg: "primary.500", // Updated to blue-grey
          color: "black.900",
          _hover: {
            bg: "orange.200", // Matches --color-primary-hover
            _disabled: {
              bg: "primary.500",
            },
          },
          _active: {
            bg: "primary.700",
          },
        },
        outline: {
          border: "2px solid",
          borderColor: "primary.500", // Updated to blue-grey
          color: "primary.500",
          bg: "transparent",
          _hover: {
            bg: "orange.200",
            color: "black.900",
          },
          _active: {
            bg: "primary.600",
          },
        },
        ghost: {
          color: "primary.500", // Updated to blue-grey
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
          bg: "gray.900", // Matches --color-secondary
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
              borderColor: "orange.200", // Matches --color-primary-hover
            },
            _focus: {
              borderColor: "primary.500", // Updated to blue-grey
              boxShadow: "0 0 0 1px rgba(219, 221, 236, 0.85)",
            },
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        fontFamily: "'DM Sans', sans-serif",
        color: "white",
        bg: "gray.900", // Matches --color-secondary
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
            color: "primary.500", // Updated to blue-grey
            fontFamily: "'Special Gothic Expanded One', sans-serif",
          },
          description: {
            color: "primary.500", // Updated to blue-grey
            fontFamily: "'DM Sans', sans-serif",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        fontFamily: "'DM Sans', sans-serif",
        color: "primary.500", // Updated to blue-grey
        _hover: {
          color: "orange.200", // Matches --color-primary-hover
          textDecoration: "underline",
        },
      },
    },
    Tag: {
      baseStyle: {
        container: {
          fontFamily: "'DM Sans', sans-serif",
          color: "primary.500", // Updated to blue-grey
          lineHeight: "1.5",
          minHeight: "auto",
          paddingY: 0,
          paddingX: 3,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        },
        label: {
          fontSize: "lg",
          lineHeight: "1.5",
          fontWeight: "normal",
        },
      },
      sizes: {
        md: {
          container: {
            fontSize: "lg",
            paddingY: 0,
            paddingX: 3,
            borderRadius: "full",
          },
        },
      },
      variants: {
        subtle: {
          container: {
            bg: "gray.700",
            color: "primary.500", // Updated to blue-grey
            _hover: {
              bg: "gray.600",
            },
          },
        },
        solid: {
          container: {
            bg: "orange.200", // Matches --color-primary-hover
            color: "black.900",
            _hover: {
              bg: "orange.300",
            },
          },
        },
      },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "black.900", // Matches --color-background
        color: "primary.500", // Updated to blue-grey
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: "base",
        scrollBehavior: "smooth",
      },
      "*": {
        boxSizing: "border-box",
      },
      "a": {
        color: "primary.500", // Updated to blue-grey
        textDecoration: "none",
        _hover: {
          color: "orange.200", // Matches --color-primary-hover
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