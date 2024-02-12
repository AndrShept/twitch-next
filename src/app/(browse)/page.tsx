import { createUser } from '@/lib/services/user-service';
import { currentUser } from '@clerk/nextjs';

export default async function Home() {
  const profile = await currentUser();
  if (profile) {
   await createUser();
  }
  return <>Home</>;
}
