'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchForm() {
  const [city, setCity] = useState('')
  const route = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city) {
      route.push(`?city=${city}`)
    } else {
      route.push('/')
    }
  }

  return (
    <form onSubmit={onSubmit} className='flex gap-2 flex-row w-full'>
      <input value={city} required type='text' onChange={(e) => setCity(e.target.value)} className='w-full p-1 border-gray-50/50 bg-black border rounded' size={1} />
      <button type="submit" className='rounded border-gray-50/50 border px-1 hover:text-black hover:bg-white transition-all'>
        Search
      </button>
    </form>
  )
}
