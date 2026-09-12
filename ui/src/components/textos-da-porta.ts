/**
 * Os textos do formulário da porta, nas três línguas da família.
 * GERADO por scripts/paperclip-svr/aplicar-tema-innagent.py — não editar à mão.
 *
 * O idioma sai do NAVEGADOR: `pt` cobre pt-BR e pt-PT, `fr` cobre fr-FR e fr-CA, e o
 * resto cai no inglês, que é o padrão do produto. A leitura é defensiva porque este
 * módulo também é avaliado fora do navegador em teste.
 */
const COPY = {
  en: {
    tituloEntrar: "Sign in to InnTeam",
    tituloCriar: "Create your InnTeam account",
    subEntrar: "Use your email and password to sign in.",
    subCriar: "Create your account. No email confirmation needed.",
    nome: "Name",
    email: "Email",
    senha: "Password",
    emailDica: "name@company.com",
    senhaDica: "Password",
    trabalhando: "Working…",
    entrar: "Sign In",
    criarConta: "Create Account",
    precisaConta: "Need an account?",
    jaTemConta: "Already have an account?",
    criarAgora: "Create one",
    entrarLink: "Sign in",
    erroAuth: "Could not sign you in.",
    camposObrigatorios: "Please fill in all required fields.",
  },
  pt: {
    tituloEntrar: "Entrar no InnTeam",
    tituloCriar: "Criar sua conta InnTeam",
    subEntrar: "Use seu e-mail e sua senha para entrar.",
    subCriar: "Crie sua conta. Não é preciso confirmar o e-mail.",
    nome: "Nome",
    email: "E-mail",
    senha: "Senha",
    emailDica: "nome@empresa.com.br",
    senhaDica: "Senha",
    trabalhando: "Entrando…",
    entrar: "Entrar",
    criarConta: "Criar conta",
    precisaConta: "Ainda não tem conta?",
    jaTemConta: "Já tem conta?",
    criarAgora: "Criar agora",
    entrarLink: "Entrar",
    erroAuth: "Não foi possível entrar.",
    camposObrigatorios: "Preencha todos os campos.",
  },
  fr: {
    tituloEntrar: "Se connecter à InnTeam",
    tituloCriar: "Créer votre compte InnTeam",
    subEntrar: "Utilisez votre e-mail et votre mot de passe pour vous connecter.",
    subCriar: "Créez votre compte. Aucune confirmation d'e-mail n'est requise.",
    nome: "Nom",
    email: "E-mail",
    senha: "Mot de passe",
    emailDica: "nom@entreprise.com",
    senhaDica: "Mot de passe",
    trabalhando: "En cours…",
    entrar: "Se connecter",
    criarConta: "Créer un compte",
    precisaConta: "Pas encore de compte ?",
    jaTemConta: "Vous avez déjà un compte ?",
    criarAgora: "En créer un",
    entrarLink: "Se connecter",
    erroAuth: "Connexion impossible.",
    camposObrigatorios: "Remplissez tous les champs.",
  },
} as const;

const _lang = (typeof navigator !== "undefined" ? navigator.language : "en")
  .toLowerCase()
  .slice(0, 2);

export const F = COPY[_lang as keyof typeof COPY] ?? COPY.en;
