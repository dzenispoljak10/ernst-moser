import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Marke',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'center',
      title: 'Center',
      type: 'reference',
      to: [{type: 'center'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero-Bild',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'images',
      title: 'Weitere Bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Alt-Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Bildunterschrift',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Slogan',
      type: 'string',
      description: 'Kurzer Markensatz für den Hero (z.B. "Fahren. Arbeiten. Gewinnen.")',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights / Key Facts',
      type: 'array',
      description: 'Section 4 – 3–4 USPs mit Icon-Name und Text',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon',  title: 'Lucide Icon Name', type: 'string'},
            {name: 'label', title: 'Label (kurz)',      type: 'string'},
            {name: 'desc',  title: 'Beschreibung',      type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'icon'}},
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Leistungen / Features',
      type: 'array',
      description: 'Section 5 – 3–4 Leistungskarten mit Icon, Titel, Beschreibung',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon',  title: 'Lucide Icon Name', type: 'string'},
            {name: 'title', title: 'Titel',            type: 'string'},
            {name: 'desc',  title: 'Beschreibung',     type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'icon'}},
        },
      ],
    }),
    defineField({
      name: 'products',
      title: 'Modelle / Produkte',
      type: 'array',
      description: 'Section 3 – Produktkarten (falls kein separates product-Dokument)',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name',  title: 'Produktname',  type: 'string'},
            {name: 'info',  title: 'Kurzbeschreibung', type: 'string'},
            {name: 'image', title: 'Bild',          type: 'image', options: {hotspot: true}},
          ],
          preview: {select: {title: 'name', subtitle: 'info', media: 'image'}},
        },
      ],
    }),
    defineField({
      name: 'salesperson',
      title: 'Ansprechpartner (Brand-spezifisch)',
      type: 'reference',
      to: [{type: 'salesperson'}],
      description: 'Spezifischer Verkäufer für diese Marke (übersteuert Center-Zuweisung)',
    }),
    defineField({
      name: 'stats',
      title: 'Statistiken / Zahlen',
      type: 'array',
      description: 'Grosse Zahlen mit Count-Up Animation',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Wert (Zahl)', type: 'number'},
            {name: 'suffix', title: 'Suffix (z.B. "+", "%", " Jahre")', type: 'string'},
            {name: 'label', title: 'Beschriftung', type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Anwendungsgebiete',
      type: 'array',
      description: 'Einsatzbereiche mit Icon und Text',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon', title: 'Lucide Icon Name', type: 'string'},
            {name: 'title', title: 'Titel', type: 'string'},
            {name: 'desc', title: 'Beschreibung', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'icon'}},
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Niedrigere Zahl = weiter oben',
    }),
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'center.name',
      media: 'logo',
    },
  },
})
