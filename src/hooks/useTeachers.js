import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export function useTeachers(filters = {}) {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeachers() {
      setLoading(true)

      let query = supabase
        .from('teachers')
        .select(`
          id,
          bio,
          hourly_rate,
          provides_pickup,
          rating_avg,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('is_active', true)

      if (filters.pickup !== undefined) {
        query = query.eq('provides_pickup', filters.pickup)
      }

      if (filters.minPrice) {
        query = query.gte('hourly_rate', filters.minPrice)
      }

      if (filters.maxPrice) {
        query = query.lte('hourly_rate', filters.maxPrice)
      }

      const { data, error } = await query

      if (!error) setTeachers(data)
      setLoading(false)
    }

    fetchTeachers()
  }, [filters])

  return { teachers, loading }
}