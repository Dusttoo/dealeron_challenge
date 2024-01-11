import { Item } from "./Item";
import { Receipt } from "./Receipt";
import "../index.css";

// Common items that can be quickly added to the receipt.
const commonItems = [
  new Item("Book", 12.49, false, true),
  new Item("Music CD", 14.99, false, false),
  new Item("Chocolate Bar", 0.85, false, true),
];

// Main receipt object for the application.
let receipt = new Receipt();

/**
 * Sets up event listeners for the item submission form.
 */
function setupFormListeners() {
  const itemForm = document.getElementById("itemForm") as HTMLFormElement;
  const itemQuantityInput = document.getElementById(
    "itemQuantity"
  ) as HTMLInputElement;
  const itemNameInput = document.getElementById("itemName") as HTMLInputElement;
  const itemPriceInput = document.getElementById(
    "itemPrice"
  ) as HTMLInputElement;

  itemForm.addEventListener("submit", (event) =>
    handleFormSubmit(event, itemNameInput, itemPriceInput, itemQuantityInput)
  );
}

/**
 * Handles the form submission event to add new items to the receipt.
 */
function handleFormSubmit(
  event: Event,
  nameInput: HTMLInputElement,
  priceInput: HTMLInputElement,
  quantityInput: HTMLInputElement
) {
  event.preventDefault();

  const quantity = parseInt(quantityInput.value);
  const name = nameInput.value.toLowerCase();
  const price = parseFloat(priceInput.value);

  for (let i = 0; i < quantity; i++) {
    receipt.addItem(new Item(name, price));
  }

  updateUI();
  resetFormInputs(nameInput, priceInput, quantityInput);
}

/**
 * Updates the main user interface elements including the receipt area and the item list.
 */
function updateUI() {
  updateReceiptArea();
  renderItemList();
}

/**
 * Resets the form inputs.
 */
function resetFormInputs(...inputs: HTMLInputElement[]) {
  inputs.forEach((input) => (input.value = ""));
}

/**
 * Sets up the UI for the quick add buttons for common items
 */
function setupCommonItems(commonItemsContainer: HTMLElement) {
  commonItems.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = `${item.name} - $${item.price}`;
    button.onclick = () => {
      receipt.addItem(item);
      updateUI();
    };
    commonItemsContainer.appendChild(button);
  });
}

/**
 * Updates the receipt as changes are made
 */
function updateReceiptArea() {
  const receiptArea = document.getElementById("receipt") as HTMLElement;
  receiptArea.innerHTML = receipt.generateReceipt();
}

/**
 * Generates the items in the item list that have been added to the receipt
 */
function renderItemList() {
  const itemListElement = document.getElementById("itemList") as HTMLElement;
  itemListElement.innerHTML = "";

  const aggregatedItems = receipt.getAggregatedItems();

  aggregatedItems.forEach((itemData, itemName) => {
    const listItem = document.createElement("li");
    const capitalizedName = itemName.charAt(0).toUpperCase() + itemName.slice(1);

    listItem.textContent = `${capitalizedName} - $${itemData.unitPrice.toFixed(2)}`;

    const quantityInput = createQuantityInput(itemData.quantity, capitalizedName);
    listItem.appendChild(quantityInput);
    itemListElement.appendChild(listItem);
  });
}

/**
 * Creates the input for updating the item quantity.
 */
function createQuantityInput(
  quantity: number,
  itemName: string
): HTMLInputElement {
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = quantity.toString();

  quantityInput.addEventListener("change", () => {
    const newQuantity = parseInt(quantityInput.value);
    receipt.updateItemQuantity(itemName, newQuantity);
    updateUI();
  });

  return quantityInput;
}

document.addEventListener("DOMContentLoaded", () => {
  setupFormListeners();
  setupCommonItems(document.getElementById("commonItems") as HTMLElement);

  document
    .getElementById("startOver")
    ?.addEventListener("click", resetApplication);
});

/**
 * Resets the application back to the starting state.
 */
function resetApplication() {
  const itemQuantityInput = document.getElementById(
    "itemQuantity"
  ) as HTMLInputElement;
  const itemNameInput = document.getElementById("itemName") as HTMLInputElement;
  const itemPriceInput = document.getElementById(
    "itemPrice"
  ) as HTMLInputElement;
  resetFormInputs(itemNameInput, itemPriceInput, itemQuantityInput);

  const receiptArea = document.getElementById("receipt") as HTMLElement;
  const itemList = document.getElementById("itemList") as HTMLElement;
  receipt = new Receipt();
  receiptArea.innerHTML = "<h4>Little Shop</h4>";
  receiptArea.innerHTML += '<div class="totals">Sales Taxes: $0</div>';
  receiptArea.innerHTML += '<div class="totals">Total: $0</div>';
  itemList.innerHTML = '<p class="noItems">No Items Yet!</p>';
}
