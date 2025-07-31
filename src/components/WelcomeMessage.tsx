import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const WelcomeMessage: React.FC = () => {
    const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

    if (!isLoggedIn || !user) {
        return null;
    }

    const getWelcomeMessage = () => {
        if (user.role === 'admin') {
            return {
                title: `Chào mừng Admin ${user.fullName}!`,
                subtitle: 'Bạn có quyền truy cập vào tất cả chức năng quản trị.',
                bgColor: 'bg-gradient-to-r from-purple-600 to-blue-600',
                textColor: 'text-white'
            };
        } else {
            return {
                title: `Chào mừng ${user.fullName}!`,
                subtitle: 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.',
                bgColor: 'bg-gradient-to-r from-green-600 to-blue-600',
                textColor: 'text-white'
            };
        }
    };

    const message = getWelcomeMessage();

    return (
        <div className={`${message.bgColor} ${message.textColor} py-3 px-4 rounded-lg shadow-sm mb-6`}>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-lg">{message.title}</h3>
                    <p className="text-sm opacity-90">{message.subtitle}</p>
                </div>
                {user.avatar && (
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border-2 border-white"
                    />
                )}
            </div>
        </div>
    );
};

export default WelcomeMessage; 