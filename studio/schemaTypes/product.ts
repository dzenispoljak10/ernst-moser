import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produkt',
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
      name: 'brand',
      title: 'Marke',
      type: 'reference',
      to: [{type: 'brand'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Preis (CHF)',
      type: 'number',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Preisbezeichnung',
      type: 'string',
      description: 'z.B. "ab CHF 1\'290.–" oder "Preis auf Anfrage"',
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
      name: 'mainImage',
      title: 'Hauptbild',
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
      name: 'specs',
      title: 'Technische Daten',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'spec',
          fields: [
            {name: 'label', title: 'Bezeichnung', type: 'string'},
            {name: 'value', title: 'Wert', type: 'string'},
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        },
      ],
    }),
    defineField({
      name: 'isNew',
      title: 'Neu',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isOccasion',
      title: 'Occasion',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand.name',
      media: 'mainImage',
    },
  },
})
