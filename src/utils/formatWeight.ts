export function formatWeight(weightKg?: number) {
  if (!weightKg) {
    return 'Nao informado';
  }

  const tons = weightKg / 1000;

  return `${weightKg.toLocaleString('pt-BR')}kg / ${tons.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}t`;
}
