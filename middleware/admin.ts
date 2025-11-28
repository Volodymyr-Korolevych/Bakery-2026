export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig()
  const adminEmails = (config.public.adminEmails || '').split(',').map((e: string) => e.trim()).filter(Boolean)
  console.log('Admin Emails:', config, adminEmails)
  const { user, loadUser } = useAuthUser()

  if (!user.value) {
    await loadUser()
  }
  if (!user.value) {
    return navigateTo('/account?login=1')
  }

  if (!adminEmails.includes(user.value.email || '')) {
    return navigateTo('/')
  }
})
