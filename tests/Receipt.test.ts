import { Item } from "../src/Item";
import { Receipt } from "../src/Receipt";

describe("Receipt", () => {
  let receipt: Receipt;

  beforeEach(() => {
    receipt = new Receipt();
  });

  test("should correctly calculate total taxes for various items", () => {
    receipt.addItem(new Item("book", 12.49, false, true)); // Exempt
    receipt.addItem(new Item("music CD", 14.99, false, false)); // Taxable
    receipt.addItem(new Item("imported chocolate", 10.0, true, true)); // Imported exempt

    const expectedTaxes = 2;
    expect(receipt.calculateTotalTaxes()).toBeCloseTo(expectedTaxes);
  });

  test("should output the correct total for sample case 1", () => {
    receipt.addItem(new Item("book", 12.49, false, true)); // Exempt
    receipt.addItem(new Item("music CD", 14.99, false, false)); // Taxable
    receipt.addItem(new Item("imported chocolate", 10.0, true, true)); // Imported exempt
    receipt.updateItemQuantity("book", 2);

    const expectedTaxes = 2;
    expect(receipt.calculateTotalTaxes()).toBeCloseTo(expectedTaxes);
  });

  test("should include item prices and taxes in total cost", () => {
    const importedPerfume = new Item("imported perfume", 27.99, true, false);
    receipt.addItem(importedPerfume);

    const totalCost = importedPerfume.price + receipt.calculateTotalTaxes();
    expect(receipt.calculateTotalCost()).toBeCloseTo(totalCost);
  });

  test("should correctly generate receipt output", () => {
    receipt.addItem(new Item("imported bottle of perfume", 47.5, true, false));

    const expectedReceipt =
      "<h4>Little Shop</h4>" +
      '<div class="item">Imported bottle of perfume: $54.65</div>' +
      '<div class="totals">Sales Taxes: $7.15</div>' +
      '<div class="totals">Total: $54.65</div>';

    expect(receipt.generateReceipt()).toBe(expectedReceipt);
  });

  test("should handle items with zero price", () => {
    receipt.addItem(new Item("free sample", 0, false, true));
    expect(receipt.calculateTotalTaxes()).toBe(0);
    expect(receipt.calculateTotalCost()).toBe(0);
  });

  test("should not alter the receipt when removing a non-existent item", () => {
    receipt.addItem(new Item("book", 12.49, false, true));
    receipt.removeItemById(999);
    expect(receipt.calculateTotalCost()).toBeCloseTo(12.49);
  });

  test("should correctly handle an empty receipt", () => {
    expect(receipt.calculateTotalTaxes()).toBe(0);
    expect(receipt.calculateTotalCost()).toBe(0);
    expect(receipt.generateReceipt()).toContain("No items");
  });

  test("should correctly handle item quantity updated to zero", () => {
    const item = new Item("chocolate", 5.0, false, true);
    receipt.addItem(item);
    receipt.updateItemQuantity(item.name, 0);
    expect(receipt.calculateTotalCost()).toBe(0);
  });

  test("should not allow negative prices", () => {
    expect(() => {
      new Item("invalid item", -10.0, false, false);
    }).toThrow("Invalid item price: Price cannot be negative.");
  });

  test("should not allow negative quantity", () => {
    expect(() => {
      const item = new Item("invalid item", 10.0, false, false);
      receipt.updateItemQuantity(item.name, -5);
    }).toThrow("Invalid quantity: Quantity cannot be negative.");
  });

  test("should handle large quantities of items", () => {
    for (let i = 0; i < 1000; i++) {
      receipt.addItem(new Item("bulk item", 14.99, false, false));
    }
    expect(receipt.calculateTotalCost()).toBeCloseTo(16490);
  });
});
