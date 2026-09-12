import { PaperclipLockup } from "@/components/PaperclipLockup";
import type { ReactNode } from "react";
import { Loader2, ShieldCheck, Terminal, TriangleAlert } from "lucide-react";
import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { BOOTSTRAP_FALLBACK_COMMAND } from "@/bootstrapSetup";
import type { AuthSession } from "@paperclipai/shared";
import { Card } from "@/components/ui/card";

type BootstrapPendingPageProps = {
  claimAvailable: boolean;
  hasActiveInvite?: boolean;
  session: AuthSession | null | undefined;
  claimState: "idle" | "claiming" | "success";
  claimError?: { status?: number; message?: string } | null;
  onClaim: () => void;
};

function CliFallback({ hasActiveInvite = false }: { hasActiveInvite?: boolean }) {
  return (
    <div className="mt-6 border-t border-border pt-5">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Terminal className="size-4 text-muted-foreground" aria-hidden />
        <span>Prefere concluir pelo servidor?</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {hasActiveInvite
          ? "A bootstrap invite is already active. Check your InnTeam startup logs for the first-admin URL, or run this command on the host to rotate it:"
          : "Rode este comando no servidor do InnTeam para gerar a URL de convite do primeiro administrador:"}
      </p>
      <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-muted/30 p-3 font-mono text-xs">
{BOOTSTRAP_FALLBACK_COMMAND}
      </pre>
    </div>
  );
}

function StateChrome({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-xl py-10">
      <Card className="block p-6">{children}</Card>
    </div>
  );
}

function displayIdentity(session: AuthSession) {
  return session.user.email || session.user.name || session.user.id;
}

function claimErrorCopy(error: BootstrapPendingPageProps["claimError"]) {
  if (error?.status === 409) {
    return {
      title: "Someone else has already claimed this instance.",
      body: "Refresh to sign in, or ask the existing admin to invite you from Settings -> Access.",
    };
  }
  if (error?.status === 401) {
    return {
      title: "Your session expired. Sign in again to claim this instance.",
      body: "",
    };
  }
  return {
    title: "We couldn't reach the server. Try again in a moment.",
    body: "",
  };
}

export function BootstrapPendingPage({
  claimAvailable,
  hasActiveInvite = false,
  session,
  claimState,
  claimError,
  onClaim,
}: BootstrapPendingPageProps) {
  if (!claimAvailable) {
    return (
      <StateChrome>
        <PaperclipLockup className="mb-6 h-6 w-auto" />
        <h1 className="text-xl font-semibold">Este InnTeam espera o primeiro administrador</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This instance runs in invite-only mode. The operator must generate a one-time first-admin invite URL
          from the host. Once you have the link, open it from this browser to finish setup.
        </p>
        <CliFallback hasActiveInvite={hasActiveInvite} />
        <p className="mt-4 text-xs text-muted-foreground">
          Browser-based claim is intentionally disabled in public mode so anyone on the network can't promote
          themselves.
        </p>
      </StateChrome>
    );
  }

  if (claimState === "success") {
    return (
      <StateChrome>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="size-5" aria-hidden />
          </div>
          <div>
            <PaperclipLockup className="mb-6 h-6 w-auto" />
            <h1 className="text-xl font-semibold">Você é o administrador desta instância</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Setup is complete. Taking you to onboarding to create your first organization...
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden />
          <span className="text-sm text-muted-foreground">Redirecting...</span>
        </div>
        <div className="mt-5">
          <Button asChild variant="outline">
            <a href="/">Continue to dashboard</a>
          </Button>
        </div>
      </StateChrome>
    );
  }

  if (!session) {
    return (
      <StateChrome>
        <PaperclipLockup className="mb-6 h-6 w-auto" />
        <h1 className="text-xl font-semibold">Vamos configurar o InnTeam</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ninguém assumiu esta instância ainda. Entre ou crie sua conta InnTeam para ser o primeiro
          admin from this browser.
        </p>
        <div className="mt-5">
          <Button asChild>
            <Link to="/auth?next=/">Entrar / Criar conta</Link>
          </Button>
        </div>
        <CliFallback hasActiveInvite={hasActiveInvite} />
      </StateChrome>
    );
  }

  const errorCopy = claimErrorCopy(claimError);
  const isClaiming = claimState === "claiming";
  return (
    <StateChrome>
      <PaperclipLockup className="mb-6 h-6 w-auto" />
      <h1 className="text-xl font-semibold">Vamos configurar o InnTeam</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Ninguém assumiu esta instância ainda. Assuma agora para ser o primeiro administrador e começar.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button onClick={onClaim} disabled={isClaiming}>
          {isClaiming && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />}
          {isClaiming ? "Claiming..." : "Claim this instance"}
        </Button>
        <span className="text-sm text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{displayIdentity(session)}</span>
        </span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Wrong account?{" "}
        <Link to="/auth?next=/" className="underline underline-offset-2">
          Switch account
        </Link>
        .
      </p>
      {claimError && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <TriangleAlert className="mt-0.5 size-4 flex-shrink-0" aria-hidden />
          <div>
            <p className="font-medium">{errorCopy.title}</p>
            {errorCopy.body && <p className="mt-1 text-destructive/90">{errorCopy.body}</p>}
          </div>
        </div>
      )}
      <CliFallback hasActiveInvite={hasActiveInvite} />
    </StateChrome>
  );
}
