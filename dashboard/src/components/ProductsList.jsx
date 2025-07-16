import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
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
          <div key={product.id} className="card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="card-img-top"
              style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "12px" }}
            />
            <h3>{product.name}</h3>
            <p style={{ fontSize: "0.95rem", color: "#777", marginBottom: "0.25rem" }}>
              Categoría: {product.category}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#555", minHeight: "3.2rem" }}>
              {product.description.slice(0, 60)}...
            </p>
            <p style={{ fontWeight: "bold", color: "#2ecc71", marginTop: "0.5rem" }}>
              ${product.price}
            </p>
            <Link
              to={`/products/${product.id}`}
              className="btn-detail"
              aria-label={`Ver detalle de ${product.name}`}
            >
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
