import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team-Mitglied',
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
      name: 'role',
      title: 'Berufsbezeichnung',
      type: 'string',
      description: 'z.B. Betriebsleiter Nutzfahrzeugcenter',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'center',
      title: 'Center',
      type: 'reference',
      to: [{type: 'center'}],
      description: 'Welchem Center ist dieses Mitglied zugeordnet?',
    }),
    defineField({
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Niedrigere Zahl = weiter vorne',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktiv',
      type: 'boolean',
      description: 'Inaktive Mitglieder werden nicht angezeigt',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Nachname A–Z',
      name: 'lastNameAsc',
      by: [{field: 'lastName', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'role',
      media: 'photo',
      centerName: 'center.name',
    },
    prepare({firstName, lastName, role, media, centerName}: {firstName: string; lastName: string; role: string; media: unknown; centerName: string}) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: centerName ? `${role} · ${centerName}` : role,
        media,
      }
    },
  },
})
