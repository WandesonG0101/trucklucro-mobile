export function getAvailabilityRemaining(availableUntil: string, now = new Date('2026-06-01T16:00:00')) {
  const until = new Date(availableUntil);
  const diffMs = until.getTime() - now.getTime();

  if (diffMs <= 0) {
    return 'Expirado';
  }

  const hours = Math.ceil(diffMs / (1000 * 60 * 60));

  return `Disponível por mais ${hours}h`;
}
