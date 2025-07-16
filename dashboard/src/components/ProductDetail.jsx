import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetail } from "../services/api";
import "../styles/dashboard.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductDetail(id)
      .then((res) => {
        setProduct(res);
      })
      .catch((err) => {
        console.error("Error al obtener producto:", err.message);
        setError("No se pudo cargar el producto.");
      });
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="product-detail-container">
      <h2 className="section-title">{product.name}</h2>
      <div className="product-detail-content">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <p><strong>Descripción:</strong> {product.description}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Marca:</strong> {product.brand}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Tamaño:</strong> {product.size}</p>
          <p><strong>Colores:</strong> {product.colors?.join(", ")}</p>
        </div>
      </div>

      {/* Botón de volver */}
      <button className="back-button" onClick={() => navigate("/")}>
        ← Volver al catálogo
      </button>
    </div>
  );
};

export default ProductDetail;
