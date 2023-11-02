'use client'

import clsx from 'clsx'
import React, { ReactNode, useState } from 'react'

type WeatherType = {
  city: string,
  temp: number,
  humidity: number
  wind: number
}

const getSearch = async (city: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + city + process.env.NEXT_PUBLIC_API_KEY, {
    method: 'GET',
  })

  return await res.json()
}

export default function Home() {

  const [city, setCity] = useState<string>('')
  const [weather, setWeather] = useState<WeatherType | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    getSearch(city)
      .then((res) => {
        if (res.cod === 200) {
          setError(undefined)
          setWeather({
            city: res.name,
            temp: res.main.temp,
            humidity: res.main.humidity,
            wind: res.wind.speed
          })
        }
        if (res.cod === '404') {
          setWeather(undefined)
          setError('Invalid ')
        }
      })
  }

  return (
    <div className='flex flex-col gap-2 h-max p-2 rounded text-xl border border-gray-50/50 w-full sm:max-w-[700px]'>
      <form onSubmit={onSubmit} className='flex gap-2 flex-row w-full'>
        <input value={city} required type='text' onChange={(e) => setCity(e.target.value)} className='w-full p-1 border-gray-50/50 bg-black border rounded' size={1} />
        <button type="submit" className='rounded border-gray-50/50 border px-1 hover:text-black hover:bg-white transition-all'>
          Search
        </button>
      </form>
      {
        weather ? <Weather weather={weather} /> :
          error ? <Span type='error'>{error}</Span> : null
      }
    </div>
  )
}

const Weather = ({ weather }: { weather: WeatherType }) => {
  return (
    <div className='flex flex-col gap-3'>
      <Span>City: {weather.city}</Span>
      <Span>Temperature: {weather.temp + '\u00B0'}C</Span>
      <Span>Humidity: {weather.humidity}%</Span>
      <Span>Wind Speed: {weather.wind} km/h</Span>
    </div>
  )
}

const Span = ({ children, type = 'default' }: { children: ReactNode, type?: 'error' | 'default' }) => {
  return (
    <span className={clsx('flex justify-start sm:justify-center', type === 'default' && 'border-b border-gray-50/30 pb-1', type === 'error' && 'border-none')}>
      {children}
    </span>
  )
}