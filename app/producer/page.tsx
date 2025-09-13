import NavList from '@/components/NavList'

const ProducerIndex = () => {

  const producer = [
      { key: "toei-animation", label: "Toei Animation", icon: "🐉" },
      { key: "madhouse", label: "Madhouse", icon: "🏠" },
      { key: "mappa", label: "MAPPA", icon: "🔥" },
      { key: "kyoto-animation", label: "Kyoto Animation", icon: "🌸" },
  ]
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-neon mb-6">Browse by Producer</h1>
      <NavList type='producer' items={producer} />
      <p className="text-gray-600">Please select a Producers above 👆</p>
    </main>
  )
}

export default ProducerIndex