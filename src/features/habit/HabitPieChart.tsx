import {
  Legend,
  Pie,
  PieChart,
  Sector,
  Tooltip,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
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

  const radius = innerRadius + (outerRadius - innerRadius) * 0.25;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  if ((percent ?? 0) < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${name} : ${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

export function HabitPieChart({
  habitList,
}: {
  habitList: HabitDay[] | undefined;
}) {
  if (!habitList) {
    return;
  }
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
    <PieChart width={400} height={400} responsive>
      <Pie
        data={data}
        labelLine={false}
        dataKey="value"
        label={renderCustomizedLabel}
        outerRadius="70%"
        isAnimationActive={true}
        shape={MyCustomPie}
        stroke="white"
        strokeWidth={2}
      />
      <Tooltip />
    </PieChart>
  );
}
