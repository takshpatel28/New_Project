import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SimpleDonut from '../../components/charts/SimpleDonut';

const EmployeeSelfService = () => {
  const donutColors = {
    orange: ['#f59e0b', '#fcd34d'],
    green: ['#22c55e', '#86efac'],
    red: ['#ef4444', '#fecaca'],
    gender: ['#60a5fa', '#fb7185'],
    etype: ['#f59e0b', '#10b981', '#f43f5e'],
  };

  const sections = [
    { key: 'home', icon: '🏠', label: 'Home' },
    { key: 'links', icon: '🔗', label: 'My Links', children: [
      'My CTC', 'My Salary Slip', 'My Investment Declaration', 'My Tax Report', 'My Annual Salary', 'My To Do', 'My Leave Report', 'My Activity Update', 'Asset Allocated', 'View My Process Activities', 'My Form16', 'Remarks'
    ]},
    { key: 'profile', icon: '👤', label: 'My Profile', children: [
      'Personal', 'Company', 'Family', 'Work Experience', 'Skill & Additional Info.', 'Qualification', 'Photo', 'Documents', 'Bank Account Details'
    ]},
    { key: 'myAttendance', icon: '📆', label: 'My Attendance', children: [
      'Daily', 'Monthly', 'Yearly', 'Leave Ledger', 'Extra work & Comp offs'
    ]},
    { key: 'teamAttendance', icon: '👥', label: 'Team Attendance', children: [
      "Punches", "Monthly", "Attendance MIS", "Yearly", "Leave Ledger", "Day's Status", "Leave MIS"
    ]},
    { key: 'request', icon: '📝', label: 'Request', children: [
      'Attendance Regularise', 'Leave/OD/WFH', 'HelpDesk', 'Work on Holiday', 'Resignation Note', 'Leave Encashment', 'Confirmation Review Entry', 'ProxyAttendanceRegularise'
    ] },
    { key: 'approvals', icon: '✔️', label: 'Approvals' },
    { key: 'hrApprovals', icon: '🧑‍💼', label: 'HR Approvals' },
    { key: 'financeApproval', icon: '₹', label: 'Finance Approval' },
    { key: 'myClaims', icon: '📝', label: 'My Claims' },
    { key: 'claimApproval', icon: '✔️', label: 'Claim Approval' },
    { key: 'hrViews', icon: '👁️', label: 'HR Views' },
    { key: 'reports', icon: '📊', label: 'Reports' },
    { key: 'corpInfo', icon: '🏢', label: 'Corp. Info.' },
    { key: 'valueAdd', icon: '🧩', label: 'Value Add' },
    { key: 'employeeBenefit', icon: '🎁', label: 'Employee Benefit' },
    { key: 'onboarding', icon: '📦', label: 'Onboarding' },
  ];
  const [open, setOpen] = useState({ links: false, profile: false, myAttendance: false, teamAttendance: false });
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const navigate = useNavigate();
  const location = useLocation();
  const base = '/employee-self-service';
  const activeView = (() => {
    const p = location.pathname.startsWith(base) ? location.pathname.slice(base.length) : '';
    const seg = p.replace(/^\/+/, '').split('/').filter(Boolean);
    if (seg.length < 1) return 'ess-dashboard';
    const root = seg[0];
    return [root, seg[1]||''].filter(Boolean).join('-');
  })();

  
  return (
    <div className="bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 shrink-0 left-0 top-0">
            <div className="card-soft p-0 overflow-hidden">
          {sections.map((s) => (
            <div key={s.key} className="border-b">
              <button
                className={`w-full flex items-center justify-between px-3 py-3 text-left ${open[s.key]?'bg-gray-50':''}`}
                onClick={() => s.children ? setOpen((o) => ({ ...o, [s.key]: !o[s.key] })) : navigate(base)}
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs">{s.icon}</span>
                  <span className="text-gray-800 text-sm font-medium">{s.label}</span>
                </span>
                {s.children && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`transition-transform ${open[s.key]?'rotate-180':''}`}>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              {s.children && open[s.key] && (
                <div className="px-4 pb-3">
                  {s.children.map((c) => {
                    const k = `${slug(s.key)}-${slug(c)}`;
                    const route = `${base}/${slug(s.key)}/${slug(c)}`;
                    return (
                      <button
                        key={c}
                        className={`block w-full text-left px-2 py-2 text-sm rounded ${activeView===k?'bg-orange-500 text-white':'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => navigate(route)}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
            </div>
          </aside>
          <div className="flex-1">
            <div className="text-2xl font-semibold text-gray-900 mb-4">{activeView==='ess-dashboard' ? 'HR Self Service' : ''}</div>
            {activeView==='ess-dashboard' && (
            <div style={{display: activeView==='ess-dashboard' ? 'block':'none'}}>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Today's joinee", value: 0, icon: '👤' },
          { label: 'Last Working Day', value: 0, icon: '📅' },
          { label: 'Confirmation due', value: 0, icon: '✅' },
          { label: 'Plan leave', value: 0, icon: '🗓️' },
          { label: 'Absconding', value: 2, icon: '⚠️' },
          { label: 'Birthday', value: 0, icon: '🎂' },
          { label: 'Work Anniversary', value: 0, icon: '🎉' },
        ].map((c, i) => (
          <div key={i} className="card-soft flex items-center gap-3">
            <div className="text-2xl">{c.icon}</div>
            <div className="flex-1">
              <div className="text-sm text-gray-600">{c.label}</div>
              <div className="text-xl font-semibold text-gray-900">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="card-soft">
          <div className="font-semibold mb-2 text-red-600">Missed Timelines</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['Candidate No Show','Insurance','Compliance due','Confirmation pending'].map((t)=>(
              <div key={t} className="flex justify-between">
                <span className="text-gray-700">{t}</span>
                <span className="text-gray-900 font-medium">NA</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft">
          <div className="font-semibold mb-2">ELC Upcoming & Pending Activities</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['Ext F&F','Warning','Training','Open ticket','Background verifications','LWD','Insurance due'].map((t)=>(
              <div key={t} className="flex justify-between">
                <span className="text-gray-700">{t}</span>
                <span className="text-gray-900 font-medium">0</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft">
          <div className="font-semibold mb-2">HR OPS Team Activity</div>
          <div className="flex items-center justify-center h-36 text-5xl">🧑‍💼</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="card-soft">
          <div className="font-semibold mb-2">HR pending approvals</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['Ext Regularize','Plan leave','Hiring Offer Pending For Acceptance'].map((t)=>(
              <div key={t} className="flex justify-between">
                <span className="text-gray-700">{t}</span>
                <span className="text-gray-900 font-medium">0</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft">
          <div className="font-semibold mb-2">Non Compliance</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['No Bank Account','No Company Email','No Personal Email','No Aadhar','No Permanent Address','No Current Address','No Skills','No Emergency Contact'].map((t,i)=>(
              <div key={i} className="flex justify-between">
                <span className="text-gray-700">{t}</span>
                <span className="text-gray-900 font-medium">0</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft">
          <div className="font-semibold mb-2">Hiring Progress</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['Top 3 recruiter list','Top 3 Resourcing Partner','Max CV source for Position','Interviews Planned','Top Open Position'].map((t,i)=>(
              <div key={i} className="flex items-center gap-3">
                <span className="inline-block w-6 h-6 rounded-full bg-blue-100"></span>
                <span className="text-gray-700">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <div className="card-soft">
          <div className="font-semibold mb-2">Recruiter / Agency performance</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['Open positions','Offer pending to release','Offer released','Candidate documentation pending','Health check up pending','Position Closed','Pending Candidate approval by Checker'].map((t)=>(
              <div key={t} className="flex justify-between">
                <span className="text-gray-700">{t}</span>
                <span className="text-gray-900 font-medium">0</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-soft">
          <div className="font-semibold mb-2">Current strength</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <SimpleDonut data={{ OnProbation: 10, OnNotice: 2 }} colors={donutColors.orange} totalLabel={12} />
            <SimpleDonut data={{ Male: 30, Female: 18 }} colors={donutColors.gender} totalLabel={48} />
            <SimpleDonut data={{ Staff: 35, Worker: 13 }} colors={donutColors.etype} totalLabel={48} />
          </div>
        </div>
            </div>
            </div>
            )}

            {activeView==='links-my-leave-report' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Links › <span className="font-medium">My Leave Report</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <div>
                    <div className="text-sm">From Date</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0,10)} />
                  </div>
                  <div>
                    <div className="text-sm">To Date</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date().toISOString().slice(0,10)} />
                  </div>
                  <div>
                    <div className="text-sm">Select Format</div>
                    <div className="flex items-center gap-4 text-sm">
                      <label className="flex items-center gap-2"><input type="radio" name="fmt" defaultChecked /> EXCEL</label>
                      <label className="flex items-center gap-2"><input type="radio" name="fmt" /> PDF</label>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm">Sort By</div>
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="sort" defaultChecked /> Leave Date</label>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="text-sm">Leave Type</div>
                    <select multiple className="border rounded px-2 py-2 w-full h-40 text-sm">
                      {['Absent','L.W.P','Casual Leave','Compensatory Off','Extra Working'].map((o)=>(<option key={o}>{o}</option>))}
                    </select>
                  </div>
                  <div className="flex items-start">
                    <button className="px-4 py-2 bg-green-600 text-white rounded text-sm">Export Excel</button>
                  </div>
                </div>
              </div>
            )}

            {activeView==='links-my-activity-update' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Links › <span className="font-medium">My Activity Update</span></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <div className="text-sm">Process</div>
                    <select className="border rounded px-2 py-2 w-full text-sm"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Search</div>
                    <select className="border rounded px-2 py-2 w-full text-sm"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Search Text</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="flex items-end"><button className="px-4 py-2 bg-orange-500 text-white rounded text-sm">Search</button></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded bg-blue-500 text-white text-sm">Assigned</button>
                  <button className="px-3 py-2 rounded bg-green-500 text-white text-sm">Completed</button>
                  <button className="px-3 py-2 rounded bg-orange-500 text-white text-sm">Request Cancelled</button>
                  <button className="px-3 py-2 rounded border text-sm">All</button>
                </div>
                <div className="mt-8 text-gray-600 text-sm">There are no details.</div>
              </div>
            )}

            {activeView==='links-asset-allocated' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Links › <span className="font-medium">Asset Allocated</span></div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded bg-blue-500 text-white text-sm">Pending to Submit</button>
                  <button className="px-4 py-2 rounded bg-orange-400 text-white text-sm">Submitted</button>
                </div>
                <div className="mt-8 text-gray-600 text-sm">There are no asset allotted</div>
              </div>
            )}

            {activeView==='links-view-my-process-activities' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Links › <span className="font-medium">View My Process Activities</span></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <div className="text-sm">Process</div>
                    <select className="border rounded px-2 py-2 w-full text-sm"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Search</div>
                    <select className="border rounded px-2 py-2 w-full text-sm"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Search Text</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="flex items-end"><button className="px-4 py-2 bg-orange-500 text-white rounded text-sm">Search</button></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded bg-blue-500 text-white text-sm">Assigned To Owner</button>
                  <button className="px-3 py-2 rounded bg-orange-400 text-white text-sm">Completed</button>
                  <button className="px-3 py-2 rounded border text-sm">All</button>
                </div>
                <div className="mt-8 text-gray-600 text-sm">There are no details.</div>
              </div>
            )}

            {activeView==='links-my-form16' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Links › <span className="font-medium">My Form16</span></div>
                <div className="text-gray-600 text-sm">No data found.</div>
              </div>
            )}

            {activeView==='links-remarks' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Links › <span className="font-medium">Remarks</span></div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded bg-orange-400 text-white text-sm">Remarks</button>
                  <button className="px-4 py-2 rounded bg-red-500 text-white text-sm">Warning</button>
                  <button className="px-4 py-2 rounded border text-sm">⟳</button>
                </div>
                <div className="mt-8 text-gray-600 text-sm">No data found.</div>
              </div>
            )}

            {activeView==='profile-personal' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Profile › <span className="font-medium">Personal</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm">Title</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="flex items-end justify-end">
                    <button className="px-3 py-2 border rounded text-sm">📄 Signed Declaration</button>
                  </div>
                  <div>
                    <div className="text-sm">First Name <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Middle Name</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Last Name <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Gender <span className="text-red-600">*</span></div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select Gender –</option><option>Male</option><option>Female</option><option>Other</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Date of Birth <span className="text-red-600">*</span></div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Caste</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select Caste –</option></select>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm">Personal Email <span className="text-red-600">*</span></div>
                    <input type="email" className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm">Current Address <span className="text-red-600">*</span></div>
                    <textarea className="border rounded px-2 py-2 w-full text-sm" rows={2}></textarea>
                  </div>
                  <div>
                    <div className="text-sm">Country <span className="text-red-600">*</span></div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>India</option></select>
                  </div>
                  <div>
                    <div className="text-sm">State <span className="text-red-600">*</span></div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">City/District <span className="text-red-600">*</span></div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Pin Code/Post Code/Zip Code</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm">Permanent Address <span className="text-red-600">*</span></div>
                    <textarea className="border rounded px-2 py-2 w-full text-sm" rows={2}></textarea>
                  </div>
                  <div>
                    <div className="text-sm">Alternate No.</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Guardian Name</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Emergency Contact Person <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Emergency No. <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Mobile No. <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Office Mobile No. <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm">Office Landline No. <span className="text-red-600">*</span></div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div>
                      <div className="text-sm">Ext. No.</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm">Referred By</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Blood Group</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select Blood Group –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">PAN No.</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Aadhaar/UID</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">PAN Aadhaar Link</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option><option>Yes</option><option>No</option></select>
                  </div>
                  <div>
                    <div className="text-sm">PF UAN No.</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Marital Status</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select Status –</option><option>Single</option><option>Married</option><option>Divorced</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Wedding Date</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Insurance Card No</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Health ID Card No</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm">Medical Condition Detail</div>
                    <textarea className="border rounded px-2 py-2 w-full text-sm" rows={2}></textarea>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded text-sm">Amend</button>
                  <button className="px-4 py-2 border rounded text-sm">Cancel</button>
                </div>
                <div className="mt-6 text-xs text-blue-700 space-y-1">
                  <div>Note:</div>
                  <ul className="list-disc pl-6">
                    <li>Changes are accepted subject to HR review.</li>
                    <li>Fields marked with green star help HR with compliance and safety.</li>
                    <li>If EPF contributed any time, please mention PF UAN number.</li>
                  </ul>
                </div>
              </div>
            )}

            {(activeView==='profile-skill-additional-info' || activeView==='profile-skill-additional-info-') && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Profile › <span className="font-medium">Skill & Additional Info.</span></div>
                <div className="rounded border p-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm">Nationality</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div>
                      <div className="text-sm">Religion</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div>
                      <div className="text-sm">Place Of Birth</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div>
                      <div className="text-sm">Mother Tongue</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm mb-2">Languages known</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>R,W,S</option></select>
                        <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>R,W</option></select>
                        <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>R,S</option></select>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">Area of Expertise</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div>
                      <div className="text-sm">Hobby</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div>
                      <div className="text-sm">Passport No.</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div>
                      <div className="text-sm">Passport Validity Date</div>
                      <input type="date" className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div>
                      <div className="text-sm">Visa (Country)</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                    </div>
                    <div>
                      <div className="text-sm">Visa Validity Date</div>
                      <input type="date" className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div>
                      <div className="text-sm">Driving License No</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm">Details If Handicap</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm">Misc.</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div className="rounded border p-4 bg-white">
                    <div className="font-medium mb-3">Skill</div>
                    {[1,2,3,4,5].map((i)=>(
                      <div key={i} className="grid grid-cols-12 gap-3 mb-2">
                        <div className="col-span-8">
                          <div className="text-sm">Key Skill {i}</div>
                          <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select Skill {i} –</option></select>
                        </div>
                        <div className="col-span-4">
                          <div className="text-sm">Experience (months)</div>
                          <input type="number" min="0" className="border rounded px-2 py-2 w-full text-sm" defaultValue={0} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded border p-4 bg-white">
                    <div className="font-medium mb-3 text-red-600">Upload Resume</div>
                    <div>
                      <div className="text-sm">Resume</div>
                      <input type="file" accept=".pdf,.doc,.docx,.txt,.rtf" className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded text-sm">Amend</button>
                </div>
              </div>
            )}

            {activeView==='profile-qualification' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Profile › <span className="font-medium">Qualification</span></div>
                <div className="rounded border bg-white overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="px-3 py-2 text-left text-sm">Qualifications</th>
                        <th className="px-3 py-2 text-left text-sm">Specialization</th>
                        <th className="px-3 py-2 text-left text-sm">Institute</th>
                        <th className="px-3 py-2 text-left text-sm">%/CGPA</th>
                        <th className="px-3 py-2 text-left text-sm">YOP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1,2,3,4].map((i)=>(
                        <tr key={i} className="border-b">
                          <td className="px-3 py-2">
                            <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select Qualification –</option></select>
                          </td>
                          <td className="px-3 py-2"><input className="border rounded px-2 py-2 w-full text-sm" /></td>
                          <td className="px-3 py-2"><input className="border rounded px-2 py-2 w-full text-sm" /></td>
                          <td className="px-3 py-2 w-32"><input className="border rounded px-2 py-2 w-full text-sm" /></td>
                          <td className="px-3 py-2 w-24"><input className="border rounded px-2 py-2 w-full text-sm" placeholder="YYYY" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded text-sm">Amend</button>
                </div>
                <div className="mt-4 text-xs text-gray-600">Please enter qualifications in ascending order of year of passing.</div>
              </div>
            )}

            {activeView==='profile-photo' && (
              <div className="card-soft flex flex-col items-center">
                <div className="text-sm mb-4 self-start">My Profile › <span className="font-medium">Photo</span></div>
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">👤</div>
                <div className="mt-4">
                  <label className="px-4 py-2 bg-blue-600 text-white rounded text-sm cursor-pointer">
                    Change Photo
                    <input type="file" accept=".jpeg,.jpg" className="hidden" />
                  </label>
                </div>
                <div className="mt-6 text-xs text-blue-700 text-center">
                  <div>File size up to 1 MB, JPEG/JPG only.</div>
                  <div>Photo image should be professional self image.</div>
                </div>
              </div>
            )}

            {activeView==='profile-documents' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Profile › <span className="font-medium">Documents</span></div>
                <div className="rounded border bg-white overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="px-3 py-2 text-left text-sm">Sr.No.</th>
                        <th className="px-3 py-2 text-left text-sm">Documents</th>
                        <th className="px-3 py-2 text-left text-sm">Uploaded Files</th>
                        <th className="px-3 py-2 text-left text-sm">Effective From</th>
                        <th className="px-3 py-2 text-left text-sm">Valid Till</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        'Personal Document - PAN Card',
                        'Personal Document - Aadhaar Card',
                        'Personal Document - Passport',
                        'Education - Certificates',
                        'Signed Non Disclosure Agreement',
                        'Signed Asset Declaration Form',
                        'Signed PF Nomination Form',
                        'Signed PF Declaration Form',
                        'COVID Vaccine Dose 1 Certificate',
                        'COVID Vaccine Dose 2 Certificate',
                      ].map((d,i)=>(
                        <tr key={i} className="border-b">
                          <td className="px-3 py-2 text-sm">{i+1}</td>
                          <td className="px-3 py-2 text-sm">{d}</td>
                          <td className="px-3 py-2 text-sm">file not uploaded.</td>
                          <td className="px-3 py-2"><input type="date" className="border rounded px-2 py-2 w-full text-sm" /></td>
                          <td className="px-3 py-2"><input type="date" className="border rounded px-2 py-2 w-full text-sm" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <div className="font-medium mb-2">Letter</div>
                  <div className="rounded border bg-white overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="px-3 py-2 text-left text-sm">Sr.No.</th>
                          <th className="px-3 py-2 text-left text-sm">Documents</th>
                          <th className="px-3 py-2 text-left text-sm">Uploaded Files</th>
                          <th className="px-3 py-2 text-left text-sm">Effective From</th>
                          <th className="px-3 py-2 text-left text-sm">Valid Till</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-2 text-sm">–</td>
                          <td className="px-3 py-2 text-sm">–</td>
                          <td className="px-3 py-2 text-sm">–</td>
                          <td className="px-3 py-2 text-sm">–</td>
                          <td className="px-3 py-2 text-sm">–</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded text-sm">Amend</button>
                </div>
              </div>
            )}

            {activeView==='profile-bank-account-details' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Profile › <span className="font-medium">Bank Account Details</span></div>
                <div className="text-lg font-semibold mb-4">Salary Bank Account Details:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <div className="text-sm">Name As Per Bank <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Bank Name <span className="text-red-600">*</span></div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select BankName –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Bank Account No <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Bank Branch <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">IFSC Code <span className="text-red-600">*</span></div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm">Upload Cancel Cheque <span className="text-red-600">*</span></div>
                    <input type="file" accept=".jpg,.jpeg,.pdf" className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded text-sm">Amend</button>
                  <button className="px-4 py-2 border rounded text-sm">Cancel</button>
                </div>
                <div className="mt-4 text-xs text-blue-700">Note: Maximum file size 500 KB. File types allowed: .jpg, .jpeg, .pdf</div>
              </div>
            )}

            {activeView==='myattendance-daily' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Attendance › <span className="font-medium">Daily</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Date</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date().toISOString().slice(0,10)} />
                  </div>
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>()</option></select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <div className="text-sm">Ecode</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 rounded bg-orange-500 text-white text-sm" onClick={() => navigate(`${base}/myattendance/monthly`)}>Monthly</button>
                </div>
                <div className="mt-4 border rounded p-4 bg-white">
                  <div className="text-sm font-medium mb-2">Note</div>
                  <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                    <li>Pink colour indicates invalid punch.</li>
                    <li>Post the ESS cut-off date, bulk sync punches are stored but not used for EOD marking.</li>
                  </ul>
                </div>
                <div className="mt-4 overflow-x-auto rounded border bg-white">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-100 border-b">
                        <th className="px-3 py-2 text-left text-sm">Date</th>
                        <th className="px-3 py-2 text-left text-sm">Punch Time</th>
                        <th className="px-3 py-2 text-left text-sm">Image Data</th>
                        <th className="px-3 py-2 text-left text-sm">Geo Location</th>
                        <th className="px-3 py-2 text-left text-sm">Latitude Longitude</th>
                        <th className="px-3 py-2 text-left text-sm">Punch Source</th>
                        <th className="px-3 py-2 text-left text-sm">Mac Address</th>
                        <th className="px-3 py-2 text-left text-sm">Company Location</th>
                        <th className="px-3 py-2 text-left text-sm">Distance Travelled : 0 km</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-8 text-center text-sm" colSpan={9}>There are no punches for selected date</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView==='myattendance-monthly' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Attendance › <span className="font-medium">Monthly</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Month</div>
                    <input type="month" className="border rounded px-2 py-2 w-full text-sm" defaultValue={`${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,'0')}`} />
                  </div>
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>()</option></select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <div className="text-sm">Ecode</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                  </div>
                </div>
                <div className="mt-8 text-gray-600 text-sm">There are no muster attendance details for selected month.</div>
              </div>
            )}

            {activeView==='myattendance-yearly' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Attendance › <span className="font-medium">Yearly</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Year</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow">{Array.from({length:5}).map((_,i)=>{const y=new Date().getFullYear()-i;return <option key={y}>{y}</option>;})}</select>
                  </div>
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>()</option></select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <div className="text-sm">Ecode</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                  </div>
                </div>
                <div className="mt-4 rounded border p-4 bg-orange-50">
                  <div className="font-medium mb-2">Leave Status</div>
                  <div className="text-sm">Please update leave master to get leave balance.</div>
                </div>
                <div className="mt-6 text-gray-600 text-sm">There is no yearly attendance for selected year.</div>
              </div>
            )}

            {activeView==='myattendance-leave-ledger' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Attendance › <span className="font-medium">Leave Ledger</span></div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>()</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Ecode</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Leave Type</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Year</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow">{Array.from({length:5}).map((_,i)=>{const y=new Date().getFullYear()-i;return <option key={y}>{y}</option>;})}</select>
                  </div>
                  <div className="flex items-end"><button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button></div>
                </div>
              </div>
            )}

            {activeView==='teamattendance-punches' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Team Attendance › <span className="font-medium">Punches</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Date</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date().toISOString().slice(0,10)} />
                  </div>
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <div className="text-sm">Ecode</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600">Note: employee drop-down will refresh on date selection</div>
                <div className="mt-8 text-gray-600 text-sm">There are no details.</div>
              </div>
            )}

            {activeView==='teamattendance-monthly' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Team Attendance › <span className="font-medium">Monthly</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Month</div>
                    <input type="month" className="border rounded px-2 py-2 w-full text-sm" defaultValue={`${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,'0')}`} />
                  </div>
                  <div className="flex items-end gap-4">
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="teamMonthlyScope" defaultChecked /> My Reportees</label>
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="teamMonthlyScope" /> All Employees</label>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div className="flex items-end gap-2 md:col-span-2">
                    <div className="flex-1 max-w-xs">
                      <div className="text-sm">Ecode</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600">Note: employee drop-down will refresh on month selection</div>
                <div className="mt-8 text-gray-600 text-sm">There are no details.</div>
              </div>
            )}

            {activeView==='teamattendance-attendance-mis' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Team Attendance › <span className="font-medium">Attendance MIS</span></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <div className="text-sm">From Date</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0,10)} />
                  </div>
                  <div>
                    <div className="text-sm">To Date</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date().toISOString().slice(0,10)} />
                  </div>
                  <div className="flex items-end gap-3">
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                    <button className="px-3 py-2 border rounded text-sm">⬇</button>
                  </div>
                </div>
                <div className="mt-8 text-gray-600 text-sm">There are no details.</div>
              </div>
            )}

            {activeView==='teamattendance-yearly' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Team Attendance › <span className="font-medium">Yearly</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Year</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow">{Array.from({length:5}).map((_,i)=>{const y=new Date().getFullYear()-i;return <option key={y}>{y}</option>;})}</select>
                  </div>
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <div className="text-sm">Ecode</div>
                      <input className="border rounded px-2 py-2 w-full text-sm" />
                    </div>
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600">Note: employee drop-down will refresh on year selection</div>
                <div className="mt-8 text-gray-600 text-sm">There are no details.</div>
              </div>
            )}

            {activeView==='teamattendance-leave-ledger' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Team Attendance › <span className="font-medium">Leave Ledger</span></div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Ecode</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Leave Type</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Year</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow">{Array.from({length:5}).map((_,i)=>{const y=new Date().getFullYear()-i;return <option key={y}>{y}</option>;})}</select>
                  </div>
                  <div className="flex items-end"><button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button></div>
                </div>
                <div className="mt-8 text-gray-600 text-sm">There are no details.</div>
              </div>
            )}

            {activeView==='teamattendance-day-s-status' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Team Attendance › <span className="font-medium">Day's Status</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                      <div className="text-sm">Company</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>BOMBAIM</option></select>
                    </div>
                    <div>
                      <div className="text-sm">Department</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>ALL</option></select>
                    </div>
                    <div>
                      <div className="text-sm">Date</div>
                      <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date().toISOString().slice(0,10)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                      <div className="text-sm">Working For</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>ALL</option></select>
                    </div>
                    <div>
                      <div className="text-sm">Location</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>ALL</option></select>
                    </div>
                    <div className="flex items-end"><button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button></div>
                  </div>
                </div>
                <div className="mt-6 text-sm">
                  <span className="mr-8">No. of Punches: <span className="font-medium">0</span></span>
                  <span>No. of employee who have punched: <span className="font-medium">0</span></span>
                </div>
                <div className="mt-4 overflow-x-auto rounded border bg-white">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-100 border-b">
                        <th className="px-3 py-2 text-left text-sm">Sr.</th>
                        <th className="px-3 py-2 text-left text-sm">Ecode</th>
                        <th className="px-3 py-2 text-left text-sm">Device Ecode</th>
                        <th className="px-3 py-2 text-left text-sm">Name</th>
                        <th className="px-3 py-2 text-left text-sm">Designation</th>
                        <th className="px-3 py-2 text-left text-sm">Department</th>
                        <th className="px-3 py-2 text-left text-sm">Work Location</th>
                        <th className="px-3 py-2 text-left text-sm">Shift</th>
                        <th className="px-3 py-2 text-left text-sm">Punch Time</th>
                        <th className="px-3 py-2 text-left text-sm">Punch Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-8 text-center text-sm" colSpan={10}>No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView==='teamattendance-leave-mis' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Team Attendance › <span className="font-medium">Leave MIS</span></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <div className="text-sm">Company</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>BOMBAIM</option></select>
                    </div>
                    <div>
                      <div className="text-sm">Department</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>ALL</option></select>
                    </div>
                    <div>
                      <div className="text-sm">Year</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow">{Array.from({length:5}).map((_,i)=>{const y=new Date().getFullYear()-i;return <option key={y}>{y}</option>;})}</select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <div className="text-sm">Working For</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>ALL</option></select>
                    </div>
                    <div>
                      <div className="text-sm">Location</div>
                      <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>ALL</option></select>
                    </div>
                    <div>
                      <div className="text-sm">Breakup Data</div>
                      <div className="flex items-center gap-4 text-sm">
                        <label className="flex items-center gap-2"><input type="radio" name="leaveMisBreakup" defaultChecked /> Dept.-wise</label>
                        <label className="flex items-center gap-2"><input type="radio" name="leaveMisBreakup" /> Location-wise</label>
                      </div>
                    </div>
                    <div className="flex items-end"><button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button></div>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-center">
                  <div className="w-[600px] h-[320px] border rounded bg-white flex items-end gap-2 p-6">
                    {[0,0,0,0,0,0,16,64,1,1,0,0].map((h,i)=>(
                      <div key={i} className="flex flex-col items-center">
                        <div style={{height:`${Math.min(h,80)*3}px`}} className="w-6 bg-red-500"></div>
                        <div className="text-[10px] mt-1">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeView==='myattendance-extra-work-comp-offs' && (
              <div className="card-soft">
                <div className="text-sm mb-4">My Attendance › <span className="font-medium">Extra work & Comp offs</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Extra Work from Dt</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date(Date.now()-90*24*60*60*1000).toISOString().slice(0,10)} />
                  </div>
                  <div>
                    <div className="text-sm">Extra Work to Dt</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date().toISOString().slice(0,10)} />
                  </div>
                  <div className="flex items-end gap-3">
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                    <button className="px-3 py-2 bg-green-600 text-white rounded text-sm">🟩</button>
                  </div>
                </div>
                <div className="mt-6 text-gray-600 text-sm">No data found for selected filters.</div>
              </div>
            )}

            {activeView==='request-attendance-regularise' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Request › <span className="font-medium">Attendance Regularise</span></div>
                <div className="flex items-end gap-3">
                  <div>
                    <div className="text-sm">Select month</div>
                    <input type="month" className="border rounded px-2 py-2 w-[160px] text-sm" defaultValue={`${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,'0')}`} />
                  </div>
                  <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded bg-blue-500 text-white text-sm">Pending to submit</button>
                  <button className="px-3 py-2 rounded bg-orange-400 text-white text-sm">Submitted</button>
                  <button className="px-3 py-2 rounded bg-green-500 text-white text-sm">Approved</button>
                  <button className="px-3 py-2 rounded bg-red-500 text-white text-sm">Rejected/Cancelled</button>
                  <button className="px-3 py-2 rounded bg-gray-400 text-white text-sm">Finalized</button>
                </div>
                <div className="mt-8 text-gray-600 text-sm">There are no detail for selected filters.</div>
              </div>
            )}

            {activeView==='request-leave-od-wfh' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Request › <span className="font-medium">Leave/OD/WFH</span></div>
                <div className="flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded bg-orange-500 text-white text-sm">+ New Request</button>
                  <button className="px-3 py-2 rounded border text-sm">Leave Ledger</button>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded border text-sm">Pending</button>
                  <button className="px-3 py-2 rounded border text-sm">Submitted</button>
                  <button className="px-3 py-2 rounded border text-sm">Approved</button>
                  <button className="px-3 py-2 rounded border text-sm">Rejected</button>
                  <button className="px-3 py-2 rounded border text-sm">Cancelled</button>
                  <button className="px-3 py-2 rounded border text-sm">All ⟳</button>
                </div>
                <div className="mt-8 text-gray-600 text-sm flex items-center gap-2">Please click on refresh icon to view all request. <span className="inline-block px-2 py-1 border rounded">⟳</span></div>
              </div>
            )}

            {activeView==='request-helpdesk' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Request › <span className="font-medium">HelpDesk</span></div>
                <div className="flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded bg-orange-500 text-white text-sm">New Request</button>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded bg-blue-500 text-white text-sm">Pending to Submit</button>
                  <button className="px-3 py-2 rounded bg-orange-400 text-white text-sm">Submitted</button>
                  <button className="px-3 py-2 rounded bg-green-500 text-white text-sm">Responded</button>
                  <button className="px-3 py-2 rounded border text-sm">All ⟳</button>
                </div>
                <div className="mt-8 text-gray-600 text-sm flex items-center gap-2">Please click on refresh icon to view all request. <span className="inline-block px-2 py-1 border rounded">⟳</span></div>
              </div>
            )}

            {activeView==='request-work-on-holiday' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Request › <span className="font-medium">Work on Holiday</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Ecode</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="flex items-end gap-2">
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                    <button className="px-3 py-2 bg-green-600 text-white rounded text-sm">+ New Request</button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded border text-sm">Pending</button>
                  <button className="px-3 py-2 rounded border text-sm">Submitted</button>
                  <button className="px-3 py-2 rounded border text-sm">Approved</button>
                  <button className="px-3 py-2 rounded border text-sm">Rejected</button>
                  <button className="px-3 py-2 rounded border text-sm">Cancelled</button>
                  <button className="px-3 py-2 rounded border text-sm">All ⟳</button>
                </div>
                <div className="mt-8 text-gray-600 text-sm">No data found.</div>
              </div>
            )}

            {activeView==='request-resignation-note' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Request › <span className="font-medium">Resignation Note</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Ecode</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="flex items-end gap-2">
                    <button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button>
                    <button className="px-3 py-2 bg-green-600 text-white rounded text-sm">+ New Request</button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded border text-sm">Pending</button>
                  <button className="px-3 py-2 rounded border text-sm">Submitted</button>
                  <button className="px-3 py-2 rounded border text-sm">Approved</button>
                  <button className="px-3 py-2 rounded border text-sm">Rejected</button>
                  <button className="px-3 py-2 rounded border text-sm">Cancelled</button>
                  <button className="px-3 py-2 rounded border text-sm">All ⟳</button>
                </div>
                <div className="mt-4 overflow-x-auto rounded border bg-white">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-100 border-b">
                        <th className="px-3 py-2 text-left text-sm">Sr.</th>
                        <th className="px-3 py-2 text-left text-sm">Employee</th>
                        <th className="px-3 py-2 text-left text-sm">ECode</th>
                        <th className="px-3 py-2 text-left text-sm">Resignation Date</th>
                        <th className="px-3 py-2 text-left text-sm">Reason</th>
                        <th className="px-3 py-2 text-left text-sm">Status</th>
                        <th className="px-3 py-2 text-left text-sm">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-8 text-center text-sm" colSpan={7}>No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView==='request-leave-encashment' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Request › <span className="font-medium">Leave Encashment</span></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Ecode</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div>
                    <div className="text-sm">Year</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow">{Array.from({length:5}).map((_,i)=>{const y=new Date().getFullYear()-i;return <option key={y}>{y}</option>;})}</select>
                  </div>
                  <div className="flex items-end"><button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded border text-sm">Pending</button>
                  <button className="px-3 py-2 rounded border text-sm">Submitted</button>
                  <button className="px-3 py-2 rounded border text-sm">Approved</button>
                  <button className="px-3 py-2 rounded border text-sm">Rejected</button>
                  <button className="px-3 py-2 rounded border text-sm">Cancelled</button>
                  <button className="px-3 py-2 rounded border text-sm">All ⟳</button>
                </div>
                <div className="mt-4 overflow-x-auto rounded border bg-white">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-100 border-b">
                        <th className="px-3 py-2 text-left text-sm">Sr.</th>
                        <th className="px-3 py-2 text-left text-sm">Employee</th>
                        <th className="px-3 py-2 text-left text-sm">ECode</th>
                        <th className="px-3 py-2 text-left text-sm">Encashment Days</th>
                        <th className="px-3 py-2 text-left text-sm">Amount</th>
                        <th className="px-3 py-2 text-left text-sm">Status</th>
                        <th className="px-3 py-2 text-left text-sm">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-8 text-center text-sm" colSpan={7}>No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeView==='request-confirmation-review-entry' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Request › <span className="font-medium">Confirmation Review Entry</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Ecode</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                  <div className="flex items-end"><button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded border text-sm">Pending</button>
                  <button className="px-3 py-2 rounded border text-sm">Submitted</button>
                  <button className="px-3 py-2 rounded border text-sm">Completed</button>
                  <button className="px-3 py-2 rounded border text-sm">All ⟳</button>
                </div>
                <div className="mt-4 overflow-x-auto rounded border bg-white">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-100 border-b">
                        <th className="px-3 py-2 text-left text-sm">Sr.</th>
                        <th className="px-3 py-2 text-left text-sm">Employee</th>
                        <th className="px-3 py-2 text-left text-sm">Department</th>
                        <th className="px-3 py-2 text-left text-sm">Designation</th>
                        <th className="px-3 py-2 text-left text-sm">Status</th>
                        <th className="px-3 py-2 text-left text-sm">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-8 text-center text-sm" colSpan={6}>No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeView==='request-proxyattendanceregularise' && (
              <div className="card-soft">
                <div className="text-sm mb-4">Request › <span className="font-medium">ProxyAttendanceRegularise</span></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <button className="px-3 py-2 rounded bg-orange-500 text-white text-sm">New Request</button>
                  </div>
                  <div>
                    <div className="text-sm">Employee</div>
                    <select className="border rounded px-2 py-2 w-full text-sm select-arrow"><option>– Select –</option></select>
                  </div>
                  <div>
                    <div className="text-sm">Ecode</div>
                    <input className="border rounded px-2 py-2 w-full text-sm" />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <div className="text-sm">From Date</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0,10)} />
                  </div>
                  <div>
                    <div className="text-sm">To Date</div>
                    <input type="date" className="border rounded px-2 py-2 w-full text-sm" defaultValue={new Date().toISOString().slice(0,10)} />
                  </div>
                  <div className="flex items-end"><button className="px-3 py-2 bg-orange-500 text-white rounded text-sm">🔎</button></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-3 py-2 rounded bg-orange-400 text-white text-sm">Pending Approval</button>
                  <button className="px-3 py-2 rounded bg-green-500 text-white text-sm">Approved</button>
                  <button className="px-3 py-2 rounded border text-sm">ALL</button>
                </div>
                <div className="mt-4 overflow-x-auto rounded border bg-white">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-100 border-b">
                        <th className="px-3 py-2 text-left text-sm">Sr.</th>
                        <th className="px-3 py-2 text-left text-sm">Employee</th>
                        <th className="px-3 py-2 text-left text-sm">ECode</th>
                        <th className="px-3 py-2 text-left text-sm">Date</th>
                        <th className="px-3 py-2 text-left text-sm">In Time</th>
                        <th className="px-3 py-2 text-left text-sm">Out Time</th>
                        <th className="px-3 py-2 text-left text-sm">Shift</th>
                        <th className="px-3 py-2 text-left text-sm">Type</th>
                        <th className="px-3 py-2 text-left text-sm">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-8 text-center text-sm" colSpan={9}>No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSelfService;