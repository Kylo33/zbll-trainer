import NavigationBar from '@/components/navigation-bar'
import { ThemeProvider } from '@/components/theme-provider'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider storageKey='vite-ui-theme'>
      <div className='mx-auto max-w-5xl m-4'>
        <NavigationBar />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
})