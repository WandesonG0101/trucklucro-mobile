export function getRelativeTime(dateIso: string, now = new Date('2026-06-01T12:00:00')) {
  const date = new Date(dateIso);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));

  if (diffHours < 1) {
    return 'há poucos minutos';
  }

  if (diffHours < 24) {
    return `há cerca de ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  }

  const diffDays = Math.floor(diffHours / 24);

  return `há ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
}
