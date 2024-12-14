import React, { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router";

const suitData = [
  {
    name: "RA2412675 Suit Terra",
    assignedTo: "John Doe",
    operationalTemp: "-50°C to -10°C",
    status: "Ready",
    imgId: 1,
  },
];

function Content({ id, batteryCount }) {
  return (
    <div className="flex flex-col h-fit p-3 bg-gray-900 w-full animate-tvOpen">
      {/* Suit Cards Section */}
      <div className="flex flex-wrap">
        {suitData.map((suit) => (
          <SuitCard
            key={suit.id}
            id={id}
            name={suit.name}
            assignedTo={suit.assignedTo}
            operationalTemp={suit.operationalTemp}
            batteryLife={batteryCount}
            status={suit.status}
            imgId={suit.imgId}
          />
        ))}
      </div>
    </div>
  );
}

function SuitCard({ key, id, name, operationalTemp, batteryLife }) {
  const handleNavigation = () => {
    window.location.href = `/suit?id=${id}`; // Navigate to the /suit page with id as query param
  };
  console.log("Battery", id, batteryLife);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card flex justify-between p-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold text-blue-500 mr-2">{`${id}`}</div>
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

export default function Battery({ id, batteryCount }) {
  const [showSidebar, onSetShowSidebar] = useState(false);
  return (
    <div>
      <div className="flex">
        <Content
          id={id}
          batteryCount={batteryCount}
          onSidebarHide={() => {
            onSetShowSidebar(true);
          }}
        />
      </div>
    </div>
  );
}
