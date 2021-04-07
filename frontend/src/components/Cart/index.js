export default function Cart({ productList, telephone, storeName }) {
  const getTotalPrice = () => {
    return productList.reduce((a, b) => a + b.price, 0);
  };

  const messageStart = () => {
    return `Hola **${storeName}**, quiero pedir:`;
  };

  const encodeOrder = () => {
    let order = productList.map(
      (product) => `${product.name}: $${product.price}`
    );
    order = [messageStart(), ...order, `Total: $${getTotalPrice()}`];
    return encodeURIComponent(order.join("\n"));
  };
  return (
    <div>
      <h1>Total: ${getTotalPrice()}</h1>
      <div>{encodeOrder()}</div>
      <a
        href={`https://wa.me/${telephone}/?text=${encodeOrder()}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Enviar a WP
      </a>
    </div>
  );
}
