import React, { useState, useEffect, lazy } from 'react';
import axios from 'axios';
import Image from "next/image"
const ProfileImageGenerator = () => {
    // const [avatars, setAvatars] = useState();
    // const api = `https://api.multiavatar.com/4645646`;

    // useEffect(() => {
    //     fetchAvatars()
    // }, []);

    // const fetchAvatars = async () => {
    //     const image = await axios.get(
    //         `${api}/${Math.round(Math.random() * 1000)}`
    //     );
    //     const buffer = new Buffer(image.data);
    //     setAvatars(buffer.toString("base64"));
    // }

    return (
        <div>
            {
                 <Image
                    width={60}
                    height={60}
                    loader={lazy}
                    src="data:image/png;base64,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"
                    className='rounded-full'
                    alt="avatar"
                />
            }

        </div>
    );
};

export default ProfileImageGenerator;
