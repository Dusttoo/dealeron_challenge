import { Item } from "./Item";
import { TaxCalculator } from "./TaxCalculator";

export class Receipt {
  private items: Item[] = [];

  /**
   * Adds an item to the receipt.
   * @param item - The item to add.
   */
  addItem(item: Item): void {
    this.items.push(item);
  }

  /**
   * Removes an item from the receipt by its ID.
   * @param itemId - The ID of the item to remove.
   */
  removeItemById(itemId: number): void {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  /**
   * Aggregates items by name and calculates their total quantity and taxed price.
   * @returns A map with item names as keys and aggregated data as values.
   */
  getAggregatedItems(): Map<
    string,
    {
      quantity: number;
      totalTaxedPrice: number;
      unitPrice: number;
      unitPriceWithTax: number;
    }
  > {
    const summary = new Map<
      string,
      {
        quantity: number;
        totalTaxedPrice: number;
        unitPrice: number;
        unitPriceWithTax: number;
      }
    >();

    this.items.forEach((item) => {
      const basicTax = TaxCalculator.calculateBasicTax(item);
      const importDuty = TaxCalculator.calculateImportDuty(item);
      const taxedPrice = item.price + basicTax + importDuty;
      const key = item.name;

      const existingItem = summary.get(key);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalTaxedPrice += taxedPrice;
      } else {
        summary.set(key, {
          quantity: 1,
          totalTaxedPrice: taxedPrice,
          unitPrice: item.price,
          unitPriceWithTax: taxedPrice,
        });
      }
    });

    return summary;
  }

  /**
   * Updates the quantity of a specific item.
   * @param itemName - The name of the item to update.
   * @param newQuantity - The new quantity of the item.
   */
  updateItemQuantity(itemName: string, newQuantity: number): void {
    if (newQuantity < 0) {
      throw new Error("Invalid quantity: Quantity cannot be negative.");
    }

    const itemsWithName = this.items.filter((item) => item.name === itemName);
    const currentQuantity = itemsWithName.length;

    if (newQuantity === 0) {
      // Remove all instances of the item
      this.items = this.items.filter((item) => item.name !== itemName);
    } else if (newQuantity > currentQuantity) {
      // Add additional items to match the new quantity
      const templateItem = itemsWithName[0];
      for (let i = currentQuantity; i < newQuantity; i++) {
        this.items.push(
          new Item(
            templateItem.name,
            templateItem.price,
            templateItem.isImported,
            templateItem.isExempt
          )
        );
      }
    } else {
      // Reduce the quantity of the item
      for (let i = currentQuantity; i > newQuantity; i--) {
        const indexToRemove = this.items.findIndex(
          (item) => item.name === itemName
        );
        if (indexToRemove !== -1) {
          this.items.splice(indexToRemove, 1);
        }
      }
    }
  }

  /**
   * Calculates the total amount of taxes for all items in the receipt.
   * @returns The total tax amount.
   */
  calculateTotalTaxes(): number {
    return this.items.reduce((totalTax, item) => {
      const basicTax = TaxCalculator.calculateBasicTax(item);
      const importDuty = TaxCalculator.calculateImportDuty(item);
      return totalTax + basicTax + importDuty;
    }, 0);
  }

  /**
   * Calculates the total cost of all items in the receipt, including taxes.
   * @returns The total cost.
   */
  calculateTotalCost(): number {
    return this.items.reduce((totalCost, item) => {
      const basicTax = TaxCalculator.calculateBasicTax(item);
      const importDuty = TaxCalculator.calculateImportDuty(item);
      return totalCost + item.price + basicTax + importDuty;
    }, 0);
  }

  /**
   * Generates a receipt in HTML format.
   * @returns The HTML string representing the receipt.
   */
  generateReceipt(): string {
    if (this.items.length === 0) {
      return "<h4>Little Shop</h4><p>No items in the receipt.</p>";
    }
    const receiptHtmlGenerator = new ReceiptHtmlGenerator();
    return receiptHtmlGenerator.generate(
      this.getAggregatedItems(),
      this.calculateTotalTaxes(),
      this.calculateTotalCost()
    );
  }
}

class ReceiptHtmlGenerator {
  generate(
    itemSummary: Map<
      string,
      {
        totalTaxedPrice: number;
        quantity: number;
        unitPrice: number;
        unitPriceWithTax: number;
      }
    >,
    totalTaxes: number,
    totalCost: number
  ): string {
    let receiptHtml = "<h4>Little Shop</h4>";

    itemSummary.forEach((value, key) => {
      const capitalizedName = key.charAt(0).toUpperCase() + key.slice(1);
      if (value.quantity > 1) {
        receiptHtml += `<div class="item">${capitalizedName}: $${value.totalTaxedPrice.toFixed(
          2
        )} (${value.quantity} @ $${value.unitPriceWithTax.toFixed(2)})</div>`;
      } else {
        receiptHtml += `<div class="item">${capitalizedName}: $${value.totalTaxedPrice.toFixed(
          2
        )}</div>`;
      }
    });

    receiptHtml += `<div class="totals">Sales Taxes: $${totalTaxes.toFixed(
      2
    )}</div>`;
    receiptHtml += `<div class="totals">Total: $${totalCost.toFixed(2)}</div>`;

    return receiptHtml;
  }
}
