// App entry — orchestrates loading, nav, modal, scroll-spy.
const { useState: uS, useEffect: uE, useRef: uR } = React;

function App() {
  const [loading, setLoading] = uS(true);
  const [active, setActive] = uS("home");
  const [modal, setModal] = uS(null);
  const [contactOpen, setContactOpen] = uS(false);
  const openContact = () => setContactOpen(true);
  // expose globally so any button can trigger it
  window.openContactForm = openContact;

  // Scroll-spy
  uE(() => {
    if (loading) return;
    const ids = ["home", "work", "experience", "publications", "skills"];
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Navbar onNav={onNav} active={active} onContact={openContact} />
      <main>
        <Hero onNav={onNav} onContact={openContact} />
        <Works onOpen={setModal} />
        <StatsSection />
        <Experience />
        <Publications />
        <Skills />
        <Contact onContact={openContact} />
      </main>
      <ProjectModal p={modal} onClose={() => setModal(null)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
