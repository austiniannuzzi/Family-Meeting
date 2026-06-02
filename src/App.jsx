import { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── THEMES ──────────────────────────────────────────────────────────────────

const THEMES = {
  warm: {
    name: "Warm Hearth", emoji: "🍂",
    bg: "linear-gradient(160deg,#fdf6e8 0%,#fef0d0 40%,#fde8c0 100%)",
    cardBg: "rgba(255,251,244,0.88)", cardBorder: "#e8d9be",
    headerBg: "rgba(255,251,244,0.92)", tabActiveBg: "#f5e6c8",
    primary: "#7c4a03", primaryText: "#fff5e6",
    accent: "#c8a46e", accentLight: "#f5e6c8",
    text: "#4a2800", textMid: "#7a5530", textLight: "#a07850",
    inputBg: "#fdf9f2", inputBorder: "#e8d4a8",
    rowAlt: "#fdf4e4", scrollThumb: "#c8a46e",
    shadow: "rgba(140,100,40,.07)",
  },
  forest: {
    name: "Forest Green", emoji: "🌲",
    bg: "linear-gradient(160deg,#f0fdf4 0%,#dcfce7 40%,#bbf7d0 100%)",
    cardBg: "rgba(240,253,244,0.90)", cardBorder: "#86efac",
    headerBg: "rgba(240,253,244,0.94)", tabActiveBg: "#dcfce7",
    primary: "#166534", primaryText: "#f0fdf4",
    accent: "#4ade80", accentLight: "#dcfce7",
    text: "#14532d", textMid: "#166534", textLight: "#4ade80",
    inputBg: "#f0fdf4", inputBorder: "#86efac",
    rowAlt: "#dcfce7", scrollThumb: "#4ade80",
    shadow: "rgba(20,83,45,.07)",
  },
  ocean: {
    name: "Deep Ocean", emoji: "🌊",
    bg: "linear-gradient(160deg,#eff6ff 0%,#dbeafe 40%,#bfdbfe 100%)",
    cardBg: "rgba(239,246,255,0.90)", cardBorder: "#93c5fd",
    headerBg: "rgba(239,246,255,0.94)", tabActiveBg: "#dbeafe",
    primary: "#1d4ed8", primaryText: "#eff6ff",
    accent: "#60a5fa", accentLight: "#dbeafe",
    text: "#1e3a8a", textMid: "#1d4ed8", textLight: "#60a5fa",
    inputBg: "#eff6ff", inputBorder: "#93c5fd",
    rowAlt: "#dbeafe", scrollThumb: "#60a5fa",
    shadow: "rgba(30,58,138,.07)",
  },
  midnight: {
    name: "Midnight", emoji: "🌙",
    bg: "linear-gradient(160deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)",
    cardBg: "rgba(30,41,59,0.92)", cardBorder: "#334155",
    headerBg: "rgba(15,23,42,0.95)", tabActiveBg: "#334155",
    primary: "#818cf8", primaryText: "#0f172a",
    accent: "#6366f1", accentLight: "#312e81",
    text: "#f1f5f9", textMid: "#cbd5e1", textLight: "#94a3b8",
    inputBg: "#1e293b", inputBorder: "#334155",
    rowAlt: "#1e293b", scrollThumb: "#4f46e5",
    shadow: "rgba(0,0,0,.3)",
  },
  rose: {
    name: "Rose Garden", emoji: "🌸",
    bg: "linear-gradient(160deg,#fff1f2 0%,#ffe4e6 40%,#fecdd3 100%)",
    cardBg: "rgba(255,241,242,0.90)", cardBorder: "#fda4af",
    headerBg: "rgba(255,241,242,0.94)", tabActiveBg: "#ffe4e6",
    primary: "#be123c", primaryText: "#fff1f2",
    accent: "#fb7185", accentLight: "#ffe4e6",
    text: "#881337", textMid: "#be123c", textLight: "#fb7185",
    inputBg: "#fff1f2", inputBorder: "#fda4af",
    rowAlt: "#ffe4e6", scrollThumb: "#fb7185",
    shadow: "rgba(136,19,55,.07)",
  },
  slate: {
    name: "Clean Slate", emoji: "⬜",
    bg: "linear-gradient(160deg,#f8fafc 0%,#f1f5f9 40%,#e2e8f0 100%)",
    cardBg: "rgba(248,250,252,0.92)", cardBorder: "#cbd5e1",
    headerBg: "rgba(248,250,252,0.95)", tabActiveBg: "#e2e8f0",
    primary: "#334155", primaryText: "#f8fafc",
    accent: "#64748b", accentLight: "#e2e8f0",
    text: "#0f172a", textMid: "#334155", textLight: "#64748b",
    inputBg: "#f8fafc", inputBorder: "#cbd5e1",
    rowAlt: "#f1f5f9", scrollThumb: "#94a3b8",
    shadow: "rgba(0,0,0,.05)",
  },
};

const FONTS = {
  fraunces: { name: "Fraunces + DM Sans", display: "Fraunces, serif", body: "DM Sans, sans-serif", import: "Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500;600;700" },
  playfair: { name: "Playfair + Inter", display: "Playfair Display, serif", body: "Inter, sans-serif", import: "Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700" },
  lora:     { name: "Lora + Nunito", display: "Lora, serif", body: "Nunito, sans-serif", import: "Lora:wght@400;600;700&family=Nunito:wght@400;600;700" },
  mono:     { name: "Courier + IBM Plex", display: "Courier Prime, monospace", body: "IBM Plex Mono, monospace", import: "Courier+Prime:wght@400;700&family=IBM+Plex+Mono:wght@400;500;600" },
  rounded:  { name: "Pacifico + Quicksand", display: "Pacifico, cursive", body: "Quicksand, sans-serif", import: "Pacifico&family=Quicksand:wght@400;500;600;700" },
};

// ─── SETTINGS CONTEXT ────────────────────────────────────────────────────────

const SettingsCtx = createContext(null);
const useSettings = () => useContext(SettingsCtx);

// ─── DATA ────────────────────────────────────────────────────────────────────

const AGENDA_ITEMS = [
  { id: "checkin",   emoji: "👋", label: "Check-In",        duration: 5,  description: "One word or emoji from each member. How are you feeling right now?" },
  { id: "celebrate", emoji: "🎉", label: "Celebrations",    duration: 5,  description: "Share wins, shout-outs, and appreciations from this week." },
  { id: "actions",   emoji: "✅", label: "Action Review",   duration: 5,  description: "Review last week's action items. What got done? What's still open?" },
  { id: "schedule",  emoji: "📅", label: "Schedule Sync",   duration: 15, description: "Calendar, activities, logistics, and any conflicts for the week ahead." },
  { id: "forum",     emoji: "💬", label: "Open Forum",      duration: 10, description: "Concerns, requests, or topics raised by any family member." },
  { id: "decision",  emoji: "🤝", label: "Family Decision", duration: 5,  description: "One collaborative household decision for this week." },
  { id: "newitems",  emoji: "📝", label: "New Actions",     duration: 5,  description: "Assign action items with a clear owner and due date." },
  { id: "closing",   emoji: "⭐", label: "Closing Ritual",  duration: 5,  description: "Rate the meeting 1–5 and share one word for the week ahead." },
];

const ROLES = ["Facilitator", "Recorder", "Timekeeper", "Vibe Checker"];

const SAMPLE_ACTIONS = [
  { id: 1, text: "Book soccer registration", owner: "Alex", due: "2026-06-03", done: false },
  { id: 2, text: "Research camping sites",   owner: "Jordan", due: "2026-06-08", done: true },
  { id: 3, text: "Schedule dentist appointments", owner: "Sam", due: "2026-06-05", done: false },
];

const BIBLE_BOOKS = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
  "1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra",
  "Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon",
  "Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos",
  "Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah",
  "Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians",
  "2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians",
  "2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James",
  "1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmt(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function useTimer(initialSec) {
  const [sec, setSec] = useState(initialSec);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (running && sec > 0) { ref.current = setInterval(() => setSec(s => s - 1), 1000); }
    else { clearInterval(ref.current); if (sec === 0) setRunning(false); }
    return () => clearInterval(ref.current);
  }, [running, sec]);
  const reset = (s) => { setRunning(false); setSec(s); };
  return { sec, running, setRunning, reset };
}

