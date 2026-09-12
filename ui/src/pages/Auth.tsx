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
import { F } from "@/components/textos-da-porta";

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
      // Reset rather than invalidate: the `["companies"]` entry is shared app-wide and
      // is not account-scoped, so invalidating leaves the previous account's list
      // readable (and any fetch for that session in flight) until the refetch lands.
      // Sign-in can change accounts, so drop the list outright.
      await queryClient.resetQueries({ queryKey: queryKeys.companies.all });
      navigate(nextPath, { replace: true });
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : F.erroAuth);
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

          <h2 className="text-[1.375rem] leading-[1.2] font-semibold text-[#292B2F]">
            {mode === "sign_in" ? F.tituloEntrar : F.tituloCriar}
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-6 text-[#6E6E6E]">
            {mode === "sign_in"
              ? F.subEntrar
              : F.subCriar}
          </p>

          <form
            className="mt-6 space-y-5"
            method="post"
            action={mode === "sign_up" ? "/api/auth/sign-up/email" : "/api/auth/sign-in/email"}
            onSubmit={(event) => {
              event.preventDefault();
              if (mutation.isPending) return;
              if (!canSubmit) {
                setError(F.camposObrigatorios);
                return;
              }
              mutation.mutate();
            }}
          >
            {mode === "sign_up" && (
              <div>
                <label htmlFor="name" className="mb-2 block text-[12px] font-bold tracking-[0.18em] text-[#6E6E6E] uppercase">{F.nome}</label>
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
              <label htmlFor="email" className="mb-2 block text-[12px] font-bold tracking-[0.18em] text-[#6E6E6E] uppercase">{F.email}</label>
              <input
                id="email"
                placeholder={F.emailDica}
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
              <label htmlFor="password" className="mb-2 block text-[12px] font-bold tracking-[0.18em] text-[#6E6E6E] uppercase">{F.senha}</label>
              <input
                id="password"
                placeholder={F.senhaDica}
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
              className="h-11 w-full rounded-[48px] bg-[#3A3B3C] text-[15px] font-bold text-white hover:bg-[#292B2F] focus-visible:ring-0 focus-visible:[outline:2px_solid_#258BFB] focus-visible:[outline-offset:2px]"
            >
              {mutation.isPending
                ? F.trabalhando
                : mode === "sign_in"
                  ? F.entrar
                  : F.criarConta}
            </Button>
          </form>

          <div className="mt-6 text-sm text-[#6E6E6E]">
            {mode === "sign_in" ? F.precisaConta : F.jaTemConta}{" "}
            <button
              type="button"
              className="font-medium text-[#258BFB] underline underline-offset-2"
              onClick={() => {
                setError(null);
                setMode(mode === "sign_in" ? "sign_up" : "sign_in");
              }}
            >
              {mode === "sign_in" ? F.criarAgora : F.entrarLink}
            </button>
          </div>
    </PortaDeEntrada>
  );
}
