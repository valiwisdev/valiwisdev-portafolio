import { List, Play } from 'lucide-react'

interface PlayerTab {
  value: string
  label: string
  style: string
  icon?: React.ReactNode
}

const sharedTabStyle =
  'flex items-center justify-center py-3 px-3 rounded-xl text-sm font-medium transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-gradient-to-r from-slate-800/60 to-slate-700/40 text-white hover:from-slate-700/70 hover:to-slate-600/50 hover:text-amber-100 border-0 min-h-[44px] cursor-pointer'

const sharedIconStyle = 'w-4 h-4 mr-1.5'

export const playerTabs: PlayerTab[] = [
  {
    value: 'currently-playing',
    label: 'Playing',
    style: sharedTabStyle,
    icon: <Play className={sharedIconStyle} />,
  },
  {
    value: 'playlist',
    label: 'Playlists',
    style: sharedTabStyle,
    icon: <List className={sharedIconStyle} />,
  },
]
