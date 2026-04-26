export interface MenuLink {
  label: string
  href: string
}

export interface MenuColumn {
  label: string
  links: MenuLink[]
}

export interface CenterMenuConfig {
  centerSlug: string
  columns: MenuColumn[]
}

export const MENU_CONFIG: CenterMenuConfig[] = [
  {
    centerSlug: 'nutzfahrzeugcenter',
    columns: [
      {
        label: 'Entdecken',
        links: [
          { label: 'UT Aufbauten & Mulden', href: '/nutzfahrzeugcenter/ut' },
          { label: 'Anhänger', href: '/nutzfahrzeugcenter/anhaenger' },
          { label: 'Wohnmobile', href: '/nutzfahrzeugcenter/wohnmobile-wohnwagen-camper' },
          { label: 'Wohnwagen', href: '/nutzfahrzeugcenter/wohnmobile-wohnwagen-camper' },
        ],
      },
      {
        label: 'Leistungen',
        links: [
          { label: 'Reparaturen aller Marken', href: '/nutzfahrzeugcenter/leistungen' },
          { label: 'Service & Unterhalt', href: '/nutzfahrzeugcenter/leistungen' },
        ],
      },
      {
        label: 'Kaufen',
        links: [
          { label: 'Kaufberatung', href: '/nutzfahrzeugcenter/kaufen#kaufberatung' },
          { label: 'Finanzierung', href: '/nutzfahrzeugcenter/kaufen#finanzierung' },
          { label: 'Nutzfahrzeug-Abo', href: '/nutzfahrzeugcenter/kaufen#nutzfahrzeug-abo' },
          { label: 'E-Mobilität', href: '/nutzfahrzeugcenter/kaufen#e-mobilitaet' },
          { label: 'Aktionen', href: '/nutzfahrzeugcenter/kaufen' },
          { label: 'Webshop Scania', href: '/nutzfahrzeugcenter/kaufen' },
        ],
      },
    ],
  },
  {
    centerSlug: 'kommunalcenter',
    columns: [
      {
        label: 'Leistungen',
        links: [
          { label: 'Aktionen', href: '/kommunalcenter/leistungen' },
          { label: 'Kaufberatung', href: '/kommunalcenter/leistungen' },
          { label: 'Occasion', href: '/kommunalcenter/leistungen' },
        ],
      },
      {
        label: 'Mieten',
        links: [
          { label: 'Mietgeräte', href: '/kommunalcenter/mieten' },
        ],
      },
    ],
  },
  {
    centerSlug: 'motorgeraetecenter',
    columns: [
      {
        label: 'Roboter',
        links: [
          { label: 'Ambrogio', href: '/motorgeraetecenter/roboter' },
          { label: 'Pudu Robotics', href: '/motorgeraetecenter/roboter' },
          { label: 'Segway', href: '/motorgeraetecenter/roboter' },
        ],
      },
      {
        label: 'Mieten',
        links: [
          { label: 'Mietgeräte', href: '/motorgeraetecenter/mieten' },
        ],
      },
      {
        label: 'Leistungen',
        links: [
          { label: 'Kaufberatung', href: '/motorgeraetecenter/leistungen' },
          { label: 'Neugeräte', href: '/motorgeraetecenter/leistungen' },
        ],
      },
    ],
  },
]

/** Returns the menu columns for a given center slug, or empty array */
export function getMenuColumnsForCenter(centerSlug: string): MenuColumn[] {
  return MENU_CONFIG.find(c => c.centerSlug === centerSlug)?.columns ?? []
}
