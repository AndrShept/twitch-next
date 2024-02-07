import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

interface HomeProps {
  searchParams: { term: string };
}

export default function Home({ searchParams }: HomeProps) {
  return <section></section>;
}
