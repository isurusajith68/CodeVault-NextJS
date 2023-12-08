// ProfileImage.js

import React from 'react';
import Avatar from 'avatar-initials';
import Image from 'next/image'
const ProfileImage = ({ initials, size }) => {
    const avatar = new Avatar({ name: initials, size });

    return (
        <Image
            src={avatar}
            alt={`Profile for ${initials}`}
            style={{ width: size, height: size, borderRadius: '50%', backgroundColor: "red" }}
        />
    );
};

export default ProfileImage;
