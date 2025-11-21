import React, { useState } from 'react';
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
    { key: 'request', icon: '📝', label: 'Request' },
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
  const [activeView, setActiveView] = useState('ess-dashboard');

  
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
                onClick={() => s.children && setOpen((o) => ({ ...o, [s.key]: !o[s.key] }))}
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
                    const k = `${s.key}-${slug(c)}`;
                    return (
                      <button
                        key={c}
                        className={`block w-full text-left px-2 py-2 text-sm rounded ${activeView===k?'bg-orange-500 text-white':'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveView(k)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSelfService;