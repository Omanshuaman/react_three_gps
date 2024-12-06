"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "Recharts";
import clsx from "clsx";
import { useSpring, animated, config } from "@react-spring/web";

const pi = Math.PI;

const employeeData = [
  {
    id: 1,
    name: "Esther Howard",
    position: "Sale's manager USA",
    transactions: 3490,
    rise: true,
    tasksCompleted: 3,
    imgId: 0,
  },

  {
    id: 2,
    name: "Eleanor Pena",
    position: "Sale's manager Europe",
    transactions: 590,
    rise: false,
    tasksCompleted: 5,
    imgId: 2,
  },
];

const graphData = [
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
].map((i) => {
  const revenue = 500 + Math.random() * 2000;
  const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
  return {
    name: i,
    revenue,
    expectedRevenue,
    sales: Math.floor(Math.random() * 500),
  };
});

function Content({ onSidebarHide }) {
  return (
    <div className="flex w-full">
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        {employeeData.map(
          ({
            id,
            name,
            position,
            transactions,
            rise,
            tasksCompleted,
            imgId,
          }) => (
            <NameCard
              key={id}
              id={id}
              name={name}
              position={position}
              transactionAmount={transactions}
              rise={rise}
              tasksCompleted={tasksCompleted}
              imgId={imgId}
            />
          )
        )}

        <div className="w-full p-2">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph />
          </div>
        </div>
      </div>
    </div>
  );
}

function NameCard({
  name,
  position,
  transactionAmount,
  rise,
  tasksCompleted,
  imgId,
}) {
  const { transactions, barPlayhead } = useSpring({
    transactions: transactionAmount,
    barPlayhead: 1,
    from: { transactions: 0, barPlayhead: 0 },
  });
  return (
    <div className="w-1/2 p-2">
      <div className="rounded-lg bg-card flex justify-between p-3 h-32">
        <div className="">
          <div className="flex items-center">
            <Image path={`mock_faces_${imgId}`} className="w-10 h-10" />
            <div className="ml-2">
              <div className="flex items-center">
                <div className="mr-2 font-bold text-white">{name}</div>
                <Icon path="res-react-dash-tick" />
              </div>
              <div className="text-sm ">{position}</div>
            </div>
          </div>

          <div className="text-sm  mt-2">{`${tasksCompleted} from 5 tasks completed`}</div>
          <svg
            className="w-44 mt-3"
            height="6"
            viewBox="0 0 200 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="6" rx="3" fill="#2D2D2D" />
            <animated.rect
              width={barPlayhead.interpolate(
                (i) => i * (tasksCompleted / 5) * 200
              )}
              height="6"
              rx="3"
              fill="url(#paint0_linear)"
            />
            <rect x="38" width="2" height="6" fill="#171717" />
            <rect x="78" width="2" height="6" fill="#171717" />
            <rect x="118" width="2" height="6" fill="#171717" />
            <rect x="158" width="2" height="6" fill="#171717" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#8E76EF" />
                <stop offset="1" stopColor="#3912D2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <Icon
            path={rise ? "res-react-dash-bull" : "res-react-dash-bear"}
            className="w-8 h-8"
          />
          <animated.div
            className={clsx(
              rise ? "text-green-500" : "text-red-500",
              "font-bold",
              "text-lg"
            )}>
            {transactions.interpolate((i) => `$${i.toFixed(2)}`)}
          </animated.div>
          <div className="text-sm ">Last 6 month</div>
        </div>
      </div>
    </div>
  );
}
function Graph() {
  const CustomTooltip = () => (
    <div className="rounded-xl overflow-hidden tooltip-head">
      <div className="flex items-center justify-between p-2">
        <div className="">Revenue</div>
        <Icon path="res-react-dash-options" className="w-2 h-2" />
      </div>
      <div className="tooltip-body text-center p-3">
        <div className="text-white font-bold">$1300.50</div>
        <div className="">Revenue from 230 sales</div>
      </div>
    </div>
  );
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-white">Your Work Summary</div>
          <div className="flex-grow" />

          <Icon path="res-react-dash-graph-range" className="w-4 h-4" />
          <div className="ml-2">Last 9 Months</div>
          <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">
            ?
          </div>
        </div>
        <div className="font-bold ml-5">Nov - July</div>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graphData}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              strokeWidth="6"
              stroke="#252525"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              activeDot={false}
              type="monotone"
              dataKey="expectedRevenue"
              stroke="#242424"
              strokeWidth="3"
              dot={false}
              strokeDasharray="8 8"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#paint0_linear)"
              strokeWidth="4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Icon({ path = "options", className = "w-4 h-4" }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.svg`}
      alt=""
      className={clsx(className)}
    />
  );
}

function Image({ path = "1", className = "w-4 h-4" }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.jpg`}
      alt=""
      className={clsx(className, "rounded-full")}
    />
  );
}
export default function Dashboard() {
  const [showSidebar, onSetShowSidebar] = useState(false);

  return (
    <div>
      <div className="flex">
        <Content
          onSidebarHide={() => {
            onSetShowSidebar(true);
          }}
        />
      </div>
    </div>
  );
}
