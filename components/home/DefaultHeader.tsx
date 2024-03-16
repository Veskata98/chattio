import { JoinServerButton } from './home-buttons/JoinServerButton';
import { FindUserButton } from './home-buttons/FindUserButton';

const DefaultHeader = () => {
    return (
        <div className="w-full">
            <FindUserButton />
            <JoinServerButton />
        </div>
    );
};

export default DefaultHeader;
