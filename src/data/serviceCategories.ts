export type ServiceCategory = {
  id: string;
  label: string;
  description: string;
  googleQuery: string;
  icon: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'oficina',
    label: 'Oficinas',
    description: 'Mecanica, revisao e manutencao para caminhao.',
    googleQuery: 'oficina mecanica caminhao',
    icon: 'tools',
  },
  {
    id: 'borracharia',
    label: 'Borracharia',
    description: 'Troca, reparo e calibragem de pneus.',
    googleQuery: 'borracharia para caminhao',
    icon: 'circle-notch',
  },
  {
    id: 'autopecas',
    label: 'Auto pecas',
    description: 'Pecas e acessorios para caminhoes.',
    googleQuery: 'auto pecas caminhao',
    icon: 'cogs',
  },
  {
    id: 'eletrica',
    label: 'Eletrica',
    description: 'Bateria, alternador, chicote e parte eletrica.',
    googleQuery: 'eletrica para caminhao',
    icon: 'bolt',
  },
  {
    id: 'posto',
    label: 'Postos',
    description: 'Postos com diesel e estrutura para estrada.',
    googleQuery: 'posto diesel caminhao',
    icon: 'gas-pump',
  },
  {
    id: 'guincho',
    label: 'Guincho',
    description: 'Socorro mecanico e guincho pesado.',
    googleQuery: 'guincho para caminhao',
    icon: 'truck-pickup',
  },
  {
    id: 'lavajato',
    label: 'Lava jato',
    description: 'Lavagem e limpeza de caminhoes.',
    googleQuery: 'lava jato caminhao',
    icon: 'shower',
  },
  {
    id: 'parada',
    label: 'Paradas',
    description: 'Pontos de parada e apoio ao caminhoneiro.',
    googleQuery: 'parada caminhoneiro',
    icon: 'parking',
  },
];
