import { createIngress } from '@/app/actions/ingress';
import { IngressInput } from 'livekit-server-sdk';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;
export const useGenerateIngress = () => {
  const [value, setValue] = useState<IngressType>(RTMP);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLButtonElement>(null);
  const onSubmit = () => {
    startTransition(async () => {
      createIngress(Number(value))
        .then(() => {
          toast.success('Ingress created');
          ref.current?.click();
        })
        .catch((err) => toast.error(`Something went wrong ${err}`));
    });
  };
  return {
    onSubmit,
    isPending,
    value,
    setValue,
    RTMP,
    WHIP,
    ref,
  };
};
