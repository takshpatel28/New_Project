import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NeedsItem = ({ label, to, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-md border transition-colors ${
      active ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
    }`}
  >
    <span className="text-base">{icon}</span>
    <span className="text-left flex-1">{label}</span>
  </button>
);

export default function SidebarNeeds() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openPosition, setOpenPosition] = useState(false);

  const items = [
    // Position group is now a dropdown; its children are defined below
    { label: 'Manpower Budget', to: '/needs/manpower-budget', icon: '💲' },
    { label: 'Talent Register', to: '/needs/talent-register', icon: '🧑‍💻' },
    { label: 'Manage CV', to: '/needs/manage-cv', icon: '🗂️' },
    { label: 'Search CV', to: '/needs/search-cv', icon: '🔍' },
    { label: 'TR Tracker', to: '/needs/tr-tracker', icon: '📍' },
    { label: 'Upload Candidate Master', to: '/needs/upload-candidate-master', icon: '⤴️' },
    { label: 'Talent Acquisition', to: '/needs/talent-acquisition', icon: '👥' },
    { label: 'Talent Acquisition Approval', to: '/needs/talent-acquisition-approval', icon: '✅' },
    { label: 'Talent Acquisition Manager Approval', to: '/needs/talent-acquisition-manager-approval', icon: '🧑‍💼' },
    { label: 'HR View Talent Acquisitions', to: '/needs/hr-view-talent-acquisitions', icon: '👁️' },
  ];

  return (
    <aside className="hidden md:block w-72 shrink-0 border-r bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-800">Needs</h2>
          <span className="text-gray-400 text-xs">minimal</span>
        </div>

        <div className="space-y-2">
          {/* Position dropdown */}
          <div>
            <button
              onClick={() => setOpenPosition((v) => !v)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-md border transition-colors ${
                openPosition ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
              }`}
            >
              <span className="text-base">📦</span>
              <span className="text-left flex-1">Position</span>
              <span className="text-xs">{openPosition ? '▾' : '▸'}</span>
            </button>

            {openPosition && (
              <div className="mt-2 space-y-2 pl-8">
                <NeedsItem
                  label="Vendor"
                  to="/needs/vendor"
                  icon="👤"
                  active={location.pathname === '/needs/vendor'}
                  onClick={() => navigate('/needs/vendor')}
                />
                <NeedsItem
                  label="CV Status"
                  to="/needs/cv-status"
                  icon="📄"
                  active={location.pathname === '/needs/cv-status'}
                  onClick={() => navigate('/needs/cv-status')}
                />
                <NeedsItem
                  label="Miscellaneous"
                  to="/needs/miscellaneous"
                  icon="⋯"
                  active={location.pathname === '/needs/miscellaneous'}
                  onClick={() => navigate('/needs/miscellaneous')}
                />
              </div>
            )}
          </div>

          {/* Rest items */}
          {items.map((item) => (
            <NeedsItem
              key={item.to}
              label={item.label}
              to={item.to}
              icon={item.icon}
              active={location.pathname === item.to}
              onClick={() => navigate(item.to)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}