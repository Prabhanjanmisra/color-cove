"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';
import { set } from 'mongoose';

const EditPalette = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paletteId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        color1: '',
        color2: '',
        color3: '',
        color4: '',
        tag: ''
    });


    useEffect(() => {
        const getPaletteDetails = async () => {
            const response = await fetch(`/api/palette/${paletteId}`);
            const data = await response.json();
            setPost({
                color1: data.palette[0],
                color2: data.palette[1],
                color3: data.palette[2],
                color4: data.palette[3],
                tag: data.tag
            })
        }

        if(paletteId) getPaletteDetails();
    },[paletteId])

    const isColorValid = (hexcode) => {

        // Regular expression to match a valid hex color code
        var hexRegex = /^#([0-9A-F]{3}){1,2}$/i;

        // Check if the hex code matches the regular expression
        return hexRegex.test(hexcode);

    }

    const updatePalette = async (e) => {
        e.preventDefault();
        if(!paletteId) return alert('Palette id not found');
        if (
            !isColorValid(post.color1) ||
            !isColorValid(post.color2) ||
            !isColorValid(post.color3) ||
            !isColorValid(post.color4)
        ) {
            alert('Please enter valid colors');
            return;
        }
        else {
            setSubmitting(true);
            try {
                const response = await fetch(`api/palette/${paletteId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        color1: post.color1,
                        color2: post.color2,
                        color3: post.color3,
                        color4: post.color4,
                        tag: post.tag
                    })
                })

                if (response.ok) {
                    router.push('/');
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setSubmitting(false);
            }
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePalette}
        />
    )
}

export default EditPalette