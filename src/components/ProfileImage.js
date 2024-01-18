import React from 'react';

const ProfileImageGenerator = ({ username, width, height,color }) => {
    const profileIconByUserName = (username) => {
        if (username && typeof username === 'string' && username.length > 0) {
            const firstLetter = username.charAt(0).toUpperCase();
            const secondLetter = username.charAt(1).toUpperCase();

            return firstLetter + secondLetter;
        }

        return 'NA';
    };
    console.log(username)
    // Generate random color
    // const randomColor = () => {
    //     var letters = '0123456789ABCDEF';
    //     var color = '#';
    //     for (var i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // };

    return (
        <div>
            <div
                className={`flex items-center justify-center text-sm rounded-full text-white w-8 h-8 bg-orange-400`}
                style={{
                    width: width,
                    height: height,
                    backgroundColor: color
                }}
            >
                <p>{profileIconByUserName(username)}</p>
            </div>
        </div>
    );
};

export default ProfileImageGenerator;
