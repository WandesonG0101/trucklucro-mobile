# Compartilhamento com a equipe

Este guia deixa claro como disponibilizar o TruckLucro para colegas verem o código e abrirem o app.

## 1. Subir o código no GitHub

Crie um repositório vazio no GitHub, por exemplo:

```text
trucklucro-mobile
```

Depois rode:

```bash
git remote add origin https://github.com/SEU_USUARIO/trucklucro-mobile.git
git branch -M main
git push -u origin main
```

Se o remoto já existir, use:

```bash
git remote set-url origin https://github.com/SEU_USUARIO/trucklucro-mobile.git
git push -u origin main
```

## 2. Colegas rodando localmente

Cada colega pode clonar e abrir no Expo Go:

```bash
git clone https://github.com/SEU_USUARIO/trucklucro-mobile.git
cd trucklucro-mobile
npm install
cmd /c npm run start
```

Depois é só escanear o QR Code com Expo Go.

## 3. Preview rápido na mesma rede

No seu computador:

```bash
cmd /c npm run start:lan
```

Compartilhe o QR Code do terminal. Esse modo só funciona enquanto seu computador estiver com o Expo rodando e os celulares estiverem na mesma rede.

## 4. Preview remoto com EAS Build

Para colegas fora da sua rede, o caminho mais confiável é gerar um build preview Android.

Faça login:

```bash
cmd /c npx eas login
```

Inicialize o projeto no Expo/EAS:

```bash
cmd /c npx eas init
```

Gere um APK preview:

```bash
cmd /c npx eas build --platform android --profile preview
```

No final, o EAS mostra um link. Compartilhe esse link com a equipe para instalar o app no Android.

## 5. Atualizações depois do primeiro build

Depois que todos tiverem o build preview instalado, publique mudanças de JS/TS com:

```bash
cmd /c npx eas update --branch preview --message "Atualizacao do TruckLucro"
```

Observação: mudanças nativas ou alterações de dependências nativas podem exigir um novo `eas build`.

## 6. Validação antes de compartilhar

Antes de mandar para a equipe:

```bash
cmd /c npm run lint
cmd /c npm run typecheck
```
