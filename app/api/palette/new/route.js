import { connectToDB } from "@utils/database";
import Palette from "@models/palette";

export const dynamic = 'force-dynamic';
export const POST = async(req, res) => {
    const {userId, color1, color2, color3, color4, tag} = await req.json();

    try {
        await connectToDB();
        const newPalette = new Palette({
            creator: userId,
            palette: [color1, color2, color3, color4],
            tag
        });

        await newPalette.save();
        return new Response(JSON.stringify(newPalette), {status: 201})
    } catch (error) {
        return new Response("Failed to create palette", {status: 500})
    }
}