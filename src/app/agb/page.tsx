import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen (AGB)',
  description: 'AGB der Ernst Moser GmbH für Fahrzeughandel, Kommunalgeräte, Motorgeräte, Service und Reparaturen.',
}

export default function AGBPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">

        {/* Breadcrumb */}
        <nav className="legal-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={13} />
          <span>AGB</span>
        </nav>

        <h1 className="legal-h1">Allgemeine Geschäftsbedingungen (AGB)</h1>
        <p className="legal-intro">
          Ernst Moser GmbH, Derendingenstrasse 25, 4563 Gerlafingen SO<br />
          Gültig ab: Januar 2024 · Es gilt Schweizer Recht (OR)
        </p>

        {/* Art. 1 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 1 – Geltungsbereich</h2>
          <p className="legal-p">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Geschäftsbeziehungen zwischen der Ernst Moser GmbH (nachfolgend «Verkäufer» oder «Auftragnehmer») und ihren Kunden (nachfolgend «Käufer» oder «Auftraggeber»). Sie umfassen den Verkauf von Nutzfahrzeugen, Kommunalgeräten, Motorgeräten und Zubehör sowie die Erbringung von Reparatur-, Service- und Unterhaltleistungen und die Vermietung von Geräten und Fahrzeugen.
          </p>
          <p className="legal-p">
            Abweichende, entgegenstehende oder ergänzende AGB des Käufers werden nur dann Vertragsbestandteil, wenn der Verkäufer deren Geltung ausdrücklich schriftlich zugestimmt hat.
          </p>
        </section>

        {/* Art. 2 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 2 – Angebote und Vertragsabschluss</h2>
          <p className="legal-p">
            Angebote des Verkäufers sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich bezeichnet werden. Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung des Verkäufers oder durch Lieferung der Ware zustande. Mündliche Zusagen und Nebenabreden bedürfen zu ihrer Gültigkeit der schriftlichen Bestätigung durch den Verkäufer.
          </p>
          <p className="legal-p">
            Kataloge, Prospekte, Abbildungen und technische Angaben sind unverbindlich und stellen keine Zusicherungen oder Garantien dar, soweit sie nicht ausdrücklich als solche bezeichnet sind.
          </p>
        </section>

        {/* Art. 3 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 3 – Preise und Mehrwertsteuer</h2>
          <p className="legal-p">
            Alle Preise verstehen sich in Schweizer Franken (CHF) und zuzüglich der gesetzlichen Mehrwertsteuer (MWST) in der jeweils gültigen Höhe (aktuell 8,1%). Angaben in Offerten und Auftragsbestätigungen sind Nettopreise ohne MWST, sofern nicht ausdrücklich anders vermerkt.
          </p>
          <p className="legal-p">
            Preisänderungen bis zur Lieferung sind vorbehalten, sofern sich Kosten für Material, Energie, Löhne oder sonstige Betriebskosten seit Vertragsabschluss wesentlich verändert haben. Neuwagen- und Occasionspreise verstehen sich ab Standort Gerlafingen; Überführungskosten werden separat verrechnet.
          </p>
        </section>

        {/* Art. 4 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 4 – Zahlungsbedingungen</h2>
          <p className="legal-p">
            Rechnungen sind, sofern nichts anderes vereinbart wurde, innert 30 Tagen nach Rechnungsdatum netto zahlbar. Bei Fahrzeug- und Gerätekäufen ist der Kaufpreis vor Übergabe vollständig zu begleichen, sofern keine Finanzierungsvereinbarung getroffen wurde.
          </p>
          <p className="legal-p">
            Bei Zahlungsverzug ist der Verkäufer berechtigt, Verzugszins von 5% p.a. zu berechnen sowie entstandene Mahnspesen und Inkassokosten in Rechnung zu stellen. Das Eigentum an der gelieferten Ware geht erst mit vollständiger Bezahlung des Kaufpreises auf den Käufer über (Eigentumsvorbehalt gemäss Art. 715 ZGB).
          </p>
        </section>

        {/* Art. 5 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 5 – Lieferung und Übergabe</h2>
          <p className="legal-p">
            Liefertermine sind, soweit nicht ausdrücklich als verbindlich bezeichnet, unverbindliche Richtwerte. Teillieferungen sind zulässig. Verzögerungen durch höhere Gewalt, Streik, behördliche Massnahmen, Rohstoff- oder Lieferengpässe berechtigen den Käufer nicht zum Rücktritt und begründen keine Schadenersatzpflicht des Verkäufers.
          </p>
          <p className="legal-p">
            Die Übergabe erfolgt an unserem Betriebsstandort Gerlafingen, sofern keine andere Vereinbarung getroffen wurde. Transport und Überführung gehen zulasten und auf Risiko des Käufers.
          </p>
        </section>

        {/* Art. 6 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 6 – Reparatur, Service und Werkstattleistungen</h2>
          <p className="legal-p">
            Reparatur- und Servicearbeiten werden nach Aufwand zum jeweils gültigen Stundensatz des Verkäufers verrechnet, sofern kein Festpreis vereinbart wurde. Kostenvoranschläge sind unverbindlich und können bei Aufdeckung weiterer Mängel oder Schäden überschritten werden; der Auftraggeber wird in solchen Fällen informiert.
          </p>
          <p className="legal-p">
            Der Auftraggeber hat das Fahrzeug oder Gerät betriebsbereit und frei von persönlichen Gegenständen anzuliefern. Die Abholung hat innert 10 Tagen nach Fertigstellungsmeldung zu erfolgen. Für danach im Betrieb verbleibende Fahrzeuge und Geräte kann eine Standgebühr erhoben werden.
          </p>
          <p className="legal-p">
            Reparierte Teile können bei Nichtabholung innert 30 Tagen entsorgt werden. Nicht abgeholte Fahrzeuge und Geräte können nach Mahnung auf Kosten des Auftraggebers eingelagert oder verwertet werden.
          </p>
        </section>

        {/* Art. 7 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 7 – Mietgeräte und Fahrzeugmiete</h2>
          <p className="legal-p">
            Mietgeräte und Mietfahrzeuge werden in einwandfreiem Zustand übergeben und sind in gleichem Zustand zurückzugeben. Der Mieter haftet für alle während der Mietdauer entstandenen Schäden, ausgenommen normaler Verschleiss. Eine Kaution kann verlangt werden.
          </p>
          <p className="legal-p">
            Der Mieter darf Mietgeräte nicht ohne schriftliche Zustimmung des Vermieters untervermieten oder Dritten überlassen. Mietpreise gelten für die vereinbarte Mietdauer; bei Verlängerung sind Folgepreise vereinzubart. Bei Rückgabe ausserhalb der Geschäftszeiten gilt das Gerät als bis zum nächsten Arbeitstag zurückgegeben.
          </p>
        </section>

        {/* Art. 8 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 8 – Gewährleistung und Sachmängel</h2>
          <p className="legal-p">
            Für Neufahrzeuge und Neugeräte gilt die jeweilige Herstellergarantie. Für Occasionsfahrzeuge und -geräte beträgt die Gewährleistungsfrist 12 Monate ab Übergabe, sofern nicht abweichend vereinbart. Die Gewährleistung umfasst nach Wahl des Verkäufers Nachbesserung oder Ersatzlieferung.
          </p>
          <p className="legal-p">
            Mängel sind unverzüglich, spätestens innert 8 Tagen nach Entdeckung schriftlich zu rügen. Gerügte Mängel berechtigen den Käufer nicht zur Verweigerung der Zahlung oder zur Aufrechnung. Weitergehende Ansprüche, insbesondere auf Schadenersatz, sind ausgeschlossen, soweit nicht Vorsatz oder grobe Fahrlässigkeit vorliegt.
          </p>
        </section>

        {/* Art. 9 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 9 – Haftungsbeschränkung</h2>
          <p className="legal-p">
            Die Haftung des Verkäufers für mittelbare Schäden, Folgeschäden, entgangenen Gewinn und Schäden Dritter ist ausgeschlossen. Die Haftung für direkte Schäden ist auf den Rechnungsbetrag der betreffenden Leistung beschränkt, soweit gesetzlich zulässig. Diese Haftungsbeschränkung gilt nicht bei Personenschäden sowie bei Vorsatz oder grober Fahrlässigkeit.
          </p>
        </section>

        {/* Art. 10 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 10 – Rücktritt und Annullation</h2>
          <p className="legal-p">
            Bei bestellten und konfigurierten Fahrzeugen oder Geräten ist ein Rücktritt durch den Käufer nach Auftragsbestätigung nur mit Zustimmung des Verkäufers möglich. In diesem Fall ist eine Annullationsentschädigung von mindestens 10% des Kaufpreises, bei bereits bestellten Fahrzeugen von bis zu 25%, geschuldet.
          </p>
        </section>

        {/* Art. 11 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 11 – Datenschutz</h2>
          <p className="legal-p">
            Die Bearbeitung von Personendaten erfolgt gemäss unserer <Link href="/datenschutz" className="legal-link">Datenschutzerklärung</Link> und in Übereinstimmung mit dem Schweizer Datenschutzgesetz (DSG).
          </p>
        </section>

        {/* Art. 12 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 12 – Anwendbares Recht und Gerichtsstand</h2>
          <p className="legal-p">
            Es gilt ausschliesslich Schweizer Recht unter Ausschluss der Kollisionsnormen und des UN-Kaufrechts (CISG). Als ausschliesslicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesen AGB wird Solothurn vereinbart. Der Verkäufer ist jedoch berechtigt, den Käufer auch an seinem allgemeinen Gerichtsstand zu belangen.
          </p>
        </section>

        {/* Art. 13 */}
        <section className="legal-section">
          <h2 className="legal-h2">Art. 13 – Schlussbestimmungen</h2>
          <p className="legal-p">
            Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. Die Parteien verpflichten sich, die unwirksame Bestimmung durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung möglichst nahekommt.
          </p>
          <p className="legal-p">
            Die Ernst Moser GmbH behält sich das Recht vor, diese AGB jederzeit zu ändern. Es gilt jeweils die zum Zeitpunkt des Vertragsabschlusses gültige Fassung.
          </p>
        </section>

        <p className="legal-meta">
          Ernst Moser GmbH · Gerlafingen, Januar 2024
        </p>

      </div>
    </div>
  )
}
