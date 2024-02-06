import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <p>
      twitch HELLO
      <UserButton afterSignOutUrl="/" />
      <Button>dasda</Button>
    </p>
  );
}
