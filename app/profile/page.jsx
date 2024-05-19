"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const router = useRouter();

    const { data: session } = useSession();

    const [palettes, setPalettes] = useState([]);

    useEffect(() => {
        // fetch data
        const fetchPalettes = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPalettes(data);
        }
        if(session?.user.id) fetchPalettes();
    }, []);

    const handleEdit = (palette) => {
        router.push(`update-palette?id=${palette._id}`);
    }

    const handleDelete = async (palette) => {
        const hasConfirmed = confirm('Are you sure you want to delete this palette?');
        if(hasConfirmed) {
            try {
                await fetch(`/api/palette/${palette._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPalettes = palettes.filter((p) => p._id !== palette._id);

                setPalettes(filteredPalettes);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={palettes}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile