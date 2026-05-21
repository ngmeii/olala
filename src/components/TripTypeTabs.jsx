import { useState } from 'react'

const tabs = [
  { id: 'one-way', label: 'Một chiều' },
  { id: 'round-trip', label: 'Khứ hồi' },
]

function TripTypeTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex items-center bg-primary-light rounded-full p-1 gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap
            ${activeTab === tab.id
              ? 'bg-primary text-white shadow-md shadow-primary/30'
              : 'text-primary hover:bg-primary/10'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TripTypeTabs
