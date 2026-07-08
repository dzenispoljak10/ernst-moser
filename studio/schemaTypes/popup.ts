import {defineField, defineType} from 'sanity'

/**
 * Pop-up / Hinweis-Fenster, das auf der öffentlichen Website eingeblendet wird.
 * Wird komplett im Admin-Dashboard gestaltet und gesteuert (Ziel, Verzögerung,
 * Auto-Schliessen, Häufigkeit). Rein clientseitig – ohne aktives Pop-up passiert nichts.
 */
export default defineType({
  name: 'popup',
  title: 'Pop-up',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Interner Name',
      type: 'string',
      description: 'Nur zur Orientierung im Dashboard (nicht öffentlich sichtbar).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Überschrift',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Bild (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button-Beschriftung (optional)',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button-Link (optional)',
      type: 'string',
      description: 'z. B. /kontakt oder https://…',
    }),
    defineField({
      name: 'target',
      title: 'Wo anzeigen?',
      type: 'string',
      initialValue: 'all',
      options: {
        list: [
          {title: 'Ganze Website', value: 'all'},
          {title: 'Nur Startseite', value: 'home'},
          {title: 'Nutzfahrzeugcenter', value: 'nutzfahrzeugcenter'},
          {title: 'Kommunalcenter', value: 'kommunalcenter'},
          {title: 'Motorgerätecenter', value: 'motorgeraetecenter'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'delaySeconds',
      title: 'Verzögerung bis zum Einblenden (Sekunden)',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(0).max(120),
    }),
    defineField({
      name: 'autoCloseSeconds',
      title: 'Automatisch schliessen nach (Sekunden)',
      type: 'number',
      description: '0 oder leer = bleibt offen, bis der Besucher es schliesst.',
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(600),
    }),
    defineField({
      name: 'reappearDays',
      title: 'Erneut anzeigen nach (Tagen)',
      type: 'number',
      description: 'Wie lange ein Besucher das Pop-up nach dem Schliessen nicht mehr sieht.',
      initialValue: 30,
      validation: (Rule) => Rule.min(0).max(365),
    }),
    defineField({
      name: 'isActive',
      title: 'Aktiv',
      type: 'boolean',
      description: 'Neue Pop-ups sind standardmässig inaktiv – erst nach dem Aktivieren sichtbar.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'target', media: 'image'},
  },
})
