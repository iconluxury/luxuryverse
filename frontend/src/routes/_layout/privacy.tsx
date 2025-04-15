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
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack
} from "@chakra-ui/react";
import Footer from '../../components/Common/Footer';

export const Route = createFileRoute('/_layout/privacy')({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            Privacy Policy
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Last Updated: March 2025
          </Text>
          
          {/* Introduction */}
          <Box w="full">
            <Text fontSize="lg" mb={4}>
              At Roaming Proxy, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              at luxuryverse.com ("Website") or use our services.
            </Text>
            <Text fontSize="lg" mb={4}>
              We value transparency and want you to understand exactly how we handle your data. This policy outlines your privacy 
              rights and the choices you have regarding your personal information. We encourage you to read this Privacy Policy 
              carefully to make informed decisions about sharing your personal data with us.
            </Text>
            <Text fontSize="lg" mb={4}>
              By accessing or using our Website and services, you acknowledge that you have read and understood this Privacy Policy. 
              If you do not agree with our practices, please do not use our Website or services. Your continued use constitutes your 
              acceptance of this Privacy Policy.
            </Text>
            <Text fontSize="lg">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              The "Last Updated" date at the top of this page indicates when this Privacy Policy was last revised. We encourage 
              you to review this Privacy Policy periodically to stay informed about our data practices.
            </Text>
          </Box>
          
          <Divider />
          
          {/* 1. Information We Collect */}
          <Box w="full" id="information-we-collect">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              1. Information We Collect
            </Heading>
            <Text fontSize="md" mb={4}>
              We collect several types of information from and about users of our Website and services, including:
            </Text>
            <VStack align="start" spacing={6} pl={4} mb={4} w="full">
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Personal Information
                </Heading>
                <Text fontSize="md" mb={2}>
                  Personal information is data that can be used to identify you individually. We may collect the following 
                  personal information:
                </Text>
                <UnorderedList pl={6} spacing={2}>
                  <ListItem>Name, email address, phone number (for SMS communications), and contact details</ListItem>
                  <ListItem>Billing and payment information</ListItem>
                  <ListItem>User credentials (username and password)</ListItem>
                  <ListItem>Company information (for business accounts)</ListItem>
                  <ListItem>Profile information and preferences</ListItem>
                  <ListItem>Communication with our support team</ListItem>
                </UnorderedList>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Usage and Technical Information
                </Heading>
                <Text fontSize="md" mb={2}>
                  We automatically collect certain information when you visit, use, or navigate our Website. This information 
                  does not reveal your specific identity but may include:
                </Text>
                <UnorderedList pl={6} spacing={2}>
                  <ListItem>Device and browser information</ListItem>
                  <ListItem>IP address and general location</ListItem>
                  <ListItem>Usage data (pages visited, features used, time spent)</ListItem>
                  <ListItem>Referring websites or sources</ListItem>
                  <ListItem>System performance and error reports</ListItem>
                  <ListItem>Network and connection information</ListItem>
                </UnorderedList>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Cookies and Similar Technologies
                </Heading>
                <Text fontSize="md" mb={2}>
                  We use cookies and similar tracking technologies to collect and store information about your interactions with our 
                  Website. For detailed information about our use of cookies, please refer to our
                  <Link color="red.500" href="/cookie" ml={1}>Cookie Policy</Link>.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Information You Provide
                </Heading>
                <Text fontSize="md" mb={2}>
                  We collect information that you voluntarily provide when using our services, such as:
                </Text>
                <UnorderedList pl={6} spacing={2}>
                  <ListItem>Account registration and profile information</ListItem>
                  <ListItem>Survey responses and feedback</ListItem>
                  <ListItem>User-generated content and submissions</ListItem>
                  <ListItem>Job applications and résumés</ListItem>
                  <ListItem>Communications with our team</ListItem>
                </UnorderedList>
              </Box>
            </VStack>
          </Box>
          
          {/* 2. How We Use Your Information */}
          <Box w="full" id="how-we-use-information">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              2. How We Use Your Information
            </Heading>
            <Text fontSize="md" mb={4}>
              We use the information we collect for various purposes, including:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem><strong>Providing and Improving Our Services:</strong> To operate, maintain, and enhance our Website and services, develop new features, and ensure a seamless user experience.</ListItem>
              <ListItem><strong>Customer Support:</strong> To respond to your inquiries, provide technical assistance, and address complaints or service issues.</ListItem>
              <ListItem><strong>Account Management:</strong> To create and maintain your account, authenticate users, and provide access to our services.</ListItem>
              <ListItem><strong>Communication:</strong> To send administrative information, service updates, technical notices, and support messages, including via SMS (reply STOP to opt out).</ListItem>
              <ListItem><strong>Marketing:</strong> To send promotional communications, newsletters, and information about new services or features (with your consent where required by law).</ListItem>
              <ListItem><strong>Security and Fraud Prevention:</strong> To detect, prevent, and address technical issues, fraud, abuse, and illegal activities.</ListItem>
              <ListItem><strong>Analytics:</strong> To understand how users interact with our Website and services, analyze trends, and gather demographic information.</ListItem>
              <ListItem><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.</ListItem>
              <ListItem><strong>Business Operations:</strong> To conduct business planning, reporting, and forecasting.</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              We process your personal information for these purposes based on our legitimate business interests, to perform 
              our contractual obligations to you, with your consent, or to comply with legal obligations, as applicable.
            </Text>
          </Box>
          
          {/* 3. How We Share Your Information */}
          <Box w="full" id="sharing-information">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              3. How We Share Your Information
            </Heading>
            <Text fontSize="md" mb={4}>
              We may share your information with the following categories of third parties:
            </Text>
            <VStack align="start" spacing={3} pl={4} mb={4} w="full">
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Service Providers
                </Heading>
                <Text fontSize="md">
                  We may share your information with third-party vendors, service providers, contractors, or agents who perform 
                  services for us or on our behalf, such as data hosting, analytics, payment processing, customer service, 
                  email delivery, and marketing assistance. These providers are contractually bound to protect your information 
                  and are restricted from using it for purposes other than providing services to us.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Business Partners
                </Heading>
                <Text fontSize="md">
                  We may share your information with our business partners to offer you certain products, services, or promotions 
                  that may be of interest to you. These partners are required to maintain the confidentiality of your information 
                  and are prohibited from using it for any purpose other than those disclosed to you.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Corporate Transactions
                </Heading>
                <Text fontSize="md">
                  If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of company assets, 
                  your information may be transferred as part of that transaction. We will notify you via email and/or a prominent 
                  notice on our Website of any change in ownership or uses of your personal information.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Legal Requirements
                </Heading>
                <Text fontSize="md">
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities 
                  (e.g., a court or government agency). We may also disclose your information to enforce our Terms of Service, 
                  protect our rights, privacy, safety, or property, or that of our users or others.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  With Your Consent
                </Heading>
                <Text fontSize="md">
                  We may share your information with third parties when you explicitly consent to such sharing. For example, 
                  if you choose to use social sharing features integrated into our services or authorize interactions between 
                  our services and third-party applications or platforms.
                </Text>
              </Box>
            </VStack>
            <Text fontSize="md">
              We do not sell, rent, or trade your personal information with third parties for their marketing purposes 
              without your explicit consent.
            </Text>
          </Box>
          
          {/* 4. Data Retention */}
          <Box w="full" id="data-retention">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              4. Data Retention
            </Heading>
            <Text fontSize="md" mb={4}>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              unless a longer retention period is required or permitted by law. The criteria used to determine our retention periods include:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>The duration of our ongoing relationship with you and the provision of our services</ListItem>
              <ListItem>Legal obligations to which we are subject (e.g., certain laws require us to keep records for a specific period)</ListItem>
              <ListItem>Statutes of limitations and the defense of legal claims</ListItem>
              <ListItem>Guidelines issued by relevant data protection authorities</ListItem>
              <ListItem>Business and operational needs</ListItem>
            </UnorderedList>
            <Text fontSize="md" mb={4}>
              When we no longer need to process your personal information for the purposes outlined in this Privacy Policy, 
              we will delete or anonymize it. If personal information cannot be deleted due to technical or operational constraints, 
              we will implement appropriate measures to ensure it cannot be used for any purpose other than compliance with retention requirements.
            </Text>
            <Text fontSize="md">
              If you request the deletion of your personal information, we will respond to your request consistent with applicable law. 
              Please note that we may need to retain certain information for legal purposes, to complete transactions, to resolve disputes, 
              to prevent fraud and abuse, or to enforce our agreements.
            </Text>
          </Box>
          
          {/* 5. Your Privacy Rights */}
          <Box w="full" id="privacy-rights">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              5. Your Privacy Rights
            </Heading>
            <Text fontSize="md" mb={4}>
            California residents can opt out of the sale or sharing of personal information for targeted 
            advertising via our cookie consent tool or by emailing privacy@luxuryverse.com.
          </Text>
            <Text fontSize="md" mb={4}>
              Depending on your location, you may have certain rights regarding your personal information. These may include:
            </Text>
            <VStack align="start" spacing={3} pl={4} mb={4} w="full">
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Right to Access
                </Heading>
                <Text fontSize="md">
                  You have the right to request information about the personal data we hold about you and how it is processed. 
                  This includes the right to receive a copy of your personal data in a structured, commonly used, and machine-readable format.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Right to Rectification
                </Heading>
                <Text fontSize="md">
                  You have the right to request that we correct any inaccurate personal information we maintain about you, 
                  or to complete incomplete information.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Right to Erasure
                </Heading>
                <Text fontSize="md">
                  You have the right to request the deletion of your personal information in certain circumstances, 
                  such as when the information is no longer necessary for the purposes for which it was collected.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Right to Restrict Processing
                </Heading>
                <Text fontSize="md">
                  You have the right to request that we restrict the processing of your personal information in certain circumstances, 
                  such as when you contest the accuracy of your personal information.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Right to Object
                </Heading>
                <Text fontSize="md">
                  You have the right to object to the processing of your personal information for direct marketing purposes 
                  or when the processing is based on our legitimate interests.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Right to Data Portability
                </Heading>
                <Text fontSize="md">
                  You have the right to receive your personal information in a structured, commonly used, and machine-readable format, 
                  and to transmit that information to another controller without hindrance.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Right to Withdraw Consent
                </Heading>
                <Text fontSize="md">
                  Where we rely on your consent to process your personal information, you have the right to withdraw that consent 
                  at any time. This will not affect the lawfulness of processing based on your consent before its withdrawal.
                </Text>
              </Box>
            </VStack>
            <Text fontSize="md" mb={4}>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below. 
              We will respond to your request within the timeframe required by applicable law. Please note that we may need to 
              verify your identity before processing your request.
            </Text>
            <Text fontSize="md">
              In some cases, we may not be able to fulfill your request, such as when it would impact the privacy rights of others, 
              jeopardize an investigation, or if the information is subject to legal privilege. If we deny your request, we will 
              explain the reasons for the denial.
            </Text>
          </Box>
          
          {/* 6. Data Security */}
          <Box w="full" id="data-security">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              6. Data Security
            </Heading>
            <Text fontSize="md" mb={4}>
              We implement appropriate technical and organizational measures to protect your personal information against accidental 
              or unlawful destruction, loss, alteration, unauthorized disclosure, or access. Our security measures include:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem><strong>Encryption:</strong> Protecting data in transit using TLS/SSL protocols and at rest using industry-standard encryption methods.</ListItem>
              <ListItem><strong>Access Controls:</strong> Limiting access to personal information to authorized personnel on a need-to-know basis.</ListItem>
              <ListItem><strong>Authentication Systems:</strong> Implementing multi-factor authentication for accessing sensitive systems.</ListItem>
              <ListItem><strong>Regular Security Assessments:</strong> Conducting periodic vulnerability scans and penetration testing.</ListItem>
              <ListItem><strong>Security Incident Response:</strong> Maintaining procedures to detect, report, and investigate security incidents.</ListItem>
              <ListItem><strong>Employee Training:</strong> Providing regular security awareness training to our staff.</ListItem>
              <ListItem><strong>Physical Security:</strong> Implementing measures to protect our facilities and physical assets.</ListItem>
            </UnorderedList>
            <Text fontSize="md" mb={4}>
              While we strive to use commercially acceptable means to protect your personal information, no method of transmission 
              over the Internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security. 
              If you have reason to believe that your interaction with us is no longer secure, please notify us immediately.
            </Text>
            <Text fontSize="md">
              We maintain an incident response plan and will notify affected individuals and relevant authorities of any breach of 
              personal information as required by applicable law.
            </Text>
          </Box>
          
          {/* 7. International Data Transfers */}
          <Box w="full" id="international-transfers">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              7. International Data Transfers
            </Heading>
            <Text fontSize="md" mb={4}>
              We operate globally and may transfer your personal information to countries other than your country of residence, 
              including the United States, where our main servers are located. These countries may have different data protection 
              laws than your country of residence.
            </Text>
            <Text fontSize="md" mb={4}>
              When transferring personal information from the European Economic Area (EEA), the United Kingdom, or Switzerland 
              to countries not deemed to provide an adequate level of data protection, we implement appropriate safeguards, such as:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Standard Contractual Clauses approved by the European Commission</ListItem>
              <ListItem>Binding Corporate Rules for transfers within our group of companies</ListItem>
              <ListItem>Participation in approved certification mechanisms, such as the EU-US Data Privacy Framework</ListItem>
              <ListItem>Obtaining your explicit consent for certain transfers</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              For more information about how we transfer personal information globally or to obtain a copy of the safeguards we use, 
              please contact us using the information provided in the "Contact Us" section below.
            </Text>
          </Box>
          
          {/* 8. Children's Privacy */}
          <Box w="full" id="childrens-privacy">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              8. Children's Privacy
            </Heading>
            <Text fontSize="md" mb={4}>
              Our Website and services are not directed to individuals under 16 years of age, and we do not knowingly collect 
              personal information from children under 16. If we learn that we have collected personal information from a child 
              under 16, we will take steps to delete such information as soon as possible.
            </Text>
            <Text fontSize="md" mb={4}>
              If you are a parent or guardian and believe that your child has provided us with personal information without your 
              consent, please contact us using the information provided in the "Contact Us" section below. We will investigate 
              and take necessary steps to remove the information if it was collected in violation of applicable children's privacy laws.
            </Text>
            <Text fontSize="md">
              In some jurisdictions, the age threshold may be higher than 16. If this is the case, we will comply with the relevant 
              laws of those jurisdictions.
            </Text>
          </Box>
          
          {/* 9. Third-Party Websites and Services */}
          <Box w="full" id="third-party-services">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              9. Third-Party Websites and Services
            </Heading>
            <Text fontSize="md" mb={4}>
              Our Website may contain links to third-party websites, plugins, or applications. Clicking on those links or enabling 
              those connections may allow third parties to collect or share data about you. We do not control these third-party 
              websites and are not responsible for their privacy statements or practices.
            </Text>
            <Text fontSize="md" mb={4}>
              Examples of third-party services that may be integrated with our Website include:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Social media platforms (e.g., Facebook, Twitter, LinkedIn)</ListItem>
              <ListItem>Payment processors</ListItem>
              <ListItem>Analytics providers</ListItem>
              <ListItem>Advertising networks</ListItem>
              <ListItem>Customer support tools</ListItem>
              <ListItem>Content delivery networks</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              We encourage you to read the privacy policy of every website you visit or third-party service you use 
              when you leave our Website. These third parties may have their own privacy policies that govern how they 
              collect, use, and disclose your information.
            </Text>
          </Box>
          
          {/* 10. Marketing Communications */}
          <Box w="full" id="marketing-communications">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              10. Marketing Communications
            </Heading>
            <Text fontSize="md" mb={4}>
              We may send you marketing communications about our products, services, events, and promotions that may be of interest 
              to you, including via SMS. You can opt out of receiving marketing communications from us at any time by:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Replying STOP to any SMS message we send</ListItem>
              <ListItem>Clicking the "unsubscribe" link in any marketing email we send</ListItem>
              <ListItem>Updating your communication preferences in your account settings</ListItem>
              <ListItem>Contacting us using the information provided in the "Contact Us" section below</ListItem>
            </UnorderedList>
            <Text fontSize="md" mb={4}>
              Please note that even if you opt out of marketing communications, we may still send you non-promotional messages 
              related to your account and the services you use, such as service announcements, administrative messages, and surveys.
            </Text>
            <Text fontSize="md" mb={4}>
              We will process your request to opt out as soon as possible, but please be aware that it may take up to 10 business 
              days to update our systems. During this time, you may continue to receive marketing communications that were already in process.
            </Text>
            <Box w="full">
              <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                SMS Text Messaging
              </Heading>
              <Text fontSize="md" mb={2}>
                We offer SMS updates and support. You may opt in by agreeing to SMS communications via our Website forms 
                (e.g., on our contact page). Messages may include service alerts, promotional offers, or responses to your inquiries, 
                sent from a number managed by our SMS provider. Standard message and data rates may apply. To stop receiving SMS, 
                reply STOP at any time to the number that sent the message.
              </Text>
            </Box>
          </Box>
          
          {/* 11. Cookies and Similar Technologies */}
          <Box w="full" id="cookies-technologies">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              11. Cookies and Similar Technologies
            </Heading>

            <Text fontSize="md" mb={4}>
              We use cookies and similar tracking technologies to track activity on our Website and store certain information. 
              Cookies are small text files that are stored on your device when you visit our Website. They help us recognize 
              your browser and capture certain information.
            </Text>
            <Text fontSize="md" mb={4}>
              Non-essential cookies (e.g., analytics, advertising) are disabled by default and only activated upon your explicit consent via our cookie banner.
            </Text>
            <Text fontSize="md" mb={4}>
              We use the following types of cookies:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem><strong>Essential Cookies:</strong> Necessary for the Website to function properly.</ListItem>
              <ListItem><strong>Functional Cookies:</strong> Help us recognize you and remember your preferences.</ListItem>
              <ListItem><strong>Analytics Cookies:</strong> Allow us to analyze how users interact with our Website.</ListItem>
              <ListItem><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track campaign performance.</ListItem>
            </UnorderedList>
            <Text fontSize="md" mb={4}>
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. 
              If you disable or refuse cookies, please note that some parts of this Website may become inaccessible or not function properly.
            </Text>
            <Text fontSize="md">
              For more detailed information about the cookies we use and how you can manage them, please refer to our 
              <Link color="red.500" href="/cookie" ml={1}>Cookie Policy</Link>.
            </Text>
          </Box>
          
          {/* 12. Changes to This Privacy Policy */}
          <Box w="full" id="policy-changes">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              12. Changes to This Privacy Policy
            </Heading>
            <Text fontSize="md" mb={4}>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, 
              or other factors. When we make material changes to this Privacy Policy, we will notify you by:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Updating the "Last Updated" date at the top of this Privacy Policy</ListItem>
              <ListItem>Posting a notice on our Website</ListItem>
              <ListItem>Sending an email to registered users (for significant changes)</ListItem>
              <ListItem>Obtaining your consent when required by applicable law</ListItem>
            </UnorderedList>
            <Text fontSize="md" mb={4}>
              We encourage you to review this Privacy Policy periodically to stay informed about our data practices. 
              Your continued use of our Website and services after any changes to this Privacy Policy constitutes your 
              acceptance of the updated policy.
            </Text>
            <Text fontSize="md">
              For archived versions of our Privacy Policy, please contact us using the information provided in the "Contact Us" section below.
            </Text>
          </Box>
          
          {/* 13. Dispute Resolution */}
          <Box w="full" id="dispute-resolution">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              13. Dispute Resolution
            </Heading>
            <Text fontSize="md" mb={4}>
              If you have a complaint about our privacy practices, please contact us first using the information provided 
              in the "Contact Us" section below. We will investigate and attempt to resolve complaints and disputes regarding 
              the use and disclosure of personal information in accordance with this Privacy Policy.
            </Text>
            <Text fontSize="md" mb={4}>
              For users in the European Union, you have the right to lodge a complaint with your local data protection authority 
              if you are unsatisfied with our response. For users in the United States, depending on your state of residence, 
              you may have additional rights and remedies available under state laws.
            </Text>
            <Text fontSize="md">
              Additionally, if we are unable to resolve your complaint through our internal processes, we commit to cooperating 
              with the relevant regulatory authorities, dispute resolution providers, or data protection authorities to resolve the complaint.
            </Text>
          </Box>
          
          {/* 14. Contact Us */}
          <Box w="full" id="contact-us">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              14. Contact Us
            </Heading>
            <Text fontSize="md" mb={4}>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us at:
            </Text>
            <VStack align="start" spacing={2} pl={4}>
              <Text><strong>Privacy Team Email:</strong> privacy@luxuryverse.com</Text>
              <Text><strong>Address:</strong> 99 Wall St Suite 5660, New York, NY 10005, USA</Text>
              <Text><strong>Phone:</strong> +1 (855) 440-2242 </Text>
              <Text><strong>Support Hours:</strong> Monday to Friday, 9:00 AM to 5:00 PM EST</Text>
            </VStack>
            <Text fontSize="md" mt={4}>
              For formal privacy requests, such as data access, correction, or deletion requests, please use our dedicated 
              form available at <Link color="red.500" href="https://luxuryverse.com/privacy-request">luxuryverse.com/privacy-request</Link>.
            </Text>
            <Text fontSize="md" mt={4}>
              We will respond to your request within the timeframe required by applicable law, typically within 30 days. 
              In some cases, we may need additional information to verify your identity before processing your request.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default PrivacyPolicyPage;