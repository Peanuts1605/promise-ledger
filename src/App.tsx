import { useMemo, useState } from 'react'
import {
  Archive,
  ArrowUpRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  FileText,
  MessageCircle,
  Send,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import './App.css'

type EventKind = 'captured' | 'assigned' | 'reminder' | 'prepared'

type LedgerEvent = {
  id: number
  kind: EventKind
  title: string
  detail: string
  time: string
}

const initialEvents: LedgerEvent[] = [
  {
    id: 1,
    kind: 'captured',
    title: 'Promise captured from call notes',
    detail: 'Jordan told Evelyn she would have an answer on the Patio Permit by Wednesday.',
    time: 'Today, 9:42 AM',
  },
]

const matchingMemory = {
  source: 'Evelyn Perez - 18 Jun call',
  excerpt: 'The permit decision affects the August 16 family event. An email is best; she does not use the customer portal.',
  reason: 'Customer and project both match this record.',
}

function App() {
  const [owner, setOwner] = useState<string | null>(null)
  const [events, setEvents] = useState<LedgerEvent[]>(initialEvents)
  const [reminderSet, setReminderSet] = useState(false)
  const [draftReady, setDraftReady] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const status = owner ? 'OWNER CONFIRMED' : 'OWNER REQUIRED'
  const dueLabel = owner ? 'Due Wednesday, 11:00 AM' : 'Awaiting an accountable owner'
  const progress = useMemo(() => (owner ? (draftReady ? 100 : 66) : 33), [owner, draftReady])
  const recommendation = !owner
    ? { label: 'ASSIGN OWNER', detail: 'Name one accountable person before any follow-up is prepared.' }
    : draftReady
      ? { label: 'REVIEW DRAFT', detail: 'Jordan has a scoped draft to review. It has not been sent.' }
      : { label: 'PREPARE REVIEW DRAFT', detail: 'Ownership and matching context are present.' }

  function appendEvent(event: Omit<LedgerEvent, 'id'>) {
    setEvents((current) => [...current, { ...event, id: current.length + 1 }])
  }

  function assignOwner() {
    if (owner) return
    setOwner('Jordan Kim')
    appendEvent({
      kind: 'assigned',
      title: 'Owner assigned: Jordan Kim',
      detail: 'Jordan accepted responsibility for the permit answer and its customer follow-up.',
      time: 'Today, 10:01 AM',
    })
    setNotice('Jordan is now accountable for this promise.')
  }

  function reassignOwner() {
    const nextOwner = owner === 'Jordan Kim' ? 'Maya Chen' : 'Jordan Kim'
    setOwner(nextOwner)
    setDraftReady(false)
    setReviewOpen(false)
    appendEvent({
      kind: 'assigned',
      title: `Owner reassigned: ${nextOwner}`,
      detail: `The next customer-facing decision now belongs to ${nextOwner}; any prior draft must be prepared again for review.`,
      time: 'Today, 10:05 AM',
    })
    setNotice(`${nextOwner} is now accountable. The prior draft returned to review preparation.`)
  }

  function setReminder() {
    if (reminderSet) return
    setReminderSet(true)
    appendEvent({
      kind: 'reminder',
      title: 'Reminder scheduled for Tuesday',
      detail: 'Jordan will be prompted before the Wednesday commitment expires.',
      time: 'Today, 10:02 AM',
    })
    setNotice('Reminder added before the promise goes quiet.')
  }

  function prepareFollowUp() {
    if (!owner) {
      setNotice('Assign an owner before preparing a customer follow-up.')
      return
    }
    if (!draftReady) {
      setDraftReady(true)
      appendEvent({
        kind: 'prepared',
        title: 'Follow-up draft prepared',
        detail: 'Draft uses only the matched Evelyn Perez memory and awaits Jordan\'s review.',
        time: 'Today, 10:04 AM',
      })
      setNotice('A review-ready draft is prepared. Nothing was sent.')
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#promise" aria-label="Promise Ledger home">
          <span className="wordmark-mark"><Check size={16} strokeWidth={2.7} /></span>
          <span>Promise Ledger</span>
        </a>
        <nav aria-label="Primary navigation">
          <a className="active" href="#promise">Open promise</a>
          <a href="#events">Ledger</a>
          <a href="#memory">Memory rules</a>
        </nav>
        <div className="topbar-note"><ShieldCheck size={15} /> Evidence-first operations memory</div>
      </header>

      <section className="intro" id="promise" aria-labelledby="page-title">
        <div className="crumbs"><span>Operations</span><ChevronRight size={14} /><span>Customer commitments</span><ChevronRight size={14} /><strong>PL-00284</strong></div>
        <div className="intro-grid">
          <div>
            <p className="eyebrow">A promise was made</p>
            <h1 id="page-title">Evelyn needs a clear answer about the Patio Permit.</h1>
            <p className="lede">A commitment should not disappear into a transcript. Give it an owner, preserve the evidence, and make the next move visible.</p>
          </div>
          <aside className="risk-panel" aria-label="Promise status">
            <div className="risk-heading"><span className={`status-dot ${owner ? 'resolved' : ''}`}></span><span>{status}</span></div>
            <strong>{dueLabel}</strong>
            <div className="progress-track" aria-label={`${progress}% promise readiness`}><span style={{ width: `${progress}%` }}></span></div>
            <p>{owner ? 'One person owns the next customer-facing decision.' : 'No accountable person is attached to the commitment yet.'}</p>
            <div className="recommendation"><strong>Agent recommendation: {recommendation.label}</strong><span>{recommendation.detail}</span></div>
          </aside>
        </div>
      </section>

      {notice && <div className="toast" role="status"><CheckCircle2 size={17} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification">x</button></div>}

      <section className="action-band" aria-label="Next action">
        <div>
          <span className="action-kicker">Next move</span>
          <strong>{owner ? `${owner} is accountable for the permit answer.` : 'Name the person who will keep this promise.'}</strong>
        </div>
        {!owner ? (
          <button className="button primary" onClick={assignOwner}><UserRound size={17} />Assign Jordan Kim</button>
        ) : (
          <div className="action-buttons">
            <button className="button secondary" onClick={setReminder}><Bell size={17} />{reminderSet ? 'Reminder set' : 'Set Tuesday reminder'}</button>
            <button className="button primary" onClick={prepareFollowUp}><Send size={17} />{draftReady ? 'Draft ready' : 'Prepare follow-up'}</button>
          </div>
        )}
      </section>

      <section className="workspace-grid" aria-label="Promise detail">
        <article className="case-file">
          <div className="section-heading"><div><p className="eyebrow">The commitment</p><h2>What was promised</h2></div><FileText size={20} /></div>
          <blockquote>"I will confirm whether the Patio Permit is approved and let you know by Wednesday."</blockquote>
          <dl className="detail-list">
            <div><dt>Customer</dt><dd>Evelyn Perez</dd></div>
            <div><dt>Project</dt><dd>Southside Patio</dd></div>
            <div><dt>Due</dt><dd>Wednesday, July 22 at 11:00 AM</dd></div>
            <div><dt>Captured from</dt><dd>Monday customer call notes</dd></div>
          </dl>
          <div className="source-note"><MessageCircle size={17} /><div><strong>Source stays attached</strong><span>Every next action points back to the original promise, not a summary someone may misread later.</span></div></div>
        </article>

        <article className="owner-card">
          <div className="section-heading"><div><p className="eyebrow">Accountability</p><h2>Owner record</h2></div><CircleUserRound size={20} /></div>
          {owner ? (
            <>
              <div className="owner-person"><span className="avatar">{owner === 'Jordan Kim' ? 'JK' : 'MC'}</span><div><strong>{owner}</strong><span>Permits and partner operations</span></div><span className="confirmed"><Check size={14} />Confirmed</span></div>
              <p>{owner} can review the facts, confirm the permit state, and decide whether Evelyn needs a status update before Wednesday.</p>
              <button className="text-button" onClick={reassignOwner}>Change owner <ArrowUpRight size={15} /></button>
            </>
          ) : (
            <>
              <div className="unassigned-icon"><UserRound size={25} /></div>
              <h3>No one owns this yet.</h3>
              <p>Promise Ledger treats an unassigned commitment as a visible operating risk, not a future cleanup task.</p>
              <button className="button primary wide" onClick={assignOwner}><UserRound size={17} />Assign Jordan Kim</button>
            </>
          )}
        </article>

        <article className="memory-card" id="memory">
          <div className="section-heading"><div><p className="eyebrow">Scoped memory</p><h2>Context that belongs here</h2></div><Archive size={20} /></div>
          <div className="memory-label"><ShieldCheck size={15} /> MATCHED TO THIS CUSTOMER</div>
          <p className="memory-source">{matchingMemory.source}</p>
          <p className="memory-excerpt">"{matchingMemory.excerpt}"</p>
          <div className="memory-why"><strong>Why this was used</strong><span>{matchingMemory.reason}</span></div>
          <div className="memory-guard"><span>No cross-customer match</span><span>Unrelated notes excluded</span></div>
        </article>
      </section>

      <section className="lower-grid">
        <article className="timeline" id="events">
          <div className="section-heading"><div><p className="eyebrow">Immutable record</p><h2>Promise events</h2></div><span className="event-count">{events.length} events</span></div>
          <ol>
            {events.map((event) => <li key={event.id} className={`event ${event.kind}`}>
              <span className="event-marker">{event.kind === 'captured' ? <FileText size={14} /> : event.kind === 'assigned' ? <UserRound size={14} /> : event.kind === 'reminder' ? <Bell size={14} /> : <Send size={14} />}</span>
              <div><strong>{event.title}</strong><p>{event.detail}</p></div><time>{event.time}</time>
            </li>)}
          </ol>
        </article>

        <article className={`draft-card ${draftReady ? 'ready' : ''}`}>
          <div className="section-heading"><div><p className="eyebrow">Review, never auto-send</p><h2>Customer follow-up</h2></div><Send size={20} /></div>
          {draftReady ? <>
            <div className="draft-status"><CheckCircle2 size={16} /> READY FOR {owner?.toUpperCase()} TO REVIEW</div>
            <p className="draft-copy">Hi Evelyn, I am confirming the Patio Permit status now. I will send the decision by Wednesday morning so you have clarity for the August 16 event.</p>
            <div className="draft-meta"><span>Uses 1 matching memory</span><span>Not sent</span></div>
            <button className="button secondary wide" onClick={() => setReviewOpen(true)}><FileText size={17} />Open review draft</button>
          </> : <>
            <div className="draft-placeholder"><Send size={24} /></div>
            <h3>Prepare the next message only after ownership is clear.</h3>
            <p>The system can make a reviewable draft. It does not send a customer message by itself.</p>
            <button className="button secondary wide" onClick={prepareFollowUp}><Send size={17} />Prepare follow-up</button>
          </>}
        </article>
      </section>

      {reviewOpen && draftReady && <div className="review-overlay" role="presentation">
        <section className="review-dialog" role="dialog" aria-modal="true" aria-labelledby="review-title">
          <div className="review-dialog-heading">
            <div><p className="eyebrow">Owner review</p><h2 id="review-title">Check the draft before anyone sends it.</h2></div>
            <button className="dialog-close" onClick={() => setReviewOpen(false)} aria-label="Close review draft">x</button>
          </div>
          <p className="review-owner">Prepared for <strong>{owner}</strong>. This draft is not sent.</p>
          <blockquote>{'"'}Hi Evelyn, I am confirming the Patio Permit status now. I will send the decision by Wednesday morning so you have clarity for the August 16 event.{'"'}</blockquote>
          <div className="review-evidence"><ShieldCheck size={16} /><span>Grounded in one matching customer-and-project memory. Unrelated notes are excluded.</span></div>
          <button className="button primary" onClick={() => setReviewOpen(false)}><Check size={17} />Close review</button>
        </section>
      </div>}

      <footer><span>Promise Ledger prototype</span><span>Public-safe demo data only</span><span>Decision record: ownership -&gt; evidence -&gt; next move</span></footer>
    </main>
  )
}

export default App
