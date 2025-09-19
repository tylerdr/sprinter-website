import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceEntity } from "@/lib/entities/service-entity";
import { DynamicServiceView } from "@/components/services/dynamic-service-view";
import { getServiceBySlug, getAllServices } from "@/lib/services/service-repository";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.metadata.title,
    description: service.metadata.description,
    keywords: service.metadata.keywords.join(', '),
    openGraph: {
      title: service.metadata.title,
      description: service.metadata.description,
      type: 'website',
      images: service.metadata.ogImage ? [service.metadata.ogImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function DynamicServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return <DynamicServiceView service={service} />;
}