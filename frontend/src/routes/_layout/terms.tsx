import { createFileRoute } from '@tanstack/react-router';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  UnorderedList, 
  ListItem, 
  Container,
  Divider, 
  Link
} from "@chakra-ui/react";
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/terms')({
  component: TermsPage,
});

function TermsPage() {
  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            Terms and Conditions
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Last Updated: March 2025
          </Text>

          {/* Introduction */}
          <Box w="full">
            <Text fontSize="lg" mb={4}>
              Welcome to luxury verse! These Terms and Conditions ("Terms") govern your use of our website at luxuryverse.com 
              ("Website"). By accessing or using the Website, you agree to comply with and be bound by these Terms. If you do not agree 
              to these Terms, please do not use our Website.
            </Text>
            <Text fontSize="lg">
              These Terms govern your access to, and use of, the Website and any services or content provided through the Website 
              (collectively, the "Services"). luxury verse is committed to ensuring that your experience with us is positive, 
              secure, and transparent. Please review these Terms carefully to understand your rights and obligations when using 
              our website.
            </Text>
            <Text fontSize="lg" mb={4}>
              By using the Website, you affirm that you have read, understood, and agree to these Terms. If you are accessing the 
              Website on behalf of an organization or business, you represent that you have the authority to bind that organization 
              to these Terms. If you do not agree to these Terms, you may not use the Website or its Services.
            </Text>
            <Text fontSize="lg">
              We may update these Terms from time to time to reflect changes in our services or to comply with legal or regulatory 
              requirements. Any updates to the Terms will be posted on this page with the "Last Updated" date. It is your responsibility 
              to review these Terms periodically for any changes. Your continued use of the Website after the posting of any changes 
              constitutes your acceptance of those changes.
            </Text>
          </Box>

          <Divider />

          {/* 1. Acceptance of Terms */}
          <Box w="full" id="acceptance-of-terms">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              1. Acceptance of Terms
            </Heading>
            <Text fontSize="md" mb={4}>
              By accessing and using the Website, you agree to be bound by these Terms and all applicable laws and regulations. 
              If you do not agree with these Terms, you should not use our Services. You represent and warrant that you are of 
              legal age to form a binding contract with us, or that you have the consent of a parent or legal guardian.
            </Text>
            <Text fontSize="md" mb={4}>
            By using the Website, you consent to data processing as outlined in our Privacy and Cookie Policies, which you can withdraw at any time.
          </Text>
            <Text fontSize="md" mb={4}>
              You may only use the Website in accordance with the terms and conditions set out in this agreement. Any use of the 
              Website that violates the terms will result in termination of your access to the Services.
            </Text>
            <Text fontSize="md" mb={4}>
              These Terms are subject to change, and we will notify you of any significant changes. Continuing to use the Website 
              or Services after changes are made constitutes your agreement to the updated Terms.
            </Text>
          </Box>

          {/* 2. Changes to the Terms */}
          <Box w="full" id="changes-to-terms">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              2. Changes to the Terms
            </Heading>
            <Text fontSize="md" mb={4}>
              luxury verse reserves the right to amend, modify, or update these Terms at any time without prior notice. All changes 
              will be posted on this page, and the "Last Updated" date at the top of this page will be revised accordingly. 
              You are encouraged to review these Terms periodically to stay informed of any changes.
            </Text>
            <Text fontSize="md" mb={4}>
              Any changes to these Terms will become effective immediately upon posting, and your continued use of the Website 
              following such changes will constitute your acceptance of those changes. If you disagree with any changes made to 
              the Terms, you must discontinue using the Website.
            </Text>
            <Text fontSize="md" mb={4}>
              If the modifications to these Terms are material, we may provide a more prominent notice through email or on the 
              Website. However, we are not obligated to notify every user directly.
            </Text>
          </Box>

          {/* 3. User Responsibilities */}
          <Box w="full" id="user-responsibilities">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              3. User Responsibilities
            </Heading>
            <Text fontSize="md" mb={4}>
              As a user of the Website, you are responsible for:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Providing accurate and up-to-date information when using the Website or registering for any services.</ListItem>
              <ListItem>Maintaining the confidentiality of your account and password details.</ListItem>
              <ListItem>Complying with all applicable laws, including those related to intellectual property, data privacy, and online conduct.</ListItem>
              <ListItem>Not engaging in any activity that could harm, disrupt, or interfere with the proper functioning of the Website or its Services.</ListItem>
              <ListItem>Not using the Website for any unlawful or fraudulent purposes, including the distribution of harmful content or malicious software.</ListItem>
              <ListItem>Respecting the rights and privacy of other users of the Website.</ListItem>
              <ListItem>Refraining from any conduct that may interfere with or disrupt the Website, its servers, or networks connected to the Website.</ListItem>
            </UnorderedList>
            <Text fontSize="md" mb={4}>
              You agree that you will not use the Website in any manner that could damage, disable, overburden, or impair any 
              aspect of the Website, nor will you attempt to gain unauthorized access to any part of the Website or other accounts, 
              computer systems, or networks connected to the Website.
            </Text>
            <Text fontSize="md" mb={4}>
              Any violation of these responsibilities could result in the suspension or termination of your access to the Website and 
              may subject you to legal action.
            </Text>
          </Box>

          {/* 4. Account Registration */}
          <Box w="full" id="account-registration">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              4. Account Registration
            </Heading>
            <Text fontSize="md" mb={4}>
              In order to use certain features or services provided through the Website, you may be required to register for an 
              account. You agree to provide accurate, current, and complete information when registering and to update this information 
              to maintain its accuracy.
            </Text>
            <Text fontSize="md" mb={4}>
              You are responsible for safeguarding the confidentiality of your account information, including your username, password, 
              and any other information related to your account. You agree to notify us immediately of any unauthorized use of your account 
              or any other security breach.
            </Text>
            <Text fontSize="md" mb={4}>
              We may also require additional verification methods to ensure the security and integrity of our services. We are 
              not liable for any damage caused by unauthorized access to your account.
            </Text>
          </Box>

          {/* 5. Prohibited Activities */}
          <Box w="full" id="prohibited-activities">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              5. Prohibited Activities
            </Heading>
            <Text fontSize="md" mb={4}>
              You may not use the Website for any of the following prohibited activities:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Distributing any harmful content, malware, or malicious code that could disrupt or damage the Website's functionality.</ListItem>
              <ListItem>Attempting to gain unauthorized access to our systems, networks, or user accounts.</ListItem>
              <ListItem>Engaging in fraudulent activities or impersonating any person or entity.</ListItem>
              <ListItem>Harassing or threatening other users, or engaging in any unlawful, offensive, or disruptive conduct.</ListItem>
              <ListItem>Violating any intellectual property rights, including copying, modifying, or distributing any content without permission.</ListItem>
              <ListItem>Engaging in any activities that could be considered illegal under applicable local, state, national, or international laws.</ListItem>
              <ListItem>Interfering with or disrupting the Website or its servers, or attempting to bypass any security measures or authentication protocols.</ListItem>
            </UnorderedList>
            <Text fontSize="md" mb={4}>
              Any violation of these prohibited activities may result in the immediate suspension or termination of your access to 
              the Website and its Services, as well as potential legal action.
            </Text>
          </Box>

          {/* 6. Termination of Access */}
          <Box w="full" id="termination-of-access">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              6. Termination of Access
            </Heading>
            <Text fontSize="md" mb={4}>
              We may suspend or terminate your access to the Website and its Services at our sole discretion, without notice, for 
              any violation of these Terms or for any other reason deemed necessary. Termination may occur if we believe that you have 
              violated the rights of luxury verse or any third parties, or if we need to comply with legal requirements.
            </Text>
            <Text fontSize="md" mb={4}>
              If your access to the Website is terminated, you must immediately stop using all Services provided through the Website, 
              and we reserve the right to take legal action as necessary. Termination does not affect any accrued rights or obligations 
              under these Terms.
            </Text>
            <Text fontSize="md" mb={4}>
              You may terminate your account at any time by notifying us in writing. However, you will still be responsible for any 
              outstanding obligations at the time of termination.
            </Text>
          </Box>

          {/* 7. Limitation of Liability */}
          <Box w="full" id="limitation-of-liability">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              7. Limitation of Liability
            </Heading>
            <Text fontSize="md" mb={4}>
              To the fullest extent permitted by law, luxury verse and its affiliates will not be liable for any indirect, special, 
              incidental, consequential, or punitive damages, or any loss of profits, revenue, or data arising from your use of the Website 
              or its Services, even if we have been advised of the possibility of such damages.
            </Text>
            <Text fontSize="md" mb={4}>
              In no event shall our liability exceed the amount paid by you, if any, for accessing the Website or using its Services during 
              the six (6) months preceding the event giving rise to the claim. We are not responsible for any failure or delay in performance 
              resulting from causes beyond our reasonable control, including but not limited to natural disasters, pandemics, or government 
              actions.
            </Text>
          </Box>

          {/* 8. Governing Law */}
          <Box w="full" id="governing-law">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              8. Governing Law
            </Heading>
            <Text fontSize="md" mb={4}>
              These Terms will be governed by and construed in accordance with the laws of the State of New York, without regard to 
              its conflict of law principles. Any legal action or proceeding arising out of or related to these Terms shall be brought 
              exclusively in the courts located in New York City, New York.
            </Text>
            <Text fontSize="md" mb={4}>
              By using the Website, you consent to the exclusive jurisdiction of the courts in New York City for any disputes 
              arising out of these Terms. If any provision of these Terms is deemed invalid or unenforceable by a court of competent 
              jurisdiction, the remaining provisions will remain in full force and effect.
            </Text>
          </Box>

          {/* 9. Contact Information */}
          <Box w="full" id="contact-information">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              9. Contact Information
            </Heading>
            <Text fontSize="md" mb={4}>
              If you have any questions about these Terms, or if you need to contact us for any reason, please reach out to us at:
            </Text>
            <VStack align="start" spacing={2} pl={4}>
              <Text><strong>Email:</strong> support@luxuryverse.com</Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default TermsPage;
