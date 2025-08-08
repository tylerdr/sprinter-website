import Script from "next/script";
import { 
  generateOrganizationStructuredData, 
  generateServiceStructuredData, 
  generateFAQStructuredData,
  getStructuredDataScript 
} from "@/lib/seo";

interface StructuredDataProps {
  type?: "organization" | "service" | "faq" | "custom";
  data?: object;
  serviceName?: string;
  serviceDescription?: string;
  price?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export function StructuredData({ 
  type = "organization", 
  data, 
  serviceName, 
  serviceDescription, 
  price,
  faqs 
}: StructuredDataProps) {
  let structuredData;

  switch (type) {
    case "organization":
      structuredData = generateOrganizationStructuredData();
      break;
    case "service":
      if (serviceName && serviceDescription) {
        structuredData = generateServiceStructuredData(serviceName, serviceDescription, price);
      }
      break;
    case "faq":
      if (faqs && faqs.length > 0) {
        structuredData = generateFAQStructuredData(faqs);
      }
      break;
    case "custom":
      structuredData = data;
      break;
    default:
      return null;
  }

  if (!structuredData) {
    return null;
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={getStructuredDataScript(structuredData)}
    />
  );
}