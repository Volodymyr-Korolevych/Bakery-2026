export default defineNuxtRouteMiddleware(async () => {
  const { user, loadUser, isUserAdmin } = useAuthUser()

  if (!user.value) {
    await loadUser()
  }

  if (!user.value) {
    return navigateTo('/account?login=1')
  }

  if (!isUserAdmin.value) {
    return navigateTo('/')
  }
})
