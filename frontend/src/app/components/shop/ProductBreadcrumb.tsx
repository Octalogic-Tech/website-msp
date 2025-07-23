import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '../ui';

interface ProductBreadcrumbProps {
    categoryName?: string;
    categorySlug?: string;
    productName: string;
    className?: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({
    categoryName,
    categorySlug,
    productName,
    className = ''
}) => {
    const breadcrumbItems = [];

    if (categoryName && categorySlug) {
        breadcrumbItems.push({
            label: categoryName,
            href: `/shop/${categorySlug}`
        });
    }

    breadcrumbItems.push({
        label: productName
    });

    return (
        <Breadcrumb items={breadcrumbItems} className={className} />
    );
};

export default ProductBreadcrumb;