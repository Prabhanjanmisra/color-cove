import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover and share
        <br/>
        <span className="rgb_gradient text-center">Beautiful color palettes</span>
      </h1>
      <p className="desc text-center">
        Color Cove is an immersive online sanctuary for color enthusiasts to explore, share, and save mesmerizing color palettes. Perfect your project's aesthetic by diving into a sea of curated hues and gradients.
      </p>

      <Feed />
    </section>
  )
}

export default Home