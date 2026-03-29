import { getHeaderData } from '@/lib/queries'
import Topbar from './Topbar'
import MegaMenu from '@/components/MegaMenu'

export default async function Header({ logoUrl }: { logoUrl?: string | null }) {
  const { centers, brandsByCenter } = await getHeaderData()

  return (
    <>
      <Topbar />
      <MegaMenu
        centers={centers}
        brandsByCenter={brandsByCenter}
        logoUrl={logoUrl}
      />
    </>
  )
}
