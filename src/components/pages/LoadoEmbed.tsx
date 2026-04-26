'use client'

import Script from 'next/script'

/**
 * Loado-Iframe-Embed für die Lagerfahrzeuge-Seite. Das Wrapper-DIV
 * wird von loado.ch/js/iframe.min.js zur Laufzeit in einen passenden
 * Iframe umgewandelt; deshalb muss data-iframe-src genau diesen Namen
 * tragen.
 */
export default function LoadoEmbed() {
  return (
    <>
      <div
        id="loado-iframe-wrapper"
        data-iframe-src="https://loado.ch/de/vehicle/list?customer=1211&iframe=true"
        style={{ width: '100%', minHeight: 600 }}
      />
      <Script
        src="https://www.loado.ch/js/iframe.min.js"
        strategy="afterInteractive"
      />
    </>
  )
}
