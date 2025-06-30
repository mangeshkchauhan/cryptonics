import { CoinDetailsPage } from "@/components/pages/CoinDetailsPage";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CoinDetails({ params }: PageProps) {
  return <CoinDetailsPage coinId={params.id} />;
} 