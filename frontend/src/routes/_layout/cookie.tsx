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

export const Route = createFileRoute('/_layout/cookie')({
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <Box>
      <Container maxW="1000px" mx="auto" px={4} py={16} color="gray.800">
        <VStack spacing={8} align="start" w="full">
          <Heading as="h1" size="xl" fontWeight="medium">
            Cookie Policy
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Last Updated: March 2025
          </Text>
          
          {/* Introduction */}
          <Box w="full">
            <Text fontSize="lg" mb={4}>
              This Cookie Policy explains how luxury verse ("we," "us," or "our") uses cookies and similar 
              technologies to recognize you when you visit our website at luxuryverse.com ("Website"). 
              It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </Text>
            <Text fontSize="lg">
              Please read this Cookie Policy carefully before using our Website. By using our Website, you consent 
              to our use of cookies as described in this policy. This document has been created to help our users understand 
              the various types of cookies, their purpose, and how users can control them while interacting with our website. 
              Our commitment to transparency ensures that we provide users with comprehensive and easily understandable information.
            </Text>
            <Text fontSize="lg" mb={4}>
              Cookies are integral to the functioning of modern websites, serving to improve user experience, enhance security, 
              and allow for more efficient navigation. They can also be used for marketing purposes to offer a personalized 
              browsing experience. However, we recognize the importance of privacy and offer full transparency regarding 
              our cookie usage. We also give you control over how your personal information is used, including the ability to 
              manage your cookie preferences at any time.
            </Text>
            <Text fontSize="lg">
              By accessing or using our Website, you acknowledge that you have read and understood the terms laid out in this 
              Cookie Policy, including how we collect and use cookies, as well as your rights and choices. For any further 
              questions or concerns regarding your privacy, please refer to the "Contact Us" section at the end of this policy. 
              We value your trust and aim to provide a secure and transparent online experience.
            </Text>
          </Box>
          
          <Divider />
          
          {/* 1. What Are Cookies */}
          <Box w="full" id="what-are-cookies">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              1. What Are Cookies
            </Heading>
            <Text fontSize="md" mb={4}>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the owners of the site. 
              When you access a website, cookies allow that site to recognize your device, saving you from having to log in repeatedly, 
              remembering language preferences, and offering other features to enhance your browsing experience.
            </Text>
            <Text fontSize="md" mb={4}>
              Cookies help us:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Make our Website function as you expect</ListItem>
              <ListItem>Remember your settings during and between visits</ListItem>
              <ListItem>Improve the speed and security of the site</ListItem>
              <ListItem>Allow you to share pages with social networks</ListItem>
              <ListItem>Continuously improve our Website for you</ListItem>
              <ListItem>Make our marketing more efficient</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              Cookies are not the only way to recognize or track visitors to a website. We may use other, similar 
              technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). 
              These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has 
              visited our Website or opened an email we sent them. Web beacons are used to improve website functionality and 
              gain insights into user behavior, ensuring that we continue to refine and adapt our content to meet the needs 
              of our visitors.
            </Text>
          </Box>
          
          {/* 2. How We Use Cookies */}
          <Box w="full" id="how-we-use-cookies">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              2. How We Use Cookies
            </Heading>
            <Text fontSize="md" mb={4}>
              We use cookies for several reasons. Some cookies are required for technical reasons in order for our 
              Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies 
              enable us to track and target the interests of our users to enhance the experience on our Website. Cookies 
              allow us to remember your preferences and help us optimize the design and content of our site to better 
              suit your needs and interests. 
            </Text>
            <Text fontSize="md" mb={4}>
              The specific types of first and third-party cookies served through our Website and the purposes they perform 
              are described below:
            </Text>
            <VStack align="start" spacing={6} pl={4} mb={4} w="full">
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Essential Cookies
                </Heading>
                <Text fontSize="md" mb={2}>
                  These cookies are strictly necessary to provide you with services available through our Website and to use some of 
                  its features, such as access to secure areas. Without these cookies, services you have asked for cannot be provided. 
                  Essential cookies are typically set in response to actions made by you, such as logging in or filling out forms. 
                  These cookies ensure the basic functionality and security of our website, enabling you to navigate securely.
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Example: Session cookies for maintaining user authentication during an active session.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Performance & Analytics Cookies
                </Heading>
                <Text fontSize="md" mb={2}>
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. 
                  They help us to know which pages are the most and least popular and see how visitors move around the site. 
                  This data helps us make informed decisions on how to improve user experience and optimize the website layout 
                  and functionality. We may also use these cookies for conducting research into site performance and user behavior.
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Example: Google Analytics cookies to track user behavior and engagement on the website.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Functionality Cookies
                </Heading>
                <Text fontSize="md" mb={2}>
                  These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by 
                  third-party providers whose services we have added to our pages. Functionality cookies allow us to provide tailored 
                  content, such as personalized greetings or recommendations based on your past activities. This enhances your experience 
                  and makes the website more user-friendly. For instance, if you prefer a specific language, functionality cookies will 
                  ensure that the site remembers this preference across your sessions.
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Example: Cookies that remember your preferred language or region.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Targeting & Advertising Cookies
                </Heading>
                <Text fontSize="md" mb={2}>
                  These cookies may be set through our site by our advertising partners. They may be used by those companies to build a 
                  profile of your interests and show you relevant advertisements on other sites. These cookies allow us to provide more 
                  effective advertising that is tailored to your preferences, helping to support our website's free services. 
                  This type of cookie may also track how often ads are shown to users and their interactions with the ads. 
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Example: Cookies used for retargeting ads based on your browsing history and interests.
                </Text>
              </Box>
            </VStack>
          </Box>
          
          {/* 3. Types of Cookies We Use */}
          <Box w="full" id="cookie-types">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              3. Types of Cookies We Use
            </Heading>
            <Text fontSize="md" mb={4}>
              Based on the duration and their purpose, cookies can be classified into different categories. Understanding these distinctions helps you make informed decisions about your cookie preferences.
            </Text>
            <Text fontSize="md" mb={4}>
              By duration:
            </Text>
            <VStack align="start" spacing={3} pl={4} mb={4} w="full">
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Session Cookies
                </Heading>
                <Text fontSize="md">
                  These cookies are temporary and expire once you close your browser. They enable the website to recognize you as you navigate between pages during a single browser session, allowing you to use the website most efficiently. Without session cookies, each time you click on a link, the website would treat you as a completely new visitor.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Persistent Cookies
                </Heading>
                <Text fontSize="md">
                  These cookies remain on your device for a set period or until you delete them manually. They are activated each time you visit the website that created them. Persistent cookies help us remember your preferences and settings for future visits, analyze how you use our site, and in some cases, deliver advertising according to your browsing habits.
                </Text>
              </Box>
            </VStack>
            
            <Text fontSize="md" mb={4}>
              By origin:
            </Text>
            <VStack align="start" spacing={3} pl={4} mb={4} w="full">
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  First-Party Cookies
                </Heading>
                <Text fontSize="md">
                  These are cookies that are set by our website directly. They are used to make your experience on our site more efficient and to enable basic functionalities, such as remembering your login details or language preferences.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Third-Party Cookies
                </Heading>
                <Text fontSize="md">
                  These cookies are set by domains other than our website, such as analytics services, advertising networks, and social media platforms. They are used to integrate third-party features into our website or to gather data about your browsing habits for various purposes.
                </Text>
              </Box>
            </VStack>
          </Box>
          
          {/* 4. Specific Cookies We Use */}
          <Box w="full" id="specific-cookies">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              4. Specific Cookies We Use
            </Heading>
            <Text fontSize="md" mb={4}>
              The table below provides details about the specific cookies we use on our Website, their purpose, and their expiration time:
            </Text>
            <Text fontSize="md" mb={2}>
              These cookies may collect sensitive data like IP addresses for analytics, which you can opt out of via our consent tool.
            </Text>
            <Box overflowX="auto" w="full" mb={4}>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Cookie Name</Th>
                    <Th>Provider</Th>
                    <Th>Purpose</Th>
                    <Th>Expiration</Th>
                    <Th>Type</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>_ga</Td>
                    <Td>Google Analytics</Td>
                    <Td>Registers a unique ID to generate statistical data on website usage</Td>
                    <Td>2 years</Td>
                    <Td>
                      <Badge colorScheme="red">Analytics</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>_gid</Td>
                    <Td>Google Analytics</Td>
                    <Td>Registers a unique ID for tracking daily website usage</Td>
                    <Td>24 hours</Td>
                    <Td>
                      <Badge colorScheme="red">Analytics</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>_gat</Td>
                    <Td>Google Analytics</Td>
                    <Td>Used to throttle request rate</Td>
                    <Td>1 minute</Td>
                    <Td>
                      <Badge colorScheme="red">Analytics</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>JSESSIONID</Td>
                    <Td>luxury verse</Td>
                    <Td>Preserves user session state across page requests</Td>
                    <Td>Session</Td>
                    <Td>
                      <Badge colorScheme="green">Essential</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>cookie_consent</Td>
                    <Td>luxury verse</Td>
                    <Td>Stores your cookie consent preferences</Td>
                    <Td>1 year</Td>
                    <Td>
                      <Badge colorScheme="green">Essential</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>language_pref</Td>
                    <Td>luxury verse</Td>
                    <Td>Remembers user language preference</Td>
                    <Td>1 year</Td>
                    <Td>
                      <Badge colorScheme="purple">Functionality</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>_fbp</Td>
                    <Td>Facebook</Td>
                    <Td>Used by Facebook to deliver advertisements</Td>
                    <Td>3 months</Td>
                    <Td>
                      <Badge colorScheme="orange">Advertising</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>_lipt</Td>
                    <Td>LinkedIn</Td>
                    <Td>Used for tracking LinkedIn Insight conversions</Td>
                    <Td>1 month</Td>
                    <Td>
                      <Badge colorScheme="orange">Advertising</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>hubspotutk</Td>
                    <Td>HubSpot</Td>
                    <Td>Used to track visitors across HubSpot's services</Td>
                    <Td>13 months</Td>
                    <Td>
                      <Badge colorScheme="red">Analytics</Badge>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
            <Text fontSize="md">
              This list may not be exhaustive, as we may add or remove cookies as we improve and update our Website. We will update this Cookie Policy accordingly when significant changes are made to our cookie usage.
            </Text>
          </Box>
          
          {/* 5. Third-Party Cookies */}
          <Box w="full" id="third-party-cookies">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              5. Third-Party Cookies
            </Heading>
            <Text fontSize="md" mb={4}>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics 
              of the Website, deliver advertisements on and through the Website, and so on. These third-party cookies may 
              collect data across multiple websites and online services to provide more personalized content and ads. 
              This may include interactions with our site and ads you see on other platforms. These services allow us to integrate 
              additional functionalities into the website, enhancing the overall user experience.
            </Text>
            <Text fontSize="md" mb={4}>
              Third-party services we use that may set cookies include:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem><strong>Google Analytics:</strong> Web analytics service that tracks user behavior across websites.</ListItem>
              <ListItem><strong>Google Ads:</strong> Online advertising platform for delivering personalized ads.</ListItem>
              <ListItem><strong>LinkedIn:</strong> Professional networking and marketing platform for user engagement.</ListItem>
              <ListItem><strong>HubSpot:</strong> Marketing and CRM platform used for customer relationship management and tracking.</ListItem>
              <ListItem><strong>Facebook:</strong> Social media platform for creating targeted advertisements.</ListItem>
              <ListItem><strong>Twitter:</strong> Social media platform providing marketing and analytics services.</ListItem>
              <ListItem><strong>Hotjar:</strong> Analytics and feedback platform that helps understand user behavior.</ListItem>
              <ListItem><strong>Intercom:</strong> Customer messaging platform for support and engagement.</ListItem>
              <ListItem><strong>Zendesk:</strong> Customer service platform for support operations.</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              Each of these services is governed by their own privacy policies. We encourage you to review the privacy policies 
              of these third-party services to understand how they collect, use, and share your information. We are not responsible 
              for their privacy practices, so it is essential that you review their policies to make informed decisions.
            </Text>
          </Box>
          
          {/* 6. How to Manage Cookies */}
          <Box w="full" id="cookie-management">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              6. How to Manage Cookies
            </Heading>
            <Text fontSize="md" mb={4}>
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. 
              If you disable or refuse cookies, please note that some parts of the Website may become inaccessible or not function properly. 
              This may affect your ability to log into secure sections of our site or use personalized features and services.
            </Text>
            <Text fontSize="md" mb={4}>
              Browser controls for cookies vary from browser to browser. Please consult the documentation for your specific browser:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem><Link color="red.500" href="https://support.google.com/chrome/answer/95647" isExternal>Google Chrome</Link></ListItem>
              <ListItem><Link color="red.500" href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" isExternal>Mozilla Firefox</Link></ListItem>
              <ListItem><Link color="red.500" href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" isExternal>Apple Safari</Link></ListItem>
              <ListItem><Link color="red.500" href="https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies" isExternal>Microsoft Edge</Link></ListItem>
            </UnorderedList>
            <Text fontSize="md" mb={4}>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. For more information, please visit:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem><Link color="red.500" href="http://www.aboutads.info/choices/" isExternal>Digital Advertising Alliance</Link></ListItem>
              <ListItem><Link color="red.500" href="https://www.youronlinechoices.com" isExternal>Your Online Choices (EU)</Link></ListItem>
            </UnorderedList>
          </Box>
          
          {/* 7. Our Cookie Consent Tool */}
          <Box w="full" id="cookie-consent-tool">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              7. Our Cookie Consent Tool
            </Heading>
            <Text fontSize="md" mb={4}>
              When you first visit our Website, you will be presented with a cookie consent banner that allows you to accept or decline different categories of cookies. This tool is designed to give you control over the cookies stored on your device and to ensure that we comply with applicable data protection regulations.
            </Text>
            <Text fontSize="md" mb={4}>
              Through our cookie consent tool, you can:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Accept all cookies</ListItem>
              <ListItem>Accept only essential cookies</ListItem>
              <ListItem>Customize your cookie preferences by category</ListItem>
              <ListItem>Review detailed information about each cookie we use</ListItem>
              <ListItem>Change your preferences at any time</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              You can access the cookie consent tool at any time by clicking on the "Cookie Settings" link in the footer of our Website. This allows you to review and update your preferences whenever you wish. Please note that essential cookies cannot be declined as they are necessary for the website to function properly.
            </Text>
            <Text fontSize="md" mt={4}>
            California residents can also opt out of targeted advertising cookies at{" "}
            <Link href="/do-not-sell" color="red.500" textDecoration="underline">
              luxuryverse.com/do-not-sell
            </Link>.
</Text>
          </Box>
          
          {/* 8. Cookie Lifecycle */}
          <Box w="full" id="cookie-lifecycle">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              8. Cookie Lifecycle
            </Heading>
            <Text fontSize="md" mb={4}>
              The lifecycle of cookies varies depending on their type and purpose. Understanding how long cookies persist can help you make informed decisions about cookie management.
            </Text>
            <Text fontSize="md" mb={4}>
              Cookie lifecycles typically fall into these categories:
            </Text>
            <VStack align="start" spacing={3} pl={4} mb={4} w="full">
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Transient Cookies
                </Heading>
                <Text fontSize="md">
                  These cookies are temporary and are erased when you close your browser. They are essential for enabling specific functionalities during your browsing session.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Short-Term Cookies
                </Heading>
                <Text fontSize="md">
                  These cookies typically last from a few hours to a few days. They are often used for short-term tracking of user activities and preferences.
                </Text>
              </Box>
              
              <Box w="full">
                <Heading as="h3" size="md" fontWeight="medium" mb={2}>
                  Long-Term Cookies
                </Heading>
                <Text fontSize="md">
                  These cookies can persist for months or even years. They are used to remember recurring visitors and their preferences over extended periods.
                </Text>
              </Box>
            </VStack>
            <Text fontSize="md">
              We regularly review and clean our cookie database to ensure we're not storing unnecessary cookies for longer than required. Each cookie has a specific purpose and lifespan, as outlined in our comprehensive cookie list in section 4.
            </Text>
          </Box>
          
          {/* 9. Cookie Security */}
          <Box w="full" id="cookie-security">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              9. Cookie Security
            </Heading>
            <Text fontSize="md" mb={4}>
              We take the security of cookies and all data stored through them very seriously. We implement several measures to ensure that cookies are handled securely and that your personal information is protected.
            </Text>
            <Text fontSize="md" mb={4}>
              Our cookie security practices include:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Using secure flag for all cookies containing sensitive information, ensuring they are only transmitted over secure HTTPS connections</ListItem>
              <ListItem>Implementing HTTP-only flags for session cookies to prevent access by JavaScript, protecting against cross-site scripting attacks</ListItem>
              <ListItem>Setting appropriate domain and path attributes to limit cookie scope</ListItem>
              <ListItem>Regular security audits of our cookie practices</ListItem>
              <ListItem>Ensuring that third-party service providers adhere to strong security standards</ListItem>
              <ListItem>Encrypting sensitive cookie data where appropriate</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              While we implement these security measures, it's important to remember that no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal information, but we cannot guarantee its absolute security.
            </Text>
          </Box>
          
          {/* 10. International Data Transfers */}
          <Box w="full" id="international-transfers">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              10. International Data Transfers
            </Heading>
            <Text fontSize="md" mb={4}>
              The information collected through cookies may be transferred, stored, and processed in any country where we operate or where our service providers maintain facilities. This means that cookie data may be transferred to and processed in countries outside your country of residence, which may have different data protection rules than your country.
            </Text>
            <Text fontSize="md" mb={4}>
              For transfers from the European Economic Area (EEA) to countries not considered adequate by the European Commission, we implement appropriate safeguards, such as:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Standard Contractual Clauses approved by the European Commission</ListItem>
              <ListItem>Binding Corporate Rules for transfers within our group of companies</ListItem>
              <ListItem>Participation in approved certification mechanisms like the EU-US Data Privacy Framework</ListItem>
              <ListItem>Obtaining your explicit consent for certain transfers</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              By using our Website, you acknowledge that your information may be transferred to our facilities and to those third parties with whom we share it, as described in this Cookie Policy. We take all necessary steps to ensure that your data is treated securely and in accordance with applicable data protection laws, regardless of where it is processed.
            </Text>
          </Box>
          
          {/* 11. Children's Privacy */}
          <Box w="full" id="childrens-privacy">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              11. Children's Privacy
            </Heading>
            <Text fontSize="md" mb={4}>
              Our Website is not intended for children under the age of 16, and we do not knowingly collect personal information from children under 16 through cookies or other means. We are committed to protecting the privacy of children and complying with applicable laws concerning children's data.
            </Text>
            <Text fontSize="md" mb={4}>
              If you are a parent or guardian and believe that your child has provided us with personal information through our Website, please contact us immediately. If we become aware that we have collected personal information from children without verification of parental consent, we will take steps to remove that information from our servers.
            </Text>
            <Text fontSize="md">
              When users identified as under 16 years of age access our Website, we automatically implement a limited cookie policy that only uses essential cookies necessary for the website to function. No analytics, advertising, or tracking cookies are used for these users, and no personal data is collected for marketing or profiling purposes.
            </Text>
          </Box>
          
          {/* 12. Do Not Track Signals */}
          <Box w="full" id="do-not-track">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              12. Do Not Track Signals
            </Heading>
            <Text fontSize="md" mb={4}>
              "Do Not Track" (DNT) is a preference you can set in your web browser to inform websites that you do not want to be tracked. You can enable or disable DNT by visiting the Preferences or Settings page of your web browser.
            </Text>
            <Text fontSize="md" mb={4}>
              We respect your privacy choices and respond to DNT signals in the following ways:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>When we detect a DNT signal from your browser, we automatically disable all non-essential cookies</ListItem>
              <ListItem>Analytics cookies will be set to anonymize your data and not store any personally identifiable information</ListItem>
              <ListItem>Advertising and targeting cookies will not be set at all</ListItem>
              <ListItem>Your browsing activity will not be used to create user profiles or personalized advertising</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              While we do our best to honor DNT signals, please note that some third-party services we use may not honor DNT signals. We encourage you to review the privacy policies of these third parties to understand their tracking practices. For complete control over tracking, you can use our cookie consent tool to explicitly specify your preferences.
            </Text>
          </Box>
          
          {/* 13. Updates to This Policy */}
          <Box w="full" id="policy-updates">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              13. Updates to This Policy
            </Heading>
            <Text fontSize="md" mb={4}>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use 
              or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to 
              stay informed about our use of cookies and related technologies.
            </Text>
            <Text fontSize="md" mb={4}>
              When we make significant updates to this policy, we will:
            </Text>
            <UnorderedList pl={6} spacing={2} mb={4}>
              <ListItem>Update the "Last Updated" date at the top of this page</ListItem>
              <ListItem>Place a notice on our Website informing users of important changes</ListItem>
              <ListItem>For material changes, send email notifications to registered users where appropriate</ListItem>
              <ListItem>May request renewed consent for cookie usage if our practices change substantially</ListItem>
              <ListItem>Archive previous versions of this policy for reference</ListItem>
            </UnorderedList>
            <Text fontSize="md">
              The date at the top of this Cookie Policy indicates when it was last updated. Should any material changes occur, 
              we will notify users through appropriate channels, such as a website banner or email, to ensure transparency.
              We encourage you to periodically review this Cookie Policy to stay informed about how we are protecting and using cookie data.
            </Text>
          </Box>
          
          {/* 14. Contact Us */}
          <Box w="full" id="contact-us">
            <Heading as="h2" size="lg" fontWeight="medium" mb={4}>
              14. Contact Us
            </Heading>
            <Text fontSize="md" mb={4}>
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
            </Text>
            <VStack align="start" spacing={2} pl={4}>
              <Text><strong>Email:</strong> privacy@luxuryverse.com</Text>
              <Text><strong>Address:</strong> 99 Wall St Suite 5660, New York, NY 10005, USA</Text>
              <Text><strong>Phone:</strong> +1 (855) 440-2242</Text>
              <Text><strong>Support Hours:</strong> Monday to Friday, 9:00 AM to 5:00 PM EST</Text>
            </VStack>
            <Text fontSize="md" mt={4}>
              For urgent privacy concerns or cookie-related issues, please contact our dedicated privacy team via email. 
              We aim to respond to all inquiries within 48 hours during business days. For formal privacy requests, such as data access or 
              deletion requests, please use our dedicated form available at <Link color="red.500" href="https://luxuryverse.com/privacy-request">luxuryverse.com/privacy-request</Link>.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default CookiePolicyPage;