'use client'
import { useCallback, useEffect, useRef, useState } from "react"
import Link from 'next/link';
import { API_HOST } from "../services/api"

const search = async (queryParams: { name?: string }) => {
    const { name } = queryParams
    const response = await fetch(`${API_HOST}/search${!!name ? `?name=${name}` : ''}`)
    return await response.json()
}

const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any) => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

export default function EventSearchBar() {
    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState<{ id: number, name: string, date: string, imageUrl?: string }[]>([])
    const [isInputedFocused, setIsInputFocused] = useState(false)

    const handleSearch = useCallback(debounce(async (query: string) => {
        if (!!query?.trim()) {
            const data = await search({ name: query })
            setResults(data || [])
        } else {
            setResults([])
        }
    }, 400), [])

    useEffect(() => {
        handleSearch(searchQuery)
    }, [searchQuery, handleSearch])

    return (
        <div className="flex-grow mx-6 flex flex-col justify-center items-center">
            <div className="w-2/3 relative">
                <input
                    type="text"
                    placeholder="Search for events..."
                    className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-white bg-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setTimeout(() => setIsInputFocused(false), 100)}
                />

                {isInputedFocused && results?.length > 0 && (
                    <ul className="absolute z-50 w-full mt-2 bg-gray-900 bg-opacity-75 border-2 border-orange-500 rounded-md shadow-lg">
                        {results.map((result: any, index: number) => (
                            <Link key={index} href={`/events/${result.id}`}>
                                <li className="p-2 hover:bg-gray-500 cursor-pointer text-white">
                                    <div className="flex items-center">
                                        <img className="w-10 h-8 rounded-md mr-2" src={result.imageUrl} alt={result.name} />
                                        <p className="font-semibold">{result.name}</p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
