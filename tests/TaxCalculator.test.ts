import { Item } from "../src/Item";
import { TaxCalculator } from "../src/TaxCalculator";

describe("TaxCalculator", () => {
  test("Basic tax for exempt item should be 0", () => {
    const book = new Item("book", 12.49, false, true);
    expect(TaxCalculator.calculateBasicTax(book)).toBe(0);
  });

  test("Basic tax for non-exempt item should be 10%", () => {
    const musicCD = new Item("music CD", 14.99, false, false);
    expect(TaxCalculator.calculateBasicTax(musicCD)).toBe(1.5);
  });

  test("Import duty for imported item should be 5%", () => {
    const importedChocolate = new Item(
      "imported box of chocolates",
      10.0,
      true,
      true
    );
    expect(TaxCalculator.calculateImportDuty(importedChocolate)).toBe(0.5);
  });

  test("Import duty for non-imported item should be 0", () => {
    const chocolate = new Item("box of chocolates", 10.0, false, true);
    expect(TaxCalculator.calculateImportDuty(chocolate)).toBe(0);
  });

  test("Tax rounding should round up to the nearest 0.05", () => {
    const perfume = new Item("bottle of perfume", 47.5, false, false);
    expect(TaxCalculator.calculateBasicTax(perfume)).toBe(4.75);
  });
});
