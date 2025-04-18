// src/utils/cleanTitle.ts
import { useMemo } from 'react';

interface Product {
  title?: string;
  brand?: string;
}

const cleanTitle = (product: Product) => {
  return useMemo(() => {
    if (!product?.title) return 'Untitled Product';
    if (!product?.brand) return product.title.trim();

    const brandRegex = new RegExp(`\\b${product.brand}\\b`, 'i');
    const menRegex = /\b(men'?s|men)\b/i;
    return product.title
      .replace(brandRegex, '')
      .replace(menRegex, '')
      .trim()
      .replace(/\s+/g, ' ');
  }, [product?.title, product?.brand]);
};

export default cleanTitle;