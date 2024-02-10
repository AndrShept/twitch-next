import { Button } from '@/components/ui/button'
import React from 'react'

interface FollowButton {
    isFollowing: boolean 
}

export const FollowButton = ({isFollowing}:FollowButton) => {
  return (
    <Button disabled={isFollowing}>
        Follow
    </Button>
  )
}
