import PaletteCard from "./PaletteCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text"><span className="rgb_gradient">{name} Profile</span></h1>
      <p className="desc">{desc}</p>

      <div className="mt-10 palette_layout">
        {data.map((palette) => (
          <PaletteCard
            key={palette.id}
            palette={palette}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile