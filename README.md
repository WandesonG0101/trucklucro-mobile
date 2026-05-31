# TruckLucro Mobile

Aplicativo mobile do TruckLucro criado com Expo SDK 54, React Native, TypeScript e Expo Router.

Slogan: **Dirija sabendo quanto realmente ganha.**

## Requisitos

- Node.js LTS
- npm
- Expo Go no celular para visualizar rapidamente
- Android Studio opcional para emulador Android

## Instalação

```bash
npm install
```

No Windows, se o PowerShell bloquear `npm.ps1`, use os comandos com `cmd /c`.

## Rodar o app

```bash
cmd /c npm run start
```

Depois escolha uma opção no terminal do Expo:

- Escanear o QR Code com Expo Go
- Pressionar `a` para Android Emulator
- Pressionar `w` para abrir no navegador

Para facilitar o acesso pelo celular na mesma rede Wi-Fi:

```bash
cmd /c npm run start:lan
```

## Scripts úteis

```bash
cmd /c npm run lint
cmd /c npm run typecheck
cmd /c npm run web
```

## Estrutura principal

```text
app/
  (auth)/      Fluxo de login e cadastro
  (tabs)/      Fluxo principal com menu inferior
  *.tsx        Telas auxiliares

src/
  components/  Componentes reutilizáveis
  data/        Dados mockados
  theme/       Paleta de cores
  types/       Tipos TypeScript
  utils/       Funções utilitárias
```

## Como colegas podem abrir

Opção rápida, com o computador do desenvolvedor ligado:

1. Rode `cmd /c npm run start:lan`.
2. O colega instala o Expo Go.
3. O colega escaneia o QR Code.
4. Todos precisam estar na mesma rede Wi-Fi.

Opção recomendada para equipe remota:

1. Subir o código no GitHub.
2. Configurar EAS com uma conta Expo.
3. Gerar um build preview Android.
4. Compartilhar o link de instalação com a equipe.

Veja o guia completo em [docs/SHARING.md](docs/SHARING.md).
