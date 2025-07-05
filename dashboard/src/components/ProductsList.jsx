import React, { useEffect, useState } from "react";
import api from "../services/api";
import Card from "./Card";
import "../styles/dashboard.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/products/public")
      .then((res) => {
        setProducts(res.data.products || []);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos.");
      });
  }, []);

  return (
    <section className="products-section">
      <h2 className="section-title">Listado de productos</h2>
      {error && <p className="error">{error}</p>}
      <div className="cards-grid">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            subtitle={`Categoría: ${product.category}`}
            description={product.description}
            price={product.price}
            image={`/images/quantumbloom/${product.image}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
