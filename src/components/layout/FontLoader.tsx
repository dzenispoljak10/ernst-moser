import { readClient as client } from '@/lib/sanity'

interface FontAsset {
  _id: string
  url: string
  originalFilename: string
}

export default async function FontLoader() {
  try {
    const fonts: FontAsset[] = await client.fetch(
      `*[_type == "sanity.fileAsset" && originalFilename match "Nersans*"] { _id, url, originalFilename }`
    )

    if (!fonts || fonts.length === 0) return null

    const fontFaces = fonts
      .map((font) => {
        const name = font.originalFilename.toLowerCase()
        const weight =
          name.includes('bold') || name.includes('700')
            ? '700'
            : name.includes('semibold') || name.includes('600')
            ? '600'
            : name.includes('light') || name.includes('300')
            ? '300'
            : '400'
        const style = name.includes('italic') ? 'italic' : 'normal'
        return `@font-face {
  font-family: 'Nersans';
  src: url('${font.url}') format('truetype');
  font-weight: ${weight};
  font-style: ${style};
  font-display: swap;
}`
      })
      .join('\n')

    return <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
  } catch {
    return null
  }
}
