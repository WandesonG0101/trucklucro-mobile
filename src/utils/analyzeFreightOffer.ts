import type { FreightOfferAnalysis } from '@/src/types';

type AnalyzeFreightOfferInput = {
  freightValue: number | null;
  anttMinimumValue: number;
  historicalAverageValue: number;
  tollValue?: number | null;
  distanceKm?: number;
};

function getPercentageDifference(value: number, reference: number) {
  if (reference <= 0) {
    return null;
  }

  return ((value - reference) / reference) * 100;
}

export function analyzeFreightOffer(input: AnalyzeFreightOfferInput): FreightOfferAnalysis {
  if (input.freightValue === null) {
    return {
      status: 'a_combinar',
      label: 'Valor a combinar',
      description: 'Negocie com a transportadora e confira se o valor cobre seus custos antes de aceitar.',
      percentageAboveAntt: null,
      percentageVsHistory: null,
    };
  }

  const percentageAboveAntt = getPercentageDifference(input.freightValue, input.anttMinimumValue);
  const percentageVsHistory = getPercentageDifference(input.freightValue, input.historicalAverageValue);

  if (input.freightValue >= input.anttMinimumValue && input.freightValue >= input.historicalAverageValue) {
    return {
      status: 'bom',
      label: 'Frete atrativo',
      description: 'Valor acima da referencia ANTT e compativel com o historico da rota.',
      percentageAboveAntt,
      percentageVsHistory,
    };
  }

  if (input.freightValue >= input.anttMinimumValue) {
    return {
      status: 'regular',
      label: 'Frete dentro da ANTT',
      description: 'Valor atende a referencia ANTT, mas esta abaixo da media historica da rota.',
      percentageAboveAntt,
      percentageVsHistory,
    };
  }

  return {
    status: 'baixo',
    label: 'Atencao ao valor',
    description: 'Valor abaixo da referencia ANTT estimada. Avalie custos antes de aceitar.',
    percentageAboveAntt,
    percentageVsHistory,
  };
}
