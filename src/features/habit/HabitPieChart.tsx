import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Sector,
  type PieSectorShapeProps,
  type PieLabelRenderProps,
} from "recharts";
import type { HabitDay } from "./habitType";

const RADIAN = Math.PI / 180;
const COLORS = ["#22c55e", "#f87171"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  if ((percent ?? 0) < 0.05) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const ncx = Number(cx);
  const ncy = Number(cy);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: 12, pointerEvents: "none" }}
    >
      {`${name} ${((percent ?? 0) * 100).toFixed(0)}%`}{" "}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => (
  <Sector {...props} fill={COLORS[props.index % COLORS.length]} />
);

export function HabitPieChart({
  habitList,
}: {
  habitList: HabitDay[] | undefined | null;
}) {
  if (!habitList) return null;

  const counts = habitList.reduce(
    (acc, { completed }) => {
      if (completed === "SUCCESS") acc.success += 1;
      else if (completed === "FAILED") acc.failed += 1;
      return acc;
    },
    { success: 0, failed: 0 },
  );

  const data = [
    { name: "성공", value: counts.success },
    { name: "실패", value: counts.failed },
  ];

  return (
    <div className="w-full h-56 sm:h-64">
      <ResponsiveContainer
        initialDimension={{ width: 1, height: 1 }}
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="70%"
            isAnimationActive
            shape={MyCustomPie}
            stroke="white"
            strokeWidth={2}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
