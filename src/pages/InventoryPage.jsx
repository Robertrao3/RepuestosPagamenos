// src/pages/InventoryPage.jsx
import Inventory from "../Inventory";

export default function InventoryPage() {
  return (
    <div>
      <Inventory enableAdmin={false} />
    </div>
  );
}
