import { useState, useRef } from "react";

const ORANGE = "#F27B20";
const ORANGE_DARK = "#E06A10";
const ORANGE_LIGHT = "#FFF5EC";
const ORANGE_GRADIENT = "linear-gradient(135deg, #F27B20 0%, #F5941E 100%)";
const DARK = "#1a1a1a";
const GRAY = "#6b7280";
const LIGHT_GRAY = "#f3f4f6";
const BORDER = "#e5e7eb";

const sections = [
  { id: 0, title: "Dados Pessoais", icon: "👤" },
  { id: 1, title: "Passaporte", icon: "📘" },
  { id: 2, title: "Contato & Endereço", icon: "📍" },
  { id: 3, title: "Família", icon: "👨‍👩‍👧‍👦" },
  { id: 4, title: "Detalhes da Viagem", icon: "✈️" },
  { id: 5, title: "Trabalho & Finanças", icon: "💼" },
  { id: 6, title: "Histórico de Viagens", icon: "🌍" },
  { id: 7, title: "Saúde & Caráter", icon: "🏥" },
  { id: 8, title: "Declaração & Assinatura", icon: "✍️" },
];

const estadoCivil = ["Solteiro(a)/Single", "Casado(a)/Married", "Divorciado(a)/Divorced", "Viúvo(a)/Widowed", "Separado(a)/Separated", "União Estável/De Facto", "Noivo(a)/Engaged"];
const generos = ["Masculino/Male", "Feminino/Female", "Outro/Other"];
const simNao = ["SIM/YES", "NÃO/NO"];
const escolaridade = ["Ensino Fundamental/Primary", "Ensino Médio/Secondary", "Ensino Superior/Tertiary", "Pós-Graduação/Post Graduate", "Outro/Other"];

function Label({ num, textPt, textEn, required }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <span style={{ fontWeight: 700, color: DARK, fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>
        {num && `${num}. `}{textPt}
        {required && <span style={{ color: "#e53e3e" }}> *</span>}
      </span>
      {textEn && (
        <span style={{ display: "block", fontSize: 12, color: GRAY, fontStyle: "italic", marginTop: 2, fontFamily: "'Outfit', sans-serif" }}>
          {textEn}
        </span>
      )}
    </div>
  );
}

function HintText({ text }) {
  return <p style={{ fontSize: 12, color: ORANGE_DARK, margin: "0 0 6px", fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>{text}</p>;
}

const baseInput = {
  width: "100%",
  padding: "10px 14px",
  border: `1.5px solid ${BORDER}`,
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "'Outfit', sans-serif",
  color: DARK,
  background: "#fff",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};
const focusInput = { borderColor: ORANGE, boxShadow: `0 0 0 3px rgba(242,123,32,0.12)` };

function Input({ placeholder, value, onChange, type = "text" }) {
  const [f, setF] = useState(false);
  return <input type={type} placeholder={placeholder} value={value || ""} onChange={onChange}
    onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ ...baseInput, ...(f ? focusInput : {}) }} />;
}

function Select({ options, placeholder, value, onChange }) {
  const [f, setF] = useState(false);
  return (
    <select value={value || ""} onChange={onChange} onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ ...baseInput, ...(f ? focusInput : {}), color: value ? DARK : "#9ca3af", appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36 }}>
      <option value="" disabled>{placeholder || "Selecione / Select"}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Textarea({ placeholder, value, onChange, rows = 3 }) {
  const [f, setF] = useState(false);
  return <textarea placeholder={placeholder} value={value || ""} onChange={onChange} rows={rows}
    onFocus={() => setF(true)} onBlur={() => setF(false)}
    style={{ ...baseInput, ...(f ? focusInput : {}), resize: "vertical", minHeight: 64 }} />;
}

function Radio({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 4 }}>
      {options.map(o => (
        <label key={o} onClick={() => onChange(o)} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 14, color: DARK, fontFamily: "'Outfit', sans-serif" }}>
          <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${value === o ? ORANGE : "#d1d5db"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}>
            {value === o && <span style={{ width: 9, height: 9, borderRadius: "50%", background: ORANGE }} />}
          </span>
          {o}
        </label>
      ))}
    </div>
  );
}

