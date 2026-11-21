import {
  createContext,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { createPortal } from "react-dom"
import {
  createBrowserRouter,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router"
import learningBooks from "../imports/learning-books.webp"

const PHONE = "34630382431"
const WHATSAPP = `https://wa.me/${PHONE}`

type Locale = "ca" | "es" | "en" | "de"

const copy: Record<Locale, Record<string, any>> = {
  ca: {
    site: "Acadèmia de repàs", nav: ["Programes", "Mètode", "Edats", "Contacte"],
    trial: "Prova una classe", reserve: "Reserva una classe de prova", schedule: "De dilluns a divendres · 16:30—20:00",
    heroEyebrow: "Acadèmia de repàs · Carrer del Sol, 62 · Sabadell",
    heroTitle: "Aprendre pot ser el teu nou", heroAccent: "superpoder.",
    heroCopy: "Reforç escolar, idiomes i robòtica amb una metodologia dinàmica, propera i adaptada a cada alumne.",
    freeClass: "Reserva una classe gratuïta", explore: "Explora els programes",
    smallGroups: "Grups molt reduïts", attention: "Una atenció que es nota", discover: "Descobreix tot el que pots aprendre",
    programsEyebrow: "Tot comença per entendre", programsTitle: "Una ajuda per a cada", programsAccent: "repte.",
    programsCopy: "Del reforç escolar a descobrir la programació: acompanyem cada procés amb objectius clars i ganes d’aprendre.",
    more: "Més informació",
    programs: [
      ["CA", "Català", "Comprensió, expressió, gramàtica i preparació d’exàmens.", "Llengües", "#ffd873"],
      ["ES", "Castellà", "Lectura, redacció, ortografia i sintaxi sense complicacions.", "Llengües", "#ffad9d"],
      ["DE", "Alemany", "Tots els nivells, conversa i gramàtica pràctica.", "Idiomes", "#9ddbd3"],
      ["EN", "Anglès", "Reforç, vocabulari i conversa per guanyar confiança.", "Idiomes", "#bdd5f7"],
      ["+×", "Matemàtiques", "Càlcul, problemes i raonament lògic pas a pas.", "Ciències", "#ffc1b1"],
      ["⚙", "Robòtica", "Programació, construcció, creativitat i treball en equip.", "Tecnologia", "#dfc5fa"],
    ],
    methodLabel: "El nostre mètode", methodLines: ["Menys memoritzar.", "Més comprendre.", "I gaudir."],
    methodIntro: "No apliquem una fórmula igual per a tothom. Cada sessió té un objectiu concret, pràctica guiada i un tancament per comprovar que el contingut s’ha entès de debò.",
    steps: [
      ["01", "Punt de partida", "Detectem coneixements, hàbits, bloquejos i objectius amb una primera valoració individual."],
      ["02", "Pla setmanal", "Organitzem prioritats i proposem tasques breus, concretes i adaptades al ritme real de l’alumne."],
      ["03", "Pràctica activa", "Expliquem, apliquem i comprovem. L’alumne participa i aprèn a raonar, no a repetir."],
      ["04", "Seguiment", "Revisem els avenços i mantenim la família informada amb objectius clars per a cada etapa."],
    ],
    tellUs: "Explica’ns què necessites", agesEyebrow: "Créixer aprenent", agesTitle: "Una acadèmia per a", agesAccent: "cada etapa.",
    ages: [
      ["Primària", "Construïm una bona base i hàbits d’estudi amb activitats amenes.", "De 6 a 11 anys"],
      ["ESO i Batxillerat", "Resolem dubtes, organitzem l’estudi i preparem cada examen.", "De 12 a 18 anys"],
      ["Joves i adults", "Idiomes al teu ritme per viatjar, treballar o superar un repte personal.", "A partir de 18 anys"],
    ],
    testimonial: "A l’optativa d’alemany de 2n d’ESO se sentia perduda. Ara entén la gramàtica, participa a classe i prepara els exàmens amb molta més seguretat.",
    mother: "Marta, mare de la Clàudia", elective: "Alemany optatiu · 2n d’ESO",
    start: "Comencem?", contactTitle: "Fes el primer pas.", contactAccent: "Nosaltres t’acompanyem.",
    contactCopy: "Explica’ns què necessites i t’ajudarem a trobar el grup i el programa que encaixen millor amb tu.",
    phone: "Telèfon de contacte", hours: "Horari", findUs: "Troba’ns", weekdays: "Dilluns a divendres",
    prepared: "Missatge preparat!", opened: "S’ha obert l’aplicació de missatgeria perquè ens puguis enviar la consulta.", another: "Envia una altra consulta",
    fullName: "Nom i cognoms", yourName: "Com et dius?", age: "Edat de l’alumne/a", ageExample: "Ex. 12 anys",
    program: "Programa", select: "Selecciona", improve: "Què us agradaria millorar?", moreDetail: "Explica’ns una mica més...",
    request: "Sol·licita informació", noCommitment: "Sense compromís. Et respondrem personalment.",
    footerLead: "Aprendre amb confiança.", footerAccent: "Avançar gaudint.", where: "Som a",
    personal: "Resposta personal", write: "Escriu-nos directament", made: "Fet per aprendre i gaudir",
    homeFun: "Aprendre també pot ser divertit", homeEyebrow: "Un espai per avançar",
    homeTitle: "Entendre, practicar i", homeAccent: "gaudir.",
    homeCopy: "Classes properes i dinàmiques per guanyar confiança, resoldre dubtes i descobrir que aprendre pot fer-te sentir bé.",
    agesLevels: "Edats i nivells",
    pageProgramsTitle: "Cada dificultat té", pageProgramsAccent: "el seu camí.", pageProgramsCopy: "Reforç escolar, idiomes i tecnologia amb objectius adaptats al nivell i al ritme de cada alumne.",
    pageMethodTitle: "Aprendre a aprendre", pageMethodAccent: "ho canvia tot.", pageMethodCopy: "Una metodologia clara i activa per comprendre, guanyar confiança i treballar cada vegada amb més autonomia.",
    pageAgesTitle: "Acompanyament per a", pageAgesAccent: "cada etapa.", pageAgesCopy: "Des de les primeres bases de Primària fins als idiomes per a adults, adaptem les sessions a cada moment.",
    pageContactTitle: "La teva primera consulta", pageContactAccent: "sense compromís.", pageContactCopy: "Explica’ns què necessites. T’orientarem personalment sobre el programa i el grup més adequats.",
    classWork: "Com treballem a classe", autonomyTitle: "Un mètode que genera", autonomyAccent: "autonomia.",
    autonomyCopy: "L’objectiu no és resoldre els deures per l’alumne, sinó donar-li eines perquè sàpiga afrontar el següent repte per si mateix.",
    principles: [
      ["Entendre abans de repetir", "Fem servir exemples propers, esquemes i preguntes perquè cada concepte tingui sentit."],
      ["Participar per aprendre", "L’alumne explica, prova, s’equivoca i ho torna a intentar amb acompanyament."],
      ["Organitzar per avançar", "Ensenyem a prioritzar, preparar exàmens i convertir grans tasques en passos manejables."],
      ["Mesurar sense pressionar", "Observem el progrés de manera contínua i ajustem el pla quan cal."],
    ],
    reduced: "En grups molt reduïts", reducedCopy: "Temps per preguntar, practicar i rebre una explicació realment personal.", assessment: "Sol·licita una valoració inicial",
  },
  es: {},
  en: {},
  de: {},
}

copy.es = {
  ...copy.ca, site: "Academia de repaso", nav: ["Programas", "Método", "Edades", "Contacto"], trial: "Prueba una clase", reserve: "Reserva tu clase de prueba",
  schedule: "De lunes a viernes · 16:30—20:00", heroEyebrow: "Academia de repaso · Carrer del Sol, 62 · Sabadell", heroTitle: "Aprender puede ser tu nueva", heroAccent: "superpotencia.",
  heroCopy: "Refuerzo escolar, idiomas y robótica con una metodología dinámica, cercana y adaptada a cada alumno.", freeClass: "Reserva una clase gratis", explore: "Explorar programas",
  smallGroups: "Grupos muy reducidos", attention: "Atención que se nota", discover: "Descubre todo lo que puedes aprender", programsEyebrow: "Todo empieza por entender",
  programsTitle: "Una ayuda para cada", programsAccent: "reto.", programsCopy: "Del refuerzo escolar a descubrir la programación: acompañamos cada proceso con objetivos claros y ganas de aprender.", more: "Saber más",
  programs: [["CA","Catalán","Comprensión, expresión, gramática y preparación de exámenes.","Lenguas","#ffd873"],["ES","Castellano","Lectura, redacción, ortografía y sintaxis sin complicaciones.","Lenguas","#ffad9d"],["DE","Alemán","Todos los niveles, conversación y gramática práctica.","Idiomas","#9ddbd3"],["EN","Inglés","Refuerzo, vocabulario y conversación para ganar confianza.","Idiomas","#bdd5f7"],["+×","Matemáticas","Cálculo, problemas y razonamiento lógico paso a paso.","Ciencias","#ffc1b1"],["⚙","Robótica","Programación, construcción, creatividad y trabajo en equipo.","Tecnología","#dfc5fa"]],
  methodLabel:"Nuestro método", methodLines:["Menos memorizar.","Más comprender.","Y disfrutar."], methodIntro:"No aplicamos una fórmula igual para todos. Cada sesión tiene un objetivo concreto, práctica guiada y un cierre para comprobar que el contenido se ha entendido de verdad.",
  steps:[["01","Punto de partida","Detectamos conocimientos, hábitos, bloqueos y objetivos con una primera valoración individual."],["02","Plan semanal","Organizamos prioridades y proponemos tareas breves, concretas y adaptadas al ritmo real del alumno."],["03","Práctica activa","Explicamos, aplicamos y comprobamos. El alumno participa y aprende a razonar, no a repetir."],["04","Seguimiento","Revisamos avances y mantenemos a la familia informada con objetivos claros para cada etapa."]],
  tellUs:"Cuéntanos qué necesitas", agesEyebrow:"Crecer aprendiendo", agesTitle:"Una academia para", agesAccent:"cada etapa.", ages:[["Primaria","Construimos una buena base y hábitos de estudio con actividades amenas.","De 6 a 11 años"],["ESO y Bachillerato","Resolvemos dudas, organizamos el estudio y preparamos cada examen.","De 12 a 18 años"],["Jóvenes y adultos","Idiomas a tu ritmo para viajar, trabajar o superar un reto personal.","Desde 18 años"]],
  testimonial:"En la optativa de alemán de 2º de ESO se sentía perdida. Ahora entiende la gramática, participa en clase y prepara los exámenes con mucha más seguridad.", mother:"Marta, madre de Claudia", elective:"Alemán optativo · 2º de ESO",
}

copy.en = {
  ...copy.ca, site:"Learning academy", nav:["Programs","Method","Ages","Contact"], trial:"Try a class", reserve:"Book a trial class", schedule:"Monday to Friday · 16:30—20:00",
  heroEyebrow:"Learning academy · 62 Carrer del Sol · Sabadell", heroTitle:"Learning can be your new", heroAccent:"superpower.", heroCopy:"Academic support, languages and robotics with a dynamic, personal approach tailored to every student.",
  freeClass:"Book a free class", explore:"Explore programs", smallGroups:"Very small groups", attention:"Support you can feel", discover:"Discover everything you can learn",
  programsEyebrow:"It all starts with understanding", programsTitle:"The right support for every", programsAccent:"challenge.", programsCopy:"From academic support to discovering coding, we guide every process with clear goals and a desire to learn.", more:"Learn more",
  programs:[["CA","Catalan","Comprehension, expression, grammar and exam preparation.","Languages","#ffd873"],["ES","Spanish","Reading, writing, spelling and syntax made simple.","Languages","#ffad9d"],["DE","German","All levels, conversation and practical grammar.","Languages","#9ddbd3"],["EN","English","Support, vocabulary and conversation to build confidence.","Languages","#bdd5f7"],["+×","Mathematics","Calculation, problem-solving and logical reasoning step by step.","Science","#ffc1b1"],["⚙","Robotics","Coding, building, creativity and teamwork.","Technology","#dfc5fa"]],
  methodLabel:"Our method", methodLines:["Less memorising.","More understanding.","And enjoyment."], methodIntro:"We do not use the same formula for everyone. Every session has a clear goal, guided practice and a final check to make sure the content is truly understood.",
  steps:[["01","Starting point","We identify knowledge, habits, blocks and goals through an individual first assessment."],["02","Weekly plan","We organise priorities and set short, specific tasks adapted to the student’s real pace."],["03","Active practice","We explain, apply and check. Students participate and learn to reason, not repeat."],["04","Follow-up","We review progress and keep families informed with clear goals for every stage."]],
  tellUs:"Tell us what you need", agesEyebrow:"Growing through learning", agesTitle:"An academy for", agesAccent:"every stage.", ages:[["Primary","We build strong foundations and study habits through engaging activities.","Ages 6 to 11"],["Secondary","We solve doubts, organise study and prepare every exam.","Ages 12 to 18"],["Young people & adults","Languages at your pace for travel, work or a personal goal.","From age 18"]],
  testimonial:"She felt lost in her Year 8 German elective. Now she understands the grammar, participates in class and prepares for exams with much more confidence.", mother:"Marta, Claudia’s mother", elective:"German elective · Year 8",
  start:"Shall we begin?", contactTitle:"Take the first step.", contactAccent:"We will guide you.", contactCopy:"Tell us what you need and we will help you find the group and program that suit you best.", phone:"Contact phone", hours:"Hours", findUs:"Find us", weekdays:"Monday to Friday",
  fullName:"Full name", yourName:"What is your name?", age:"Student’s age", ageExample:"E.g. 12 years", program:"Program", select:"Select", improve:"What would you like to improve?", moreDetail:"Tell us a little more...", request:"Request information", noCommitment:"No obligation. We will reply personally.",
  footerLead:"Learn with confidence.", footerAccent:"Move forward with joy.", where:"Find us at", personal:"Personal reply", write:"Message us directly", made:"Made for learning and enjoyment",
  homeFun:"Learning can be fun too", homeEyebrow:"A place to move forward", homeTitle:"Understand, practise and", homeAccent:"enjoy.", homeCopy:"Friendly, dynamic classes to build confidence, solve doubts and discover that learning can feel good.", agesLevels:"Ages and levels",
  pageProgramsTitle:"Every difficulty has", pageProgramsAccent:"its path.", pageProgramsCopy:"Academic support, languages and technology with goals adapted to every student’s level and pace.", pageMethodTitle:"Learning how to learn", pageMethodAccent:"changes everything.", pageMethodCopy:"A clear, active approach to understand, gain confidence and work with increasing independence.", pageAgesTitle:"Support for", pageAgesAccent:"every stage.", pageAgesCopy:"From primary foundations to adult languages, we adapt sessions to every moment.", pageContactTitle:"Your first enquiry", pageContactAccent:"with no obligation.", pageContactCopy:"Tell us what you need. We will personally guide you towards the right program and group.",
}

copy.de = {
  ...copy.en, site:"Lernakademie", nav:["Kurse","Methode","Altersstufen","Kontakt"], trial:"Probestunde", reserve:"Probestunde buchen", schedule:"Montag bis Freitag · 16:30—20:00",
  heroEyebrow:"Lernakademie · Carrer del Sol 62 · Sabadell", heroTitle:"Lernen kann deine neue", heroAccent:"Superkraft sein.", heroCopy:"Nachhilfe, Sprachen und Robotik mit einer dynamischen, persönlichen Methode für jeden Lernenden.",
  freeClass:"Kostenlose Stunde buchen", explore:"Kurse entdecken", smallGroups:"Sehr kleine Gruppen", attention:"Persönliche Betreuung", discover:"Entdecke, was du alles lernen kannst",
  programsEyebrow:"Alles beginnt mit Verstehen", programsTitle:"Die richtige Hilfe für jede", programsAccent:"Herausforderung.", programsCopy:"Von Nachhilfe bis Programmieren begleiten wir jeden Lernweg mit klaren Zielen und Freude am Lernen.", more:"Mehr erfahren",
  programs:[["CA","Katalanisch","Verstehen, Ausdruck, Grammatik und Prüfungsvorbereitung.","Sprachen","#ffd873"],["ES","Spanisch","Lesen, Schreiben, Rechtschreibung und Syntax einfach erklärt.","Sprachen","#ffad9d"],["DE","Deutsch","Alle Niveaus, Konversation und praktische Grammatik.","Sprachen","#9ddbd3"],["EN","Englisch","Förderung, Wortschatz und Konversation für mehr Sicherheit.","Sprachen","#bdd5f7"],["+×","Mathematik","Rechnen, Probleme und logisches Denken Schritt für Schritt.","Naturwissenschaften","#ffc1b1"],["⚙","Robotik","Programmieren, Bauen, Kreativität und Teamarbeit.","Technologie","#dfc5fa"]],
  methodLabel:"Unsere Methode", methodLines:["Weniger auswendig lernen.","Mehr verstehen.","Und Freude haben."], methodIntro:"Wir verwenden nicht für alle dieselbe Formel. Jede Einheit hat ein klares Ziel, angeleitete Praxis und eine Abschlusskontrolle.",
  steps:[["01","Ausgangspunkt","Wir erkennen Wissen, Gewohnheiten, Blockaden und Ziele in einer individuellen Einschätzung."],["02","Wochenplan","Wir ordnen Prioritäten und planen kurze, konkrete Aufgaben im passenden Tempo."],["03","Aktives Üben","Wir erklären, wenden an und prüfen. Lernende denken selbst, statt nur zu wiederholen."],["04","Begleitung","Wir prüfen Fortschritte und informieren Familien mit klaren Zielen."]],
  tellUs:"Sag uns, was du brauchst", agesEyebrow:"Durch Lernen wachsen", agesTitle:"Eine Akademie für", agesAccent:"jede Phase.", ages:[["Grundschule","Wir schaffen eine starke Basis und gute Lerngewohnheiten.","6 bis 11 Jahre"],["Sekundarstufe","Wir klären Fragen, organisieren das Lernen und bereiten Prüfungen vor.","12 bis 18 Jahre"],["Jugendliche & Erwachsene","Sprachen in deinem Tempo für Reisen, Arbeit oder persönliche Ziele.","Ab 18 Jahren"]],
  testimonial:"Im Deutsch-Wahlfach der 8. Klasse fühlte sie sich verloren. Jetzt versteht sie die Grammatik, beteiligt sich und geht sicherer in Prüfungen.", mother:"Marta, Claudias Mutter", elective:"Deutsch-Wahlfach · 8. Klasse",
  start:"Fangen wir an?", contactTitle:"Mach den ersten Schritt.", contactAccent:"Wir begleiten dich.", contactCopy:"Sag uns, was du brauchst, und wir finden gemeinsam die passende Gruppe und den richtigen Kurs.", phone:"Telefon", hours:"Öffnungszeiten", findUs:"Adresse", weekdays:"Montag bis Freitag",
  fullName:"Vor- und Nachname", yourName:"Wie heißt du?", age:"Alter", ageExample:"Z. B. 12 Jahre", program:"Kurs", select:"Auswählen", improve:"Was möchtet ihr verbessern?", moreDetail:"Erzähl uns mehr...", request:"Informationen anfordern", noCommitment:"Unverbindlich. Wir antworten persönlich.",
  footerLead:"Mit Vertrauen lernen.", footerAccent:"Mit Freude vorankommen.", where:"Hier sind wir", personal:"Persönliche Antwort", write:"Direkt schreiben", made:"Für Lernen mit Freude",
  homeFun:"Lernen kann auch Spaß machen", homeEyebrow:"Ein Ort zum Weiterkommen", homeTitle:"Verstehen, üben und", homeAccent:"genießen.", homeCopy:"Persönliche, dynamische Kurse für mehr Vertrauen, klare Antworten und Freude am Lernen.", agesLevels:"Altersstufen",
  pageProgramsTitle:"Jede Schwierigkeit hat", pageProgramsAccent:"ihren Weg.", pageProgramsCopy:"Nachhilfe, Sprachen und Technologie mit Zielen, die an Niveau und Tempo angepasst sind.", pageMethodTitle:"Lernen lernen", pageMethodAccent:"verändert alles.", pageMethodCopy:"Eine klare, aktive Methode für Verständnis, Sicherheit und mehr Selbstständigkeit.", pageAgesTitle:"Begleitung für", pageAgesAccent:"jede Phase.", pageAgesCopy:"Von den Grundlagen bis zu Sprachen für Erwachsene passen wir jede Einheit an.", pageContactTitle:"Deine erste Anfrage", pageContactAccent:"unverbindlich.", pageContactCopy:"Sag uns, was du brauchst. Wir beraten dich persönlich zum passenden Kurs und zur passenden Gruppe.",
}

Object.assign(copy.es, {
  start:"¿Empezamos?", contactTitle:"Da el primer paso.", contactAccent:"Nosotros te acompañamos.", contactCopy:"Cuéntanos qué necesitas y te ayudaremos a encontrar el grupo y el programa que mejor encajan contigo.",
  phone:"Teléfono de contacto", hours:"Horario", findUs:"Encuéntranos", weekdays:"Lunes a viernes", prepared:"¡Mensaje preparado!", opened:"Se ha abierto la aplicación de mensajería para que puedas enviarnos tu consulta.", another:"Enviar otra consulta",
  fullName:"Nombre y apellidos", yourName:"¿Cómo te llamas?", age:"Edad del alumno/a", ageExample:"Ej. 12 años", program:"Programa", select:"Selecciona", improve:"¿Qué os gustaría mejorar?", moreDetail:"Cuéntanos un poco más...", request:"Solicitar información", noCommitment:"Sin compromiso. Te responderemos personalmente.",
  footerLead:"Aprender con confianza.", footerAccent:"Avanzar disfrutando.", where:"Estamos en", personal:"Respuesta personal", write:"Escríbenos directamente", made:"Hecho para aprender y disfrutar",
  homeFun:"Aprender también puede ser divertido", homeEyebrow:"Un espacio para avanzar", homeTitle:"Entender, practicar y", homeAccent:"disfrutar.", homeCopy:"Clases cercanas y dinámicas para ganar confianza, resolver dudas y descubrir que aprender puede sentirse bien.", agesLevels:"Edades y niveles",
  pageProgramsTitle:"Cada dificultad tiene", pageProgramsAccent:"su camino.", pageProgramsCopy:"Refuerzo escolar, idiomas y tecnología con objetivos adaptados al nivel y al ritmo de cada alumno.", pageMethodTitle:"Aprender a aprender", pageMethodAccent:"cambia todo.", pageMethodCopy:"Una metodología clara y activa para comprender, ganar confianza y trabajar cada vez con más autonomía.", pageAgesTitle:"Acompañamiento para", pageAgesAccent:"cada etapa.", pageAgesCopy:"Desde las primeras bases de Primaria hasta idiomas para adultos, adaptamos las sesiones a cada momento.", pageContactTitle:"Tu primera consulta", pageContactAccent:"sin compromiso.", pageContactCopy:"Explícanos qué necesitas. Te orientaremos personalmente sobre el programa y el grupo más adecuados.",
  classWork:"Cómo trabajamos en clase", autonomyTitle:"Un método que genera", autonomyAccent:"autonomía.", autonomyCopy:"El objetivo no es resolver los deberes por el alumno, sino darle herramientas para que sepa enfrentarse al siguiente reto por sí mismo.",
  principles:[["Entender antes de repetir","Usamos ejemplos cercanos, esquemas y preguntas para que cada concepto tenga sentido."],["Participar para aprender","El alumno explica, prueba, se equivoca y vuelve a intentarlo con acompañamiento."],["Organizar para avanzar","Enseñamos a priorizar, preparar exámenes y convertir grandes tareas en pasos manejables."],["Medir sin presionar","Observamos el progreso de forma continua y ajustamos el plan cuando hace falta."]],
  reduced:"En grupos muy reducidos", reducedCopy:"Tiempo para preguntar, practicar y recibir una explicación realmente personal.", assessment:"Solicita una valoración inicial",
})

Object.assign(copy.en, {
  prepared:"Message ready!", opened:"The messaging app is ready for you to send us your enquiry.", another:"Send another enquiry",
  classWork:"How we work in class", autonomyTitle:"A method that builds", autonomyAccent:"independence.", autonomyCopy:"Our goal is not to do homework for students, but to give them the tools to face the next challenge independently.",
  principles:[["Understand before repeating","We use relatable examples, diagrams and questions so every concept makes sense."],["Participate to learn","Students explain, try, make mistakes and try again with support."],["Organise to move forward","We teach students to prioritise, prepare exams and turn large tasks into manageable steps."],["Measure without pressure","We monitor progress continuously and adjust the plan whenever needed."]],
  reduced:"In very small groups", reducedCopy:"Time to ask, practise and receive truly personal explanations.", assessment:"Request an initial assessment",
})

Object.assign(copy.de, {
  prepared:"Nachricht vorbereitet!", opened:"Die Nachrichten-App ist bereit, damit du uns deine Anfrage senden kannst.", another:"Weitere Anfrage senden",
  classWork:"So arbeiten wir im Unterricht", autonomyTitle:"Eine Methode für mehr", autonomyAccent:"Selbstständigkeit.", autonomyCopy:"Unser Ziel ist nicht, Aufgaben für Lernende zu lösen, sondern ihnen Werkzeuge für die nächste Herausforderung zu geben.",
  principles:[["Verstehen vor Wiederholen","Wir nutzen vertraute Beispiele, Skizzen und Fragen, damit jedes Konzept Sinn ergibt."],["Mitmachen, um zu lernen","Lernende erklären, probieren, machen Fehler und versuchen es mit Unterstützung erneut."],["Organisieren, um voranzukommen","Wir zeigen, wie man Prioritäten setzt, Prüfungen vorbereitet und große Aufgaben in Schritte teilt."],["Messen ohne Druck","Wir beobachten den Fortschritt laufend und passen den Plan bei Bedarf an."]],
  reduced:"In sehr kleinen Gruppen", reducedCopy:"Zeit für Fragen, Übung und wirklich persönliche Erklärungen.", assessment:"Erste Einschätzung anfragen",
})

const LanguageContext = createContext<{
  locale: Locale
  setLocale: (locale: Locale) => void
  c: Record<string, any>
} | null>(null)

function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("academy-language")
    return saved === "es" || saved === "en" || saved === "de" ? saved : "ca"
  })
  const setLocale = (next: Locale) => {
    setLocaleState(next)
    localStorage.setItem("academy-language", next)
  }
  useEffect(() => { document.documentElement.lang = locale }, [locale])
  return <LanguageContext.Provider value={{ locale, setLocale, c: copy[locale] }}>{children}</LanguageContext.Provider>
}