// ─── SHARED UI ───────────────────────────────────────────────────────────────

function NavTab({ label, active, onClick, icon }) {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "10px 14px", borderRadius: 12, border: "none", cursor: "pointer",
      fontFamily: F.display, fontSize: 14,
      fontWeight: active ? 700 : 400,
      background: active ? T.tabActiveBg : "transparent",
      color: active ? T.primary : T.textLight,
      transition: "all .2s", whiteSpace: "nowrap",
    }}>
      <span>{icon}</span>{label}
    </button>
  );
}

function Card({ children, style = {} }) {
  const { theme } = useSettings();
  const T = THEMES[theme];
  return (
    <div style={{
      background: T.cardBg, borderRadius: 20,
      border: `1.5px solid ${T.cardBorder}`, padding: 24,
      boxShadow: `0 2px 16px ${T.shadow}`,
      backdropFilter: "blur(6px)", ...style
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, sub }) {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 700, color: T.text }}>{children}</div>
      {sub && <div style={{ fontFamily: F.body, fontSize: 13, color: T.textLight, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Badge({ children, color, bg }) {
  const { theme } = useSettings();
  const T = THEMES[theme];
  return (
    <span style={{
      padding: "2px 10px", borderRadius: 99, fontSize: 12, fontWeight: 700,
      background: bg || T.accentLight, color: color || T.primary,
      fontFamily: "inherit", letterSpacing: .3
    }}>
      {children}
    </span>
  );
}

function Btn({ children, onClick, variant = "primary", small = false, style = {} }) {
  const { theme } = useSettings();
  const T = THEMES[theme];
  const variants = {
    primary:   { background: T.primary, color: T.primaryText, border: "none" },
    secondary: { background: "transparent", color: T.primary, border: `1.5px solid ${T.accent}` },
    ghost:     { background: "transparent", color: T.textLight, border: "none" },
    danger:    { background: "#fee2e2", color: "#b91c1c", border: "none" },
    success:   { background: "#dcfce7", color: "#166534", border: "none" },
  };
  return (
    <button onClick={onClick} style={{
      ...(variants[variant] || variants.primary),
      padding: small ? "5px 14px" : "9px 22px",
      borderRadius: 12, cursor: "pointer",
      fontFamily: "inherit", fontSize: small ? 13 : 15, fontWeight: 600,
      transition: "all .15s", lineHeight: 1.4, ...style
    }}>
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder, type = "text", onKeyDown, style = {} }) {
  const { theme } = useSettings();
  const T = THEMES[theme];
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown}
      style={{
        padding: "10px 14px", borderRadius: 12, border: `1.5px solid ${T.inputBorder}`,
        fontFamily: "inherit", fontSize: 14, color: T.text,
        background: T.inputBg, outline: "none", width: "100%", ...style
      }} />
  );
}

function Sel({ value, onChange, children, style = {} }) {
  const { theme } = useSettings();
  const T = THEMES[theme];
  return (
    <select value={value} onChange={onChange} style={{
      padding: "10px 14px", borderRadius: 12, border: `1.5px solid ${T.inputBorder}`,
      fontFamily: "inherit", fontSize: 14, color: T.text,
      background: T.inputBg, outline: "none", ...style
    }}>
      {children}
    </select>
  );
}

function Textarea({ value, onChange, placeholder, minHeight = 90 }) {
  const { theme } = useSettings();
  const T = THEMES[theme];
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder}
      style={{
        width: "100%", minHeight, borderRadius: 12, border: `1.5px solid ${T.inputBorder}`,
        padding: "10px 14px", fontFamily: "inherit", fontSize: 14,
        color: T.text, background: T.inputBg, resize: "vertical",
        outline: "none", boxSizing: "border-box"
      }} />
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

function HomeTab({ members, onStart, settings }) {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  const { meetingDay, meetingTime, familyName } = settings;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: T.text }}>Next Meeting</div>
            <div style={{ fontFamily: F.body, fontSize: 15, color: T.textLight, marginTop: 4 }}>📅 {meetingDay} · {meetingTime} · 55 minutes</div>
          </div>
          <Btn onClick={onStart}>▶ Start Meeting</Btn>
        </div>
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 12 }}>
          {ROLES.map((r, i) => (
            <div key={r} style={{ background: T.rowAlt, borderRadius: 12, padding: "10px 14px", border: `1px solid ${T.inputBorder}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: .8, color: T.accent, fontFamily: F.body }}>{r}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: F.display, marginTop: 4 }}>{members[i % members.length] || "Unassigned"}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>📋 This Week's Agenda</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {AGENDA_ITEMS.map((item, i) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: i % 2 === 0 ? T.rowAlt : "transparent", borderRadius: 10 }}>
              <span style={{ fontSize: 20 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F.display, fontSize: 15, fontWeight: 600, color: T.text }}>{item.label}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: T.textLight }}>{item.description}</div>
              </div>
              <Badge>{item.duration} min</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>💡 Ground Rules</SectionTitle>
        <div style={{ fontFamily: F.body, fontSize: 14, color: T.textMid, lineHeight: 1.8 }}>
          {["One person speaks at a time","Phones off (unless it's the agenda tool)","Everyone has the right to pass","No blame — use 'I' statements","Children's voices count equally"].map(r => <div key={r}>• {r}</div>)}
        </div>
      </Card>
    </div>
  );
}

// ─── MEETING RUNNER ──────────────────────────────────────────────────────────

function MeetingTab({ onEnd }) {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  const [step, setStep] = useState(0);
  const [notes, setNotes] = useState({});
  const item = AGENDA_ITEMS[step];
  const { sec, running, setRunning, reset } = useTimer(item.duration * 60);
  useEffect(() => { reset(AGENDA_ITEMS[step].duration * 60); }, [step]);
  const pct = (sec / (item.duration * 60)) * 100;
  const urgent = sec < 60 && sec > 0;
  const done = step >= AGENDA_ITEMS.length;

  if (done) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, paddingTop: 40 }}>
      <div style={{ fontSize: 64 }}>🎉</div>
      <div style={{ fontFamily: F.display, fontSize: 28, fontWeight: 700, color: T.text, textAlign: "center" }}>Meeting Complete!</div>
      <div style={{ fontFamily: F.body, fontSize: 16, color: T.textLight, textAlign: "center" }}>Great job everyone. See you next week!</div>
      <Btn onClick={onEnd}>📋 Back to Home</Btn>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {AGENDA_ITEMS.map((a, i) => (
          <div key={a.id} onClick={() => setStep(i)} title={a.label} style={{ flex: 1, height: 6, borderRadius: 99, cursor: "pointer", background: i < step ? T.primary : i === step ? T.accent : T.inputBorder, transition: "background .3s" }} />
        ))}
      </div>
      <div style={{ fontFamily: F.body, fontSize: 13, color: T.textLight, textAlign: "center" }}>Step {step + 1} of {AGENDA_ITEMS.length}</div>
      <Card style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>{item.emoji}</div>
        <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 700, color: T.text, marginTop: 8 }}>{item.label}</div>
        <div style={{ fontFamily: F.body, fontSize: 14, color: T.textLight, margin: "8px auto 0", maxWidth: 400 }}>{item.description}</div>
        <div style={{ position: "relative", width: 140, height: 140, margin: "24px auto" }}>
          <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="70" cy="70" r="60" fill="none" stroke={T.inputBorder} strokeWidth="10" />
            <circle cx="70" cy="70" r="60" fill="none" stroke={urgent ? "#ef4444" : T.primary} strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - pct / 100)}`}
              strokeLinecap="round" style={{ transition: "stroke-dashoffset .5s, stroke .3s" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.display, fontSize: 32, fontWeight: 700, color: urgent ? "#ef4444" : T.text }}>
            {fmt(sec)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn onClick={() => setRunning(r => !r)} variant={running ? "secondary" : "primary"}>{running ? "⏸ Pause" : "▶ Start"}</Btn>
          <Btn onClick={() => reset(item.duration * 60)} variant="secondary">↺ Reset</Btn>
          {step < AGENDA_ITEMS.length - 1 ? <Btn onClick={() => setStep(s => s + 1)}>Next →</Btn> : <Btn onClick={() => setStep(AGENDA_ITEMS.length)}>Finish ✓</Btn>}
        </div>
      </Card>
      <Card>
        <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 8 }}>📝 Notes for this segment</div>
        <Textarea value={notes[item.id] || ""} onChange={e => setNotes(n => ({ ...n, [item.id]: e.target.value }))} placeholder={`Capture anything important from ${item.label}...`} minHeight={100} />
      </Card>
    </div>
  );
}

// ─── ACTIONS ─────────────────────────────────────────────────────────────────

function ActionsTab({ members }) {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  const [actions, setActions] = useState(SAMPLE_ACTIONS);
  const [newText, setNewText] = useState(""); const [newOwner, setNewOwner] = useState(members[0] || ""); const [newDue, setNewDue] = useState("");
  const add = () => { if (!newText.trim()) return; setActions(a => [...a, { id: Date.now(), text: newText, owner: newOwner, due: newDue, done: false }]); setNewText(""); setNewDue(""); };
  const toggle = id => setActions(a => a.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const remove = id => setActions(a => a.filter(x => x.id !== id));
  const open = actions.filter(a => !a.done); const done = actions.filter(a => a.done);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card>
        <SectionTitle>➕ Add Action Item</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Input value={newText} onChange={e => setNewText(e.target.value)} placeholder="What needs to happen?" onKeyDown={e => e.key === "Enter" && add()} />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Sel value={newOwner} onChange={e => setNewOwner(e.target.value)} style={{ flex: 1 }}>{members.map(m => <option key={m}>{m}</option>)}</Sel>
            <Input type="date" value={newDue} onChange={e => setNewDue(e.target.value)} style={{ flex: 1 }} />
            <Btn onClick={add}>Add</Btn>
          </div>
        </div>
      </Card>
      <Card>
        <SectionTitle>⏳ Open ({open.length})</SectionTitle>
        {open.length === 0 && <div style={{ fontFamily: F.body, color: T.textLight, fontSize: 14 }}>All done! 🎉</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {open.map(a => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: T.rowAlt, borderRadius: 12, border: `1px solid ${T.inputBorder}` }}>
              <input type="checkbox" checked={false} onChange={() => toggle(a.id)} style={{ width: 18, height: 18, accentColor: T.primary, cursor: "pointer" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 600, color: T.text }}>{a.text}</div>
                <div style={{ fontSize: 12, color: T.textLight, fontFamily: F.body }}>👤 {a.owner}{a.due && ` · 📅 ${new Date(a.due + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}</div>
              </div>
              <button onClick={() => remove(a.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.accent, fontSize: 16 }}>✕</button>
            </div>
          ))}
        </div>
      </Card>
      {done.length > 0 && (
        <Card>
          <SectionTitle>✅ Completed ({done.length})</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {done.map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#f0fdf4", borderRadius: 12, border: "1px solid #bbf7d0", opacity: .75 }}>
                <input type="checkbox" checked onChange={() => toggle(a.id)} style={{ width: 18, height: 18, accentColor: "#16a34a", cursor: "pointer" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 600, color: "#166534", textDecoration: "line-through" }}>{a.text}</div>
                  <div style={{ fontSize: 12, color: "#4ade80", fontFamily: F.body }}>👤 {a.owner}</div>
                </div>
                <button onClick={() => remove(a.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#86efac", fontSize: 16 }}>✕</button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── SPIRITUAL ───────────────────────────────────────────────────────────────

function SpiritualTab({ members }) {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  const [bibleLog, setBibleLog] = useState([
    { id: 1, date: "2026-05-25", book: "Proverbs", chapter: "3", verses: "1-12", notes: "Trust in the Lord with all your heart. Great discussion about 'lean not on your own understanding'.", participants: ["Alex", "Sam", "Jordan"] },
    { id: 2, date: "2026-05-18", book: "Psalms", chapter: "23", verses: "", notes: "The Lord is my shepherd. Kids loved the imagery.", participants: ["Alex", "Sam", "Jordan", "Casey"] },
  ]);
  const [lessonLog, setLessonLog] = useState([
    { id: 1, date: "2026-05-25", child: "Jordan", topic: "The Ten Commandments", resource: "Bible Story book", insight: "Jordan asked why God gave rules — opened great talk about love vs law.", completed: true },
    { id: 2, date: "2026-05-25", child: "Casey", topic: "Noah and the Ark", resource: "Kids Bible", insight: "Casey drew a picture of the rainbow.", completed: true },
    { id: 3, date: "2026-06-01", child: "Jordan", topic: "The Sermon on the Mount", resource: "Matthew 5", insight: "", completed: false },
  ]);
  const [bibleForm, setBibleForm] = useState({ book: "Proverbs", chapter: "", verses: "", notes: "", participants: [] });
  const [lessonForm, setLessonForm] = useState({ child: members[0] || "", topic: "", resource: "", insight: "", completed: false });
  const [addingBible, setAddingBible] = useState(false); const [addingLesson, setAddingLesson] = useState(false);
  const [expandedBible, setExpandedBible] = useState(null); const [expandedLesson, setExpandedLesson] = useState(null);
  const saveBible = () => { if (!bibleForm.chapter.trim()) return; setBibleLog(l => [{ ...bibleForm, id: Date.now(), date: new Date().toISOString().slice(0,10), participants: bibleForm.participants.length ? bibleForm.participants : [...members] }, ...l]); setBibleForm({ book: "Proverbs", chapter: "", verses: "", notes: "", participants: [] }); setAddingBible(false); };
  const saveLesson = () => { if (!lessonForm.topic.trim()) return; setLessonLog(l => [{ ...lessonForm, id: Date.now(), date: new Date().toISOString().slice(0,10) }, ...l]); setLessonForm({ child: members[0]||"", topic: "", resource: "", insight: "", completed: false }); setAddingLesson(false); };
  const toggleP = (m) => setBibleForm(f => ({ ...f, participants: f.participants.includes(m) ? f.participants.filter(x=>x!==m) : [...f.participants, m] }));
  const openLessons = lessonLog.filter(l => !l.completed); const doneLessons = lessonLog.filter(l => l.completed);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 700, color: T.text }}>📖 Bible Time</div>
            <div style={{ fontFamily: F.body, fontSize: 13, color: T.textLight }}>Log family scripture reading & reflections</div>
          </div>
          <Btn small onClick={() => setAddingBible(b=>!b)} variant={addingBible?"secondary":"primary"}>{addingBible?"Cancel":"+ Log Session"}</Btn>
        </div>
        {addingBible && (
          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>New Bible Reading</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Sel value={bibleForm.book} onChange={e => setBibleForm(f=>({...f,book:e.target.value}))} style={{ flex: 2 }}>{BIBLE_BOOKS.map(b=><option key={b}>{b}</option>)}</Sel>
                <Input value={bibleForm.chapter} onChange={e=>setBibleForm(f=>({...f,chapter:e.target.value}))} placeholder="Chapter" style={{flex:1}} />
                <Input value={bibleForm.verses} onChange={e=>setBibleForm(f=>({...f,verses:e.target.value}))} placeholder="Verses (opt)" style={{flex:1}} />
              </div>
              <Textarea value={bibleForm.notes} onChange={e=>setBibleForm(f=>({...f,notes:e.target.value}))} placeholder="What did the family discuss? Any insights or memorable moments?" />
              <div>
                <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 600, color: T.primary, marginBottom: 8 }}>Who participated?</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {members.map(m => { const sel = bibleForm.participants.includes(m)||bibleForm.participants.length===0; return (
                    <button key={m} onClick={() => toggleP(m)} style={{ padding:"5px 14px",borderRadius:99,border:"1.5px solid",borderColor:sel?T.primary:T.inputBorder,background:sel?T.accentLight:"transparent",color:sel?T.primary:T.textLight,fontFamily:F.body,fontSize:13,fontWeight:600,cursor:"pointer" }}>{m}</button>
                  ); })}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn onClick={saveBible}>Save Session</Btn>
                <Btn variant="secondary" onClick={()=>setAddingBible(false)}>Cancel</Btn>
              </div>
            </div>
          </Card>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {bibleLog.map(entry => (
            <Card key={entry.id} style={{ cursor: "pointer", padding: 18 }} onClick={() => setExpandedBible(expandedBible===entry.id?null:entry.id)}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: T.rowAlt, border: `1.5px solid ${T.inputBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📖</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 700, color: T.text }}>{entry.book} {entry.chapter}{entry.verses?`:${entry.verses}`:""}</div>
                  <div style={{ fontFamily: F.body, fontSize: 12, color: T.textLight, marginTop: 2 }}>{new Date(entry.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}{entry.participants?.length>0&&` · ${entry.participants.join(", ")}`}</div>
                  {expandedBible===entry.id && entry.notes && <div style={{ marginTop: 10, fontFamily: F.body, fontSize: 14, color: T.textMid, lineHeight: 1.6, background: T.rowAlt, borderRadius: 10, padding: "10px 14px" }}>"{entry.notes}"</div>}
                </div>
                <span style={{ color: T.accent, fontSize: 14 }}>{expandedBible===entry.id?"▲":"▼"}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1.5px solid ${T.cardBorder}` }} />

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 700, color: T.text }}>🎒 Kids' Lessons</div>
            <div style={{ fontFamily: F.body, fontSize: 13, color: T.textLight }}>Track each child's spiritual education & highlights</div>
          </div>
          <Btn small onClick={() => setAddingLesson(b=>!b)} variant={addingLesson?"secondary":"primary"}>{addingLesson?"Cancel":"+ Add Lesson"}</Btn>
        </div>
        {addingLesson && (
          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>New Lesson Entry</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Sel value={lessonForm.child} onChange={e=>setLessonForm(f=>({...f,child:e.target.value}))} style={{flex:1}}>{members.map(m=><option key={m}>{m}</option>)}</Sel>
                <Input value={lessonForm.topic} onChange={e=>setLessonForm(f=>({...f,topic:e.target.value}))} placeholder="Lesson topic" style={{flex:2}} />
              </div>
              <Input value={lessonForm.resource} onChange={e=>setLessonForm(f=>({...f,resource:e.target.value}))} placeholder="Resource / curriculum (e.g. Kids Bible, Answers in Genesis)" />
              <Textarea value={lessonForm.insight} onChange={e=>setLessonForm(f=>({...f,insight:e.target.value}))} placeholder="What stood out? What questions did they ask?" minHeight={80} />
              <label style={{ display:"flex",alignItems:"center",gap:8,fontFamily:F.body,fontSize:14,color:T.text,cursor:"pointer" }}>
                <input type="checkbox" checked={lessonForm.completed} onChange={e=>setLessonForm(f=>({...f,completed:e.target.checked}))} style={{ width:16,height:16,accentColor:"#16a34a" }} />
                Mark as completed
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn onClick={saveLesson} variant="success">Save Lesson</Btn>
                <Btn variant="secondary" onClick={()=>setAddingLesson(false)}>Cancel</Btn>
              </div>
            </div>
          </Card>
        )}
        {openLessons.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: F.body, fontSize: 12, fontWeight: 700, color: "#d97706", textTransform: "uppercase", letterSpacing: .8, marginBottom: 8 }}>⏳ Upcoming</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {openLessons.map(l => (
                <Card key={l.id} style={{ padding: 16, cursor: "pointer" }} onClick={() => setExpandedLesson(expandedLesson===l.id?null:l.id)}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 22, flexShrink: 0 }}>🎒</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: F.display, fontSize: 15, fontWeight: 700, color: T.text }}>{l.topic}</span>
                        <Badge bg="#fef3c7" color="#b45309">{l.child}</Badge>
                      </div>
                      <div style={{ fontFamily: F.body, fontSize: 12, color: T.textLight, marginTop: 2 }}>{l.resource&&`📚 ${l.resource} · `}{new Date(l.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
                      {expandedLesson===l.id && l.insight && <div style={{ marginTop: 8, fontFamily: F.body, fontSize: 13, color: T.textMid, background: "#fef3c7", borderRadius: 8, padding: "8px 12px", lineHeight: 1.6 }}>{l.insight}</div>}
                    </div>
                    <button onClick={e=>{e.stopPropagation();setLessonLog(ls=>ls.map(x=>x.id===l.id?{...x,completed:true}:x));}} style={{ background:"#dcfce7",border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontFamily:F.body,fontSize:12,fontWeight:600,color:"#166534" }}>✓ Done</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        {doneLessons.length > 0 && (
          <div>
            <div style={{ fontFamily: F.body, fontSize: 12, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: .8, marginBottom: 8 }}>✅ Completed</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {doneLessons.map(l => (
                <Card key={l.id} style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", padding: 16, opacity: .85, cursor: "pointer" }} onClick={() => setExpandedLesson(expandedLesson===l.id?null:l.id)}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 22 }}>✅</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: F.display, fontSize: 15, fontWeight: 700, color: "#166534", textDecoration: "line-through" }}>{l.topic}</span>
                        <Badge bg="#dcfce7" color="#166534">{l.child}</Badge>
                      </div>
                      {expandedLesson===l.id && l.insight && <div style={{ marginTop: 8, fontFamily: F.body, fontSize: 13, color: "#166534", background: "#dcfce7", borderRadius: 8, padding: "8px 12px", lineHeight: 1.6 }}>{l.insight}</div>}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── VISION ──────────────────────────────────────────────────────────────────

const HORIZON_META = {
  mission:    { label: "Family Mission",      emoji: "🌟", color: "#7c4a03", bg: "#fdf4e4", border: "#e8d4a8",  desc: "The enduring purpose of your family." },
  values:     { label: "Core Values",         emoji: "💎", color: "#5b21b6", bg: "#ede9fe", border: "#c4b5fd",  desc: "Principles that guide every family decision." },
  annual:     { label: "This Year",           emoji: "📅", color: "#0369a1", bg: "#e0f2fe", border: "#7dd3fc",  desc: "Big goals to accomplish this year." },
  quarterly:  { label: "This Quarter",        emoji: "🗓",  color: "#065f46", bg: "#d1fae5", border: "#6ee7b7",  desc: "Focus areas for the next 3 months." },
  monthly:    { label: "This Month",          emoji: "📆", color: "#b45309", bg: "#fef3c7", border: "#fde68a",  desc: "Concrete actions and habits this month." },
  weekly:     { label: "This Week",           emoji: "⚡", color: "#9f1239", bg: "#ffe4e6", border: "#fda4af",  desc: "One thing the family is intentional about." },
  initiative: { label: "Ongoing Initiatives", emoji: "🚀", color: "#1e3a5f", bg: "#dbeafe", border: "#93c5fd",  desc: "Multi-month projects the family is running." },
};

function VisionTab() {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  const defaultItems = {
    mission:    [{ id: 1, text: "To glorify God by loving one another well, growing in wisdom, and serving the world around us.", pinned: true }],
    values:     [{ id: 1, text: "Faith — putting God first in everything", pinned: true }, { id: 2, text: "Loyalty — we show up for each other" }, { id: 3, text: "Growth — always learning and improving" }, { id: 4, text: "Generosity — giving time, treasure, and talent" }],
    annual:     [{ id: 1, text: "Complete a family mission trip or service project" }, { id: 2, text: "Read through the Gospels together" }, { id: 3, text: "Build a 3-month emergency fund" }],
    quarterly:  [{ id: 1, text: "Start a family garden" }, { id: 2, text: "Establish a consistent family devotion routine" }],
    monthly:    [{ id: 1, text: "Volunteer at the local food bank as a family" }, { id: 2, text: "Family date night every Friday" }],
    weekly:     [{ id: 1, text: "Pray together every morning before school" }],
    initiative: [{ id: 1, text: "Project Gratitude — weekly thank-you notes outside the family", status: "active" }, { id: 2, text: "Family Reading Club — The Lion, the Witch and the Wardrobe", status: "active" }],
  };
  const [items, setItems] = useState(defaultItems);
  const [adding, setAdding] = useState(null); const [newText, setNewText] = useState(""); const [newStatus, setNewStatus] = useState("active");
  const [activeH, setActiveH] = useState("mission"); const [editing, setEditing] = useState(null); const [editText, setEditText] = useState("");
  const horizons = Object.keys(HORIZON_META);
  const save = () => { if (!newText.trim()) return; const e={id:Date.now(),text:newText}; if(adding==="initiative")e.status=newStatus; setItems(it=>({...it,[adding]:[...(it[adding]||[]),e]})); setNewText("");setNewStatus("active");setAdding(null); };
  const remove = (h,id) => setItems(it=>({...it,[h]:it[h].filter(x=>x.id!==id)}));
  const saveEdit = (h,id) => { setItems(it=>({...it,[h]:it[h].map(x=>x.id===id?{...x,text:editText}:x)})); setEditing(null);setEditText(""); };
  const meta = HORIZON_META[activeH]; const list = items[activeH]||[];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card style={{ padding: "16px 16px 12px" }}>
        <div style={{ fontFamily: F.body, fontSize: 12, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: .8, marginBottom: 10 }}>Select Horizon</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {horizons.map(h => { const m=HORIZON_META[h],active=h===activeH; return (
            <button key={h} onClick={() => { setActiveH(h);setAdding(null);setEditing(null); }} style={{ padding:"6px 14px",borderRadius:99,border:"1.5px solid",borderColor:active?m.color:m.border,background:active?m.bg:"transparent",color:active?m.color:T.textLight,fontFamily:F.body,fontSize:13,fontWeight:active?700:500,cursor:"pointer",transition:"all .15s" }}>
              {m.emoji} {m.label}
            </button>
          ); })}
        </div>
      </Card>
      <Card style={{ background: meta.bg, border: `1.5px solid ${meta.border}` }}>
        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:16 }}>
          <div>
            <div style={{ fontFamily:F.display,fontSize:22,fontWeight:700,color:meta.color }}>{meta.emoji} {meta.label}</div>
            <div style={{ fontFamily:F.body,fontSize:13,color:T.textMid,marginTop:4 }}>{meta.desc}</div>
          </div>
          {adding!==activeH && <Btn small onClick={()=>{setAdding(activeH);setNewText("");}} style={{ background:meta.color,color:"#fff",border:"none",flexShrink:0 }}>+ Add</Btn>}
        </div>
        {adding===activeH && (
          <div style={{ marginBottom:16,background:"rgba(255,255,255,0.7)",borderRadius:14,padding:16,border:"1.5px solid rgba(255,255,255,0.8)" }}>
            <Textarea value={newText} onChange={e=>setNewText(e.target.value)} placeholder={activeH==="mission"?"Write your family mission statement...":activeH==="values"?"State a core value...":"Describe this goal..."} minHeight={80} />
            {activeH==="initiative" && <div style={{marginTop:8}}><Sel value={newStatus} onChange={e=>setNewStatus(e.target.value)} style={{width:"auto"}}><option value="active">🟢 Active</option><option value="paused">⏸ Paused</option><option value="completed">✅ Completed</option></Sel></div>}
            <div style={{ display:"flex",gap:8,marginTop:10 }}>
              <Btn small onClick={save} style={{ background:meta.color,color:"#fff",border:"none" }}>Save</Btn>
              <Btn small variant="secondary" onClick={()=>setAdding(null)}>Cancel</Btn>
            </div>
          </div>
        )}
        {list.length===0 && <div style={{ fontFamily:F.body,fontSize:14,color:T.textLight,fontStyle:"italic" }}>Nothing yet. Click "+ Add" to get started.</div>}
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {list.map((item,idx) => (
            <div key={item.id} style={{ background:item.pinned?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.6)",borderRadius:14,padding:"14px 16px",border:item.pinned?`2px solid ${meta.color}`:"1.5px solid rgba(255,255,255,0.8)",boxShadow:item.pinned?`0 2px 12px ${meta.color}22`:"none" }}>
              {editing===item.id ? (
                <div>
                  <Textarea value={editText} onChange={e=>setEditText(e.target.value)} minHeight={70} />
                  <div style={{ display:"flex",gap:8,marginTop:8 }}>
                    <Btn small onClick={()=>saveEdit(activeH,item.id)} style={{ background:meta.color,color:"#fff",border:"none" }}>Save</Btn>
                    <Btn small variant="secondary" onClick={()=>setEditing(null)}>Cancel</Btn>
                  </div>
                </div>
              ) : (
                <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                  {item.pinned?<span style={{fontSize:16,flexShrink:0,marginTop:1}}>📌</span>:<span style={{fontSize:14,color:meta.color,fontWeight:700,flexShrink:0,fontFamily:F.body,marginTop:2}}>{idx+1}.</span>}
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:activeH==="mission"?F.display:F.body,fontSize:activeH==="mission"?17:15,fontWeight:activeH==="mission"?700:500,color:"#1a1a1a",lineHeight:1.5,fontStyle:activeH==="mission"?"italic":"normal" }}>{item.text}</div>
                    {item.status && <div style={{marginTop:4}}><Badge color={item.status==="active"?"#065f46":item.status==="paused"?"#b45309":"#166534"} bg={item.status==="active"?"#d1fae5":item.status==="paused"?"#fef3c7":"#dcfce7"}>{item.status==="active"?"🟢 Active":item.status==="paused"?"⏸ Paused":"✅ Done"}</Badge></div>}
                  </div>
                  <div style={{ display:"flex",gap:6,flexShrink:0 }}>
                    <button onClick={()=>{setEditing(item.id);setEditText(item.text);}} style={{ background:"none",border:"none",cursor:"pointer",color:T.textLight,fontSize:15,padding:2 }}>✏️</button>
                    {!item.pinned && <button onClick={()=>remove(activeH,item.id)} style={{ background:"none",border:"none",cursor:"pointer",color:T.accent,fontSize:15,padding:2 }}>✕</button>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ padding:16 }}>
        <div style={{ fontFamily:F.body,fontSize:12,fontWeight:700,color:T.accent,textTransform:"uppercase",letterSpacing:.8,marginBottom:10 }}>At a Glance</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:8 }}>
          {horizons.map(h => { const m=HORIZON_META[h],count=(items[h]||[]).length; return (
            <div key={h} onClick={()=>setActiveH(h)} style={{ background:m.bg,border:`1.5px solid ${m.border}`,borderRadius:12,padding:"10px 12px",cursor:"pointer" }}>
              <div style={{fontSize:18}}>{m.emoji}</div>
              <div style={{fontFamily:F.body,fontSize:11,fontWeight:700,color:m.color,marginTop:4}}>{m.label}</div>
              <div style={{fontFamily:F.body,fontSize:20,fontWeight:700,color:m.color}}>{count}</div>
            </div>
          ); })}
        </div>
      </Card>
    </div>
  );
}

// ─── MEMBERS ─────────────────────────────────────────────────────────────────

function MembersTab({ members, setMembers }) {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  const [newName, setNewName] = useState("");
  const EMOJIS = ["👨","👩","🧒","👦","👧","🧑","👴","👵"];
  const add = () => { if (newName.trim()&&!members.includes(newName.trim())) { setMembers(m=>[...m,newName.trim()]); setNewName(""); } };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
      <Card>
        <SectionTitle>👨‍👩‍👧‍👦 Family Members</SectionTitle>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12,marginBottom:20 }}>
          {members.map((m,i) => (
            <div key={m} style={{ background:T.rowAlt,borderRadius:14,padding:"14px 10px",textAlign:"center",border:`1.5px solid ${T.inputBorder}`,position:"relative" }}>
              <div style={{fontSize:32}}>{EMOJIS[i%EMOJIS.length]}</div>
              <div style={{fontFamily:F.display,fontSize:16,fontWeight:700,color:T.text,marginTop:6}}>{m}</div>
              <button onClick={()=>setMembers(ms=>ms.filter(x=>x!==m))} style={{position:"absolute",top:6,right:8,background:"none",border:"none",cursor:"pointer",color:T.accent,fontSize:14}}>✕</button>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",gap:10 }}>
          <Input value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Add family member..." />
          <Btn onClick={add}>Add</Btn>
        </div>
      </Card>
      <Card>
        <SectionTitle>🔄 Role Rotation</SectionTitle>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {ROLES.map((role,i) => (
            <div key={role} style={{ display:"flex",alignItems:"center",gap:14,padding:"10px 14px",background:i%2===0?T.rowAlt:"transparent",borderRadius:12 }}>
              <div style={{flex:1,fontFamily:F.display,fontWeight:700,fontSize:15,color:T.text}}>{role}</div>
              <Sel style={{width:"auto"}}>{members.map(m=><option key={m}>{m}</option>)}</Sel>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>📊 Participation Stats</SectionTitle>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {members.map((m,i) => { const pct=70+Math.floor(Math.sin(i*3.7)*25); return (
            <div key={m} style={{ display:"flex",alignItems:"center",gap:12 }}>
              <div style={{width:80,fontFamily:F.body,fontSize:14,color:T.text,fontWeight:600}}>{m}</div>
              <div style={{flex:1,background:T.inputBorder,borderRadius:99,height:10,overflow:"hidden"}}>
                <div style={{width:`${pct}%`,height:"100%",background:T.primary,borderRadius:99,transition:"width .5s"}} />
              </div>
              <div style={{width:40,fontFamily:F.body,fontSize:13,color:T.textLight,textAlign:"right"}}>{pct}%</div>
            </div>
          ); })}
        </div>
        <div style={{fontFamily:F.body,fontSize:12,color:T.textLight,marginTop:10,fontStyle:"italic"}}>Attendance rate over last 8 meetings</div>
      </Card>
    </div>
  );
}

// ─── HISTORY ─────────────────────────────────────────────────────────────────

function HistoryTab() {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  const meetings = [
    { date: "May 25, 2026", rating: 5, highlights: ["Booked summer vacation!", "Set chore rotation"], actions: 3 },
    { date: "May 18, 2026", rating: 4, highlights: ["Discussed school schedules", "Planned birthday dinner"], actions: 2 },
    { date: "May 11, 2026", rating: 4, highlights: ["Resolved screen time conflict", "Grocery list sync"], actions: 4 },
    { date: "May 4, 2026",  rating: 3, highlights: ["Quick meeting — ran over time", "Scheduled dentist"], actions: 1 },
  ];
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
      {meetings.map((m,i) => (
        <Card key={i}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
            <div style={{ fontFamily:F.display,fontSize:17,fontWeight:700,color:T.text }}>{m.date}</div>
            <div style={{ display:"flex",gap:4 }}>{Array.from({length:5}).map((_,j)=><span key={j} style={{fontSize:16,color:j<m.rating?"#f59e0b":T.inputBorder}}>★</span>)}</div>
          </div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:10 }}>{m.highlights.map(h=><Badge key={h}>{h}</Badge>)}</div>
          <div style={{ fontFamily:F.body,fontSize:13,color:T.textLight }}>📝 {m.actions} action item{m.actions!==1?"s":""} created</div>
        </Card>
      ))}
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────

function SettingsTab({ settings, setSettings, members, setMembers }) {
  const { theme, font } = useSettings();
  const T = THEMES[theme], F = FONTS[font];
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false), 2000); };

  const row = (label, sub, control) => (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,padding:"14px 0",borderBottom:`1px solid ${T.inputBorder}` }}>
      <div>
        <div style={{ fontFamily:F.display,fontSize:15,fontWeight:600,color:T.text }}>{label}</div>
        {sub && <div style={{ fontFamily:F.body,fontSize:12,color:T.textLight,marginTop:2 }}>{sub}</div>}
      </div>
      <div style={{ flexShrink:0 }}>{control}</div>
    </div>
  );

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:20 }}>

      {/* ── APPEARANCE ── */}
      <Card>
        <SectionTitle>🎨 Color Theme</SectionTitle>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10 }}>
          {Object.entries(THEMES).map(([key, th]) => (
            <button key={key} onClick={()=>setSettings(s=>({...s,theme:key}))} style={{
              padding:"14px 10px",borderRadius:16,border:`2.5px solid`,
              borderColor:theme===key?th.primary:th.cardBorder,
              background:th.cardBg,cursor:"pointer",textAlign:"center",
              boxShadow:theme===key?`0 0 0 3px ${th.primary}44`:"none",
              transition:"all .2s",
            }}>
              <div style={{fontSize:24,marginBottom:4}}>{th.emoji}</div>
              <div style={{fontFamily:F.display,fontSize:13,fontWeight:theme===key?700:500,color:th.text}}>{th.name}</div>
              <div style={{display:"flex",gap:4,justifyContent:"center",marginTop:6}}>
                {[th.primary,th.accent,th.cardBorder].map((c,i)=><div key={i} style={{width:14,height:14,borderRadius:99,background:c,border:"1px solid rgba(0,0,0,.1)"}} />)}
              </div>
              {theme===key && <div style={{marginTop:6,fontSize:11,fontWeight:700,color:th.primary,fontFamily:F.body}}>✓ Active</div>}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>🔤 Font Pairing</SectionTitle>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {Object.entries(FONTS).map(([key, f]) => (
            <button key={key} onClick={()=>setSettings(s=>({...s,font:key}))} style={{
              display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:14,
              border:`1.5px solid ${font===key?T.primary:T.inputBorder}`,
              background:font===key?T.accentLight:T.inputBg,cursor:"pointer",textAlign:"left",
              transition:"all .15s",
            }}>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:f.display,fontSize:17,fontWeight:700,color:T.text }}>{f.name}</div>
                <div style={{ fontFamily:f.body,fontSize:13,color:T.textLight,marginTop:2 }}>The quick brown fox jumps over the lazy dog</div>
              </div>
              {font===key && <span style={{color:T.primary,fontWeight:700,fontSize:16}}>✓</span>}
            </button>
          ))}
        </div>
      </Card>

      {/* ── MEETING SETTINGS ── */}
      <Card>
        <SectionTitle>📅 Meeting Settings</SectionTitle>
        {row("Family Name", "Shown in the app header", <Input value={settings.familyName} onChange={e=>setSettings(s=>({...s,familyName:e.target.value}))} style={{width:160}} placeholder="The Smiths" />)}
        {row("Meeting Day", "Which day you meet each week", (
          <Sel value={settings.meetingDay} onChange={e=>setSettings(s=>({...s,meetingDay:e.target.value}))} style={{width:"auto"}}>
            {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(d=><option key={d}>{d}</option>)}
          </Sel>
        ))}
        {row("Meeting Time", "Start time displayed on home screen", <Input type="time" value={settings.meetingTime24} onChange={e=>setSettings(s=>({...s,meetingTime24:e.target.value,meetingTime:fmtTime(e.target.value)}))} style={{width:130}} />)}
        {row("Timer Sound", "Audible alert when a segment ends",
          <label style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontFamily:F.body,fontSize:14,color:T.text }}>
            <input type="checkbox" checked={settings.timerSound} onChange={e=>setSettings(s=>({...s,timerSound:e.target.checked}))} style={{width:18,height:18,accentColor:T.primary}} />
            Enabled
          </label>
        )}
        {row("Show Bible Tab", "Display the Spiritual section in navigation",
          <label style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontFamily:F.body,fontSize:14,color:T.text }}>
            <input type="checkbox" checked={settings.showSpiritual} onChange={e=>setSettings(s=>({...s,showSpiritual:e.target.checked}))} style={{width:18,height:18,accentColor:T.primary}} />
            Visible
          </label>
        )}
        {row("Show Vision Tab", "Display the Vision & Goals section",
          <label style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontFamily:F.body,fontSize:14,color:T.text }}>
            <input type="checkbox" checked={settings.showVision} onChange={e=>setSettings(s=>({...s,showVision:e.target.checked}))} style={{width:18,height:18,accentColor:T.primary}} />
            Visible
          </label>
        )}
        <div style={{paddingTop:16}}>
          <Btn onClick={save} style={saved?{background:"#166534"}:{}}>
            {saved ? "✓ Saved!" : "Save Settings"}
          </Btn>
        </div>
      </Card>

      {/* ── CUSTOM ACCENT ── */}
      <Card>
        <SectionTitle>🖌️ Custom Accent Color</SectionTitle>
        <div style={{ display:"flex",alignItems:"center",gap:16,flexWrap:"wrap" }}>
          <input type="color" value={settings.customAccent||T.primary} onChange={e=>setSettings(s=>({...s,customAccent:e.target.value}))}
            style={{ width:52,height:52,borderRadius:12,border:`1.5px solid ${T.inputBorder}`,cursor:"pointer",background:"none",padding:2 }} />
          <div>
            <div style={{fontFamily:F.display,fontSize:15,fontWeight:600,color:T.text}}>Override primary color</div>
            <div style={{fontFamily:F.body,fontSize:13,color:T.textLight}}>Overrides the theme's main color for buttons and highlights</div>
          </div>
          {settings.customAccent && <Btn small variant="secondary" onClick={()=>setSettings(s=>({...s,customAccent:null}))}>Reset</Btn>}
        </div>
      </Card>

    </div>
  );
}

function fmtTime(t) {
  if (!t) return "6:00 PM";
  const [h,m]=t.split(":"); const hr=parseInt(h), ampm=hr>=12?"PM":"AM", h12=hr%12||12;
  return `${h12}:${m} ${ampm}`;
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [settings, setSettings] = useState({
    theme: "warm", font: "fraunces",
    familyName: "Our Family",
    meetingDay: "Sunday", meetingTime: "6:00 PM", meetingTime24: "18:00",
    timerSound: true, showSpiritual: true, showVision: true, customAccent: null,
  });
  const [tab, setTab] = useState("home");
  const [members, setMembers] = useState(["Alex", "Sam", "Jordan", "Casey"]);
  const [inMeeting, setInMeeting] = useState(false);

  const T = THEMES[settings.theme];
  const F = FONTS[settings.font];
  const effectivePrimary = settings.customAccent || T.primary;

  const contextValue = {
    theme: settings.theme, font: settings.font,
    themeObj: { ...T, primary: effectivePrimary },
  };

  const allTabs = [
    { id: "home",      label: "Home",     icon: "🏠", always: true },
    { id: "meeting",   label: "Meeting",  icon: "🔴", always: true },
    { id: "actions",   label: "Actions",  icon: "✅", always: true },
    { id: "spiritual", label: "Spiritual",icon: "📖", show: settings.showSpiritual },
    { id: "vision",    label: "Vision",   icon: "🌟", show: settings.showVision },
    { id: "members",   label: "Family",   icon: "👨‍👩‍👧" , always: true },
    { id: "history",   label: "History",  icon: "📖", always: true },
    { id: "settings",  label: "Settings", icon: "⚙️", always: true },
  ].filter(t => t.always || t.show);

  const fontImport = `https://fonts.googleapis.com/css2?family=${F.import}&display=swap`;

  return (
    <SettingsCtx.Provider value={contextValue}>
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: F.body, transition: "background .4s" }}>
        <style>{`
          @import url('${fontImport}');
          * { box-sizing: border-box; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: ${T.inputBg}; }
          ::-webkit-scrollbar-thumb { background: ${T.scrollThumb}; border-radius: 99px; }
          input, select, textarea { font-family: inherit; }
          button { transition: opacity .15s; }
          button:hover { opacity: 0.85; }
        `}</style>

        {/* Header */}
        <div style={{ background: T.headerBg, backdropFilter: "blur(12px)", borderBottom: `1.5px solid ${T.cardBorder}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, transition:"background .4s" }}>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 700, color: T.text, lineHeight: 1 }}>{settings.familyName} Meeting</div>
            <div style={{ fontFamily: F.body, fontSize: 12, color: T.textLight, marginTop: 2 }}>{settings.meetingDay}s at {settings.meetingTime} · {members.length} members</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {inMeeting && <Badge color="#b91c1c" bg="#fee2e2">🔴 LIVE</Badge>}
            <button onClick={() => setTab("settings")} style={{ background: tab==="settings"?T.tabActiveBg:"transparent", border: "none", borderRadius: 10, padding: "6px 10px", cursor: "pointer", fontSize: 18 }}>⚙️</button>
          </div>
        </div>

        {/* Tab Bar */}
        <div style={{ background: T.headerBg, backdropFilter: "blur(8px)", borderBottom: `1px solid ${T.cardBorder}`, padding: "6px 12px", display: "flex", gap: 2, overflowX: "auto", position: "sticky", top: 57, zIndex: 99, transition:"background .4s" }}>
          {allTabs.filter(t=>t.id!=="settings").map(t => <NavTab key={t.id} label={t.label} icon={t.icon} active={tab===t.id} onClick={()=>setTab(t.id)} />)}
        </div>

        {/* Content */}
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 14px 48px" }}>
          {tab==="home"      && <HomeTab members={members} onStart={()=>{setInMeeting(true);setTab("meeting");}} settings={settings} />}
          {tab==="meeting"   && <MeetingTab onEnd={()=>{setInMeeting(false);setTab("home");}} />}
          {tab==="actions"   && <ActionsTab members={members} />}
          {tab==="spiritual" && <SpiritualTab members={members} />}
          {tab==="vision"    && <VisionTab />}
          {tab==="members"   && <MembersTab members={members} setMembers={setMembers} />}
          {tab==="history"   && <HistoryTab />}
          {tab==="settings"  && <SettingsTab settings={settings} setSettings={setSettings} members={members} setMembers={setMembers} />}
        </div>
      </div>
    </SettingsCtx.Provider>
  );
}
