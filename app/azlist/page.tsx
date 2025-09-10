import NavList from '@/components/NavList'
import React from 'react'

const AZListIndex = () => {

    const letters = ["all", ..."abcdefghijklmnopqrstuvwxyz"].map((l) => ({
        key: l,
        label: l.toUpperCase(),
    }));
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Browse by Category</h1>
      <NavList type="azlist" items={letters} />
      <p className="text-gray-600">Please select a category above 👆</p>
    </main>
  )
}

export default AZListIndex