import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const CategoryPieChart = ({ categories }) => {
  const data = Object.entries(categories).map(([category, total], index) => ({
    id: index,
    value: total,
    label: category,
  }));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Distribución por Categoría</h3>
      <PieChart
        series={[
          {
            data,
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        width={600}
        height={300}
      />
    </div>
  );
};

export default CategoryPieChart;
