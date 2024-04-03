"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePalette = () => {
    const router = useRouter();
    const { data: session } = useSession();    

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        color1: '',
        color2: '',
        color3: '',
        color4: '',
        tag: ''
    });

    const isColorValid = (hexcode) => {

        // Regular expression to match a valid hex color code
        var hexRegex = /^#([0-9A-F]{3}){1,2}$/i;

        // Check if the hex code matches the regular expression
        return hexRegex.test(hexcode);

    }

    const createPalette = async (e) => {
        e.preventDefault();
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
                const response = await fetch('api/palette/new', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: session?.user.id,
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
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPalette}
        />
    )
}

export default CreatePalette