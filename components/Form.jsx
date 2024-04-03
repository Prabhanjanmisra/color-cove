import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left" >
        {type} <span className="rgb_gradient">Palette</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing color combinations with the world.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-amber-50">
            Your colors
          </span>
          <div className="flex justify-between">
            <input
              value={post.color1}
              style={{ backgroundColor: post.color1 }}
              onChange={(e) => setPost({ ...post, color1: e.target.value })}
              placeholder="#ffffff"
              className="form_textarea"
            />
            <input
              value={post.color2}
              style={{ backgroundColor: post.color2 }}
              onChange={(e) => setPost({ ...post, color2: e.target.value })}
              placeholder="#ffffff"
              className="form_textarea"
            />
            <input
              value={post.color3}
              style={{ backgroundColor: post.color3 }}
              onChange={(e) => setPost({ ...post, color3: e.target.value })}
              placeholder="#ffffff"
              className="form_textarea"
            />
            <input
              value={post.color4}
              style={{ backgroundColor: post.color4 }}
              onChange={(e) => setPost({ ...post, color4: e.target.value })}
              placeholder="#ffffff"
              className="form_textarea"
            />
          </div>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-amber-50">
            Tag your palette {` `}
            <span className="font-normal">(Eg: #vintage, #warm, #space, #summer, #neon, etc...)</span>
          </span>
          <input
            value={post.tag}
            onChange = {(e) => setPost({...post, tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_textarea"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href = '/' className="text-amber-50 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-black  rounded-full text-amber-50"
          >
            {submitting? `${type}...`:type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form