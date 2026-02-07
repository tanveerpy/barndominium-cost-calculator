import { MetadataRoute } from 'next'
import regions from '@/data/regions.json'

export const dynamic = 'force-static'

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://barndocalc.com'

    // Static routes
    const routes = [
        '',
        '/about',
        '/methodology',
        '/contact',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic state routes
    const stateRoutes = regions.map((region) => ({
        url: `${baseUrl}/cost-to-build/${toSlug(region.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...routes, ...stateRoutes]
}
