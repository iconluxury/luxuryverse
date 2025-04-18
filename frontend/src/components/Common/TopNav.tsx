import { Flex, Heading, Button } from '@chakra-ui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useContext } from 'react'; // Ensure useContext is imported
import { AuthContext } from './AuthContext';

export default function TopNav() {
  const { user, isJoining } = useContext(AuthContext);
  const navigate = useNavigate();

  const getButtonProps = () => {
    if (user) {
      return {
        text: 'Profile',
        onClick: () => navigate({ to: '/profile' }),
        bg: 'var(--color-primary)',
        color: 'var(--color-background)',
        _hover: { bg: 'var(--color-primary-hover)' },
      };
    }
    return {
      text: isJoining ? 'Join' : 'Login',
      onClick: () => navigate({ to: '/join' }),
      bg: 'var(--color-primary)',
      color: 'var(--color-background)',
      _hover: { bg: 'var(--color-primary-hover)' },
    };
  };

  const { text, onClick, bg, color, _hover } = getButtonProps();

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
        align="center"
        direction={{ base: 'row', md: 'row' }}
        gap={{ base: 2, md: 4 }}
      >
        <Heading
          size="md"
          color="var(--color-primary)"
          fontFamily="'Special Gothic Expanded One', sans-serif"
        >
          <Link to="/" className="luxuryverse-logo">
            LuxuryVerse
          </Link>
        </Heading>
        <Flex
          gap={4}
          alignItems="center"
          flexWrap="wrap"
          justify="center"
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/roadmap', label: 'Roadmap' },
            { to: '/authenticity', label: 'Authenticity' },
            { to: '/faq', label: 'FAQ' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                color: 'var(--color-primary)',
                textDecoration: 'none',
                fontFamily: "'Special Gothic Expanded One', sans-serif",
              }}
              _hover={{
                color: 'var(--color-primary-hover)',
              }}
            >
              {label}
            </Link>
          ))}
        </Flex>
        <Button
          onClick={onClick}
          bg={bg}
          color={color}
          _hover={_hover}
          borderRadius="md"
          px={4}
          py={2}
          fontWeight="medium"
          size="sm"
          fontFamily="'DM Sans', sans-serif"
        >
          {text}
        </Button>
      </Flex>
    </Flex>
  );
}