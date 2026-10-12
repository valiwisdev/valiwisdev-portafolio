import { List, Play } from 'lucide-react'
import { getRoundedGoldenButtonClassName } from '../GoldenButtons'

interface PlayerTab {
  value: string
  label: string
  style: string
  icon?: React.ReactNode
}

const sharedTabStyle = `${getRoundedGoldenButtonClassName('sm')} flex-1 min-h-[44px] !border-amber-400 !text-amber-400 !bg-transparent !shadow-lg !shadow-amber-400/10 hover:!text-amber-300 focus-visible:!outline-none focus-visible:!ring-0 data-[state=active]:!border-amber-400 data-[state=active]:!bg-transparent data-[state=active]:!text-amber-400 data-[state=active]:!shadow-xl data-[state=active]:!shadow-amber-400/20`

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
