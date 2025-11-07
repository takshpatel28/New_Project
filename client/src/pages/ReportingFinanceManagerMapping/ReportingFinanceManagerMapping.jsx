import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportingFinanceManagerMapping.css';

const ReportingFinanceManagerMapping = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState('BOMBAIM');
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const companies = ['BOMBAIM', 'DELHI', 'KOLKATA', 'CHENNAI', 'PUNE'];
  const searchOptions = ['Employee Code', 'Employee Name', 'Department', 'Designation'];

  // Mock data for Reporting/Finance Manager Mapping
  const [mappingData] = useState([
    {
      id: 1,
      employeeCode: 'EMP001',
      employeeName: 'Rajesh Kumar',
      department: 'IT',
      designation: 'Senior Software Engineer',
      reportingManager: 'Suresh Sharma',
      financeManager: 'Priya Patel',
      mappingType: 'Reporting',
      effectiveDate: '2024-01-01',
      status: 'Active'
    },
    {
      id: 2,
      employeeCode: 'EMP002',
      employeeName: 'Pooja Singh',
      department: 'HR',
      designation: 'HR Manager',
      reportingManager: 'Anita Desai',
      financeManager: 'Vikas Agarwal',
      mappingType: 'Both',
      effectiveDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: 3,
      employeeCode: 'EMP003',
      employeeName: 'Amit Verma',
      department: 'Finance',
      designation: 'Accountant',
      reportingManager: 'Vikas Agarwal',
      financeManager: 'Vikas Agarwal',
      mappingType: 'Finance',
      effectiveDate: '2024-02-01',
      status: 'Active'
    },
    {
      id: 4,
      employeeName: 'Neha Gupta',
      employeeCode: 'EMP004',
      department: 'Marketing',
      designation: 'Marketing Executive',
      reportingManager: 'Rahul Mehta',
      financeManager: 'Priya Patel',
      mappingType: 'Reporting',
      effectiveDate: '2024-02-15',
      status: 'Inactive'
    },
    {
      id: 5,
      employeeCode: 'EMP005',
      employeeName: 'Sanjay Mishra',
      department: 'IT',
      designation: 'Team Lead',
      reportingManager: 'Suresh Sharma',
      financeManager: 'Vikas Agarwal',
      mappingType: 'Both',
      effectiveDate: '2024-03-01',
      status: 'Active'
    },
    {
      id: 6,
      employeeCode: 'EMP006',
      employeeName: 'Anjali Rao',
      department: 'Operations',
      designation: 'Operations Manager',
      reportingManager: 'Ravi Kant',
      financeManager: 'Vikas Agarwal',
      mappingType: 'Reporting',
      effectiveDate: '2024-03-10',
      status: 'Active'
    },
    {
      id: 7,
      employeeCode: 'EMP007',
      employeeName: 'Manoj Tiwari',
      department: 'Sales',
      designation: 'Sales Executive',
      reportingManager: 'Rahul Mehta',
      financeManager: 'Priya Patel',
      mappingType: 'Both',
      effectiveDate: '2024-03-20',
      status: 'Active'
    },
    {
      id: 8,
      employeeCode: 'EMP008',
      employeeName: 'Sunita Yadav',
      department: 'HR',
      designation: 'HR Executive',
      reportingManager: 'Anita Desai',
      financeManager: 'Vikas Agarwal',
      mappingType: 'Reporting',
      effectiveDate: '2024-04-01',
      status: 'Inactive'
    }
  ]);

  // Filter data based on search criteria
  const filteredData = mappingData.filter(item => {
    if (!searchValue) return true;
    
    const searchLower = searchValue.toLowerCase();
    switch (searchCriteria) {
      case 'Employee Code':
        return item.employeeCode.toLowerCase().includes(searchLower);
      case 'Employee Name':
        return item.employeeName.toLowerCase().includes(searchLower);
      case 'Department':
        return item.department.toLowerCase().includes(searchLower);
      case 'Designation':
        return item.designation.toLowerCase().includes(searchLower);
      default:
        return true;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchCriteria('');
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    navigate(`/edit-reporting-finance-mapping/${id}`);
  };

  const handleNew = () => {
    navigate('/add-reporting-finance-mapping');
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'status-active' : 'status-inactive';
  };

  const getMappingTypeColor = (type) => {
    switch (type) {
      case 'Reporting':
        return 'type-reporting';
      case 'Finance':
        return 'type-finance';
      case 'Both':
        return 'type-both';
      default:
        return 'type-default';
    }
  };

  return (
    <div className="reporting-finance-mapping-container">
      <div className="page-header">
        <h1>Reporting/Finance Manager Mapping</h1>
        <nav className="breadcrumb">
          <span>Master</span> &gt; <span>Reporting/Finance Manager Mapping</span>
        </nav>
      </div>

      <div className="search-section">
        <div className="search-card">
          <div className="search-header">
            <h2>Search Criteria</h2>
          </div>

          <div className="search-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <select
                  id="company"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="form-control"
                >
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="searchCriteria">Search By</label>
                <select
                  id="searchCriteria"
                  value={searchCriteria}
                  onChange={(e) => setSearchCriteria(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Criteria</option>
                  {searchOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="searchValue">Search Value</label>
                <input
                  type="text"
                  id="searchValue"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Enter search value"
                  className="form-control"
                />
              </div>
            </div>

            <div className="button-group">
              <button onClick={handleSearch} className="btn btn-primary">
                Search
              </button>
              <button onClick={handleClear} className="btn btn-secondary">
                Clear
              </button>
              <button onClick={handleNew} className="btn btn-success">
                New
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="results-section">
        <div className="results-card">
          <div className="results-header">
            <h2>Mapping Results</h2>
            <span className="record-count">
              {filteredData.length} records found
            </span>
          </div>

          <div className="table-container">
            <table className="mapping-table">
              <thead>
                <tr>
                  <th>Employee Code</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Reporting Manager</th>
                  <th>Finance Manager</th>
                  <th>Mapping Type</th>
                  <th>Effective Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="employee-code">{item.employeeCode}</td>
                    <td className="employee-name">{item.employeeName}</td>
                    <td className="department">{item.department}</td>
                    <td className="designation">{item.designation}</td>
                    <td className="manager-name">{item.reportingManager}</td>
                    <td className="manager-name">{item.financeManager}</td>
                    <td>
                      <span className={`mapping-type ${getMappingTypeColor(item.mappingType)}`}>
                        {item.mappingType}
                      </span>
                    </td>
                    <td className="effective-date">{item.effectiveDate}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-secondary"
              >
                Previous
              </button>
              
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportingFinanceManagerMapping;