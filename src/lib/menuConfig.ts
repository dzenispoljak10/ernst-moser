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
          { label: 'UT Aufbauten & Mulden', href: '/nutzfahrzeugcenter/entdecken' },
          { label: 'Anhänger', href: '/nutzfahrzeugcenter/entdecken' },
          { label: 'Wohnmobile', href: '/nutzfahrzeugcenter/entdecken' },
          { label: 'Wohnwagen', href: '/nutzfahrzeugcenter/entdecken' },
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
          { label: 'Kaufberatung', href: '/nutzfahrzeugcenter/kaufen' },
          { label: 'Finanzierung', href: '/nutzfahrzeugcenter/kaufen' },
          { label: 'Nutzfahrzeug-Abo', href: '/nutzfahrzeugcenter/kaufen' },
          { label: 'E-Mobilität', href: '/nutzfahrzeugcenter/kaufen' },
          { label: 'Aktionen', href: '/nutzfahrzeugcenter/kaufen' },
          { label: 'Neuwagen & Occasion', href: '/nutzfahrzeugcenter/kaufen' },
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
