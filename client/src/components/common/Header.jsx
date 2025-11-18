import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();


  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredELC, setHoveredELC] = useState(false);
  const [hoveredTALV, setHoveredTALV] = useState(false);

  const menuItems = {
    Master: {
      'Org Set Up': [
        'Company',
        'Department',
        'Designation',
        'Holiday Master',
        'Entity Master',
        'Qualification Master',
        'City Master',
        'State Master',
        'Country Master',
        'Bank Master'
      ],
      // Minimal Needs submenu
      'Needs': [
        'Position',
        'Vendor',
        'CV Status',
        'Miscellaneous',
        'Manpower Budget',
        'Talent Register',
        'Manage CV',
        'Search CV',
        'TR Tracker',
        'Upload Candidate Master',
        'Talent Acquisition',
        'Talent Acquisition Approval',
        'Talent Acquisition Manager Approval',
        'HR View Talent Acquisitions'
      ],
      'Ticker Message': null,
      'Event Planner': null,
      'Policy Upload': null,
      'Employee Master': null,
      'Emp Master Upload': null,
      'Upload Emp Master Update': null,
      'Reporting/Finance Manager Mapping': null,
      'Upload Reporting/Finance Manager Mapping': null,
      'View Emp Master Changes': null,
      'User Master': null,
      'Org Structure': null,
      'Export Docs': null,
      'Work Order Master': null,
      'Bulk Emp Docs upload': null
    },
    'ELC & Letters': {
      'Letter Printing': [
        'Offer Letter',
        'Appointment Letter',
        'Confirmation Letter',
        'Address Proof Letter',
        'Appraisal Letter',
        'Salary Certificate',
        'Transfer Letter',
        'Miscellaneous Letter'
      ],
      'Process Master': null,
      'Employee Process Master': null,
      'Exit Notes/Remarks/Warnings': null,
      'Send Mail': null,
      'Letter Designer': null,
      'Letters Audit Trail': null
    },
    'TA & LV': [
      'Leave Application',
      'Leave Approval',
      'Leave Balance',
      'Leave History',
      'Travel Request',
      'Travel Approval',
      'Travel Reimbursement',
      'Travel History',
      'Expense Claim',
      'Expense Approval',
      'Expense History',
      'Advance Request',
      'Advance Approval',
      'Advance Adjustment'
    ]
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <Link to="/home" className="text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors">
        Dash Board
      </Link>
      <div className="flex items-center space-x-8 text-gray-600">
        {/* Master Menu with Hover */}
        <div className="relative">
          <div 
            className="cursor-pointer hover:text-orange-500" 
            onMouseEnter={() => setHoveredMenu('Master')}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            Master ▼
          </div>
          {hoveredMenu === 'Master' && (
            <div 
              className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-64 z-10 border"
              onMouseEnter={() => setHoveredMenu('Master')}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {Object.entries(menuItems.Master).map(([itemName, subItems]) => (
                <div key={itemName} className="relative group">
                  <div 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center"
                    onClick={() => {
                      if (itemName === 'Ticker Message') {
                        navigate('/ticker-master');
                      } else if (itemName === 'Event Planner') {
                        navigate('/event-planner');
                      } else if (itemName === 'Policy Upload') {
                        navigate('/policy-upload');
                      } else if (itemName === 'Employee Master') {
                        navigate('/employee-master');
                      } else if (itemName === 'Upload Emp Master Update') {
                        navigate('/upload-emp-master-update');
                      } else if (itemName === 'Reporting/Finance Manager Mapping') {
                        navigate('/reporting-finance-manager-mapping');
                      }
                    }}
                  >
                    {itemName}
                    {subItems && <span className="text-xs">▶</span>}
                  </div>
                  {subItems && (
                    <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-64 z-20 border hidden group-hover:block">
                      {subItems.map((subItem, subIndex) => (
                        <div 
                          key={subIndex} 
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => {
                            if (subItem === 'Company') {
                              navigate('/companies');
                            } else if (subItem === 'Department') {
                              navigate('/master/departments');
                            } else if (subItem === 'Designation') {
                              navigate('/master/designations');
                            } else if (subItem === 'Holiday Master') {
                              navigate('/master/holiday-master');
                            } else if (subItem === 'Entity Master') {
                              navigate('/master/entity-master');
                            } else if (subItem === 'Qualification Master') {
                              navigate('/master/qualification-master');
                            } else if (subItem === 'City Master') {
                              navigate('/city-master');
                            } else if (subItem === 'State Master') {
                              navigate('/master/state-master');
                            } else if (subItem === 'Country Master') {
                              navigate('/country-master');
                            } else if (subItem === 'Bank Master') {
                              navigate('/bank-master');
                            } else if (subItem === 'Ticker Message') {
                              navigate('/ticker-master');
                            } else if (subItem === 'Position') {
                              navigate('/needs/position');
                            } else if (subItem === 'Vendor') {
                              navigate('/needs/vendor');
                            } else if (subItem === 'CV Status') {
                              navigate('/needs/cv-status');
                            } else if (subItem === 'Miscellaneous') {
                              navigate('/needs/miscellaneous');
                            } else if (subItem === 'Manpower Budget') {
                              navigate('/needs/manpower-budget');
                            } else if (subItem === 'Talent Register') {
                              navigate('/needs/talent-register');
                            } else if (subItem === 'Manage CV') {
                              navigate('/needs/manage-cv');
                            } else if (subItem === 'Search CV') {
                              navigate('/needs/search-cv');
                            } else if (subItem === 'TR Tracker') {
                              navigate('/needs/tr-tracker');
                            } else if (subItem === 'Upload Candidate Master') {
                              navigate('/needs/upload-candidate-master');
                            } else if (subItem === 'Talent Acquisition') {
                              navigate('/needs/talent-acquisition');
                            } else if (subItem === 'Talent Acquisition Approval') {
                              navigate('/needs/talent-acquisition-approval');
                            } else if (subItem === 'Talent Acquisition Manager Approval') {
                              navigate('/needs/talent-acquisition-manager-approval');
                            } else if (subItem === 'HR View Talent Acquisitions') {
                              navigate('/needs/hr-view-talent-acquisitions');
                            }
                          }}
                        >
                          {subItem}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ELC & Letters Menu */}
        <div className="relative">
          <div 
            className="cursor-pointer hover:text-orange-500" 
            onMouseEnter={() => setHoveredELC(true)}
            onMouseLeave={() => setHoveredELC(false)}
          >
            ELC & Letters ▼
          </div>
          {hoveredELC && (
            <div 
              className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-64 z-10 border"
              onMouseEnter={() => setHoveredELC(true)}
              onMouseLeave={() => setHoveredELC(false)}
            >
              {Object.entries(menuItems['ELC & Letters']).map(([itemName, subItems]) => (
                <div key={itemName} className="relative group">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center">
                    {itemName}
                    {subItems && <span className="text-xs">▶</span>}
                  </div>
                  {subItems && (
                    <div className="absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-64 z-20 border hidden group-hover:block">
                      {subItems.map((subItem, subIndex) => (
                        <div key={subIndex} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                          {subItem}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TA & LV Menu */}
        <div className="relative">
          <div 
            className="cursor-pointer hover:text-orange-500" 
            onMouseEnter={() => setHoveredTALV(true)}
            onMouseLeave={() => setHoveredTALV(false)}
          >
            TA & LV ▼
          </div>
          {hoveredTALV && (
            <div 
              className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-64 z-10 border"
              onMouseEnter={() => setHoveredTALV(true)}
              onMouseLeave={() => setHoveredTALV(false)}
            >
              {menuItems['TA & LV'].map((item, index) => (
                <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <Link to="/dashboard" className="cursor-pointer hover:text-orange-500 transition-colors">Dashboard</Link>
        <Link to="/companies" className="cursor-pointer hover:text-orange-500 transition-colors">Companies</Link>
        <Link to="/settings" className="cursor-pointer hover:text-orange-500 transition-colors">Settings</Link>
        <Link to="/reports" className="cursor-pointer hover:text-orange-500 transition-colors">Reports</Link>
        <Link to="/about" className="cursor-pointer hover:text-orange-500 transition-colors">About</Link>
        <Link to="/contact" className="cursor-pointer hover:text-orange-500 transition-colors">Contact</Link>
      </div>
    </header>
  );
};


export default Header;