import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { Reveal } from './components/reveal';
import { SectionHeading } from './components/section-heading';
import { courses, menuItems, navigation, sakeItems, seats } from './data/content';

const Logo = ({ light = false }: { light?: boolean }) => (
  <span
    aria-label="炭と酒 余白"
    className={`font-serif-jp text-2xl leading-[0.82] tracking-[0.12em] ${light ? 'text-ivory' : 'text-charcoal'}`}
  >
    炭と酒
    <br />
    <b className="text-[1.95em] leading-none font-normal">余</b>
    <span className="text-[0.54em]">白</span>
  </span>
);

const ReservationLink = ({ inverse = false }: { inverse?: boolean }) => (
  <a
    href="#reservation"
    className={`inline-flex min-h-12 items-center justify-center gap-2 px-5 text-xs font-bold tracking-[0.14em] transition duration-300 hover:-translate-y-0.5 ${
      inverse
        ? 'bg-ivory text-charcoal hover:bg-paper'
        : 'bg-red text-ivory hover:bg-red-dark'
    }`}
  >
    WEB予約 <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
  </a>
);

export const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    window.setTimeout(() => menuButton.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', closeOnEscape);
    closeButton.current?.focus();
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [closeMenu, menuOpen]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="bg-ivory text-charcoal min-w-0 overflow-x-clip">
      <header className="text-ivory absolute inset-x-0 top-0 z-30 px-6 py-5 md:px-10 md:py-7">
        <div className="mx-auto flex max-w-[1440px] items-start justify-between">
          <a href="#top" className="shrink-0 focus:outline-offset-8">
            <Logo light />
          </a>
          <nav
            aria-label="主要ナビゲーション"
            className="hidden items-center gap-8 pt-2 lg:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-copper-light text-xs tracking-[0.13em]"
              >
                {item.label}
              </a>
            ))}
            <ReservationLink inverse />
          </nav>
          <button
            ref={menuButton}
            type="button"
            className="grid size-11 place-items-center lg:hidden"
            aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu aria-hidden="true" size={24} strokeWidth={1.35} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="bg-charcoal text-ivory fixed inset-0 z-50 flex flex-col px-6 py-5 lg:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="モバイルメニュー"
            onKeyDown={trapFocus}
          >
            <div className="flex items-start justify-between">
              <Logo light />
              <button
                ref={closeButton}
                type="button"
                className="grid size-11 place-items-center"
                aria-label="メニューを閉じる"
                onClick={closeMenu}
              >
                <X aria-hidden="true" size={24} strokeWidth={1.35} />
              </button>
            </div>
            <nav className="my-auto grid gap-7" aria-label="モバイルナビゲーション">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="font-serif-jp text-3xl"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * index }}
                  onClick={closeMenu}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <ReservationLink inverse />
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top" aria-hidden={menuOpen} inert={menuOpen}>
        <section
          className="bg-charcoal text-ivory relative grid min-h-[790px] overflow-hidden md:min-h-[880px]"
          aria-labelledby="hero-title"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center opacity-65"
            style={{ backgroundImage: "url('/assets/hero.jpg')" }}
            initial={{ scale: shouldReduceMotion ? 1 : 1.08 }}
            animate={{ scale: shouldReduceMotion ? 1 : 1.14 }}
            transition={{ duration: 15, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,18,16,.82)_0%,rgba(19,18,16,.42)_56%,rgba(19,18,16,.2)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(19,18,16,.58),transparent)]" />
          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-end px-[6%] pt-44 pb-[14vh] md:px-[9%]">
            <Reveal>
              <p className="text-copper-light mb-7 text-[11px] font-semibold tracking-[0.28em]">
                SUMI TO SAKE YOHAKU
              </p>
              <h1
                id="hero-title"
                className="font-serif-jp text-[clamp(3.15rem,6.3vw,6.25rem)] leading-[1.25] tracking-[0.08em]"
              >
                炭の香りと、
                <br />
                酒と、
                <br />
                少し長い夜。
              </h1>
            </Reveal>
            <Reveal
              delay={0.18}
              className="mt-10 flex flex-col items-start gap-3 sm:flex-row"
              data-testid="hero-ctas"
            >
              <a
                href="#reservation"
                className="bg-red hover:bg-red-dark inline-flex min-h-14 items-center px-6 text-sm tracking-[0.12em] transition"
              >
                席を予約する
              </a>
              <a
                href="#menu"
                className="border-ivory/65 hover:bg-ivory hover:text-charcoal inline-flex min-h-14 items-center border px-6 text-sm tracking-[0.12em] transition"
              >
                お品書きを見る
              </a>
            </Reveal>
          </div>
          <p className="absolute right-6 bottom-8 z-10 hidden origin-bottom-right rotate-90 text-[10px] tracking-[0.25em] md:block">
            SCROLL
          </p>
        </section>

        <section
          className="bg-ivory py-[72px] lg:py-[120px]"
          aria-labelledby="concept-title"
        >
          <div
            data-testid="concept-layout"
            className="mx-auto max-w-[1240px] px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-[72px] lg:px-12"
          >
            <Reveal className="relative" data-testid="concept-image">
              <img
                className="aspect-3/4 w-full object-cover"
                src="/assets/concept.jpg"
                alt="炭火のそばに置かれた料理"
              />
              <p className="bg-ivory absolute right-0 bottom-8 px-[10px] py-4 text-[10px] tracking-[0.4em] [writing-mode:vertical-rl]">
                OUR STORY
              </p>
            </Reveal>
            <Reveal
              delay={0.12}
              className="mt-12 lg:mt-0 lg:pl-6"
              data-testid="concept-copy"
            >
              <p className="text-copper mb-5 text-[11px] tracking-[0.38em]">OUR STORY</p>
              <h2
                id="concept-title"
                className="font-serif-jp text-[clamp(26px,2.8vw,42px)] leading-[1.9] tracking-[0.06em]"
              >
                火を囲むと、
                <br />
                夜は少し
                <br />
                ゆっくりになる。
              </h2>
              <div className="text-muted mt-10 space-y-[22px] text-sm leading-[2.4]">
                <p>
                  旬の魚。
                  <br />
                  土地の野菜。
                  <br />
                  丁寧に仕込んだ肉。
                </p>
                <p>
                  炭火でじっくり焼き上げ、
                  <br />
                  その一皿に合う酒を添える。
                </p>
                <p>
                  気取らず、
                  <br />
                  でも少し特別な夜を。
                </p>
              </div>
              <span className="bg-copper mt-12 block h-px w-16" aria-hidden="true" />
            </Reveal>
          </div>
        </section>

        <section
          id="menu"
          className="bg-paper px-6 py-[72px] lg:px-0 lg:py-[100px]"
          aria-labelledby="menu-title"
        >
          <div className="mx-auto max-w-[1440px] lg:px-12">
            <Reveal>
              <SectionHeading
                id="menu-title"
                eyebrow="お品書き"
                title={
                  <>
                    炭火で、
                    <br />
                    旬を味わう。
                  </>
                }
              />
            </Reveal>
            <div
              data-testid="menu-grid"
              className="bg-charcoal mt-12 grid gap-[2px] md:grid-cols-2 lg:mt-[72px] lg:grid-cols-3"
            >
              {menuItems.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 0.07}
                  data-testid={`menu-card-${index}`}
                  className={item.wide ? 'md:col-span-1 lg:col-span-2' : ''}
                >
                  <article className="group bg-dark text-ivory relative h-full overflow-hidden">
                    <img
                      className={`w-full object-cover brightness-[.72] transition duration-700 group-hover:scale-105 ${
                        item.wide
                          ? 'aspect-4/3 lg:aspect-[2.35/1]'
                          : index === 3
                            ? 'aspect-4/3 lg:aspect-auto lg:h-full'
                            : 'aspect-4/3'
                      }`}
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(15,14,13,.8),transparent)] px-7 pt-12 pb-6">
                      <h3 className="font-serif-jp text-base tracking-[0.08em]">
                        {item.title}
                      </h3>
                      <p className="font-display text-copper-light mt-1 text-sm tracking-[0.08em]">
                        {item.price}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="sake"
          className="bg-charcoal text-ivory overflow-hidden px-6 py-[72px] md:px-[9%] md:py-36"
          aria-labelledby="sake-title"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                id="sake-title"
                inverse
                eyebrow="SAKE"
                title={
                  <>
                    料理のそばに、
                    <br />
                    いい酒を。
                  </>
                }
              />
              <div className="divide-ivory/20 border-ivory/20 mt-12 divide-y border-y">
                {sakeItems.map(([name, origin]) => (
                  <div key={name} className="flex items-center justify-between py-4">
                    <span className="font-serif-jp text-xl tracking-[0.06em]">
                      {name}
                    </span>
                    <span className="text-copper-light text-xs tracking-[0.14em]">
                      {origin}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal
              delay={0.16}
              className="relative mx-auto w-full max-w-lg pb-10 pl-0 sm:pl-12"
            >
              <img
                className="aspect-4/5 w-4/5 object-cover"
                src="/assets/cups-1.jpg"
                alt="酒器と日本酒"
              />
              <img
                className="border-charcoal absolute right-0 bottom-0 aspect-square w-1/2 border-[10px] object-cover sm:border-[14px]"
                src="/assets/cups-2.jpg"
                alt="注がれた日本酒"
              />
            </Reveal>
          </div>
        </section>

        <section className="bg-paper grid md:grid-cols-2" aria-labelledby="chef-title">
          <Reveal className="relative min-h-[480px] overflow-hidden md:min-h-[680px]">
            <img
              className="absolute inset-0 size-full object-cover"
              src="/assets/fire-grill.jpg"
              alt="炭火と向き合う料理人"
            />
            <p className="font-display text-ivory absolute bottom-8 left-6 text-6xl tracking-[0.08em] md:left-10">
              CRAFT
            </p>
          </Reveal>
          <Reveal
            delay={0.14}
            className="flex items-center px-6 py-[72px] md:px-[18%] md:py-24"
          >
            <div>
              <p className="text-copper text-xs tracking-[0.2em]">CHEF</p>
              <h2
                id="chef-title"
                className="font-serif-jp mt-6 text-[clamp(2.5rem,4vw,4.3rem)] tracking-[0.08em]"
              >
                火と向き合う。
              </h2>
              <p className="text-muted mt-9 text-sm leading-8">
                火加減を読む。素材の声を聞く。ひと皿ごとに、食材がいちばん美味しくなる瞬間を探しています。
              </p>
            </div>
          </Reveal>
        </section>

        <section
          id="interior"
          className="px-6 py-[72px] md:px-[9%] md:py-36"
          aria-labelledby="interior-title"
        >
          <Reveal>
            <SectionHeading
              id="interior-title"
              eyebrow="店内"
              title={
                <>
                  少し暗くて、
                  <br />
                  ちょうどいい。
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12 overflow-hidden">
            <img
              className="h-[46vw] min-h-72 w-full object-cover"
              src="/assets/counter-interior-v2.png"
              alt="温かい光に包まれたカウンター席"
            />
          </Reveal>
          <div className="mt-4 grid gap-4 md:grid-cols-[1.5fr_1fr]">
            <Reveal delay={0.13} className="overflow-hidden">
              <img
                className="aspect-16/9 w-full object-cover"
                src="/assets/table-interior-v2.png"
                alt="ゆったりしたテーブル席"
              />
            </Reveal>
            <Reveal delay={0.2} className="bg-paper grid content-end p-7 md:p-9">
              <div className="divide-charcoal/15 border-charcoal/15 divide-y border-y">
                {seats.map(([label, count]) => (
                  <p key={label} className="flex justify-between py-3 text-sm">
                    <span>{label}</span>
                    <span className="font-display tracking-[0.12em]">{count}</span>
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section
          className="bg-red text-ivory px-6 py-[72px] md:px-[9%] md:py-32"
          aria-labelledby="course-title"
        >
          <Reveal>
            <p className="font-display text-copper-light text-xs tracking-[0.25em]">
              COURSE
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
            <Reveal delay={0.1}>
              <h2
                id="course-title"
                className="font-serif-jp text-[clamp(2.5rem,4.2vw,4.4rem)] tracking-[0.08em]"
              >
                宴
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="divide-ivory/35 border-ivory/35 divide-y border-y">
                {courses.map((course) => (
                  <article
                    key={course.name}
                    className="grid gap-2 py-6 sm:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <h3 className="font-serif-jp text-2xl tracking-[0.06em]">
                        {course.name}
                      </h3>
                      <p className="text-ivory/75 mt-2 text-sm">{course.description}</p>
                    </div>
                    <p className="font-display text-2xl tracking-[0.05em]">
                      {course.price}
                    </p>
                  </article>
                ))}
              </div>
              <a
                href="#reservation"
                className="border-ivory hover:text-copper-light mt-9 inline-flex items-center gap-6 border-b pb-2 text-sm tracking-[0.14em]"
              >
                コースを見る <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>

        <section
          id="access"
          className="bg-paper py-[72px] lg:py-28"
          aria-labelledby="access-title"
        >
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className="flex items-center">
                <div>
                  <p className="text-copper text-xs tracking-[0.2em]">ACCESS</p>
                  <h2
                    id="access-title"
                    className="font-serif-jp mt-6 text-[clamp(2.4rem,4vw,4.1rem)] tracking-[0.08em]"
                  >
                    店舗情報
                  </h2>
                  <address className="text-muted mt-9 text-sm leading-8 not-italic">
                    東京都千代田区丸の内2丁目（架空）
                    <br />
                    東京駅 丸の内南口 徒歩5分
                  </address>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div
                  data-testid="access-map"
                  className="relative aspect-4/3 w-full overflow-hidden bg-[#D4CFC5]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 [background-image:linear-gradient(rgba(28,26,23,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(28,26,23,.12)_1px,transparent_1px)] [background-size:44px_44px]" />
                  <div className="absolute top-[42%] left-0 h-[3px] w-full bg-[rgba(245,240,232,.9)]" />
                  <div className="absolute top-0 bottom-0 left-[38%] w-[3px] bg-[rgba(245,240,232,.9)]" />
                  <div className="absolute top-[68%] left-0 h-[1.5px] w-full bg-[rgba(245,240,232,.55)]" />
                  <div className="absolute top-0 bottom-0 left-[72%] w-[1.5px] bg-[rgba(245,240,232,.55)]" />
                  <p className="font-serif-jp text-charcoal/48 absolute top-[12%] right-[10%] text-[18px] tracking-[0.16em]">
                    東京駅
                  </p>
                  <p className="text-charcoal/55 absolute top-[32%] right-[8%] text-[10px] tracking-[0.12em]">
                    丸の内南口
                  </p>
                  <p className="text-charcoal/40 absolute bottom-[10%] left-[8%] text-[9px] tracking-[0.12em]">
                    丸の内仲通り
                  </p>
                  <div className="absolute top-[42%] left-[38%] -translate-x-1/2 -translate-y-full">
                    <div className="bg-red grid size-9 -rotate-45 place-items-center rounded-[50%_50%_50%_0]">
                      <span className="bg-ivory size-2.5 rotate-45 rounded-full" />
                    </div>
                  </div>
                  <p className="bg-charcoal font-serif-jp text-ivory absolute top-[42%] left-[38%] -translate-x-1/2 translate-y-[4px] px-3 py-[5px] text-[10px] tracking-[0.12em] whitespace-nowrap">
                    炭と酒 余白
                  </p>
                </div>
                <a
                  className="text-copper border-copper mt-4 inline-flex items-center gap-2.5 border-b pb-[5px] text-[11px] tracking-[0.16em]"
                  href="https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%A7%85"
                  target="_blank"
                  rel="noreferrer"
                >
                  Googleマップで見る <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="reservation"
          className="bg-charcoal text-ivory relative overflow-hidden px-6 py-28 md:px-[9%] md:py-40"
          aria-labelledby="reservation-title"
        >
          <img
            className="absolute inset-0 size-full object-cover opacity-40"
            src="/assets/cta.jpg"
            alt=""
          />
          <div className="bg-charcoal/40 absolute inset-0" />
          <Reveal className="relative mx-auto max-w-4xl text-center">
            <p className="text-copper-light text-xs tracking-[0.25em]">RESERVATION</p>
            <h2
              id="reservation-title"
              className="font-serif-jp mt-7 text-[clamp(2.65rem,5vw,5rem)] leading-[1.35] tracking-[0.08em]"
            >
              今夜は、
              <br />
              少しだけ寄り道を。
            </h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ReservationLink inverse />
              <a
                href="tel:0312345678"
                className="border-ivory hover:bg-ivory hover:text-charcoal inline-flex min-h-12 items-center justify-center gap-2 border px-5 text-xs font-bold tracking-[0.14em]"
              >
                <Phone size={14} aria-hidden="true" />
                電話する
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="bg-charcoal text-ivory px-6 py-10 md:px-[9%]">
        <div className="border-ivory/20 mx-auto flex max-w-[1240px] flex-col justify-between gap-8 border-t pt-8 sm:flex-row sm:items-end">
          <Logo light />
          <div className="text-ivory/65 text-xs leading-6 tracking-[0.1em]">
            OPEN 17:00–23:30
            <br />
            定休日{'　'}日曜日
          </div>
          <p className="text-ivory/50 text-[10px] tracking-[0.14em]">
            © YOHAKU. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};
