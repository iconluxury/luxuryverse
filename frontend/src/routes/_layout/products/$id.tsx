import { useState, useEffect, useMemo, Component, ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Tag,
  HStack,
  Divider,
  Spinner,
  IconButton,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { createFileRoute, useParams, Link } from '@tanstack/react-router';
import { TimeIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Helmet } from 'react-helmet-async';
import Footer from '../../../components/Common/Footer';

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" py={16} color="red.500">
          <Text fontSize="lg">Something went wrong. Please try again later.</Text>
        </Box>
      );
    }
    return this.props.children;
  }
}

export const Route = createFileRoute('/_layout/products/$id')({
  component: ProductDetailsWrapper,
});

interface Variant {
  id: string;
  title: string;
  size: string;
  inventory_quantity: number;
  price: string;
  compare_at_price: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  thumbnail: string;
  images: string[];
  variants: Variant[];
  full_price: string;
  sale_price: string;
  discount: string | null;
  collection_id?: string;
}

const ALLOWED_TAGS = ['div', 'span', 'p', 'strong', 'em', 'ul', 'li', 'ol'];
const ALLOWED_ATTRIBUTES = ['class', 'style'];
const ALLOWED_STYLES = {
  color: /^#(0x)?[0-9a-f]+$/i,
  'text-align': /^left$|^right$|^center$/,
  'font-size': /^\d+(?:px|em|rem|%)$/,
};

interface HtmlNode {
  type: 'element' | 'text';
  tag?: string;
  attributes?: Record<string, string>;
  children?: HtmlNode[];
  content?: string;
}

