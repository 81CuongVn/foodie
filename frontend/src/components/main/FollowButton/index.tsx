import { CheckOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { followUser, unfollowUser } from "~/services/api";

interface IProps {
    isFollowing: boolean;
    userID: string;
    size?: string;
}

const FollowButton: React.FC<IProps> = (props) => {
    const [isFollowing, setIsFollowing] = useState(props.isFollowing);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setIsFollowing(props.isFollowing);
    }, [props.isFollowing])

    const dispatchFollow = async () => {
        try {
            setLoading(true);
            if (isFollowing) {
                const result = await unfollowUser(props.userID);
                setIsFollowing(result.state);
            } else {
                const result = await followUser(props.userID);
                setIsFollowing(result.state);
            }

            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };

    return (
        <div>
            <button
                className={`${isFollowing && '!hover:bg-gray-200 !bg-indigo-100 !border !border-indigo-500 !text-indigo-700'} flex items-center ${props.size === 'sm' && '!py-2 !px-3 !text-sm'}`}
                disabled={isLoading}
                onClick={dispatchFollow}
            >
                {isFollowing ? <CheckOutlined /> : <UserOutlined />}
                &nbsp;&nbsp;
                <span className={`${props.size === 'sm' && 'text-sm'}`}>
                    {isLoading
                        ? 'Following'
                        : !isLoading && !isFollowing
                            ? 'Follow'
                            : 'Following'}
                </span>
            </button>
        </div>
    );
};

export default FollowButton;