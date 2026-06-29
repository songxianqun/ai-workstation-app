import { create } from 'zustand'
import type { UserRole } from '../data/types'

interface AppState {
  // 登录状态
  isLoggedIn: boolean
  userRole: UserRole
  username: string
  // 侧边抽屉
  drawerOpen: boolean
  // Actions
  login: (role: UserRole, username: string) => void
  logout: () => void
  setDrawerOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoggedIn: false,
  userRole: 'team',
  username: '',
  drawerOpen: false,

  login: (role, username) =>
    set({ isLoggedIn: true, userRole: role, username }),
  logout: () =>
    set({ isLoggedIn: false, userRole: 'team', username: '', drawerOpen: false }),
  setDrawerOpen: (open) => set({ drawerOpen: open }),
}))
