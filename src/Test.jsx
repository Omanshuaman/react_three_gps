import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import clsx from "clsx";
import { useSpring, animated, config } from "@react-spring/web";

const pi = Math.PI;

const suitData = [
  {
    id: 1,
    name: "Explorer Suit Alpha",
    assignedTo: "John Doe",
    operationalTemp: "-50°C to -10°C",
    batteryLife: 90, // in percentage
    status: "Ready",
    imgId: 1,
  },
];

const graphData = [
  { name: "Nov", temp: -20, windSpeed: 15, humidity: 30 },
  { name: "Dec", temp: -30, windSpeed: 20, humidity: 35 },
  { name: "Jan", temp: -25, windSpeed: 18, humidity: 40 },
];

function Content() {
  return (
    <div className="flex flex-col h-screen p-4 bg-gray-900 w-full animate-tvOpen">
      {/* Dashboard Header */}
      <div className="text-white text-2xl font-bold mb-4">
        Antarctica Suit Dashboard
      </div>

      {/* Suit Cards Section */}
      <div className="flex flex-wrap">
        {suitData.map((suit) => (
          <SuitCard
            key={suit.id}
            name={suit.name}
            assignedTo={suit.assignedTo}
            operationalTemp={suit.operationalTemp}
            batteryLife={suit.batteryLife}
            status={suit.status}
            imgId={suit.imgId}
          />
        ))}
      </div>

      {/* Graph Section */}
      <div className="flex-grow mt-4">
        <Graph />
      </div>
    </div>
  );
}

function SuitCard({
  name,
  assignedTo,
  operationalTemp,
  batteryLife,
  status,
  imgId,
}) {
  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card flex justify-between p-3 h-32">
        <div>
          <div className="flex items-center">
            <img
              src={`https://cdn2.iconfinder.com/data/icons/mech-mecha-robot/152/mech-robot-5-512.png`}
              className="w-10 h-10 rounded-sm bg-white object-contain"
            />
            <div className="ml-2">
              <div className="font-bold text-white">{name}</div>
            </div>
          </div>

          <div className="text-sm mt-2 text-gray-200">{`Operational Temp: ${operationalTemp}`}</div>
        </div>
        <div className="flex flex-col items-center">
          <Icon path={batteryLife > 50 ? "battery-full" : "battery-low"} />
          <div
            className={`font-bold text-lg ${
              batteryLife > 50 ? "text-green-500" : "text-red-500"
            }`}>
            {`${batteryLife}%`}
          </div>
          <div className="text-sm text-gray-200">Battery Life</div>
        </div>
      </div>
    </div>
  );
}

function Graph() {
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="flex items-center">
        <div className="font-bold text-white">Environmental Conditions</div>
        <div className="flex-grow" />
        <div className="text-sm text-gray-200">Last 9 Months</div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
          <Line type="monotone" dataKey="windSpeed" stroke="#82ca9d" />
          <Line type="monotone" dataKey="humidity" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function Icon({ path = "options", className = "w-4 h-4" }) {
  return (
    <img
      src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmtYMMmHujf-OLxvNjzwsyZOOrGt9mevTqXQ&s`}
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
export default function Test() {
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
