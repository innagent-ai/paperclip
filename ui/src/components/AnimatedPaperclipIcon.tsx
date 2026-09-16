// innagent: status derivados dos tokens da marca
import type { SVGProps } from "react";
import { cn } from "../lib/utils";

/**
 * Símbolo InnTeam no lugar do clipe animado do Paperclip. Mesmos nomes exportados
 * (AnimatedPaperclipIcon, PaperclipLoading) para os usos existentes. Fonte: /root/projects/innagent-site/public/marca/familia/innteam-A-simbolo.svg.
 */

/**
 * O símbolo no canto superior esquerdo — o padrão da família Inn (08/09/2026):
 * 1:1, com o nome ficando na aba e na tela de entrada. É o mesmo desenho do ícone de
 * carregamento, sem o pulso: marca não pisca.
 *
 * 📏 15/09/2026: 16×16, não mais 28 — martelo do Vini ("que todos tenham e sigam o
 * mesmo tamanho do chatwoot/innchat, pequeno e discreto"). A régua da família virou o
 * InnChat, medido na tela em 16×16; era o único nesse tamanho e passou a ser o padrão.
 */
export function Simbolo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 121 120" className={cn("h-4 w-4 shrink-0", className)} aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      
<path d="M46.8653 73.104L59.9873 108.547L35.1233 119.991L25.6268 94.3697L0.00524902 84.8461L11.4227 59.9821L46.8653 73.104Z" fill="#D2C5EF"/>
<path d="M46.8653 46.8602L11.4227 59.9821L0.00524902 35.1181L25.6268 25.6216L35.1233 0L59.9873 11.4174L46.8653 46.8602Z" fill="#D2C5EF"/>
<path d="M108.66 59.9821L120.105 84.8461L94.3747 94.3697L84.8784 119.991L59.9872 108.547L73.1363 73.104L108.66 59.9821Z" fill="#D2C5EF"/>
<path d="M73.1363 46.8602L59.9872 11.4174L84.8784 0L94.3747 25.6216L120.105 35.1181L108.66 59.9821L73.1363 46.8602Z" fill="#D2C5EF"/>

    </svg>
  );
}

export function AnimatedPaperclipIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 121 120" className={cn(className)} aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      
<path d="M46.8653 73.104L59.9873 108.547L35.1233 119.991L25.6268 94.3697L0.00524902 84.8461L11.4227 59.9821L46.8653 73.104Z" fill="#D2C5EF"/>
<path d="M46.8653 46.8602L11.4227 59.9821L0.00524902 35.1181L25.6268 25.6216L35.1233 0L59.9873 11.4174L46.8653 46.8602Z" fill="#D2C5EF"/>
<path d="M108.66 59.9821L120.105 84.8461L94.3747 94.3697L84.8784 119.991L59.9872 108.547L73.1363 73.104L108.66 59.9821Z" fill="#D2C5EF"/>
<path d="M73.1363 46.8602L59.9872 11.4174L84.8784 0L94.3747 25.6216L120.105 35.1181L108.66 59.9821L73.1363 46.8602Z" fill="#D2C5EF"/>

    </svg>
  );
}

/** Estado de carregamento de página inteira: símbolo pulsando, centralizado. */
export function PaperclipLoading({ className }: { className?: string }) {
  return (
    <div role="status" className={cn("flex min-h-dvh w-full items-center justify-center", className)}>
      <AnimatedPaperclipIcon className="inn-espera h-16 w-16" />
      <span className="sr-only">Carregando…</span>
    </div>
  );
}
