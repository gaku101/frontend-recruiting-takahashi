export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: PaymentType;
  percentage?: number;
  amount?: number;
};

const PAYMENT_TYPE = {
  CASH: 'CASH',
  COUPON: 'COUPON',
} as const;

type PaymentType = typeof PAYMENT_TYPE[keyof typeof PAYMENT_TYPE];

export function charge(invoice: Invoice, payments: Payment[]) {
  const total = invoice.total;
  let deposit = 0;

  /** クーポン払いの処理(現金払いの処理より先に行う) */
  const couponPayments = payments.filter((payment) => payment.type === PAYMENT_TYPE.COUPON);
  couponPayments.forEach((couponPayment) => {
    if (couponPayment.percentage) {
      // パーセント値引きの場合
      deposit += Math.floor(total * (couponPayment.percentage / 100));
    } else {
      // 現金値引きの場合
      deposit += couponPayment.amount || 0;
    }
  });

  /** 現金払いの処理 */
  const cashPayments = payments.filter((payment) => payment.type === PAYMENT_TYPE.CASH);
  // クーポンで全額払える場合かつ現金での支払いがあればエラー
  if (deposit >= total && cashPayments.length) throw new Error('OverCharge');
  cashPayments.forEach((cashPayment) => {
    deposit += cashPayment.amount || 0;
  });

  if (total > deposit) {
    throw new Error('Shortage');
  }

  /** クーポンのみで支払いの場合はお釣りを返さない */
  if (!cashPayments.length) return { total, deposit, change: 0 };
  return { total: total, deposit: deposit, change: deposit - total };
}
