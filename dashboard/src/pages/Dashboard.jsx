import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import CategoryPieChart from "../components/CategoryPieChart";
import ProductsList from "../components/ProductsList";
import "../styles/dashboard.css";
import { fetchUsers, fetchProducts } from "../services/api";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);
  const [lastUser, setLastUser] = useState(null);
  const [lastProduct, setLastProduct] = useState(null);
  const [latestSales, setLatestSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [totalUnitsSold, setTotalUnitsSold] = useState(0);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetchUsers();
        setTotalUsers(userRes.count);
        setLastUser(userRes.users.at(-1) || null);
      } catch (err) {
        console.error("Error al obtener usuarios:", err.message);
      }

      try {
        const productRes = await fetchProducts();
        setTotalProducts(productRes.count);
        setCategories(productRes.countByCategory || {});
        setProducts(productRes.products || []);
        setLastProduct(productRes.products?.at(-1) || null);
        setTotalUnitsSold(productRes.totalUnitsSold || 0);
        setTotalSalesAmount(productRes.totalSalesAmount || 0);
        setLatestSales(productRes.latestSales || []);
        setTopProducts(productRes.topProducts || []);
      } catch (err) {
        console.error("Error al obtener productos:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      {/* Resumen de métricas */}
      <div className="cards-container">
        <Card title="Total de Usuarios" value={totalUsers} />
        <Card title="Total de Productos" value={totalProducts} />
        <Card title="Categorías" value={Object.keys(categories).length} />
        <Card title="Unidades Vendidas" value={totalUnitsSold} />
        <Card title="Ventas Totales" value={`$${totalSalesAmount.toFixed(2)}`} />
      </div>

      {/* Detalles recientes */}
      <div className="detail-panels">
        {lastUser && (
          <Card
            title="Último Usuario Registrado"
            value={`Nombre: ${lastUser.name}\nEmail: ${lastUser.email}`}
          />
        )}
        {lastProduct && (
          <Card
            title="Último Producto Agregado"
            value={`Nombre: ${lastProduct.name}\nDescripción: ${lastProduct.description}`}
          />
        )}
      </div>

      {/* Categorías y gráfico */}
      <div className="details-container">
        <h2>Categorías de Productos</h2>
        <Table
          headers={["Categoría", "Total de Productos"]}
          data={Object.entries(categories).map(([cat, count]) => ({
            Categoría: cat,
            Total: count,
          }))}
        />
        <CategoryPieChart categories={categories} />
      </div>

      {/* Listado visual de productos con Cards */}
      <ProductsList />

      {/* Últimas ventas */}
      <div className="list-container">
        <h2>Últimas Ventas</h2>
        <Table
          headers={["Producto", "Cantidad", "Total", "Fecha"]}
          data={latestSales.map((sale) => ({
            Producto: sale.productName,
            Cantidad: sale.quantity,
            Total: `$${parseFloat(sale.total).toFixed(2)}`,
            Fecha: new Date(sale.saleDate).toLocaleDateString(),
          }))}
        />
      </div>

      {/* Top 5 productos más vendidos */}
      <div className="list-container">
        <h2>Top 5 Productos Más Vendidos</h2>
        <Table
          headers={["Producto", "Unidades Vendidas"]}
          data={topProducts.map((p) => ({
            Producto: p.productName,
            "Unidades Vendidas": p.totalSold,
          }))}
        />
      </div>
    </div>
  );
};

export default Dashboard;
