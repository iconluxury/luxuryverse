import { useToast } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();
  const toastIdRef = useRef<string | number | null>(null);

  const showToast = useCallback(
    (
      title: string,
      description: string,
      status: "info" | "warning" | "success" | "error",
      titleStyle: "text" | "heading" = "text"
    ) => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }

      const id = toast({
        render: () => (
          <Box
            bg={
              status === "success"
                ? "green.500"
                : status === "error"
                ? "red.500"
                : status === "warning"
                ? "yellow.500"
                : "blue.500"
            }
            color="white"
            p={4}
            borderRadius="md"
            boxShadow="lg"
          >
            {titleStyle === "heading" ? (
              <Heading
                as="h3"
                fontFamily="'Special Gothic Expanded One', sans-serif"
                fontWeight="normal"
                color="#FF9900"
                textTransform="uppercase"
                lineHeight="short"
                fontSize="lg"
                mb={2}
              >
                {title}
              </Heading>
            ) : (
              <Text
                fontFamily="'DM Sans', sans-serif"
                fontWeight="normal"
                color="primary.500"
                lineHeight="base"
                fontSize="md"
                mb={2}
              >
                {title}
              </Text>
            )}
            <Text
              fontFamily="'DM Sans', sans-serif"
              fontWeight="normal"
              color="white"
              lineHeight="base"
              fontSize="md"
            >
              {description}
            </Text>
          </Box>
        ),
        status,
        isClosable: true,
        position: "top" as const,
        duration: 4000,
      });

      toastIdRef.current = id;
    },
    [toast]
  );

  return showToast;
};

export default useCustomToast;