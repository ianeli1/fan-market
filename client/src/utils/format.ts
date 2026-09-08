// Turns a number like 19.9 into a string like "$19.9".
export function formatPrice(amount: number): string {
  return "$" + amount.toFixed(2);
}
