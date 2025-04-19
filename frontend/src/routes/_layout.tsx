import { Flex } from "@chakra-ui/react";
import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import TopNav from "../components/Common/TopNav";
import CookieConsent from "react-cookie-consent";
import { TrackPageViews } from "../components/TrackPageViews";
import theme from "../theme";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/_layout")({
  component: Layout,
});

function Layout() {
  const [consentGiven, setConsentGiven] = useState(
    document.cookie.includes("luxuryverse-consent=true")
  );
  const [gtagLoaded, setGtagLoaded] = useState(!!window.gtag);

  useEffect(() => {
    if (!window.gtag) {
      const checkGtag = () => {
        if (window.gtag) {
          setGtagLoaded(true);
          clearInterval(interval);
        }
      };
      const interval = setInterval(checkGtag, 100);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const handleConsentChange = () => {
      const granted = document.cookie.includes("luxuryverse-consent=true");
      if (granted !== consentGiven) {
        setConsentGiven(granted);
      }
    };
    window.addEventListener("storage", handleConsentChange);
    window.addEventListener("consentChange", handleConsentChange);
    handleConsentChange();
    return () => {
      window.removeEventListener("storage", handleConsentChange);
      window.removeEventListener("consentChange", handleConsentChange);
    };
  }, [consentGiven]);

  return (
    <Flex direction="column" minH="100vh" w="100%">
      <TopNav />
      <TrackPageViews consentGiven={consentGiven} />
      <Flex flex="1" direction="column" maxW="1200px" mx="auto" w="100%">
        <Outlet />
      </Flex>
      {!consentGiven && (
        <CookieConsent
          location="bottom"
          cookieName="luxuryverse-consent"
          enableDeclineButton
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            color: theme.colors.white || "#FFFFFF",
            padding: "2px",
            fontSize: "12px",
            zIndex: 9999,
            fontFamily: "'Special Gothic Expanded One', sans-serif",
            textTransform: "uppercase",
            textAlign: "center",
          }}
          buttonStyle={{
            background: "transparent",
            color: theme.colors.green[500] || "#00FF00",
            fontSize: "12px",
            fontFamily: "'Special Gothic Expanded One', sans-serif",
            textTransform: "uppercase",
            textDecoration: "underline",
            padding: "4px 8px",
            fontWeight: "normal",
          }}
          declineButtonStyle={{
            background: "transparent",
            color: theme.colors.white || "#FFFFFF",
            fontSize: "12px",
            fontFamily: "'Special Gothic Expanded One', sans-serif",
            textTransform: "uppercase",
            textDecoration: "underline",
            padding: "4px 8px",
            fontWeight: "normal",
          }}
          buttonText="Accept"
          declineButtonText="Decline"
          expires={150}
          onAccept={() => {
            console.log("Accept clicked");
            if (gtagLoaded && window.gtag) {
              window.gtag("consent", "update", {
                ad_user_data: "granted",
                ad_personalization: "granted",
                ad_storage: "granted",
                analytics_storage: "granted",
                functionality_storage: "granted",
                security_storage: "granted",
              });
              console.log("Consent updated, sending page view");
              window.gtag("event", "page_view", {
                page_path: window.location.pathname,
                send_to: "G-6KMK7YJL5N",
              });
            } else {
              console.error("gtag not loaded yet");
            }
            setConsentGiven(true);
            window.dispatchEvent(new Event("consentChange"));
          }}
          onDecline={() => {
            console.log("Cookies declined");
            if (gtagLoaded && window.gtag) {
              window.gtag("consent", "update", {
                ad_user_data: "denied",
                ad_personalization: "denied",
                ad_storage: "denied",
                analytics_storage: "denied",
                functionality_storage: "denied",
                security_storage: "granted",
              });
            }
            setConsentGiven(false);
            window.dispatchEvent(new Event("consentChange"));
          }}
        >
      Cookies are essential for site functionality. Read about{" "}
          <Link
            to="/cookies"
            style={{ 
              color: theme.colors.green[500] || "#00FF00", 
              textDecoration: "underline",
              fontFamily: "'Special Gothic Expanded One', sans-serif",
              textTransform: "uppercase",
              fontSize: "12px",
            }}
          >
            Cookies
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy-policy"
            style={{ 
              color: theme.colors.green[500] || "#00FF00", 
              textDecoration: "underline",
              fontFamily: "'Special Gothic Expanded One', sans-serif",
              textTransform: "uppercase",
              fontSize: "12px",
            }}
          >
            Privacy
          </Link>
        </CookieConsent>
      )}
    </Flex>
  );
}