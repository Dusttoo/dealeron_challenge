const EXEMPT_ITEMS = ["book", "chocolate", "pill"];
let itemIdCounter = 0;

/**
 * Represents an item, with properties to track its name, price, import status, and exemption status.
 */
export class Item {
  public id: number;
  public isImported: boolean;
  public isExempt: boolean;

  constructor(
    public name: string,
    public price: number,
    isImported?: boolean,
    isExempt?: boolean
  ) {
    if (price < 0) {
      throw new Error("Invalid item price: Price cannot be negative.");
    }
    this.id = Item.generateId();
    this.isImported = isImported ?? name.toLowerCase().includes("imported");
    this.isExempt =
      isExempt ??
      EXEMPT_ITEMS.some((exempt) => name.toLowerCase().includes(exempt));
  }

  /**
   * Generates a unique ID for each item.
   */
  private static generateId(): number {
    itemIdCounter++;
    return itemIdCounter;
  }
}
