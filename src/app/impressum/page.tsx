import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum der Ernst Moser GmbH, Gerlafingen SO – Angaben gemäss Schweizer Recht.',
}

export default function ImpressumPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">

        {/* Breadcrumb */}
        <nav className="legal-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={13} />
          <span>Impressum</span>
        </nav>

        <h1 className="legal-h1">Impressum</h1>

        {/* ── Angaben zur Unternehmung ── */}
        <section className="legal-section">
          <h2 className="legal-h2">Angaben zur Unternehmung</h2>
          <div className="legal-info-grid">
            <div className="legal-info-row">
              <span className="legal-info-label">Firmenname</span>
              <span className="legal-info-value">Ernst Moser GmbH</span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">Rechtsform</span>
              <span className="legal-info-value">Gesellschaft mit beschränkter Haftung (GmbH)</span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">Adresse</span>
              <span className="legal-info-value">Derendingenstrasse 25<br />4563 Gerlafingen SO<br />Schweiz</span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">Telefon</span>
              <span className="legal-info-value">
                <a href="tel:+41326755805" className="legal-link">+41 (0)32 675 58 05</a>
              </span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">Notfallnummer</span>
              <span className="legal-info-value">
                <a href="tel:+41794856645" className="legal-link">+41 (0)79 485 66 45</a>
              </span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">E-Mail</span>
              <span className="legal-info-value">
                <a href="mailto:info@ernst-moser.ch" className="legal-link">info@ernst-moser.ch</a>
              </span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">Website</span>
              <span className="legal-info-value">www.ernst-moser.ch</span>
            </div>
          </div>
        </section>

        {/* ── Handelsregister ── */}
        <section className="legal-section">
          <h2 className="legal-h2">Handelsregister</h2>
          <div className="legal-info-grid">
            <div className="legal-info-row">
              <span className="legal-info-label">UID-Nummer</span>
              <span className="legal-info-value">CHE-445.469.855</span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">MWST-Nummer</span>
              <span className="legal-info-value">CHE-445.469.855 MWST</span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">HR-Nummer</span>
              <span className="legal-info-value">CH-241.4.016.863-2</span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">Handelsregisteramt</span>
              <span className="legal-info-value">Kanton Solothurn</span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">Stammkapital</span>
              <span className="legal-info-value">CHF 20'000.–</span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">Gründungsdatum</span>
              <span className="legal-info-value">21. Juni 2018</span>
            </div>
          </div>
        </section>

        {/* ── Verantwortlichkeit ── */}
        <section className="legal-section">
          <h2 className="legal-h2">Verantwortlich für den Inhalt</h2>
          <div className="legal-info-grid">
            <div className="legal-info-row">
              <span className="legal-info-label">Geschäftsführer</span>
              <span className="legal-info-value">Adrian Moser</span>
            </div>
            <div className="legal-info-row">
              <span className="legal-info-label">Funktion</span>
              <span className="legal-info-value">Geschäftsführer, Leitung Verkauf,<br />Betriebsleiter Kommunalcenter und Motorgerätecenter</span>
            </div>
          </div>
        </section>

        {/* ── Haftungsausschluss ── */}
        <section className="legal-section">
          <h2 className="legal-h2">Haftungsausschluss</h2>
          <h3 className="legal-h3">Inhalt des Onlineangebotes</h3>
          <p className="legal-p">
            Die Ernst Moser GmbH übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen die Ernst Moser GmbH, die sich auf Schäden materieller oder ideeller Art beziehen, welche durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens der Ernst Moser GmbH kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
          </p>
          <h3 className="legal-h3">Verweise und Links</h3>
          <p className="legal-p">
            Bei direkten oder indirekten Verweisen auf fremde Webseiten («Hyperlinks»), die ausserhalb des Verantwortungsbereiches der Ernst Moser GmbH liegen, würde eine Haftungsverpflichtung ausschliesslich in dem Fall in Kraft treten, in dem die Ernst Moser GmbH von den Inhalten Kenntnis hat und es ihr technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Die Ernst Moser GmbH erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Die Ernst Moser GmbH hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten.
          </p>
          <h3 className="legal-h3">Urheber- und Kennzeichenrecht</h3>
          <p className="legal-p">
            Die Ernst Moser GmbH ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihr selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen. Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer.
          </p>
          <p className="legal-p">
            Das Copyright für veröffentlichte, von der Ernst Moser GmbH selbst erstellte Objekte bleibt allein bei der Ernst Moser GmbH. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung der Ernst Moser GmbH nicht gestattet.
          </p>
        </section>

        {/* ── Rechtswahl ── */}
        <section className="legal-section">
          <h2 className="legal-h2">Anwendbares Recht und Gerichtsstand</h2>
          <p className="legal-p">
            Für sämtliche Streitigkeiten aus oder im Zusammenhang mit diesem Internetauftritt gilt ausschliesslich Schweizer Recht. Als Gerichtsstand wird Solothurn vereinbart.
          </p>
        </section>

      </div>
    </div>
  )
}
