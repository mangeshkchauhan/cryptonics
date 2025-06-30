import { CoinDetailsPage } from "@/components/pages/CoinDetailsPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CoinDetails({ params }: PageProps) {
  const { id } = await params;
  return <CoinDetailsPage coinId={id} />;
} 