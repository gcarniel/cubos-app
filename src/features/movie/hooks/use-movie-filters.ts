import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  MovieFilters,
  movieFiltersSchema,
} from '../types/movies-filters-schema'
import { useMovieFiltersStore } from '../store/movie-filters-store'
import { useHookFormMask } from 'use-mask-input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useMovieFilters() {
  const { setFilters, setOpenFiltersModal, filters } = useMovieFiltersStore()
  const [searchValue, setSearchValue] = useState(filters.search || '')
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<MovieFilters>({
    resolver: zodResolver(movieFiltersSchema),
    defaultValues: {
      minDuration: '',
      maxDuration: '',
      minReleaseDate: '',
      maxReleaseDate: '',
      minVoteAverage: '',
      maxVoteAverage: '',
    },
  })

  const registerWithMask = useHookFormMask(form.register)

  const handleSubmit = (data: MovieFilters) => {
    console.log(data)
    setFilters({
      ...data,
      minDuration: Number(data.minDuration),
      maxDuration: Number(data.maxDuration),
    })
    form.reset()
    setOpenFiltersModal(false)
  }

  const handleClearFilters = () => {
    setFilters({})
    form.reset()
    setOpenFiltersModal(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ ...filters, search: searchValue })
    }, 500)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.minDuration)
      params.set('minDuration', String(filters.minDuration))
    if (filters.maxDuration)
      params.set('maxDuration', String(filters.maxDuration))
    if (filters.minReleaseDate)
      params.set('minReleaseDate', String(filters.minReleaseDate))
    if (filters.maxReleaseDate)
      params.set('maxReleaseDate', String(filters.maxReleaseDate))

    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : window.location.pathname, {
      scroll: false,
    })
  }, [filters, router])

  useEffect(() => {
    const urlFilters = {
      minDuration: searchParams.get('minDuration') || '',
      maxDuration: searchParams.get('maxDuration') || '',
      minReleaseDate: searchParams.get('minReleaseDate') || '',
      maxReleaseDate: searchParams.get('maxReleaseDate') || '',
      minRating: searchParams.get('minRating') || '',
      maxRating: searchParams.get('maxRating') || '',
      page: searchParams.get('page') || '',
      sort: searchParams.get('sort') || '',
      search: searchParams.get('search') || '',
    }
    setFilters({
      minDuration: Number(urlFilters.minDuration),
      maxDuration: Number(urlFilters.maxDuration),
      minReleaseDate: urlFilters.minReleaseDate,
      maxReleaseDate: urlFilters.maxReleaseDate,
      maxRating: Number(urlFilters.maxRating),
      minRating: Number(urlFilters.minRating),
      page: Number(searchParams.get('page')) || 1,
      sort: searchParams.get('sort') || 'ASC',
      search: searchParams.get('search') || '',
      take: 10,
    })

    form.reset({
      minDuration: String(urlFilters.minDuration),
      maxDuration: String(urlFilters.maxDuration),
      minReleaseDate: urlFilters.minReleaseDate,
      maxReleaseDate: urlFilters.maxReleaseDate,
      minVoteAverage: String(urlFilters.minRating),
      maxVoteAverage: String(urlFilters.maxRating),
    })
  }, [searchParams, setFilters, form])

  return {
    form,
    handlers: {
      registerWithMask,
      handleSubmit,
      handleClearFilters,
      setSearchValue,
    },
    state: {
      searchValue,
    },
  }
}
