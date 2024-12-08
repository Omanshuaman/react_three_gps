import React, { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router";

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

function Content() {
  return (
    <div className="flex flex-col h-fit p-4 bg-gray-900 w-full animate-tvOpen">
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
  const handleNavigation = () => {
    window.location.href = "/mountain"; // Navigate to the /mountain page
  };
  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card flex justify-between p-3">
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
      <div className="mt-3 text-center">
        <button
          onClick={handleNavigation}
          className="text-blue-500 hover:underline font-medium">
          See More Details
        </button>
      </div>
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
