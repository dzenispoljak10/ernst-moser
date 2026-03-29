import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der Ernst Moser GmbH gemäss Schweizer DSG.',
}

export default function DatenschutzPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">

        {/* Breadcrumb */}
        <nav className="legal-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={13} />
          <span>Datenschutz</span>
        </nav>

        <h1 className="legal-h1">Datenschutzerklärung</h1>
        <p className="legal-intro">
          Letzte Aktualisierung: Januar 2024 · Gemäss Schweizer Datenschutzgesetz (DSG)
        </p>

        {/* 1 */}
        <section className="legal-section">
          <h2 className="legal-h2">1. Verantwortliche Stelle</h2>
          <p className="legal-p">
            Verantwortlich für die Bearbeitung Ihrer Personendaten auf dieser Website ist:
          </p>
          <div className="legal-address-box">
            <strong>Ernst Moser GmbH</strong><br />
            Derendingenstrasse 25<br />
            4563 Gerlafingen SO<br />
            Schweiz<br />
            <br />
            Telefon: <a href="tel:+41326755805" className="legal-link">+41 (0)32 675 58 05</a><br />
            E-Mail: <a href="mailto:info@ernst-moser.ch" className="legal-link">info@ernst-moser.ch</a>
          </div>
        </section>

        {/* 2 */}
        <section className="legal-section">
          <h2 className="legal-h2">2. Allgemeines zur Datenbearbeitung</h2>
          <p className="legal-p">
            Wir bearbeiten Ihre Personendaten nur, wenn dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Eine regelmässige Bearbeitung Ihrer Personendaten erfolgt nur mit Ihrer Einwilligung oder soweit die Bearbeitung durch gesetzliche Vorschriften erlaubt ist.
          </p>
          <p className="legal-p">
            Diese Datenschutzerklärung richtet sich nach dem Schweizer Datenschutzgesetz (DSG) sowie – soweit anwendbar – der EU-Datenschutz-Grundverordnung (DSGVO).
          </p>
        </section>

        {/* 3 */}
        <section className="legal-section">
          <h2 className="legal-h2">3. Erhobene Daten beim Website-Besuch</h2>
          <h3 className="legal-h3">3.1 Server-Logfiles</h3>
          <p className="legal-p">
            Bei jedem Aufruf unserer Website werden vom Hosting-Provider automatisch folgende Daten erfasst und in sogenannten Server-Logfiles gespeichert:
          </p>
          <ul className="legal-list">
            <li>IP-Adresse des anfragenden Geräts (anonymisiert)</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Name und URL der abgerufenen Datei</li>
            <li>Website, von der aus der Zugriff erfolgte (Referrer-URL)</li>
            <li>Verwendeter Browser und Betriebssystem</li>
            <li>Übertragenes Datenvolumen</li>
          </ul>
          <p className="legal-p">
            Diese Daten werden ausschliesslich zur Sicherstellung eines störungsfreien Betriebs und zur Verbesserung unserer Website verwendet. Sie werden nicht mit anderen Daten zusammengeführt und nach spätestens 7 Tagen gelöscht.
          </p>

          <h3 className="legal-h3">3.2 Cookies</h3>
          <p className="legal-p">
            Unsere Website verwendet ausschliesslich technisch notwendige Cookies, die für den Betrieb der Website unerlässlich sind. Es werden keine Tracking- oder Werbe-Cookies eingesetzt. Technisch notwendige Cookies können nicht deaktiviert werden, ohne die Funktionalität der Website zu beeinträchtigen.
          </p>
          <p className="legal-p">
            Sie können Cookies in Ihrem Browser jederzeit löschen oder die Speicherung von Cookies deaktivieren. Beachten Sie, dass in diesem Fall möglicherweise nicht alle Funktionen unserer Website vollständig genutzt werden können.
          </p>
        </section>

        {/* 4 */}
        <section className="legal-section">
          <h2 className="legal-h2">4. Kontaktaufnahme</h2>
          <p className="legal-p">
            Wenn Sie uns per E-Mail, Telefon oder Kontaktformular kontaktieren, werden Ihre übermittelten Daten (Name, E-Mail-Adresse, Telefonnummer, Nachrichteninhalt) gespeichert, um Ihre Anfrage zu bearbeiten und für Rückfragen zur Verfügung zu stehen. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p className="legal-p">
            Die Bearbeitung dieser Daten erfolgt auf der Grundlage unseres berechtigten Interesses an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO / Art. 31 DSG). Ihre Daten werden nach vollständiger Bearbeitung Ihrer Anfrage gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>
        </section>

        {/* 5 */}
        <section className="legal-section">
          <h2 className="legal-h2">5. Kundendaten im Rahmen von Vertragsabschlüssen</h2>
          <p className="legal-p">
            Im Rahmen von Kauf-, Miet- und Serviceverträgen bearbeiten wir folgende Personendaten zur Vertragsabwicklung:
          </p>
          <ul className="legal-list">
            <li>Name und Adresse</li>
            <li>Kontaktdaten (Telefon, E-Mail)</li>
            <li>Fahrzeug- und Gerätedaten</li>
            <li>Zahlungsinformationen</li>
            <li>Service- und Reparaturhistorie</li>
          </ul>
          <p className="legal-p">
            Diese Daten werden ausschliesslich zur Vertragserfüllung, für gesetzlich vorgeschriebene Buchführungspflichten und zur Erbringung unserer Serviceleistungen verwendet. Die Aufbewahrungsfrist richtet sich nach den gesetzlichen Vorgaben (OR: 10 Jahre).
          </p>
        </section>

        {/* 6 */}
        <section className="legal-section">
          <h2 className="legal-h2">6. Weitergabe von Daten an Dritte</h2>
          <p className="legal-p">
            Wir geben Ihre Personendaten nur dann an Dritte weiter, wenn:
          </p>
          <ul className="legal-list">
            <li>Sie Ihre ausdrückliche Einwilligung dazu erteilt haben,</li>
            <li>die Weitergabe zur Vertragserfüllung erforderlich ist (z.B. Hersteller für Garantiefälle, Finanzierungspartner),</li>
            <li>wir gesetzlich zur Weitergabe verpflichtet sind,</li>
            <li>die Weitergabe zur Wahrung unserer berechtigten Interessen oder der Interessen Dritter erforderlich ist.</li>
          </ul>
          <p className="legal-p">
            Eine Weitergabe an Dritte zu Werbezwecken findet nicht statt. Wir setzen keine externen Webanalyse-Dienste oder Social-Media-Tracking-Tools ein.
          </p>
        </section>

        {/* 7 */}
        <section className="legal-section">
          <h2 className="legal-h2">7. Datensicherheit</h2>
          <p className="legal-p">
            Wir setzen technische und organisatorische Sicherheitsmassnahmen ein, um Ihre Personendaten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsmassnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
          </p>
          <p className="legal-p">
            Die Datenübertragung auf unserer Website erfolgt verschlüsselt über das HTTPS-Protokoll (SSL/TLS).
          </p>
        </section>

        {/* 8 */}
        <section className="legal-section">
          <h2 className="legal-h2">8. Ihre Rechte</h2>
          <p className="legal-p">Sie haben gemäss DSG und – soweit anwendbar – DSGVO folgende Rechte:</p>
          <div className="legal-rights-grid">
            <div className="legal-right-item">
              <div className="legal-right-title">Auskunftsrecht</div>
              <div className="legal-right-desc">Sie können jederzeit Auskunft über die zu Ihrer Person gespeicherten Daten verlangen.</div>
            </div>
            <div className="legal-right-item">
              <div className="legal-right-title">Recht auf Berichtigung</div>
              <div className="legal-right-desc">Unrichtige oder unvollständige Personendaten können Sie jederzeit korrigieren lassen.</div>
            </div>
            <div className="legal-right-item">
              <div className="legal-right-title">Recht auf Löschung</div>
              <div className="legal-right-desc">Sie können die Löschung Ihrer Daten verlangen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</div>
            </div>
            <div className="legal-right-item">
              <div className="legal-right-title">Recht auf Einschränkung</div>
              <div className="legal-right-desc">Sie können die Einschränkung der Bearbeitung Ihrer Daten verlangen.</div>
            </div>
            <div className="legal-right-item">
              <div className="legal-right-title">Widerspruchsrecht</div>
              <div className="legal-right-desc">Sie können der Bearbeitung Ihrer Daten jederzeit widersprechen, soweit diese auf berechtigten Interessen beruht.</div>
            </div>
            <div className="legal-right-item">
              <div className="legal-right-title">Datenportabilität</div>
              <div className="legal-right-desc">Sie haben das Recht, Ihre Daten in einem gängigen Format zu erhalten.</div>
            </div>
          </div>
          <p className="legal-p" style={{ marginTop: 24 }}>
            Zur Ausübung Ihrer Rechte wenden Sie sich schriftlich oder per E-Mail an:<br />
            <a href="mailto:info@ernst-moser.ch" className="legal-link">info@ernst-moser.ch</a>
          </p>
          <p className="legal-p">
            Sie haben zudem das Recht, bei der zuständigen Aufsichtsbehörde eine Beschwerde einzureichen. In der Schweiz ist dies der Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB), <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer" className="legal-link">www.edoeb.admin.ch</a>.
          </p>
        </section>

        {/* 9 */}
        <section className="legal-section">
          <h2 className="legal-h2">9. Änderungen dieser Datenschutzerklärung</h2>
          <p className="legal-p">
            Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit anzupassen. Die jeweils aktuelle Version ist auf dieser Website einsehbar. Bei wesentlichen Änderungen informieren wir Sie soweit möglich direkt.
          </p>
        </section>

        <p className="legal-meta">
          Ernst Moser GmbH · Gerlafingen, Januar 2024
        </p>

      </div>
    </div>
  )
}
