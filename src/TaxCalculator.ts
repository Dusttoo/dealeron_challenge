import { Item } from "./Item";

export class TaxCalculator {
  private static readonly BASIC_TAX_RATE = 0.1;
  private static readonly IMPORT_DUTY_RATE = 0.05;

  /**
   * Calculates the basic tax for an item.
   * @param item The item for which to calculate tax.
   * @returns The calculated basic tax.
   */
  static calculateBasicTax(item: Item): number {
    if (item.isExempt) {
      return 0;
    }
    return this.roundTax(item.price * this.BASIC_TAX_RATE);
  }

  /**
   * Calculates the import duty for an item.
   * @param item The item for which to calculate import duty.
   * @returns The calculated import duty.
   */
  static calculateImportDuty(item: Item): number {
    if (item.isImported) {
      return this.roundTax(item.price * this.IMPORT_DUTY_RATE);
    }
    return 0;
  }

  /**
   * Rounds the tax amount to the nearest 0.05.
   * @param amount The tax amount to round.
   * @returns The rounded tax amount.
   */
  private static roundTax(amount: number): number {
    return Math.ceil(amount / 0.05) * 0.05;
  }
}
