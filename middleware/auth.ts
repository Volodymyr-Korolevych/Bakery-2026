export default defineNuxtRouteMiddleware(async () => {
  const { user, loadUser } = useAuthUser()
  if (!user.value) {
    await loadUser()
  }
  if (!user.value) {
    return navigateTo('/account?login=1')
  }
})
