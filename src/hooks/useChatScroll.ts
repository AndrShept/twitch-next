import { ForwardedRef, useCallback, useEffect } from 'react';

export const useChatScroll = ({
  ref,
  msgLength,
}: {
  ref: ForwardedRef<HTMLDivElement>;
  msgLength: number;
}) => {
  const scrollToBottom = useCallback(() => {
    if (ref && 'current' in ref && ref.current) {
      ref?.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ref]);

  useEffect(() => {
    scrollToBottom();
  }, [ref, msgLength, scrollToBottom]);

  return {
    scrollToBottom,
  };
};
