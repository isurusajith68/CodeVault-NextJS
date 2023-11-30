import connectDB from "../../../../util/db/db"
import User from "../../../../model/User"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

connectDB();

export async function POST(request) {

    const { email, password } = await request.json();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return Response.json({ message: 'Email or Password invalid' }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return Response.json({ message: 'Email or Password invalid' }, { status: 400 });
        }



        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1h',  
        });

        cookies().set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}`);
        return Response.json({
            data: {
                userId: user._id,
                username: user.username,
                email: user.email,

            }, message: "Login successfully"
        }, {
            status: 200
        })

    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, { status: 500 });
    }

}
