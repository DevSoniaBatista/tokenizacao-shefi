'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const TOTAL_SLIDES = 12;

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="fade-up"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(1);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slideRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveSlide(index + 1);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSlide = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      {/* NAV */}
      <nav>
        <div className="nav-brand">🔑 Tokenização</div>
        <div className="nav-dots">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              className={`nav-dot ${activeSlide === i + 1 ? 'active' : ''}`}
              title={`Slide ${i + 1}`}
              onClick={() => scrollToSlide(i)}
            />
          ))}
        </div>
        <div className="nav-counter">{activeSlide} / {TOTAL_SLIDES}</div>
      </nav>

      {/* PROGRESS */}
      <div className="progress-bar-wrap">
        <div
          className="progress-bar"
          style={{ width: `${(activeSlide / TOTAL_SLIDES) * 100}%` }}
        />
      </div>

      {/* SLIDE 1 — CAPA */}
      <section
        className="slide slide-dark"
        id="slide-1"
        ref={(el) => { slideRefs.current[0] = el; }}
      >
        <div className="left-border" />
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--violet)', right: -150, top: -150 }} />
        <div className="orb" style={{ width: 300, height: 300, background: 'var(--sky)', right: 50, bottom: 80 }} />

        <div className="hero-content-wrapper">
          <div className="hero-text-side">
            <FadeUp delay={0.1}>
              <div className="slide-tag">01</div>
              <div className="display">TOKENIZA<span>ÇÃO</span></div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--gold2)', fontWeight: 400, fontStyle: 'italic', marginTop: '0.5rem' }}>
                Entendendo o Futuro dos Ativos Digitais
              </p>
            </FadeUp>

          </div>

          <FadeUp delay={0.5}>
            <div className="hero-cards-container">
              {/* Sonia Card */}
              <div className="hero-contact-card sonia-card">
                <div className="contact-section">
                  <div className="contact-image-wrapper">
                    <img src="/images/sonia-profile.jpg" alt="Sonia Batista" className="contact-img" />
                  </div>
                  <div className="contact-info">
                    <span className="contact-label">Palestrante</span>
                    <h3 className="contact-name">Sonia Batista</h3>
                  </div>
                  <div className="qr-box">
                    <QRCodeSVG value="https://www.linkedin.com/in/soniamarabatista/" size={60} />
                    <span className="qr-text">LinkedIn</span>
                  </div>
                </div>
              </div>

              {/* MNW3 Card */}
              <div className="hero-contact-card mnw3-card">
                <div className="contact-section">
                  <div className="contact-image-wrapper">
                    <img src="/images/mnw3-logo.jpg" alt="Mulheres na Web3" className="mnw3-img" />
                  </div>
                  <div className="contact-info">
                    <span className="contact-label">Comunidade</span>
                    <h3 className="contact-name">Mulheres na Web3</h3>
                  </div>
                  <div className="qr-box">
                    <QRCodeSVG value="https://www.linkedin.com/company/mulheresnaweb3/" size={60} />
                    <span className="qr-text">LinkedIn</span>
                  </div>
                </div>

                <div className="hero-social-links">
                  <a href="https://www.mulheresnaweb3.com/" target="_blank" rel="noopener noreferrer" className="hero-social-btn">
                    🌐 Website
                  </a>
                  <a href="https://www.instagram.com/mulheresnaweb3" target="_blank" rel="noopener noreferrer" className="hero-social-btn">
                    📸 Instagram
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        <div className="scroll-hint">
          <span>Scroll para continuar</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* SLIDE 2 — AGENDA */}
      <section
        className="slide slide-light"
        id="slide-2"
        ref={(el) => { slideRefs.current[1] = el; }}
      >
        <FadeUp><div className="slide-tag">02 · Agenda</div></FadeUp>
        <FadeUp delay={0.1}><h2 className="headline" style={{ color: 'var(--navy)', marginBottom: '1.8rem' }}>O que vamos ver hoje</h2></FadeUp>
        <FadeUp delay={0.2}>
          <div className="agenda-grid">
            {[
              { num: '01', label: 'O que é tokenização?', sub: 'Tokens digitais' },
              { num: '02', label: 'Como funciona na prática?', sub: 'Blockchain e registro imutável' },
              { num: '03', label: 'O que pode ser tokenizado?', sub: 'Imóveis, obras, empresas e mais' },
              { num: '04', label: 'Por que isso importa?', sub: 'Democratização e liquidez' },
              { num: '05', label: 'Riscos e cuidados', sub: 'O que você precisa saber' },
              { num: '06', label: 'O futuro próximo', sub: 'O que já está acontecendo no Brasil' },
            ].map((item, idx) => (
              <div key={idx} className="agenda-item">
                <div className="agenda-num">{item.num}</div>
                <div>
                  <div className="agenda-label">{item.label}</div>
                  <div className="agenda-sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* SLIDE 3 — DEFINIÇÃO */}
      <section
        className="slide slide-dark"
        id="slide-3"
        ref={(el) => { slideRefs.current[2] = el; }}
      >
        <div className="orb" style={{ width: 400, height: 400, background: 'var(--indigo)', right: -100, top: -80 }} />
        <FadeUp><div className="slide-tag">03 · Definição</div></FadeUp>
        <FadeUp delay={0.1}><h2 className="headline" style={{ marginBottom: '1.5rem' }}>O que é tokenização?</h2></FadeUp>
        <FadeUp delay={0.2}>
          <div className="def-box">
            Tokenização é o processo de transformar um ativo real — como um <strong>imóvel</strong>, uma <strong>obra de arte</strong> ou uma <strong>empresa</strong> — em tokens digitais registrados em uma blockchain.
          </div>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="cards cards-3">
            <div className="card">
              <span className="card-icon">📄</span>
              <div className="card-title">Representação</div>
              <div className="card-body">Um token representa a propriedade (total ou parcial) de algo real no mundo físico.</div>
            </div>
            <div className="card">
              <span className="card-icon">🔒</span>
              <div className="card-title">Registro Digital</div>
              <div className="card-body">Toda transação fica gravada permanentemente numa blockchain — impossível de apagar.</div>
            </div>
            <div className="card">
              <span className="card-icon">🔄</span>
              <div className="card-title">Transferência</div>
              <div className="card-body">Pode ser negociado globalmente, 24h por dia, sem precisar de intermediários.</div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* SLIDE 4 — BLOCKCHAIN */}
      <section
        className="slide slide-dark"
        id="slide-4"
        ref={(el) => { slideRefs.current[3] = el; }}
      >
        <div className="orb" style={{ width: 350, height: 350, background: 'var(--teal)', left: -100, bottom: -50, opacity: .12 }} />
        <FadeUp><div className="slide-tag">04 · Blockchain</div></FadeUp>
        <FadeUp delay={0.1}><h2 className="headline" style={{ marginBottom: '.6rem' }}>O livro que ninguém pode apagar</h2></FadeUp>
        <FadeUp delay={0.2}>
          <p className="subline" style={{ marginBottom: '1.6rem' }}>
            A blockchain é como um livro-razão público, onde cada página contém transações — e ninguém pode rasgar ou alterar uma página.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="chain-row">
            {[
              { title: 'Bloco 1', body: 'João compra<br>100 tokens<br>do imóvel X', hash: '#a3f8...' },
              { title: 'Bloco 2', body: 'Maria vende<br>50 tokens<br>para Carlos', hash: '#9c2b...' },
              { title: 'Bloco 3', body: 'Carlos recebe<br>dividendo de<br>R$ 12,50', hash: '#4e71...' },
              { title: 'Bloco 4', body: 'Pedro compra<br>200 tokens<br>do imóvel Y', hash: '#b1d5...' },
            ].map((block, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="chain-block">
                  <div className="chain-block-header">{block.title}</div>
                  <div className="chain-block-body">
                    <div dangerouslySetInnerHTML={{ __html: block.body }} />
                    <div><span className="hash-tag">{block.hash}</span></div>
                  </div>
                </div>
                {idx < arr.length - 1 && <div className="chain-arrow">→</div>}
              </React.Fragment>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.4}>
          <div style={{ marginTop: '1.5rem' }}>
            <div className="def-box" style={{ fontSize: '.95rem', margin: 0 }}>
              🔐 &nbsp; Cada bloco contém a <strong>"impressão digital" (hash)</strong> do bloco anterior — se alguém tentar alterar algo, toda a cadeia quebra e todos percebem imediatamente.
            </div>
          </div>
        </FadeUp>
      </section>

      {/* SLIDE 5 — O QUE PODE SER TOKENIZADO */}
      <section
        className="slide slide-light"
        id="slide-5"
        ref={(el) => { slideRefs.current[4] = el; }}
      >
        <FadeUp><div className="slide-tag">05 · Ativos</div></FadeUp>
        <FadeUp delay={0.1}><h2 className="headline" style={{ color: 'var(--navy)', marginBottom: '1.5rem' }}>O que pode ser tokenizado?</h2></FadeUp>
        <FadeUp delay={0.2}>
          <div className="cards cards-6">
            {[
              { icon: '🏠', cat: 'Imóveis', body: 'Apartamentos, shoppings, galpões logísticos', color: 'rgba(46,58,140,.1)', textColor: 'var(--indigo)' },
              { icon: '📈', cat: 'Recebíveis', body: 'Créditos a receber, duplicatas, contratos', color: 'rgba(22,163,74,.1)', textColor: 'var(--green)' },
              { icon: '🚗', cat: 'Bens Físicos', body: 'Veículos, máquinas, commodities', color: 'rgba(249,115,22,.1)', textColor: 'var(--orange)' },
              { icon: '🎨', cat: 'Arte', body: 'Obras de arte, vinhos, relógios raros', color: 'rgba(13,148,136,.1)', textColor: 'var(--teal)' },
              { icon: '🏭', cat: 'Empresas', body: 'Participações societárias, startups', color: 'rgba(124,58,237,.1)', textColor: '#7C3AED' },
              { icon: '📱', cat: 'Financeiro', body: 'Títulos públicos, fundos, ações', color: 'rgba(220,38,38,.1)', textColor: 'var(--red)' },
            ].map((item, idx) => (
              <div key={idx} className="card card-light">
                <span className="card-icon">{item.icon}</span>
                <div className="cat-badge" style={{ background: item.color, color: item.textColor }}>{item.cat}</div>
                <div className="card-body">{item.body}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* SLIDE 6 — POR QUE ISSO MUDA TUDO */}
      <section
        className="slide slide-dark"
        id="slide-6"
        ref={(el) => { slideRefs.current[5] = el; }}
      >
        <div className="orb" style={{ width: 400, height: 400, background: 'var(--gold)', right: -120, top: -100, opacity: .08 }} />
        <FadeUp><div className="slide-tag">06 · Impacto</div></FadeUp>
        <FadeUp delay={0.1}><h2 className="headline" style={{ marginBottom: '.8rem' }}>Por que isso muda tudo?</h2></FadeUp>
        <FadeUp delay={0.2}>
          <div style={{ background: 'var(--gold)', borderRadius: 10, padding: '.9rem 1.4rem', color: 'var(--navy)', fontWeight: 600, fontSize: 'clamp(.9rem, 2vw, 1.05rem)', marginBottom: '1.6rem' }}>
            💡 Antes: para investir em imóveis, você precisava de R$ 500.000. Hoje: com R$ 100 já é possível.
          </div>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="cards cards-4">
            <div className="card">
              <span className="card-icon">🪙</span>
              <div className="card-title gold">Fracionamento</div>
              <div className="card-body">Ativos caros são divididos em frações acessíveis a qualquer investidor.</div>
            </div>
            <div className="card">
              <span className="card-icon">🌍</span>
              <div className="card-title" style={{ color: 'var(--sky)' }}>Acesso Global</div>
              <div className="card-body">Qualquer pessoa no mundo pode comprar um token de um imóvel no Brasil.</div>
            </div>
            <div className="card">
              <span className="card-icon">⚡</span>
              <div className="card-title" style={{ color: '#2DD4BF' }}>Liquidez</div>
              <div className="card-body">Revender é simples — não precisa esperar um comprador para o imóvel inteiro.</div>
            </div>
            <div className="card">
              <span className="card-icon">🔍</span>
              <div className="card-title" style={{ color: '#86EFAC' }}>Transparência</div>
              <div className="card-body">Histórico completo registrado. Quem é dono de quê fica gravado na blockchain.</div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* SLIDE 7 — EXEMPLO PRÁTICO */}
      <section
        className="slide slide-light"
        id="slide-7"
        ref={(el) => { slideRefs.current[6] = el; }}
      >
        <FadeUp><div className="slide-tag">07 · Exemplo Real</div></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="headline" style={{ color: 'var(--navy)', marginBottom: '.4rem' }}>Exemplo: Imóvel Tokenizado</h2>
          <p className="subline" style={{ marginBottom: '1.5rem' }}>Edifício comercial em São Paulo — avaliado em R$ 10.000.000</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="steps">
            {[
              { num: 1, title: 'Emissor cria 10.000 tokens', desc: 'Cada token = R$ 1.000 = 0,01% do imóvel' },
              { num: 2, title: 'Investidores compram tokens', desc: 'João compra 5 tokens (R$ 5.000). Maria compra 20 tokens (R$ 20.000).' },
              { num: 3, title: 'O imóvel gera renda', desc: 'Aluguel mensal de R$ 60.000 → distribuído proporcionalmente a todos os token-holders automaticamente.' },
              { num: 4, title: 'Valorização + liquidez', desc: 'Se o imóvel valoriza 20%, os tokens também sobem. João pode vender quando quiser no mercado secundário.' },
            ].map((step, idx) => (
              <div key={idx} className="step">
                <div className="step-num">{step.num}</div>
                <div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* SLIDE 8 — RISCOS */}
      <section
        className="slide slide-dark"
        id="slide-8"
        ref={(el) => { slideRefs.current[7] = el; }}
      >
        <FadeUp><div className="slide-tag">08 · Riscos & Proteção</div></FadeUp>
        <FadeUp delay={0.1}><h2 className="headline" style={{ marginBottom: '1.5rem' }}>Riscos e cuidados essenciais</h2></FadeUp>
        <FadeUp delay={0.2}>
          <div className="risk-grid">
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--gold)', marginBottom: '.9rem' }}>⚠️ Riscos</p>
              <div className="check-list">
                {[
                  { icon: '🔴', title: 'Risco Regulatório', text: 'A regulação ainda está se desenvolvendo no Brasil. Regras podem mudar.' },
                  { icon: '🟠', title: 'Risco de Liquidez', text: 'Nem todo token tem mercado secundário ativo. Pode ser difícil vender.' },
                  { icon: '🟡', title: 'Risco Tecnológico', text: 'Bugs em contratos inteligentes podem resultar em perdas irreversíveis.' },
                  { icon: '🟣', title: 'Risco do Emissor', text: 'A empresa por trás do token precisa ser idônea e regulamentada.' },
                ].map((risk, idx) => (
                  <div key={idx} className="check-item">
                    <div className="ci-icon">{risk.icon}</div>
                    <div>
                      <div className="ci-title">{risk.title}</div>
                      <div className="ci-text">{risk.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#86EFAC', marginBottom: '.9rem' }}>✅ Como se Proteger</p>
              <div className="check-list">
                {[
                  'Verifique se o emissor é autorizado pela CVM (Comissão de Valores Mobiliários)',
                  'Leia o whitepaper e entenda o ativo subjacente antes de investir',
                  'Diversifique — nunca coloque tudo em um único token ou emissor',
                  'Desconfie de promessas de retorno garantido ou muito acima do mercado',
                ].map((check, idx) => (
                  <div key={idx} className="check-item" style={{ borderColor: 'rgba(22,163,74,.3)' }}>
                    <div className="ci-icon">✔️</div>
                    <div className="ci-text">{check}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* SLIDE 9 — BRASIL E REGULAÇÃO */}
      <section
        className="slide slide-light"
        id="slide-9"
        ref={(el) => { slideRefs.current[8] = el; }}
      >
        <FadeUp><div className="slide-tag">09 · Brasil</div></FadeUp>
        <FadeUp delay={0.1}><h2 className="headline" style={{ color: 'var(--navy)', marginBottom: '1.6rem' }}>O Brasil na vanguarda da tokenização</h2></FadeUp>
        <FadeUp delay={0.2}>
          <div className="timeline">
            {[
              { year: '2022', text: 'CVM publica sandbox regulatório — primeiros testes com tokens de valores mobiliários no Brasil.' },
              { year: '2023', text: 'Resolução CVM 175 regulamenta FIPs e fundos tokenizados. Mercado cresce exponencialmente.' },
              { year: '2024', text: <span>Banco Central lança o <strong style={{ color: 'var(--indigo)' }}>DREX</strong> (Real Digital) — infraestrutura nacional para tokenização de ativos.</span> },
              { year: '2025', text: <span>Brasil suspende o uso do <strong style={{ color: 'var(--red)' }}>DREX</strong> com a blockchain.</span> },
              { year: '2026+', text: <span>Projeções indicam mercado de <strong style={{ color: 'var(--indigo)' }}>R$ 2 trilhões</strong> em ativos tokenizados no Brasil até 2030.</span> },
            ].map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-text">{item.text}</div>
              </div>
            ))}
          </div>
        </FadeUp>
        {/* <FadeUp delay={0.3}>
          <div style={{ marginTop: '1.2rem' }}>
            <div style={{ background: 'var(--gold)', borderRadius: 10, padding: '.85rem 1.3rem', color: 'var(--navy)', fontWeight: 600, fontSize: '.93rem' }}>
              🏦 O DREX (Real Digital do Banco Central) é a base para que o Brasil se torne um hub global de tokenização de ativos.
            </div>
          </div>
        </FadeUp> */}
      </section>

      {/* SLIDE 10 — O FUTURO */}
      <section
        className="slide slide-dark"
        id="slide-10"
        ref={(el) => { slideRefs.current[9] = el; }}
      >
        <div className="orb" style={{ width: 450, height: 450, background: 'var(--gold)', left: -150, top: -100, opacity: .06 }} />
        <FadeUp><div className="slide-tag">10 · Futuro</div></FadeUp>
        <FadeUp delay={0.1}><h2 className="headline" style={{ marginBottom: '1.5rem' }}>O futuro que já está chegando</h2></FadeUp>
        <FadeUp delay={0.2}>
          <div className="future-grid">
            <div className="big-stat">
              <div className="big-stat-number">US$ 16</div>
              <div className="big-stat-label">trilhões</div>
              <div className="big-stat-sub">Estimativa do mercado global<br />de tokenização até 2030 (BCG/WEF)</div>
            </div>
            <div className="check-list">
              {[
                { icon: '💡', title: 'Comprar fração de uma obra de Picasso', text: 'Hoje exclusivo de multimilionários → tokenizado, acessível a todos.' },
                { icon: '💡', title: 'Receber dividendos automaticamente', text: 'Smart contracts enviam o aluguel direto à sua carteira digital, sem intermediários.' },
                { icon: '💡', title: 'Investir globalmente em 30 segundos', text: 'Token de um imóvel em Lisboa, Tokyo ou Nova York — com um celular.' },
                { icon: '💡', title: 'Liquidar em minutos, não meses', text: 'Ao contrário de imóveis tradicionais: venda instantânea no mercado secundário.' },
              ].map((item, idx) => (
                <div key={idx} className="check-item">
                  <div className="ci-icon">{item.icon}</div>
                  <div>
                    <div className="ci-title">{item.title}</div>
                    <div className="ci-text">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* SLIDE 11 — ENCERRAMENTO */}
      <section
        className="slide slide-dark"
        id="slide-11"
        ref={(el) => { slideRefs.current[10] = el; }}
      >
        <div className="left-border" />
        <div className="orb" style={{ width: 400, height: 400, background: 'var(--violet)', right: -80, top: -80 }} />
        <FadeUp><div className="slide-tag">11 · Resumo</div></FadeUp>
        <FadeUp delay={0.1}><h2 className="headline" style={{ marginBottom: '1.5rem' }}>Resumindo em <span style={{ color: 'var(--gold)' }}>3 pontos</span></h2></FadeUp>
        <FadeUp delay={0.2}>
          <div className="summary-list">
            {[
              { num: 1, text: 'Tokenização transforma ativos reais em frações digitais, tornando o investimento acessível a todos.' },
              { num: 2, text: 'A blockchain garante que o registro é seguro, permanente e transparente — ninguém pode fraudar.' },
              { num: 3, text: <span>O mercado está crescendo. <span className="gold">O futuro é agora.</span></span> },
            ].map((item, idx) => (
              <div key={idx} className="summary-item">
                <div className="summary-n">{item.num}</div>
                <div className="summary-text">{item.text}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* SLIDE 12 — CONTATOS FINAIS */}
      <section
        className="slide slide-dark"
        id="slide-12"
        ref={(el) => { slideRefs.current[11] = el; }}>
        <div className="left-border" />
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--violet)', right: -150, top: -150 }} />
        <div className="orb" style={{ width: 300, height: 300, background: 'var(--sky)', left: -50, bottom: -50 }} />

        <FadeUp>
          <div className="slide-tag">12 · Contato</div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="headline" style={{ marginBottom: '1rem' }}>Vamos construir o <span style={{ color: 'var(--gold)' }}>futuro</span> juntos?</h2>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="hero-cards-row">
            {/* Sonia Card */}
            <div className="hero-contact-card sonia-card">
              <div className="contact-section">
                <div className="contact-image-wrapper">
                  <img src="/images/sonia-profile.jpg" alt="Sonia Batista" className="contact-img" />
                </div>
                <div className="contact-info">
                  <span className="contact-label">Palestrante</span>
                  <h3 className="contact-name">Sonia Batista</h3>
                </div>
                <div className="qr-box">
                  <QRCodeSVG value="https://www.linkedin.com/in/soniamarabatista/" size={60} />
                  <span className="qr-text">LinkedIn</span>
                </div>
              </div>
            </div>

            {/* MNW3 Card */}
            <div className="hero-contact-card mnw3-card">
              <div className="contact-section">
                <div className="contact-image-wrapper">
                  <img src="/images/mnw3-logo.jpg" alt="Mulheres na Web3" className="mnw3-img" />
                </div>
                <div className="contact-info">
                  <span className="contact-label">Comunidade</span>
                  <h3 className="contact-name">Mulheres na Web3</h3>
                </div>
                <div className="qr-box">
                  <QRCodeSVG value="https://www.linkedin.com/company/mulheresnaweb3/" size={60} />
                  <span className="qr-text">LinkedIn</span>
                </div>
              </div>

              <div className="hero-social-links">
                <a href="https://www.mulheresnaweb3.com/" target="_blank" rel="noopener noreferrer" className="hero-social-btn">
                  🌐 Website
                </a>
                <a href="https://www.instagram.com/mulheresnaweb3" target="_blank" rel="noopener noreferrer" className="hero-social-btn">
                  📸 Instagram
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
