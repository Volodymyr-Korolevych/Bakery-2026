import type { User } from '@supabase/supabase-js'

export type Profile = {
  id: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  created_at: string | null
}

export const useAuthUser = () => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()

  const user = useState<User | null>('authUser', () => null)
  const profile = useState<Profile | null>('authProfile', () => null)

  const adminEmailsList = computed(() =>
    (config.public.adminEmails || '')
      .split(',')
      .map((e: string) => e.trim())
      .filter(Boolean)
  )

  const isUserAdmin = computed(() => {
    if (!user.value) return false
    const email = user.value.email || ''
    return adminEmailsList.value.includes(email)
  })

  const loadUser = async () => {
    const { data } = await nuxtApp.$supabase.auth.getUser()
    user.value = data.user ?? null
    if (user.value) {
      const { data: profileData } = await nuxtApp.$supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .maybeSingle()
      profile.value = profileData as Profile | null
    } else {
      profile.value = null
    }
  }

  const signUp = async (payload: { email: string; password: string; firstName: string; lastName: string }) => {
    const { email, password, firstName, lastName } = payload
    const { data, error } = await nuxtApp.$supabase.auth.signUp({ email, password })
    if (error) throw error
    const createdUser = data.user
    if (createdUser) {
      const { error: profileError } = await nuxtApp.$supabase.from('profiles').insert({
        id: createdUser.id,
        first_name: firstName,
        last_name: lastName
      })
      if (profileError) throw profileError
    }
    await loadUser()
  }

  const signIn = async (payload: { email: string; password: string }) => {
    const { data, error } = await nuxtApp.$supabase.auth.signInWithPassword(payload)
    if (error) throw error
    if (data.user) {
      await loadUser()
    }
  }

  const signOut = async () => {
    await nuxtApp.$supabase.auth.signOut()
    user.value = null
    profile.value = null
  }

  const updateProfile = async (payload: Partial<Profile>) => {
    if (!user.value) return
    const { error } = await nuxtApp.$supabase
      .from('profiles')
      .update({
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone: payload.phone
      })
      .eq('id', user.value.id)
    if (error) throw error
    await loadUser()
  }

  return {
    user,
    profile,
    isUserAdmin,
    loadUser,
    signUp,
    signIn,
    signOut,
    updateProfile
  }
}
