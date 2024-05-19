import { Mongoose } from "mongoose";
import { connectToDB } from "@utils/database";
import Palette from "@models/palette";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        console.log(params.id);
        const palette = await Palette.findById(params.id).populate("creator");
        if (!palette) return new Response("Palette not found", { status: 404 });
        return new Response(JSON.stringify(palette), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch palette", { status: 501 });
    }
}


// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { color1, color2, color3, color4, tag } = await req.json();
    try {
        await connectToDB();

        const existingPalette = await Palette.findById(params.id);
        if (!existingPalette) return new Response("Palette not found", { status: 404 });

        existingPalette.palette = [color1, color2, color3, color4];
        existingPalette.tag = tag;

        await existingPalette.save();

        return new Response(JSON.stringify(existingPalette), { status: 200 });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }

}


// DELETE (delete)
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        console.log(params.id);
        await Palette.findByIdAndDelete(params.id);
        console.log("Palette deleted");

        return new Response("Palette deleted", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete palette", { status: 500 });
    }
}