function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error("LanguageProvider is missing")
  return value
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  )
}

function SiteName() {
  const { c } = useLanguage()
  return (
    <Link to="/" className="site-name" aria-label={c.site}>
      <span className="site-name-dot" aria-hidden="true" />
      <strong>{c.site}</strong>
    </Link>
  )
}

const navItems = [
  "/programas", "/metodo", "/edades", "/contacto",
]

function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  return (
    <label className="language-switcher">
      <span className="sr-only">Idioma</span>
      <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label="Idioma">
        <option value="ca">CA</option>
        <option value="es">ES</option>
        <option value="en">EN</option>
        <option value="de">DE</option>
      </select>
    </label>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { c } = useLanguage()

  useEffect(() => {
    document.body.classList.toggle("menu-open", open)
    return () => document.body.classList.remove("menu-open")
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <SiteName />
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navItems.map((href, index) => (
              <NavLink
                to={href}
                key={href}
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                {c.nav[index]}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <LanguageSwitcher />
            <Link className="button button-small header-cta" to="/contacto">
              {c.trial} <ArrowIcon />
            </Link>
          </div>
          <button
            className="menu-button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </header>
      {open &&
        createPortal(
          <div className="mobile-menu">
            <div className="mobile-menu-top">
              <SiteName />
              <LanguageSwitcher />
              <button
                className="menu-button"
                aria-label="Cerrar menú"
                onClick={close}
              >
                <MenuIcon open />
              </button>
            </div>
            <nav aria-label="Navegación móvil">
              {navItems.map((href, index) => (
                <Link to={href} key={href} onClick={close}>
                  <span>0{index + 1}</span>
                  {c.nav[index]}
                </Link>
              ))}
            </nav>
            <Link className="button" to="/contacto" onClick={close}>
              {c.reserve} <ArrowIcon />
            </Link>
            <p>{c.schedule}</p>
          </div>,
          document.body,
        )}
    </>
  )
}

function Robot({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`robot ${compact ? "robot-compact" : ""}`} aria-hidden="true">
      <span className="robot-antenna">
        <i />
      </span>
      <div className="robot-head">
        <span className="robot-ear left" />
        <span className="robot-ear right" />
        <span className="robot-eye left">
          <i />
        </span>
        <span className="robot-eye right">
          <i />
        </span>
        <span className="robot-cheek left" />
        <span className="robot-cheek right" />
        <span className="robot-smile" />
      </div>
      {!compact && (
        <>
          <span className="robot-arm left" />
          <span className="robot-arm right" />
          <div className="robot-body">
            <span className="robot-light" />
            <span className="robot-lines" />
          </div>
          <span className="robot-leg left" />
          <span className="robot-leg right" />
        </>
      )}
    </div>
  )
}

function Speech({
  children,
  color,
  className = "",
}: {
  children: ReactNode
  color: string
  className?: string
}) {
  return (
    <div className={`speech ${className}`} style={{ "--bubble": color } as CSSProperties}>
      {children}
    </div>
  )
}

function Hero() {
  const { c } = useLanguage()
  return (
    <section className="hero">
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-copy">
        <span className="eyebrow">{c.heroEyebrow}</span>
        <h1>
          {c.heroTitle} <em>{c.heroAccent}</em>
        </h1>
        <p>{c.heroCopy}</p>
        <div className="hero-actions">
          <Link className="button" to="/contacto">
            {c.freeClass} <ArrowIcon />
          </Link>
          <Link className="text-link" to="/programas">
            {c.explore} <span>↓</span>
          </Link>
        </div>
        <div className="hero-proof">
          <div className="avatar-stack" aria-hidden="true">
            <span>LA</span><span>MI</span><span>JO</span>
          </div>
          <p><strong>{c.smallGroups}</strong>{c.attention}</p>
        </div>
      </div>
      <div className="hero-visual">
        <span className="spark spark-one">✦</span>
        <span className="spark spark-two">✦</span>
        <Speech color="#ffd873" className="bubble-de">Guten Tag!</Speech>
        <Speech color="#9ddbd3" className="bubble-en">Piece of cake!</Speech>
        <Speech color="#ffad9d" className="bubble-es">¡Lo tengo!</Speech>
        <div className="robot-stage">
          <Robot />
        </div>
        <span className="formula formula-one">a² + b²</span>
        <span className="formula formula-two">&lt;/hello&gt;</span>
      </div>
      <Link className="scroll-note" to="/programas">{c.discover} <span>→</span></Link>
    </section>
  )
}

function Programs() {
  const { c } = useLanguage()
  return (
    <section className="programs section" id="programas">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{c.programsEyebrow}</span>
          <h2>{c.programsTitle} <em>{c.programsAccent}</em></h2>
        </div>
        <p>{c.programsCopy}</p>
      </div>
      <div className="program-grid">
        {c.programs.map(([code, title, description, tag, color]: string[], index: number) => (
          <article
            className="program-card"
            key={code}
            style={{ "--card": color } as CSSProperties}
          >
            <div className="program-top">
              <span className="program-code">{code}</span>
              <span className="program-index">0{index + 1}</span>
            </div>
            <div>
              <span className="program-tag">{tag}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <Link to="/contacto" aria-label={`${c.more}: ${title}`}>
              {c.more} <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

function Method() {
  const { c } = useLanguage()
  return (
    <section className="method section" id="metodo">
      <div className="method-visual">
        <span className="eyebrow light">{c.methodLabel}</span>
        <h2>{c.methodLines[0]}<br /><em>{c.methodLines[1]}</em><br />{c.methodLines[2]}</h2>
        <div className="method-image">
          <img
            src={learningBooks}
            alt="Libros y materiales para aprender idiomas, matemáticas y robótica"
          />
        </div>
      </div>
      <div className="steps">
        <p className="method-intro">{c.methodIntro}</p>
        {c.steps.map(([number, title, description]: string[]) => (
          <article key={number}>
            <span>{number}</span>
            <div><h3>{title}</h3><p>{description}</p></div>
          </article>
        ))}
        <Link to="/contacto" className="button button-coral">
          {c.tellUs} <ArrowIcon />
        </Link>
      </div>
    </section>
  )
}

function Ages() {
  const { c } = useLanguage()
  return (
    <section className="ages section" id="edades">
      <div className="section-heading centered">
        <span className="eyebrow">{c.agesEyebrow}</span>
        <h2>{c.agesTitle} <em>{c.agesAccent}</em></h2>
      </div>
      <div className="age-track">
        <article>
          <span className="age-number">01</span>
          <div className="age-icon">✎</div>
          <h3>{c.ages[0][0]}</h3><p>{c.ages[0][1]}</p><strong>{c.ages[0][2]}</strong>
        </article>
        <article className="featured">
          <span className="age-number">02</span>
          <div className="age-icon">↗</div>
          <h3>{c.ages[1][0]}</h3><p>{c.ages[1][1]}</p><strong>{c.ages[1][2]}</strong>
        </article>
        <article>
          <span className="age-number">03</span>
          <div className="age-icon">◎</div>
          <h3>{c.ages[2][0]}</h3><p>{c.ages[2][1]}</p><strong>{c.ages[2][2]}</strong>
        </article>
      </div>
    </section>
  )
}

function Testimonial() {
  const { c } = useLanguage()
  return (
    <section className="testimonial section">
      <span className="quote-mark">“</span>
      <blockquote>{c.testimonial}</blockquote>
      <div className="testimonial-author">
        <span>MC</span>
        <p><strong>{c.mother}</strong>{c.elective}</p>
      </div>
      <div className="doodle-line" aria-hidden="true" />
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const { c, locale } = useLanguage()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const greeting = locale === "ca" ? "Hola, soc" : locale === "de" ? "Hallo, ich bin" : locale === "en" ? "Hello, I am" : "Hola, soy"
    const message = `${greeting} ${data.get("name")}. ${data.get("subject")} · ${data.get("age")}.`
    window.open(`${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
    setSent(true)
  }

  return (
    <section className="contact section" id="contacto">
      <div className="contact-copy">
        <span className="eyebrow light">{c.start}</span>
        <h2>{c.contactTitle}<br /><em>{c.contactAccent}</em></h2>
        <p>{c.contactCopy}</p>
        <div className="contact-data">
          <a href={`tel:+${PHONE}`}><span>{c.phone}</span>630 38 24 31</a>
          <div><span>{c.hours}</span>{c.weekdays} · 16:30—20:00</div>
          <div><span>{c.findUs}</span>Carrer del Sol, 62 · Sabadell</div>
        </div>
      </div>
      <div className="contact-panel">
        {sent ? (
          <div className="form-success">
            <span>✓</span>
            <h3>{c.prepared || "Message ready!"}</h3>
            <p>{c.opened || "The messaging app is ready."}</p>
            <button type="button" onClick={() => setSent(false)}>{c.another || c.request}</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label>
              <span>{c.fullName}</span>
              <input name="name" required placeholder={c.yourName} />
            </label>
            <div className="form-row">
              <label>
                <span>{c.age}</span>
                <input name="age" required placeholder={c.ageExample} />
              </label>
              <label>
                <span>{c.program}</span>
                <select name="subject" required defaultValue="">
                  <option value="" disabled>{c.select}</option>
                  {c.programs.map(([code, title]: string[]) => <option key={code}>{title}</option>)}
                </select>
              </label>
            </div>
            <label>
              <span>{c.improve}</span>
              <textarea name="message" rows={3} placeholder={c.moreDetail} />
            </label>
            <button className="button button-coral" type="submit">
              {c.request} <ArrowIcon />
            </button>
            <small>{c.noCommitment}</small>
          </form>
        )}
      </div>
    </section>
  )
}

function Footer() {
  const { c } = useLanguage()
  return (
    <footer>
      <span className="footer-orbit footer-orbit-one" aria-hidden="true" />
      <span className="footer-orbit footer-orbit-two" aria-hidden="true" />
      <div className="footer-content">
        <div className="footer-lead">
          <span>{c.site} · Sabadell</span>
          <h2>{c.footerLead}<br />{c.footerAccent}</h2>
          <div className="footer-subjects" aria-hidden="true">
            {c.programs.slice(0, 4).map(([code, title, , , color]: string[]) => (
              <span key={code} style={{ "--subject-color": color } as CSSProperties}>{title}</span>
            ))}
          </div>
        </div>
        <div className="footer-details">
          <div>
            <span>{c.hours}</span>
            <strong>{c.weekdays}</strong>
            <p>16:30—20:00</p>
          </div>
          <div>
            <span>{c.where}</span>
            <strong>Carrer del Sol, 62</strong>
            <p>Sabadell</p>
          </div>
        </div>
        <a className="footer-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer">
          <span className="footer-whatsapp-icon">W</span>
          <span>
            <small>{c.personal}</small>
            <strong>{c.write}</strong>
          </span>
          <span className="footer-arrow"><ArrowIcon /></span>
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2027 {c.site}</span>
        <nav aria-label="Navegación del pie">
          {navItems.map((href, index) => (
            <Link key={href} to={href}>{c.nav[index]}</Link>
          ))}
        </nav>
        <span>{c.made}</span>
      </div>
    </footer>
  )
}

function FloatingContact() {
  const [nearFooter, setNearFooter] = useState(false)

  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0.08 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      className={`floating-whatsapp ${nearFooter ? "is-hidden" : ""}`}
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir mensajería"
    >
      <b>W</b>
    </a>
  )
}

function PageHero({
  index,
  eyebrow,
  title,
  accent,
  copy,
}: {
  index: string
  eyebrow: string
  title: string
  accent: string
  copy: string
}) {
  return (
    <section className="page-hero">
      <span className="page-index">{index}</span>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title} <em>{accent}</em></h1>
        <p>{copy}</p>
      </div>
      <div className="page-hero-art" aria-hidden="true">
        <span>✦</span>
        <Robot compact />
      </div>
    </section>
  )
}

function MethodDetails() {
  const { c } = useLanguage()

  return (
    <section className="method-details section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{c.classWork}</span>
          <h2>{c.autonomyTitle} <em>{c.autonomyAccent}</em></h2>
        </div>
        <p>{c.autonomyCopy}</p>
      </div>
      <div className="principle-grid">
        {c.principles.map(([title, description]: string[], index: number) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="method-note">
        <strong>{c.reduced}</strong>
        <p>{c.reducedCopy}</p>
        <Link to="/contacto">{c.assessment} <ArrowIcon /></Link>
      </div>
    </section>
  )
}

function HomeOverview() {
  const { c } = useLanguage()
  return (
    <section className="home-overview section">
      <div className="home-books">
        <img
          src={learningBooks}
          alt="Libros, material de idiomas y un pequeño robot educativo"
        />
        <span>{c.homeFun}</span>
      </div>
      <div className="home-overview-copy">
        <span className="eyebrow">{c.homeEyebrow}</span>
        <h2>{c.homeTitle} <em>{c.homeAccent}</em></h2>
        <p>{c.homeCopy}</p>
        <div className="home-route-list">
          <Link to="/programas"><span>01</span>{c.nav[0]} <ArrowIcon /></Link>
          <Link to="/metodo"><span>02</span>{c.methodLabel} <ArrowIcon /></Link>
          <Link to="/edades"><span>03</span>{c.agesLevels} <ArrowIcon /></Link>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <HomeOverview />
    </>
  )
}

function ProgramsPage() {
  const { c } = useLanguage()
  return (
    <>
      <PageHero
        index="01"
        eyebrow={c.nav[0]}
        title={c.pageProgramsTitle}
        accent={c.pageProgramsAccent}
        copy={c.pageProgramsCopy}
      />
      <Programs />
      <Testimonial />
    </>
  )
}

function MethodPage() {
  const { c } = useLanguage()
  return (
    <>
      <PageHero
        index="02"
        eyebrow={c.methodLabel}
        title={c.pageMethodTitle}
        accent={c.pageMethodAccent}
        copy={c.pageMethodCopy}
      />
      <Method />
      <MethodDetails />
    </>
  )
}

function AgesPage() {
  const { c } = useLanguage()
  return (
    <>
      <PageHero
        index="03"
        eyebrow={c.agesLevels}
        title={c.pageAgesTitle}
        accent={c.pageAgesAccent}
        copy={c.pageAgesCopy}
      />
      <Ages />
    </>
  )
}

function ContactPage() {
  const { c } = useLanguage()
  return (
    <>
      <PageHero
        index="04"
        eyebrow={c.nav[3]}
        title={c.pageContactTitle}
        accent={c.pageContactAccent}
        copy={c.pageContactCopy}
      />
      <Contact />
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function RootLayout() {
  return (
    <LanguageProvider>
      <div className="app-shell">
        <ScrollToTop />
        <Header />
        <main><Outlet /></main>
        <Footer />
        <FloatingContact />
      </div>
    </LanguageProvider>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "programas", Component: ProgramsPage },
      { path: "metodo", Component: MethodPage },
      { path: "edades", Component: AgesPage },
      { path: "contacto", Component: ContactPage },
      { path: "*", Component: HomePage },
    ],
  },
])
