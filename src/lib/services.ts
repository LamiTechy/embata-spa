export interface Service {
  slug: string;
  name: string;
  priceKobo: number;
  description: string;
  tag?: string | null;
}

export const SERVICES: Service[] = [
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    priceKobo: 1_500_000,
    description:
      "Gentle, flowing strokes to melt away tension and promote deep relaxation. Perfect for first-time visitors.",
    tag: "Popular",
  },
  {
    slug: "deep-tissue",
    name: "Deep Tissue",
    priceKobo: 1_800_000,
    description:
      "Targeted pressure to release chronic muscle knots and restore mobility. Ideal for athletes and desk workers alike.",
    tag: null,
  },
  {
    slug: "hot-stone",
    name: "Hot Stone",
    priceKobo: 2_000_000,
    description:
      "Heated volcanic stones placed on key energy points to dissolve stress and improve circulation.",
    tag: "Premium",
  },
  {
    slug: "reflexology",
    name: "Reflexology",
    priceKobo: 1_200_000,
    description:
      "Ancient technique applying pressure to specific points on the feet to benefit the entire body.",
    tag: null,
  },
  {
    slug: "couples-massage",
    name: "Couples Massage",
    priceKobo: 3_000_000,
    description:
      "Share a moment of tranquility with your partner in our private, candle-lit couples suite.",
    tag: "Couples",
  },
  {
    slug: "prenatal-massage",
    name: "Prenatal Massage",
    priceKobo: 1_500_000,
    description:
      "Gentle, nurturing care designed specifically for expectant mothers to ease discomfort and promote well-being.",
    tag: null,
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function formatNaira(kobo: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(kobo / 100);
}
