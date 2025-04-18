import { Flex, Heading } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function TopNav() {
  const { user, isJoining } = useContext(AuthContext);
  const navigate = useNavigate();

  const getAuthLinkProps = () => {
    if (user) {
      return {
        text: 'Profile',
        to: '/profile',
      };
    }
    return {
      text: isJoining ? 'Join' : 'Login',
      to: '/join',
    };
  };

  const { text, to } = getAuthLinkProps();

  return (
    <Flex
      bg="rgba(10, 10, 10, 0.5)"
      p={4}
      justify="center"
      width="100%"
      top={0}
      zIndex={10}
      mt={{ base: '2rem', md: 0 }}
    >
      <Flex
        maxW="80rem"
        width="100%"
        px={{ base: '1rem', md: '1rem' }}
        justify={{ base: 'space-between', md: 'space-between' }}
        align="flex-start" // Avoid centering with logo
        direction={{ base: 'row', md: 'row' }}
        gap={{ base: 2, md: 4 }}
      >
        <Heading
          size="md"
          color="var(--color-primary)"
          fontFamily="'Special Gothic Expanded One', sans-serif"
          lineHeight="1"
        >
          <Link to="/" className="luxuryverse-logo">
            LuxuryVerse
          </Link>
        </Heading>
        <Flex
          gap={4}
          flexWrap="wrap"
          justify="center"
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/roadmap', label: 'Roadmap' },
            { to: '/authenticity', label: 'Authenticity' },
            { to: '/faq', label: 'FAQ' },
            { to: '/contact', label: 'Contact' },
            { to, label: text }, // Auth link (Profile/Login/Join)
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                color:
                  label === text
                    ? 'var(--color-primary-hover)' // Green for auth link
                    : 'var(--color-primary)', // Purple for others
                textDecoration: 'none',
                fontFamily: "'Special Gothic Expanded One', sans-serif",
                fontWeight: 'var(--font-weight-normal)', // Same weight for all
                textTransform: 'uppercase', // All caps
              }}
              _hover={{
                color: 'var(--color-primary-hover)', // Green on hover
              }}
              onClick={() => navigate({ to })}
            >
              {label}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}