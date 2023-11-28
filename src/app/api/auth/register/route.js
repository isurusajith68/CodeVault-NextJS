import connectDB from "../../../../util/db/db"
import User from "../../../../model/User"
import bcrypt from "bcrypt"

connectDB();

export async function POST(request) {

    const { username, email, password, isAdmin } = await request.json();
    // console.log(isAdmin)
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return Response.json({ message: 'User already registed' }, {
                status: 400,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin: isAdmin
        });

        await newUser.save();

        return Response.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Server Error' }, {
            status: 500,
        });
    }

}