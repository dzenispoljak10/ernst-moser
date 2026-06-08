import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'jobPosting',
  title: 'Stelle / Lehrstelle',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Typ',
      type: 'string',
      options: {list: [{title: 'Stelle', value: 'stelle'}, {title: 'Lehrstelle', value: 'lehrstelle'}], layout: 'radio'},
      initialValue: 'stelle',
    }),
    defineField({name: 'center', title: 'Center', type: 'string'}),
    defineField({name: 'centerColor', title: 'Center-Farbe (Hex)', type: 'string'}),
    defineField({name: 'type', title: 'Anstellung (z. B. Festanstellung)', type: 'string'}),
    defineField({name: 'pensum', title: 'Pensum', type: 'string'}),
    defineField({name: 'location', title: 'Ort', type: 'string'}),
    defineField({name: 'duration', title: 'Dauer (Lehrstelle)', type: 'string'}),
    defineField({name: 'description', title: 'Beschreibung', type: 'text'}),
    defineField({name: 'pdfUrl', title: 'Stellenbeschrieb-PDF (URL)', type: 'url'}),
    defineField({name: 'order', title: 'Reihenfolge', type: 'number', initialValue: 0}),
    defineField({
      name: 'isActive',
      title: 'Aktiv (öffentlich sichtbar)',
      type: 'boolean',
      description: 'Inaktive Einträge werden auf der Karriere-Seite nicht angezeigt',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', kind: 'kind', isActive: 'isActive', center: 'center'},
    prepare({title, kind, isActive, center}) {
      return {
        title,
        subtitle: `${kind === 'lehrstelle' ? 'Lehrstelle' : 'Stelle'}${center ? ' · ' + center : ''} · ${isActive ? 'aktiv' : 'inaktiv'}`,
      }
    },
  },
})
