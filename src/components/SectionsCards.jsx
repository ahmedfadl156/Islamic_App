import Card from "./Card"

function SectionsCards() {
  return (
    <section className="mx-auto max-w-6xl px-8 my-10">
      <div className="header col-span-full flex justify-center items-center mb-6">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-gray-800">الأقسام</h1>
      </div>
      <div className="sections grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        <Card />
      </div>
    </section>
  )
}

export default SectionsCards
