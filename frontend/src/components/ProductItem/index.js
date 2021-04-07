import React from "react";

function ProductItem({ product, addToCart }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <h3>Precio: ${product.price}</h3>
      <p dangerouslySetInnerHTML={{ __html: product.description }} />
      <button onClick={addToCart}>Agregar al carrito</button>
    </div>
  );
}

export default ProductItem;
