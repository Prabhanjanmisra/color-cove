"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PaletteCard = ({ palette, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if(!palette.creator) return console.log("No creator");

    if (palette.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${palette.creator._id}?name=${palette.creator.username}`);
  };

  return (
    <div className="palette_card">
      <div className="flex flex-col justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={palette.creator?palette.creator.image:"https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain active:scale-95 hover:scale-105 transition-all"
            onClick={() => handleClick()}
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-amber-50" onClick={() => handleClick()}>
              {palette.creator?palette.creator.username:"Unknown"}
            </h3>
            <p className="font-inter text-sm text-gray-100">
              {palette.creator?palette.creator.email:"Unknown"}
            </p>
          </div>
        </div>

      </div>
      <div className="flex flex-col items-center my-4 gap-2">
        {palette.palette.map((color) => (
          <div
          key={color}
          className="palette_color" 
          style={{backgroundColor: color}}
          onClick={(e) => {
            navigator.clipboard.writeText(color);
            e.target.innerText = "Copied!";
            setTimeout(()=> e.target.innerText=color,1000);
          }}
          >
            {color}
          </div>
        ))}
      </div>

      <p className="text-sm text-amber-50 my-2 cursor-pointer inline" onClick={() => 
        handleTagClick && handleTagClick(palette.tag)
      }>
        {palette.tag}
      </p>

      {session?.user.id === (palette.creator?palette.creator._id:0) && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm text-amber-50 cursor-pointer"
          onClick={() => handleEdit && handleEdit(palette)}>
            Edit
          </p>
          <p className="font-inter text-sm cursor-pointer"
          onClick={() => handleDelete && handleDelete(palette)}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PaletteCard