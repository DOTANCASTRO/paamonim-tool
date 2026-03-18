export interface CompoundResult {
  totalValue: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: { year: number; contributions: number; interest: number; total: number }[];
}

export function calcCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  monthlyContribution: number
): CompoundResult {
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  const yearlyBreakdown = [];

  for (let year = 1; year <= years; year++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
    }
    const totalContributions = principal + monthlyContribution * year * 12;
    yearlyBreakdown.push({
      year,
      contributions: totalContributions,
      interest: balance - totalContributions,
      total: balance,
    });
  }

  const totalContributions = principal + monthlyContribution * years * 12;
  return {
    totalValue: balance,
    totalContributions,
    totalInterest: balance - totalContributions,
    yearlyBreakdown,
  };
}

export interface ModeAResult {
  monthlySavings: number;
  totalSaved: number;
  interestEarned: number;
}

export function calcMonthlySavingsNeeded(
  targetAmount: number,
  months: number,
  annualRate: number
): ModeAResult {
  const r = annualRate / 100 / 12;
  let monthlySavings: number;

  if (r === 0) {
    monthlySavings = targetAmount / months;
  } else {
    monthlySavings = (targetAmount * r) / (Math.pow(1 + r, months) - 1);
  }

  const totalSaved = monthlySavings * months;
  return {
    monthlySavings,
    totalSaved,
    interestEarned: targetAmount - totalSaved,
  };
}

export interface ModeBResult {
  months: number;
  projectedDate: Date;
  finalBalance: number;
  totalSaved: number;
  interestEarned: number;
}

export function calcMonthsToTarget(
  targetAmount: number,
  monthlySavings: number,
  annualRate: number
): ModeBResult | null {
  if (monthlySavings <= 0) return null;

  const r = annualRate / 100 / 12;
  let months: number;

  if (r === 0) {
    months = Math.ceil(targetAmount / monthlySavings);
  } else {
    months = Math.ceil(
      Math.log((targetAmount * r) / monthlySavings + 1) / Math.log(1 + r)
    );
  }

  // Cap at 360 months (30 years)
  months = Math.min(months, 360);

  // Calculate actual final balance after n months
  let balance = 0;
  for (let m = 0; m < months; m++) {
    balance = balance * (1 + r) + monthlySavings;
  }

  const projectedDate = new Date();
  projectedDate.setMonth(projectedDate.getMonth() + months);

  return {
    months,
    projectedDate,
    finalBalance: balance,
    totalSaved: monthlySavings * months,
    interestEarned: balance - monthlySavings * months,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });
}
