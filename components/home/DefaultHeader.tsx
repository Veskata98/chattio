'use client';

import { useModal } from '@/hooks/useModalStore';

import { JoinServerButton } from './JoinServerButton';
import { InviteFriendButton } from './InviteFriendButton';
import { FriendRequestButton } from './FriendRequestButton';

const DefaultHeader = () => {
    const { onOpen } = useModal();

    return (
        <div className="w-full">
            <InviteFriendButton />
            <FriendRequestButton />
            <JoinServerButton />
        </div>
    );
};

export default DefaultHeader;
