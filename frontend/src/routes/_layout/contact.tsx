import { createFileRoute } from '@tanstack/react-router';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Container, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Button, 
  useToast
} from "@chakra-ui/react";
import Footer from '../../components/Common/Footer';
import { useState } from 'react';

export const Route = createFileRoute('/_layout/contact')({
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/v1/contact/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      toast({
        title: "Message Sent",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            Contact
          </Heading>
          <Text fontSize="md">
            Please fill out the form below to send us a message:
          </Text>
          
          <Box as="form" w="full" maxW="600px" onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={6}
                />
              </FormControl>

              <Button 
                type="submit" 
                size="lg"
                isLoading={isSubmitting}
                loadingText="Sending"
                bg="transparent"
                color="#FF9900"
                textTransform="uppercase"
                fontFamily="'Special Gothic Expanded One', sans-serif"
                fontWeight="normal"
                width="100%"
                px={0}
                py={2}
                border="none"
                borderRadius="0"
                textDecoration="none"
                cursor="pointer"
                display="block"
                textAlign="center" // Center text
                justifyContent="center" // Center flex content
                alignItems="center" // Center vertically
                sx={{
                  '& > *': {
                    textAlign: 'center !important',
                    justifyContent: 'center !important',
                  },
                  paddingInlineStart: 0,
                }}
                _hover={{
                  bg: "transparent",
                  color: "#00CC00",
                  textDecoration: "underline",
                }}
                _disabled={{
                  bg: "transparent",
                  color: "#FF9900",
                  opacity: 0.7,
                  cursor: "not-allowed",
                  textDecoration: "none",
                  _hover: {
                    bg: "transparent",
                    color: "#FF9900",
                    textDecoration: "none",
                  },
                }}
                transition="all 0.2s"
              >
              Send Message
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default ContactPage;