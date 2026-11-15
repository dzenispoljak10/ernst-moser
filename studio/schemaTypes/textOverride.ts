import { defineField, defineType } from 'sanity'

// Text-Änderungen aus dem Admin-Bearbeitungsmodus ("Texte bearbeiten").
// Wird im Admin gepflegt, nicht hier im Studio.
export default defineType({
  name: 'textOverride',
  title: 'Text-Änderung',
  type: 'document',
  fields: [
    defineField({ name: 'page', title: 'Seite (Pfad, * = alle Seiten)', type: 'string', readOnly: true }),
    defineField({ name: 'original', title: 'Originaltext', type: 'text', readOnly: true }),
    defineField({ name: 'text', title: 'Neuer Text', type: 'text' }),
  ],
  preview: { select: { title: 'text', subtitle: 'page' } },
})
