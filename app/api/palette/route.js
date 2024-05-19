import { connectToDB } from "@utils/database";
import Palette from "@models/palette";

export const GET = async (req, res) => {
    try {
        await connectToDB();

        const palettes = await Palette.find({}).populate("creator");

        return new Response(JSON.stringify(palettes),{status: 200});
    } catch (error) {
        return new Response("Failed to fetch palettes",{status: 501});
    }
}