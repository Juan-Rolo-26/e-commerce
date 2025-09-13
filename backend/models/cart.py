from dataclasses import dataclass, field
from typing import List


@dataclass
class CartItem:
    id: int
    product_id: int
    quantity: int


@dataclass
class Cart:
    items: List[CartItem] = field(default_factory=list)
    _next_id: int = 1

    def add_item(self, product_id: int, quantity: int) -> CartItem:
        item = CartItem(id=self._next_id, product_id=product_id, quantity=quantity)
        self.items.append(item)
        self._next_id += 1
        return item

    def remove_item(self, item_id: int) -> None:
        self.items = [item for item in self.items if item.id != item_id]

    def clear(self) -> None:
        self.items.clear()
        self._next_id = 1


# Global cart instance
cart = Cart()
