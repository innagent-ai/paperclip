// innagent: status derivados dos tokens da marca
import type { ReactNode } from "react";
import { PaperclipLockup } from "@/components/PaperclipLockup";

const COPY: Record<string, { frase: string; provas: string[] }> = {
  en: { frase: "The agent team that runs the hotel alongside you.", provas: ["Each agent has a role, a routine and a remit — like people on the team.", "No action goes out without your approval.", "One place to see what each agent did today."] },
  pt: { frase: "A equipe de agentes que opera o hotel junto com você.", provas: ["Cada agente tem cargo, rotina e responsabilidade — como gente do time.", "Nenhuma ação sai sem passar pela sua aprovação.", "Um só lugar para ver o que cada agente fez hoje."] },
  fr: { frase: "L'équipe d'agents qui fait tourner l'hôtel avec vous.", provas: ["Chaque agent a un poste, une routine et une responsabilité — comme un collègue.", "Aucune action ne part sans votre approbation.", "Un seul endroit pour voir ce que chaque agent a fait aujourd'hui."] }
};

/* O idioma sai do NAVEGADOR. `pt` cobre pt-BR e pt-PT, `fr` cobre fr-FR e fr-CA; o
   resto cai no ingles, que e o padrao do produto. A leitura e defensiva porque este
   modulo tambem e avaliado fora do navegador em teste. */
const _lang = (typeof navigator !== "undefined" ? navigator.language : "en")
  .toLowerCase()
  .slice(0, 2);
const { frase: FRASE, provas: PROVAS } = COPY[_lang] ?? COPY.en;

/**
 * A porta da família Inn — a casca da tela de entrada, igual em todo produto Inn.
 * Gerada por scripts/paperclip-svr/aplicar-tema-innagent.py; não editar à mão.
 *
 * Duas colunas: CAMPO (46% em ≥1024px, tinta #171A1F) diz o que é o produto;
 * FORMULÁRIO (o resto, branco) pede o e-mail, centrado nos dois eixos, sem cartão
 * — o fundo branco já é o cartão, e moldura dentro de moldura é moldura demais.
 *
 * As cores são literais, não tokens: a porta abre no CLARO qualquer que seja a
 * preferência salva, e `[color-scheme:light]` faz o navegador desenhar o
 * autopreenchimento e a barra de rolagem no claro junto.
 */
export function PortaDeEntrada({ children }: { children: ReactNode }) {
  return (
    <main className="fixed inset-0 flex flex-col overflow-y-auto bg-white text-[#292B2F] [color-scheme:light] lg:flex-row lg:overflow-hidden">
      <section className="flex shrink-0 flex-col justify-center bg-[#171A1F] px-12 py-6 text-white lg:h-full lg:w-[46%] lg:px-16 lg:py-0">
        <div className="mx-auto flex w-full max-w-[33.375rem] flex-col gap-8">
          {/* Um lockup, no topo do campo — nunca dentro do formulário, nunca dois.
              `self-start` não é enfeite: sem ele o `align-items: stretch` da coluna
              estica o <svg> até a largura toda e o `preserveAspectRatio` CENTRALIZA
              o lockup no meio do campo, longe da margem do título. */}
          <PaperclipLockup className="h-9 w-auto self-start" />
          <h1 className="text-[1.75rem] leading-[1.15] font-bold text-balance lg:text-[2.75rem] lg:leading-[1.1]">
            {FRASE}
          </h1>
          <ul className="flex flex-col gap-4">
            {PROVAS.map((prova) => (
              // Filete de lima, nunca bolinha e nunca azul: é a marcação de lista da família.
              <li key={prova} className="flex items-start gap-4 text-[0.9375rem] leading-6 text-[#CECED0]">
                <span aria-hidden="true" className="mt-[0.6em] h-[3px] w-4 shrink-0 rounded-full bg-[#DCED8F]" />
                {prova}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="flex flex-1 items-center justify-center overflow-y-auto bg-white px-6 py-12 lg:px-16 lg:py-0">
        <div className="w-full max-w-[28rem]">{children}</div>
      </section>
    </main>
  );
}
