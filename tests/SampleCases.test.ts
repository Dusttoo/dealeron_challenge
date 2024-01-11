import { Item } from "../src/Item";
import { Receipt } from "../src/Receipt";

describe("Sample Test Cases", () => {
  let receipt: Receipt;

  beforeEach(() => {
    receipt = new Receipt();
  });

  test("should correctly calculate sample case 1", () => {
    receipt.addItem(new Item("book", 12.49)); // Exempt
    receipt.addItem(new Item("music CD", 14.99)); // Taxable
    receipt.addItem(new Item("chocolate bar", 0.85)); // Imported exempt
    receipt.updateItemQuantity("book", 2);

    const expectedTaxes = 1.5;
    const expectedTotal = 42.32;
    expect(receipt.calculateTotalTaxes()).toBeCloseTo(expectedTaxes);
    expect(receipt.calculateTotalCost()).toBeCloseTo(expectedTotal);
  });

  test("should correctly calculate sample case 2", () => {
    receipt.addItem(new Item("Imported box of chocolates", 10.0)); // Imported exempt
    receipt.addItem(new Item("Imported bottle of perfume", 47.5)); // Imported

    const expectedTaxes = 7.65;
    const expectedTotal = 65.15;
    expect(receipt.calculateTotalTaxes()).toBeCloseTo(expectedTaxes);
    expect(receipt.calculateTotalCost()).toBeCloseTo(expectedTotal);
  });

  test("should correctly calculate sample case 3", () => {
    receipt.addItem(new Item("Imported bottle of perfume", 27.99)); // Imported
    receipt.addItem(new Item("Bottle of perfume", 18.99)); // Taxable
    receipt.addItem(new Item("Packet of headache pills", 9.75)); // Exempt
    receipt.addItem(new Item("Imported box of chocolates", 11.25)); // Imported exempt
    receipt.addItem(new Item("Imported box of chocolates", 11.25)); // Imported exempt

    const expectedTaxes = 7.3;
    const expectedTotal = 86.53;
    expect(receipt.calculateTotalTaxes()).toBeCloseTo(expectedTaxes);
    expect(receipt.calculateTotalCost()).toBeCloseTo(expectedTotal);
  });
});