function parseHtml(html: string): React.ReactNode {
  if (!html || typeof html !== 'string') {
    return <Text fontSize="lg" color="gray.700" mb={4}>No description available</Text>;
  }

  try {
    const tokens: string[] = [];
    let current = '';
    let inTag = false;
    let inComment = false;

    for (let i = 0; i < html.length; i++) {
      if (html[i] === '<' && html.slice(i, i + 4) === '<!--') {
        inComment = true;
        i += 3;
        continue;
      }
      if (inComment && html.slice(i, i + 3) === '-->') {
        inComment = false;
        i += 2;
        continue;
      }
      if (inComment) continue;

      if (html[i] === '<' && !inTag) {
        if (current) tokens.push(current);
        current = '<';
        inTag = true;
      } else if (html[i] === '>' && inTag) {
        current += '>';
        tokens.push(current);
        current = '';
        inTag = false;
      } else {
        current += html[i];
      }
    }
    if (current) tokens.push(current);

    function parseTokens(tokens: string[], index: { value: number }): HtmlNode[] {
      const nodes: HtmlNode[] = [];

      while (index.value < tokens.length) {
        const token = tokens[index.value].trim();
        index.value++;

        if (!token) continue;

        if (token.startsWith('</')) {
          return nodes;
        } else if (token.startsWith('<') && token.endsWith('>')) {
          const tagMatch = token.match(/^<([a-zA-Z][a-zA-Z0-9]*)([^>]*)>$/);
          if (!tagMatch) continue;

          const [, tag, attrString] = tagMatch;
          if (!ALLOWED_TAGS.includes(tag.toLowerCase())) {
            const children = parseTokens(tokens, index);
            nodes.push(...children);
            continue;
          }

          const attributes: Record<string, string> = {};
          const attrMatches = attrString.matchAll(/([a-zA-Z-]+)(?:="([^"]*)")?/g);
          for (const match of attrMatches) {
            const [, name, value = ''] = match;
            if (ALLOWED_ATTRIBUTES.includes(name.toLowerCase())) {
              if (name === 'style') {
                const styleProps = value
                  .split(';')
                  .filter(Boolean)
                  .map((prop) => prop.trim().split(':').map((s) => s.trim()));
                const validStyles = styleProps
                  .filter(([key, val]) => ALLOWED_STYLES[key]?.test(val))
                  .map(([key, val]) => `${key}: ${val}`);
                if (validStyles.length) {
                  attributes.style = validStyles.join('; ');
                }
              } else {
                attributes[name.toLowerCase()] = value;
              }
            }
          }

          const children = parseTokens(tokens, index);
          nodes.push({
            type: 'element',
            tag: tag.toLowerCase(),
            attributes,
            children,
          });
        } else {
          nodes.push({
            type: 'text',
            content: token
              .replace(/</g, '<')
              .replace(/>/g, '>')
              .replace(/&/g, '&')
              .replace(/"/g, '"'),
          });
        }
      }

      return nodes;
    }

    const nodes = parseTokens(tokens, { value: 0 });

    function nodesToReact(nodes: HtmlNode[]): React.ReactNode[] {
      return nodes
        .map((node, index) => {
          if (node.type === 'text') {
            return node.content ? (
              <Text key={index} as="span" fontSize="lg" color="gray.700">
                {node.content}
              </Text>
            ) : null;
          }
          if (node.type === 'element' && node.tag) {
            const props: Record<string, any> = {
              fontSize: 'lg',
              color: 'gray.700',
              mb: 2,
              ...node.attributes,
            };
            if (node.tag === 'ul' || node.tag === 'ol') {
              props.as = node.tag;
            } else if (node.tag === 'li') {
              props.as = 'li';
            } else {
              props.as = 'div';
            }
            return (
              <Text key={index} {...props}>
                {node.children ? nodesToReact(node.children) : null}
              </Text>
            );
          }
          return null;
        })
        .filter(Boolean);
    }

    const reactNodes = nodesToReact(nodes);
    return reactNodes.length > 0 ? reactNodes : <Text fontSize="lg" color="gray.700" mb={4}>No description available</Text>;
  } catch (err) {
    console.error('Error parsing HTML:', err, 'HTML:', html);
    return <Text fontSize="lg" color="gray.700" mb={4}>Failed to parse description</Text>;
  }
}

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const [topProductsLoading, setTopProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const API_BASE_URL = process.env.API_BASE_URL || 'https://iconluxury.shop';
  const { id } = useParams({ from: '/_layout/products/$id' });
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    const fetchWithRetry = async (url: string, retryCount = 6) => {
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000);
          const response = await fetch(url, {
            signal: controller.signal,
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'omit',
          });
          clearTimeout(timeoutId);

          if (!response.ok) {
            if (response.status === 404) throw new Error('Resource not found.');
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return await response.json();
        } catch (err: any) {
          if (err.name === 'AbortError') {
            err.message = 'Request timed out after 30s.';
          }
          if (attempt === retryCount) {
            throw err;
          }
          await new Promise((resolve) => setTimeout(resolve, Math.min(1000 * 2 ** attempt, 10000)));
        }
      }
    };

    const fetchProduct = async () => {
      try {
        const productData = await fetchWithRetry(`${API_BASE_URL}/api/v1/products/${id}`);
        console.log('Fetched product data:', productData);
        if (!productData || typeof productData !== 'object') {
          throw new Error('Invalid product data received');
        }

        // Validate variants
        if (productData.variants && Array.isArray(productData.variants)) {
          productData.variants = productData.variants
            .filter((v: Variant) => {
              const isValid =
                v &&
                typeof v === 'object' &&
                typeof v.id === 'string' &&
                typeof v.size === 'string' &&
                typeof v.price === 'string' &&
                typeof v.inventory_quantity === 'number';
              if (!isValid) {
                console.warn('Invalid variant filtered:', v);
              }
              return isValid;
            })
            .map((v: Variant) => ({
              id: v.id,
              title: v.title || 'Unknown',
              size: v.size || 'N/A',
              inventory_quantity: typeof v.inventory_quantity === 'number' ? v.inventory_quantity : 0,
              price: v.price || 'N/A',
              compare_at_price: v.compare_at_price || '',
            }));
        } else {
          productData.variants = [];
        }
        setProduct(productData);
        setError(null);
      } catch (err: any) {
        setError(`Failed to load product: ${err.message || 'Unknown error'}`);
      } finally {
        setProductLoading(false);
      }
    };

    const fetchTopProducts = async () => {
      try {
        const topProductsUrl = `${API_BASE_URL}/api/v1/collections/488238383399`;
        const collectionData = await fetchWithRetry(topProductsUrl);
        console.log('Fetched collection products:', collectionData);

        if (!collectionData || !Array.isArray(collectionData.products)) {
          console.warn('Invalid collection data:', collectionData);
          setTopProducts([]);
          return;
        }

        // Validate and sort top products
        const validatedTopProducts = collectionData.products
          .filter(
            (p: Product) =>
              p &&
              typeof p === 'object' &&
              typeof p.id === 'string' &&
              typeof p.title === 'string' &&
              p.id !== id &&
              Array.isArray(p.variants)
          )
          .map((p: Product) => {
            const variants = Array.isArray(p.variants) ? p.variants : [];
            return {
              ...p,
              total_inventory: variants.reduce((sum: number, v: Variant) => {
                return sum + (typeof v.inventory_quantity === 'number' ? v.inventory_quantity : 0);
              }, 0),
              discount_value: p.discount
                ? parseFloat(p.discount.replace('% off', '')) || 0
                : 0,
            };
          })
          .sort((a, b) => {
            const aDiscount = a.discount_value || 0;
            const bDiscount = b.discount_value || 0;
            const aInventory = a.total_inventory || 0;
            const bInventory = b.total_inventory || 0;

            if (aDiscount !== bDiscount) {
              return bDiscount - aDiscount;
            }
            return bInventory - aInventory;
          })
          .slice(0, 5);

        console.log('Top 5 products:', validatedTopProducts);
        setTopProducts(validatedTopProducts);
      } catch (topErr: any) {
        console.warn('Failed to fetch top products:', topErr.message);
        setError((prev) => prev || `Failed to load top products: ${topErr.message || 'Unknown error'}`);
        setTopProducts([]);
      } finally {
        setTopProductsLoading(false);
      }
    };

    // Fetch product first, then top products
    fetchProduct().then(() => {
      if (!error) {
        fetchTopProducts();
      } else {
        setTopProductsLoading(false);
      }
    });
  }, [id, error]);

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  };

  const nextImage = () => {
    if (product?.images?.length) {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length) {
      setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const variantComponents = useMemo(() => {
    if (!product?.variants?.length) {
      return <Text fontSize="md" color="gray.500">No variants available</Text>;
    }
    return product.variants.map((variant, index) => {
      console.log('Rendering variant:', index, variant);
      return (
        <Box
          key={variant.id || `variant-${index}`}
          bg={variant.inventory_quantity > 0 ? 'gray.100' : 'red.100'}
          px={3}
          py={1}
          borderRadius="full"
          mb={2}
          fontSize="md"
        >
          Size {variant.size || 'N/A'} - {variant.price || 'N/A'}{' '}
          {variant.inventory_quantity > 0
            ? `(${variant.inventory_quantity} in stock)`
            : '(Out of stock)'}
        </Box>
      );
    });
  }, [product?.variants]);

  if (productLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="yellow.400" />
      </Flex>
    );
  }

  if (error || !product) {
    return (
      <Box textAlign="center" py={16} color={error ? 'red.500' : 'gray.700'}>
        <Text fontSize="lg" mb={4}>
          {error || `Product not found for ID: ${id}`}
        </Text>
        <Text fontSize="sm" mt={2}>
          Please check your network connection or contact{' '}
          <a href="mailto:support@iconluxury.shop" style={{ color: '#3182CE' }}>
            support@iconluxury.shop
          </a>.
        </Text>
        {topProducts.length > 0 && (
          <Box mt={4}>
            <Text fontSize="md" mb={2}>
              Explore our top products:
            </Text>
            <HStack spacing={2} flexWrap="wrap" justify="center">
              {topProducts.slice(0, 3).map((topProduct) => (
                <Link key={topProduct.id} to={`/products/${topProduct.id}`} style={{ color: '#3182CE' }}>
                  <Tag colorScheme="gray" m={1}>
                    {topProduct.title || 'Untitled Product'}
                  </Tag>
                </Link>
              ))}
            </HStack>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box>
      {isBrowser && (
        <Helmet>
          <title>{product.title || 'Product'} | Icon Luxury</title>
          <meta
            name="description"
            content={product.description ? stripHtml(product.description).slice(0, 160) : 'Product description'}
          />
        </Helmet>
      )}
      <Box py={16} bg="white">
        <Box maxW="800px" mx="auto" px={4}>
          <a
            href="/products"
            aria-label="Back to all products"
            style={{
              color: '#3182CE',
              fontWeight: 'medium',
              textDecoration: 'none',
              margin: '8px',
              display: 'block',
            }}
          >
            ← Back to all products
          </a>
          {product.images?.length > 0 ? (
            <Box position="relative">
              <Image
                src={product.images[currentImage] || 'https://placehold.co/275x350'}
                alt={`${product.title || 'Product'} image ${currentImage + 1}`}
                w="full"
                h="400px"
                objectFit="cover"
                borderRadius="md"
                mb={8}
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/275x350')}
              />
              {product.images.length > 1 && (
                <>
                  <IconButton
                    aria-label="Previous image"
                    icon={<ChevronLeftIcon />}
                    position="absolute"
                    left="8px"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={prevImage}
                  />
                  <IconButton
                    aria-label="Next image"
                    icon={<ChevronRightIcon />}
                    position="absolute"
                    right="8px"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={nextImage}
                  />
                </>
              )}
            </Box>
          ) : (
            <Skeleton w="full" h="400px" borderRadius="md" mb={8} />
          )}
          <Flex align="center" mb={4}>
            <Tag colorScheme="gray" mr={4} px={3} py={1} borderRadius="full">
              Product
            </Tag>
            <Text fontSize="sm" color="gray.500">{new Date().toLocaleDateString()}</Text>
            <Flex align="center" ml={4}>
              <TimeIcon mr={1} color="gray.500" boxSize={3} />
              <Text fontSize="sm" color="gray.500">{product.variants?.length || 0} variants</Text>
            </Flex>
            {product.discount && (
              <Tag colorScheme="green" ml={4} px={3} py={1} borderRadius="full">
                {product.discount}
              </Tag>
            )}
          </Flex>
          <Heading as="h1" size="2xl" mb={6} fontWeight="medium" lineHeight="1.3">
            {product.title || 'Untitled Product'}
          </Heading>
          <Text fontSize="xl" color="gray.700" mb={4}>
            {product.sale_price || 'N/A'}{' '}
            {product.full_price && <Text as="s" color="gray.500">{product.full_price}</Text>}
          </Text>
          {product.description ? parseHtml(product.description) : (
            <Text fontSize="lg" color="gray.700" mb={4}>
              No description available
            </Text>
          )}
          <Box mt={8}>
            <Heading as="h2" size="lg" mb={4}>
              Variants
            </Heading>
            <HStack spacing={2} flexWrap="wrap" maxW="100%" gap={2}>
              {variantComponents}
            </HStack>
          </Box>
          <Box mt={8}>
            <Heading as="h2" size="lg" mb={4}>
              Related Products
            </Heading>
            {topProductsLoading ? (
              <HStack spacing={4} flexWrap="wrap">
                {[...Array(5)].map((_, index) => (
                  <Box
                    key={index}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    textAlign="center"
                    maxW="200px"
                  >
                    <Skeleton w="150px" h="150px" mx="auto" startColor="gray.100" endColor="gray.300" />
                    <SkeletonText mt={2} noOfLines={2} spacing="2" />
                    <Skeleton mt={2} h="16px" w="100px" mx="auto" />
                  </Box>
                ))}
              </HStack>
            ) : topProducts.length > 0 ? (
              <HStack spacing={4} flexWrap="wrap">
                {topProducts.map((topProduct) => (
                  <Link key={topProduct.id} to={`/products/${topProduct.id}`}>
                    <Box
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      textAlign="center"
                      maxW="200px"
                      _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
                      transition="all 0.2s"
                    >
                      <Image
                        src={topProduct.thumbnail || 'https://placehold.co/150x150'}
                        alt={topProduct.title || 'Product'}
                        w="150px"
                        h="150px"
                        objectFit="cover"
                        mx "auto"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/150x150')}
                      />
                      <Text mt={2} fontSize="sm" fontWeight="medium" noOfLines={2}>
                        {topProduct.title || 'Untitled Product'}
                      </Text>
                      <Text color="gray.700" fontSize="sm">
                        {topProduct.sale_price || 'N/A'}
                        {topProduct.discount && (
                          <Text as="span" color="green.500" ml={1}>
                            ({topProduct.discount})
                          </Text>
                        )}
                      </Text>
                    </Box>
                  </Link>
                ))}
              </HStack>
            ) : (
              <Text fontSize="md" color="gray.500">
                No related products available.
              </Text>
            )}
          </Box>
          <Divider mb={8} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

function ProductDetailsWrapper() {
  return (
    <ErrorBoundary>
      <ProductDetails />
    </ErrorBoundary>
  );
}

export default ProductDetails;