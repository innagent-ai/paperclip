// innagent: status derivados dos tokens da marca
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "@/lib/router";
import { authApi } from "../api/auth";
import { queryKeys } from "../lib/queryKeys";
import { getRememberedInvitePath } from "../lib/invite-memory";
import { Button } from "@/components/ui/button";
import { PaperclipLoading } from "@/components/AnimatedPaperclipIcon";
import { PortaDeEntrada } from "@/components/PortaDeEntrada";

type AuthMode = "sign_in" | "sign_up";

export function AuthPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>("sign_in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const errorId = "auth-error";

  const nextPath = useMemo(
    () => searchParams.get("next") || getRememberedInvitePath() || "/",
    [searchParams],
  );
  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: () => authApi.getSession(),
    retry: false,
  });

  useEffect(() => {
    if (session) {
      navigate(nextPath, { replace: true });
    }
  }, [session, navigate, nextPath]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (mode === "sign_in") {
        await authApi.signInEmail({ email: email.trim(), password });
        return;
      }
      await authApi.signUpEmail({
        name: name.trim(),
        email: email.trim(),
        password,
      });
    },
    onSuccess: async () => {
      setError(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.session });
      await queryClient.invalidateQueries({ queryKey: queryKeys.health });
      await queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
      navigate(nextPath, { replace: true });
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
    },
  });

  const canSubmit =
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    (mode === "sign_in" || (name.trim().length > 0 && password.trim().length >= 8));

  if (isSessionLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <PaperclipLoading className="min-h-0" />
      </div>
    );
  }

  return (
    <PortaDeEntrada>

          <h2 className="text-[1.375rem] leading-[1.2] font-semibold text-[#2A2B2C]">
            {mode === "sign_in" ? "Entrar no InnTeam" : "Criar sua conta InnTeam"}
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-6 text-[#6D6E70]">
            {mode === "sign_in"
              ? "Use seu e-mail e sua senha para entrar."
              : "Crie sua conta. Não é preciso confirmar o e-mail."}
          </p>

          <form
            className="mt-6 space-y-5"
            method="post"
            action={mode === "sign_up" ? "/api/auth/sign-up/email" : "/api/auth/sign-in/email"}
            onSubmit={(event) => {
              event.preventDefault();
              if (mutation.isPending) return;
              if (!canSubmit) {
                setError("Preencha todos os campos.");
                return;
              }
              mutation.mutate();
            }}
          >
            {mode === "sign_up" && (
              <div>
                <label htmlFor="name" className="mb-2 block text-[12px] font-bold tracking-[0.18em] text-[#6D6E70] uppercase">Nome</label>
                <input
                  id="name"
                  name="name"
                  className="h-11 w-full rounded-[8px] border border-[#E7E7E7] bg-white px-[14px] text-[15px] text-[#292B2F] outline-none focus-visible:[outline:2px_solid_#258BFB] focus-visible:[outline-offset:2px] placeholder:text-[#A3ABB5]"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  autoFocus
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="mb-2 block text-[12px] font-bold tracking-[0.18em] text-[#6D6E70] uppercase">E-mail</label>
              <input
                id="email"
                name="email"
                className="h-11 w-full rounded-[8px] border border-[#E7E7E7] bg-white px-[14px] text-[15px] text-[#292B2F] outline-none focus-visible:[outline:2px_solid_#258BFB] focus-visible:[outline-offset:2px] placeholder:text-[#A3ABB5]"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
                aria-required="true"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                autoFocus={mode === "sign_in"}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-[12px] font-bold tracking-[0.18em] text-[#6D6E70] uppercase">Senha</label>
              <input
                id="password"
                name="password"
                className="h-11 w-full rounded-[8px] border border-[#E7E7E7] bg-white px-[14px] text-[15px] text-[#292B2F] outline-none focus-visible:[outline:2px_solid_#258BFB] focus-visible:[outline-offset:2px] placeholder:text-[#A3ABB5]"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={mode === "sign_in" ? "current-password" : "new-password"}
                required
                aria-required="true"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
              />
            </div>
            {error && (
              <p id={errorId} role="alert" className="text-xs text-destructive">
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={mutation.isPending}
              aria-disabled={!canSubmit || mutation.isPending}
              className="h-11 w-full rounded-[48px] bg-[#383B3F] text-[15px] font-bold text-white hover:bg-[#292B2F] focus-visible:ring-0 focus-visible:[outline:2px_solid_#258BFB] focus-visible:[outline-offset:2px]"
            >
              {mutation.isPending
                ? "Entrando…"
                : mode === "sign_in"
                  ? "Entrar"
                  : "Criar conta"}
            </Button>
          </form>

          <div className="mt-6 text-sm text-[#6D6E70]">
            {mode === "sign_in" ? "Ainda não tem conta?" : "Já tem conta?"}{" "}
            <button
              type="button"
              className="font-medium text-[#378CF0] underline underline-offset-2"
              onClick={() => {
                setError(null);
                setMode(mode === "sign_in" ? "sign_up" : "sign_in");
              }}
            >
              {mode === "sign_in" ? "Criar agora" : "Entrar"}
            </button>
          </div>
    </PortaDeEntrada>
  );
}
