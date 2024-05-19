"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
    const router = useRouter();

    const { data: session } = useSession();

    const [palettes, setPalettes] = useState([]);

    const searchParams = useSearchParams();
    const name = searchParams.get('name');

    useEffect(() => {
        // fetch data
        const fetchPalettes = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
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
            name={name + "'s"}
            desc={`Welcome to ${name}'s profile page. Check out all the colourful palettes and ideas they have shared.`}
            data={palettes}
        />
    )
}

export default MyProfile