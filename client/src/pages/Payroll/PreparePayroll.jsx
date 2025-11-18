import React, { useRef, useState } from 'react';

export default function PreparePayroll() {
  const [company, setCompany] = useState('Company 1');
  const [mode, setMode] = useState('master');
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const [active, setActive] = useState('salary');

  const companies = ['Company 1','Company 2','Company 3'];

  const onTemplate = () => {
    const csv = ['Emp Code','Basic','HRA','DA','Other'].join(',');
    navigator.clipboard.writeText(csv).catch(()=>{});
    alert('Template copied');
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <div className="text-sm text-gray-800 mb-2">India Payroll</div>
          <div className="text-xs text-gray-500 mb-2">Master</div>
          <div className="space-y-2">
            {[
              {key:'salary',label:'1 Salary Master Upload'},
              {key:'variable',label:'2 Variable Payment'},
              {key:'loan',label:'3 Loan Advances'},
              {key:'investments',label:'4 Investments'},
              {key:'claims',label:'5 Claims'},
              {key:'perks',label:'5 Perks'},
              {key:'ot',label:'5 Overtime Upload'},
            ].map(i=> (
              <button key={i.key} className={`w-full px-3 py-2 text-sm rounded text-left border ${active===i.key?'bg-blue-50 border-blue-200 text-blue-700':'bg-white'}`} onClick={()=>setActive(i.key)}>{i.label}</button>
            ))}
          </div>
        </div>
        <div className="col-span-9">
          <div className="p-6 rounded border bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Salary Master Upload</h2>
            <div className="flex items-center gap-3 mb-4">
              <select className="text-sm border rounded px-2 py-2" value={company} onChange={(e)=>setCompany(e.target.value)}>
                {companies.map(c=> (<option key={c} value={c}>{c}</option>))}
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="mode" checked={mode==='master'} onChange={()=>setMode('master')} /> Bulk Upload Salary Master
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="mode" checked={mode==='heads'} onChange={()=>setMode('heads')} /> Bulk Update Salary Head Amount
              </label>
            </div>

            <div
              className="border-2 border-dashed rounded-md p-12 text-center bg-gray-50"
              onClick={()=>inputRef.current?.click()}
            >
              <input type="file" className="hidden" ref={inputRef} onChange={(e)=>setFile(e.target.files?.[0]||null)} />
              <div className="text-4xl text-blue-500">⬆️</div>
              <div className="mt-2 text-sm text-gray-600">{file ? file.name : 'Upload File'}</div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button className="px-3 py-2 text-sm border rounded" onClick={onTemplate}>Download Template</button>
              <button className="px-3 py-2 text-sm border rounded">Reset</button>
              <button className="px-3 py-2 text-sm bg-green-600 text-white rounded">Save & Next</button>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">Verification Data</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b bg-white">
                      <th className="text-left px-3 py-2">Upload File</th>
                      <th className="text-left px-3 py-2">Log</th>
                      <th className="text-left px-3 py-2">Upload Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {file:'Salary_24_OCT_2024', log:'Log', date:'20-OCT-2024'},
                      {file:'Salary_24_AUG_2024', log:'Log', date:'18-AUG-2024'},
                      {file:'Salary_24_SEPT_2024', log:'Log', date:'15-SEPT-2024'},
                    ].map((r,i)=> (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2">{r.file}</td>
                        <td className="px-3 py-2">{r.log}</td>
                        <td className="px-3 py-2">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}