function Row2({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{children}</div>;
}
function Row3({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>{children}</div>;
}

function Q({ children, mb = 22 }) {
  return <div style={{ marginBottom: mb }}>{children}</div>;
}

function Divider({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0 20px" }}>
      <div style={{ height: 1, flex: 1, background: BORDER }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: ORANGE, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Outfit', sans-serif" }}>{text}</span>
      <div style={{ height: 1, flex: 1, background: BORDER }} />
    </div>
  );
}

function ConditionalField({ show, children }) {
  if (!show) return null;
  return <div style={{ marginTop: 8, padding: "12px 16px", background: ORANGE_LIGHT, borderRadius: 8, borderLeft: `3px solid ${ORANGE}` }}>{children}</div>;
}

function FileUpload({ label }) {
  const [file, setFile] = useState(null);
  return (
    <div style={{ marginBottom: 14 }}>
      <div onClick={() => file ? setFile(null) : setFile({ name: `doc_${Date.now().toString(36)}.pdf` })}
        style={{ border: file ? `2px solid ${ORANGE}` : `2px dashed #d1d5db`, borderRadius: 10, padding: "16px", textAlign: "center", cursor: "pointer", background: file ? ORANGE_LIGHT : "#fafafa", transition: "all 0.2s" }}>
        {file ? (
          <span style={{ fontSize: 13, color: ORANGE_DARK, fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>✓ {file.name} — Clique para remover</span>
        ) : (
          <span style={{ fontSize: 13, color: GRAY, fontFamily: "'Outfit', sans-serif" }}>↑ {label} (PDF, JPG, PNG — Máx. 10MB)</span>
        )}
      </div>
    </div>
  );
}

export default function KMPVisaForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [f, setF] = useState({});
  const topRef = useRef(null);

  const s = (key) => (e) => setF({ ...f, [key]: e?.target ? e.target.value : e });

  const goStep = (n) => { setStep(n); topRef.current?.scrollIntoView({ behavior: "smooth" }); };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: LIGHT_GRAY, fontFamily: "'Outfit', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <div style={{ background: "#fff", borderRadius: 20, padding: "56px 44px", textAlign: "center", maxWidth: 500, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}>
          <div style={{ width: 68, height: 68, borderRadius: 16, background: ORANGE_GRADIENT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16L14 22L24 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: DARK, margin: "0 0 10px" }}>Formulário Enviado!</h2>
          <p style={{ color: GRAY, fontSize: 15, lineHeight: 1.6 }}>Sua solicitação foi recebida com sucesso. A equipe da <strong style={{ color: ORANGE }}>KMP Consulting</strong> entrará em contato em até 48 horas úteis.</p>
          <button onClick={() => { setSubmitted(false); setStep(0); setF({}); }}
            style={{ marginTop: 24, padding: "12px 28px", background: "transparent", border: `1.5px solid ${ORANGE}`, borderRadius: 10, color: ORANGE, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
            Novo Formulário
          </button>
        </div>
      </div>
    );
  }

  const WEB3FORMS_KEY = "WEB3FORMS_KEY_AQUI"; // ← cole sua chave aqui

  const handleSubmit = async () => {
    setSending(true);
    setSendError(null);
    const nome = `${f.nome || ""} ${f.sobrenome || ""}`.trim() || "Solicitante";
    const linhas = [
      ["Nome completo", nome],
      ["Data de nascimento", f.dataNasc], ["Gênero", f.genero], ["Estado civil", f.estadoCivil],
      ["Nacionalidade", f.nacionalidade], ["País de nascimento", f.paisNasc],
      ["Outra nacionalidade", f.outraNacionalidade === "SIM/YES" ? f.outraNacionalidadeDetalhe : "Não"],
      ["Nº Passaporte", f.numPassaporte], ["País emissão passaporte", f.paisPassaporte],
      ["Validade passaporte", f.dataValidade], ["RG", f.rg], ["CPF", f.cpf],
      ["Endereço", f.endereco], ["Cidade", f.cidade], ["Estado", f.estado], ["CEP", f.cep],
      ["Celular", f.celular], ["E-mail do solicitante", f.email],
      ["Cônjuge", f.nomePartner], ["Cônjuge viaja junto", f.partnerViaja],
      ["Filhos", f.temFilhos === "SIM/YES" ? f.filhosDetalhe : "Não"],
      ["Familiar/amigo na Austrália", f.familiaAustralia === "SIM/YES" ? f.familiaAustraliaDetalhe : "Não"],
      ["Motivo da viagem", f.motivoViagem], ["Data de chegada", f.dataChegada],
      ["Tempo de permanência", f.tempoPermanencia], ["Endereço na Austrália", f.enderecoAustralia],
      ["Cidades a visitar", f.cidadesVisitar],
      ["Situação profissional", f.situacao], ["Empresa", f.empresa], ["Cargo", f.cargo],
      ["Quem custeia a viagem", f.quemPaga], ["Renda mensal", f.renda], ["Fundos disponíveis", f.fundos],
      ["Já visitou a Austrália", f.jaVisitouAustralia === "SIM/YES" ? f.jaVisitouAustraliaDetalhe : "Não"],
      ["Já solicitou visto", f.jaSolicitouVisto === "SIM/YES" ? f.jaSolicitouVistoDetalhe : "Não"],
      ["Países visitados (10 anos)", f.paisesVisitados],
      ["Vistos anteriores", f.vistosAnteriores],
      ["Condição de saúde", f.saude === "SIM/YES" ? f.saudeDetalhe : "Não"],
      ["Pretende trabalhar na Austrália", f.trabalharAustralia],
      ["Condenação criminal", f.crime === "SIM/YES" ? f.crimeDetalhe : "Não"],
      ["Acusação pendente", f.acusacao === "SIM/YES" ? f.acusacaoDetalhe : "Não"],
      ["Descumpriu condições de visto", f.descumpriu === "SIM/YES" ? f.descumpriuDetalhe : "Não"],
      ["Visto recusado/cancelado", f.recusado === "SIM/YES" ? f.recusadoDetalhe : "Não"],
      ["Assinatura digital", f.assinatura], ["Data da assinatura", f.dataAssinatura],
    ].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");

    const corpo = `Nova solicitação de visto de turista — KMP Consulting\nData: ${new Date().toLocaleString("pt-BR")}\n\n${"─".repeat(50)}\n\n${linhas}`;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nova Solicitação de Visto — ${nome}`,
          from_name: "Formulário KMP Consulting",
          message: corpo,
          replyto: f.email || "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.message || "Erro desconhecido");
      }
    } catch (e) {
      setSendError("Não foi possível enviar. Verifique sua chave Web3Forms e tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: return (<>
        <Q><Label num={1} textPt="Nome completo (conforme passaporte)" textEn="Full name (as shown in passport)" required /><Row2><Input placeholder="Nome / Given names" value={f.nome} onChange={s("nome")} /><Input placeholder="Sobrenome / Family name" value={f.sobrenome} onChange={s("sobrenome")} /></Row2></Q>
        <Q><Label num={2} textPt="Outros nomes já utilizados" textEn="Have you been known by any other names? If yes, provide details" /><Input placeholder="Ex: nome de solteiro(a), apelido legal / maiden name, alias" value={f.outrosNomes} onChange={s("outrosNomes")} /></Q>
        <Q><Label num={3} textPt="Gênero" textEn="Sex" required /><Radio options={generos} value={f.genero} onChange={s("genero")} /></Q>
        <Q><Label num={4} textPt="Data de nascimento" textEn="Date of birth" required /><Input type="date" value={f.dataNasc} onChange={s("dataNasc")} /></Q>
        <Row2>
          <Q><Label num={5} textPt="Cidade de nascimento" textEn="Town/city of birth" required /><Input placeholder="Ex: São Paulo" value={f.cidadeNasc} onChange={s("cidadeNasc")} /></Q>
          <Q><Label num={6} textPt="País de nascimento" textEn="Country of birth" required /><Input placeholder="Ex: Brasil" value={f.paisNasc} onChange={s("paisNasc")} /></Q>
        </Row2>
        <Q><Label num={7} textPt="Estado civil" textEn="Relationship status" required /><Select options={estadoCivil} value={f.estadoCivil} onChange={s("estadoCivil")} /></Q>
        <Q><Label num={8} textPt="Nacionalidade atual" textEn="Current nationality/citizenship" required /><Input placeholder="Ex: Brasileira / Brazilian" value={f.nacionalidade} onChange={s("nacionalidade")} /></Q>
        <Q><Label num={9} textPt="Você possui outra nacionalidade ou cidadania?" textEn="Do you hold, or have you ever held, any other citizenship?" required />
          <Radio options={simNao} value={f.outraNacionalidade} onChange={s("outraNacionalidade")} />
          <ConditionalField show={f.outraNacionalidade === "SIM/YES"}>
            <Input placeholder="Qual? / Which nationality?" value={f.outraNacionalidadeDetalhe} onChange={s("outraNacionalidadeDetalhe")} />
          </ConditionalField>
        </Q>
        <Q><Label num={10} textPt="Nível de escolaridade" textEn="Highest qualification/education" /><Select options={escolaridade} value={f.escolaridade} onChange={s("escolaridade")} /></Q>
      </>);

      case 1: return (<>
        <Q><Label num={11} textPt="Número do passaporte" textEn="Passport number" required /><Input placeholder="Ex: FX123456" value={f.numPassaporte} onChange={s("numPassaporte")} /></Q>
        <Q><Label num={12} textPt="País de emissão do passaporte" textEn="Country of issue" required /><Input placeholder="Ex: Brasil / Brazil" value={f.paisPassaporte} onChange={s("paisPassaporte")} /></Q>
        <Q><Label num={13} textPt="Nacionalidade conforme consta no passaporte" textEn="Nationality as shown in passport" required /><Input placeholder="Ex: BRASILEIRA / BRAZILIAN" value={f.nacionalidadePassaporte} onChange={s("nacionalidadePassaporte")} /></Q>
        <Row3>
          <Q><Label num={14} textPt="Data de emissão" textEn="Date of issue" required /><Input type="date" value={f.dataEmissao} onChange={s("dataEmissao")} /></Q>
          <Q><Label num={15} textPt="Data de validade" textEn="Date of expiry" required /><Input type="date" value={f.dataValidade} onChange={s("dataValidade")} /></Q>
          <Q><Label num={16} textPt="Local de emissão" textEn="Place of issue" required /><Input placeholder="Ex: São Paulo" value={f.localEmissao} onChange={s("localEmissao")} /></Q>
        </Row3>
        <Q><Label num={17} textPt="Você possui ou já possuiu outro passaporte?" textEn="Do you hold, or have you held, any other passport?" required />
          <Radio options={simNao} value={f.outroPassaporte} onChange={s("outroPassaporte")} />
          <ConditionalField show={f.outroPassaporte === "SIM/YES"}>
            <Input placeholder="Detalhes: país, número, validade / Details: country, number, expiry" value={f.outroPassaporteDetalhe} onChange={s("outroPassaporteDetalhe")} />
          </ConditionalField>
        </Q>
        <Q><Label num={18} textPt="Você possui um documento nacional de identidade (RG/CPF)?" textEn="Do you have a national identity card?" required />
          <Row2>
            <Input placeholder="RG / Identity number" value={f.rg} onChange={s("rg")} />
            <Input placeholder="CPF / Tax number" value={f.cpf} onChange={s("cpf")} />
          </Row2>
        </Q>
      </>);

      case 2: return (<>
        <Divider text="Endereço Residencial / Home Address" />
        <Q><Label num={19} textPt="Endereço residencial completo" textEn="Home address (NOT a PO Box)" required /><Input placeholder="Rua, número, complemento / Street, number" value={f.endereco} onChange={s("endereco")} /></Q>
        <Row3>
          <Q><Label num={20} textPt="Cidade" textEn="City/Town" required /><Input placeholder="Cidade" value={f.cidade} onChange={s("cidade")} /></Q>
          <Q><Label num={21} textPt="Estado" textEn="State/Province" required /><Input placeholder="Ex: SP" value={f.estado} onChange={s("estado")} /></Q>
          <Q><Label num={22} textPt="CEP" textEn="Postal code" required /><Input placeholder="00000-000" value={f.cep} onChange={s("cep")} /></Q>
        </Row3>
        <Q><Label num={23} textPt="País" textEn="Country" required /><Input value={f.paisResidencia || "Brasil"} onChange={s("paisResidencia")} /></Q>
        <Divider text="Contato / Contact Details" />
        <Row2>
          <Q><Label num={24} textPt="Telefone residencial" textEn="Home phone" /><Input placeholder="(00) 0000-0000" value={f.telRes} onChange={s("telRes")} /></Q>
          <Q><Label num={25} textPt="Telefone comercial" textEn="Business phone" /><Input placeholder="(00) 0000-0000" value={f.telCom} onChange={s("telCom")} /></Q>
        </Row2>
        <Row2>
          <Q><Label num={26} textPt="Celular" textEn="Mobile/cell phone" required /><Input placeholder="(00) 00000-0000" value={f.celular} onChange={s("celular")} /></Q>
          <Q><Label num={27} textPt="E-mail" textEn="Email address" required /><Input type="email" placeholder="seuemail@exemplo.com" value={f.email} onChange={s("email")} /></Q>
        </Row2>
        <Q><Label num={28} textPt="Endereço para correspondência (se diferente do residencial)" textEn="Postal address (if different from home)" /><Input placeholder="Deixe em branco se for o mesmo / Leave blank if same" value={f.endCorresp} onChange={s("endCorresp")} /></Q>
      </>);

      case 3: return (<>
        <Divider text="Cônjuge/Parceiro(a) / Partner Details" />
        <Q><Label num={29} textPt="Dados do cônjuge/parceiro(a), se houver" textEn="Details of your partner (spouse/de facto), if applicable" />
          <HintText text="Preencha mesmo se não estiver viajando junto / Complete even if not travelling together" />
          <Row2>
            <Input placeholder="Nome completo / Full name" value={f.nomePartner} onChange={s("nomePartner")} />
            <Input type="date" value={f.nascPartner} onChange={s("nascPartner")} />
          </Row2>
        </Q>
        <Row2>
          <Q><Label num={30} textPt="Nacionalidade do cônjuge" textEn="Partner's citizenship" /><Input placeholder="Ex: Brasileira" value={f.nacPartner} onChange={s("nacPartner")} /></Q>
          <Q><Label num={31} textPt="Nº do passaporte do cônjuge" textEn="Partner's passport number" /><Input placeholder="Ex: FX654321" value={f.passaportePartner} onChange={s("passaportePartner")} /></Q>
        </Row2>
        <Q><Label num={32} textPt="Seu cônjuge/parceiro(a) irá acompanhá-lo(a) na viagem?" textEn="Will your partner travel with you?" /><Radio options={simNao} value={f.partnerViaja} onChange={s("partnerViaja")} /></Q>
        <Divider text="Filhos / Children" />
        <Q><Label num={33} textPt="Você tem filhos? Se sim, liste os nomes, datas de nascimento e se irão viajar com você." textEn="Do you have any children? If yes, list names, dates of birth and whether they will travel with you." />
          <Radio options={simNao} value={f.temFilhos} onChange={s("temFilhos")} />
          <ConditionalField show={f.temFilhos === "SIM/YES"}>
            <Textarea placeholder="Nome, data de nasc., viaja junto? / Name, DOB, travelling?" value={f.filhosDetalhe} onChange={s("filhosDetalhe")} rows={4} />
          </ConditionalField>
        </Q>
        <Divider text="Outros Familiares / Other Family" />
        <Q><Label num={34} textPt="Nome da mãe" textEn="Mother's full name" /><Input value={f.nomeMae} onChange={s("nomeMae")} /></Q>
        <Q><Label num={35} textPt="Nome do pai" textEn="Father's full name" /><Input value={f.nomePai} onChange={s("nomePai")} /></Q>
        <Q><Label num={36} textPt="Você tem algum familiar ou amigo na Austrália?" textEn="Do you have any relatives or friends in Australia?" />
          <Radio options={simNao} value={f.familiaAustralia} onChange={s("familiaAustralia")} />
          <ConditionalField show={f.familiaAustralia === "SIM/YES"}>
            <Textarea placeholder="Nome, relação, endereço na Austrália / Name, relationship, address in Australia" value={f.familiaAustraliaDetalhe} onChange={s("familiaAustraliaDetalhe")} />
          </ConditionalField>
        </Q>
      </>);

      case 4: return (<>
        <Q><Label num={37} textPt="Motivo da viagem à Austrália" textEn="Purpose of visit to Australia" required />
          <Select options={["Turismo/Tourism", "Visitar família/amigos / Visit family/friends", "Negócios/Business", "Estudo de curta duração (até 12 semanas)/Short course (up to 12 weeks)", "Tratamento médico/Medical treatment", "Outro/Other"]} value={f.motivoViagem} onChange={s("motivoViagem")} />
        </Q>
        <Q><Label num={38} textPt="Data prevista de chegada na Austrália" textEn="Expected date of arrival in Australia" required /><Input type="date" value={f.dataChegada} onChange={s("dataChegada")} /></Q>
        <Q><Label num={39} textPt="Tempo de permanência pretendido" textEn="Expected length of stay" required />
          <Select options={["Até 2 semanas/Up to 2 weeks", "2 a 4 semanas/2 to 4 weeks", "1 a 3 meses/1 to 3 months", "3 a 6 meses/3 to 6 months", "6 a 12 meses/6 to 12 months"]} value={f.tempoPermanencia} onChange={s("tempoPermanencia")} />
        </Q>
        <Q><Label num={40} textPt="Endereço na Austrália onde pretende ficar" textEn="Address in Australia where you intend to stay" required /><Input placeholder="Hotel, casa de amigo/familiar / Hotel, friend's house, etc." value={f.enderecoAustralia} onChange={s("enderecoAustralia")} /></Q>
        <Q><Label num={41} textPt="Cidades ou regiões que pretende visitar" textEn="Cities or regions you plan to visit" /><Input placeholder="Ex: Sydney, Melbourne, Gold Coast" value={f.cidadesVisitar} onChange={s("cidadesVisitar")} /></Q>
        <Q><Label num={42} textPt="Você tem passagem aérea comprada?" textEn="Have you purchased airline tickets?" /><Radio options={simNao} value={f.passagemComprada} onChange={s("passagemComprada")} /></Q>
        <Q><Label num={43} textPt="Alguém está te acompanhando nesta viagem?" textEn="Is anyone travelling with you?" />
          <Radio options={simNao} value={f.acompanhante} onChange={s("acompanhante")} />
          <ConditionalField show={f.acompanhante === "SIM/YES"}>
            <Input placeholder="Nome(s) e relação / Name(s) and relationship" value={f.acompanhanteDetalhe} onChange={s("acompanhanteDetalhe")} />
          </ConditionalField>
        </Q>
      </>);

      case 5: return (<>
        <Divider text="Situação Profissional / Employment" />
        <Q><Label num={44} textPt="Situação profissional atual" textEn="Current employment status" required />
          <Select options={["Empregado(a)/Employed", "Autônomo(a)/Self-employed", "Empresário(a)/Business owner", "Aposentado(a)/Retired", "Estudante/Student", "Do lar/Homemaker", "Desempregado(a)/Unemployed"]} value={f.situacao} onChange={s("situacao")} />
        </Q>
        <Row2>
          <Q><Label num={45} textPt="Nome da empresa / instituição" textEn="Employer/company name" /><Input value={f.empresa} onChange={s("empresa")} /></Q>
          <Q><Label num={46} textPt="Cargo / função" textEn="Job title/position" /><Input value={f.cargo} onChange={s("cargo")} /></Q>
        </Row2>
        <Q><Label num={47} textPt="Endereço da empresa" textEn="Employer's address" /><Input value={f.endEmpresa} onChange={s("endEmpresa")} /></Q>
        <Q><Label num={48} textPt="Telefone da empresa" textEn="Employer's phone" /><Input placeholder="(00) 0000-0000" value={f.telEmpresa} onChange={s("telEmpresa")} /></Q>
        <Divider text="Informações Financeiras / Financial Details" />
        <Q><Label num={49} textPt="Quem custeará sua viagem?" textEn="Who will pay for your visit to Australia?" required />
          <Select options={["Eu mesmo(a)/Self", "Cônjuge/parceiro(a)/Spouse/Partner", "Pais/Parents", "Empresa/Employer", "Patrocinador na Austrália/Sponsor in Australia", "Outro/Other"]} value={f.quemPaga} onChange={s("quemPaga")} />
        </Q>
        <Q><Label num={50} textPt="Renda mensal aproximada (R$)" textEn="Approximate monthly income (BRL)" required />
          <Select options={["Até R$ 3.000", "R$ 3.001 a R$ 6.000", "R$ 6.001 a R$ 10.000", "R$ 10.001 a R$ 20.000", "Acima de R$ 20.000"]} value={f.renda} onChange={s("renda")} />
        </Q>
        <Q><Label num={51} textPt="Valor estimado em fundos disponíveis para a viagem" textEn="Estimated funds available for the trip" /><Input placeholder="Ex: R$ 25.000 / AUD 7,000" value={f.fundos} onChange={s("fundos")} /></Q>
      </>);

      case 6: return (<>
        <Q><Label num={52} textPt="Você já visitou a Austrália antes?" textEn="Have you previously visited Australia?" required />
          <Radio options={simNao} value={f.jaVisitouAustralia} onChange={s("jaVisitouAustralia")} />
          <ConditionalField show={f.jaVisitouAustralia === "SIM/YES"}>
            <Textarea placeholder="Datas, duração, tipo de visto / Dates, length of stay, visa type" value={f.jaVisitouAustraliaDetalhe} onChange={s("jaVisitouAustraliaDetalhe")} />
          </ConditionalField>
        </Q>
        <Q><Label num={53} textPt="Você já solicitou visto para a Austrália antes?" textEn="Have you previously applied for a visa to Australia?" required />
          <Radio options={simNao} value={f.jaSolicitouVisto} onChange={s("jaSolicitouVisto")} />
          <ConditionalField show={f.jaSolicitouVisto === "SIM/YES"}>
            <Textarea placeholder="Tipo de visto, data, resultado / Visa type, date, outcome" value={f.jaSolicitouVistoDetalhe} onChange={s("jaSolicitouVistoDetalhe")} />
          </ConditionalField>
        </Q>
        <Q><Label num={54} textPt="Você já solicitou visto de residência permanente na Austrália nos últimos 5 anos?" textEn="Have you applied for permanent residence in Australia in the last 5 years?" />
          <Radio options={simNao} value={f.residenciaPerm} onChange={s("residenciaPerm")} />
          <ConditionalField show={f.residenciaPerm === "SIM/YES"}>
            <Input placeholder="Detalhes / Details" value={f.residenciaPermDetalhe} onChange={s("residenciaPermDetalhe")} />
          </ConditionalField>
        </Q>
        <Q><Label num={55} textPt="Quais países você já visitou nos últimos 10 anos?" textEn="Which countries have you visited in the last 10 years?" /><Textarea placeholder="Liste os países e datas aproximadas / List countries and approximate dates" value={f.paisesVisitados} onChange={s("paisesVisitados")} rows={4} /></Q>
        <Q><Label num={56} textPt="Você (ou qualquer pessoa incluída nesta aplicação) possui ou já possuiu visto para a Austrália ou qualquer outro país?" textEn="Have you, or any person included in this application, held or currently hold a visa to Australia or any other country? If yes, please describe." required />
          <HintText text="Em quais países você (e seu partner, se houver) já teve ou tem visto?" />
          <Textarea placeholder="Descreva / Describe" value={f.vistosAnteriores} onChange={s("vistosAnteriores")} rows={4} />
        </Q>
      </>);

      case 7: return (<>
        <Divider text="Declaração de Saúde / Health Declaration" />
        <Q><Label num={57} textPt="Você (ou qualquer pessoa incluída nesta aplicação) tem alguma condição de saúde que possa requerer tratamento ou acompanhamento médico durante a estadia na Austrália?" textEn="Do you, or any person included in this application, have any health concerns that may require treatment or follow-up during the stay?" required />
          <Radio options={simNao} value={f.saude} onChange={s("saude")} />
          <ConditionalField show={f.saude === "SIM/YES"}>
            <Textarea placeholder="Descreva / Describe" value={f.saudeDetalhe} onChange={s("saudeDetalhe")} />
          </ConditionalField>
        </Q>
        <Q><Label num={58} textPt="Você pretende trabalhar ou prestar serviços profissionais na Austrália durante sua estadia?" textEn="Do you intend to work or provide professional services in Australia during your stay?" required /><Radio options={simNao} value={f.trabalharAustralia} onChange={s("trabalharAustralia")} /></Q>
        <Divider text="Declaração de Caráter / Character Declaration" />
        <Q><Label num={59} textPt="Você (ou qualquer pessoa incluída nesta aplicação) já foi condenado(a) por algum crime em qualquer país?" textEn="Have you, or any person included in this application, ever been convicted of a crime in any country?" required />
          <Radio options={simNao} value={f.crime} onChange={s("crime")} />
          <ConditionalField show={f.crime === "SIM/YES"}>
            <Textarea placeholder="Descreva: crime, país, data, pena / Describe: offence, country, date, sentence" value={f.crimeDetalhe} onChange={s("crimeDetalhe")} />
          </ConditionalField>
        </Q>
        <Q><Label num={60} textPt="Você (ou qualquer pessoa incluída nesta aplicação) já foi acusado(a) de algum crime que ainda esteja pendente?" textEn="Have you, or any person included in this application, been charged with any offence that is currently awaiting legal action?" required />
          <Radio options={simNao} value={f.acusacao} onChange={s("acusacao")} />
          <ConditionalField show={f.acusacao === "SIM/YES"}>
            <Textarea placeholder="Descreva / Describe" value={f.acusacaoDetalhe} onChange={s("acusacaoDetalhe")} />
          </ConditionalField>
        </Q>
        <Q><Label num={61} textPt="Você ou qualquer pessoa incluída nesta aplicação, já esteve na Austrália ou em qualquer outro país e não cumpriu as condições do visto ou saiu do país após o período autorizado de permanência?" textEn="Has the applicant, or any person included in this application, ever been in Australia or any other country and not complied with visa conditions or departed outside their authorised period of stay?" required />
          <HintText text="Você (ou seu partner, se houver), já descumpriram as condições de algum visto na Austrália ou em outro país?" />
          <Radio options={simNao} value={f.descumpriu} onChange={s("descumpriu")} />
          <ConditionalField show={f.descumpriu === "SIM/YES"}>
            <Textarea placeholder="Descreva / Describe" value={f.descumpriuDetalhe} onChange={s("descumpriuDetalhe")} />
          </ConditionalField>
        </Q>
        <Q><Label num={62} textPt="Você ou qualquer pessoa incluída nesta aplicação, já teve um pedido de entrada ou permanência na Austrália ou em qualquer outro país recusado, ou teve o visto cancelado? Se sim, descreva." textEn="Has the applicant, or any person included in this application, ever had an application for entry or further stay in Australia or any other country refused, or had a visa cancelled? If yes, please describe." required />
          <Radio options={simNao} value={f.recusado} onChange={s("recusado")} />
          <ConditionalField show={f.recusado === "SIM/YES"}>
            <Textarea placeholder="Descreva / Describe" value={f.recusadoDetalhe} onChange={s("recusadoDetalhe")} />
          </ConditionalField>
        </Q>
      </>);

      case 8: return (<>
        <div style={{ padding: "20px 24px", background: ORANGE_LIGHT, borderRadius: 12, marginBottom: 24, borderLeft: `4px solid ${ORANGE}` }}>
          <p style={{ fontSize: 14, color: DARK, lineHeight: 1.7, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
            <strong>Declaração / Declaration:</strong> Eu declaro que as informações fornecidas neste formulário são verdadeiras e corretas. Entendo que a prestação de informações falsas ou incompletas pode resultar na recusa do meu pedido de visto.
          </p>
          <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.6, margin: "10px 0 0", fontStyle: "italic", fontFamily: "'Outfit', sans-serif" }}>
            I declare that the information provided in this form is true and correct. I understand that providing false or incomplete information may result in the refusal of my visa application.
          </p>
        </div>
        <Divider text="Upload de Documentos / Document Upload" />
        <FileUpload label="Cópia do passaporte (página de dados) / Passport bio page" />
        <FileUpload label="Foto 3x4 ou 5x7 (fundo branco) / Passport photo (white background)" />
        <FileUpload label="Comprovante de renda / Proof of income" />
        <FileUpload label="Extrato bancário (últimos 3 meses) / Bank statement (last 3 months)" />
        <FileUpload label="Comprovante de vínculo (trabalho/estudo) / Proof of ties (work/study)" />
        <FileUpload label="Itinerário de viagem, se houver / Travel itinerary, if applicable" />
        <Divider text="Assinatura / Signature" />
        <Q><Label textPt="Assinatura" textEn="Signature" required />
          <HintText text="Digite seu nome completo como assinatura digital / Type your full name as digital signature" />
          <Input placeholder="Nome completo / Full name" value={f.assinatura} onChange={s("assinatura")} />
        </Q>
        <Q><Label textPt="Data" textEn="Date" required /><Input type="date" value={f.dataAssinatura} onChange={s("dataAssinatura")} /></Q>
      </>);

      default: return null;
    }
  };

  const progress = ((step + 1) / sections.length) * 100;

  return (
    <div ref={topRef} style={{ minHeight: "100vh", background: "#f8f8f8", fontFamily: "'Outfit', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: `3px solid ${ORANGE}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: ORANGE_GRADIENT, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>kmp</span>
        </div>
        <div>
          <span style={{ fontWeight: 700, fontSize: 18, color: DARK, letterSpacing: "-0.01em" }}>
            kmp<span style={{ fontWeight: 300 }}> consulting</span>
          </span>
          <span style={{ display: "block", fontSize: 10, color: ORANGE, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Estratégia que conecta. Futuro que transforma.
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 40px" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: DARK, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
            Formulário de Visto de Turista
          </h1>
          <p style={{ fontSize: 14, color: GRAY, margin: 0 }}>Tourist Visa Application Form — Australia (Subclass 600)</p>
        </div>

        {/* Step nav — numbered circles */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
          {sections.map((sec, i) => (
            <div key={sec.id} style={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => goStep(i)} title={sec.title}
                style={{
                  width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer",
                  fontWeight: 700, fontSize: 15, fontFamily: "'Outfit', sans-serif",
                  background: i === step ? ORANGE_GRADIENT : i < step ? ORANGE_LIGHT : "#e5e7eb",
                  color: i === step ? "#fff" : i < step ? ORANGE : "#9ca3af",
                  boxShadow: i === step ? `0 2px 10px rgba(242,123,32,0.35)` : "none",
                  transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                {i < step ? "✓" : i + 1}
              </button>
              {i < sections.length - 1 && (
                <div style={{ width: 28, height: 2, background: i < step ? ORANGE : "#e5e7eb", transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: GRAY, margin: "0 0 20px", fontFamily: "'Outfit', sans-serif" }}>
          {sections[step].icon} Etapa {step + 1} de {sections.length} — <strong style={{ color: DARK }}>{sections[step].title}</strong>
        </p>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "32px 28px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 28 }}>{sections[step].icon}</span>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: DARK, margin: 0 }}>{sections[step].title}</h2>
          </div>
          <p style={{ fontSize: 13, color: GRAY, margin: "0 0 24px" }}>Etapa {step + 1} de {sections.length}</p>

          {renderStep()}

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, paddingTop: 20, borderTop: `1px solid ${BORDER}` }}>
            {step > 0 ? (
              <button onClick={() => goStep(step - 1)}
                style={{ padding: "10px 22px", background: "transparent", border: `1.5px solid ${BORDER}`, borderRadius: 10, color: GRAY, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                ← Anterior
              </button>
            ) : <div />}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              {sendError && <p style={{ fontSize: 13, color: "#e53e3e", margin: 0, fontFamily: "'Outfit', sans-serif" }}>⚠️ {sendError}</p>}
              <button
                disabled={sending}
                onClick={() => { if (step < sections.length - 1) goStep(step + 1); else handleSubmit(); }}
                style={{ padding: "10px 26px", background: sending ? "#f5941e99" : ORANGE_GRADIENT, border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, cursor: sending ? "not-allowed" : "pointer", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: 6, boxShadow: `0 4px 14px rgba(242,123,32,0.3)`, transition: "all 0.2s" }}>
                {step === sections.length - 1 ? (sending ? "Enviando…" : "Enviar Formulário ✓") : "Próximo →"}
              </button>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "#aaa", marginTop: 18 }}>
          © {new Date().getFullYear()} KMP Consulting — Estratégia que conecta. Futuro que transforma.
        </p>
      </div>
    </div>
  );
}
