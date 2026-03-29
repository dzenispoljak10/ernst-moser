import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'salesperson',
  title: 'Verkäufer',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'Vorname',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Nachname',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Berufsbezeichnung',
      type: 'string',
      description: 'z.B. Verkaufsberater Nutzfahrzeuge',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'centers',
      title: 'Zuständig für Center',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'center'}]}],
      description: 'Welchen Centern ist dieser Verkäufer zugeordnet?',
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      title: 'title',
      media: 'photo',
    },
    prepare({firstName, lastName, title, media}) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: title,
        media,
      }
    },
  },
})
