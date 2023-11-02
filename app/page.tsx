import clsx from 'clsx'
import React, { ReactNode } from 'react'
import SearchForm from './SearchForm'

type WeatherType = {
  city: string,
  temp: number,
  humidity: number
  wind: number
}

const getSearch = async (city: string | null) => {

  const fetching = await fetch(process.env.NEXT_PUBLIC_API_URL! + city + process.env.NEXT_PUBLIC_API_KEY, {
    method: 'GET',
  })

  if (fetching.ok) {
    let result = await fetching.json()
    return {
      weather: {
        status: 'OK',
        city: result.name,
        temp: result.main.temp,
        humidity: result.main.temp,
        wind: result.wind.speed
      }
    }
  }
  else {
    return {
      weather: {
        status: 'INVALID REQUEST',
        message: 'Invalid city',
      }
    }
  }
}

export default async function Home({
  searchParams
}: {
  searchParams: Record<string, string>
}) {

  const city = typeof searchParams.city === 'string' ? searchParams.city : null

  const { weather } = await getSearch(city)

  return (
    <div className='flex flex-col gap-2 h-max p-2 rounded text-xl border border-gray-50/50 w-full sm:max-w-[700px]'>
      <SearchForm />

      {
        weather.status === 'OK' ?
          <Weather weather={weather} />
          :
          weather.status === 'INVALID REQUEST' ?
            <Span type='error'>
              {weather.message}
            </Span>
            :
            <Span type='error'>
              Something went wrong
            </Span>
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
    <span className={clsx('flex justify-start sm:justify-center', type === 'default' && 'border-b border-gray-50/30 pb-1', type === 'error' && 'border-none text-red-500')}>
      {children}
    </span>
  )
}