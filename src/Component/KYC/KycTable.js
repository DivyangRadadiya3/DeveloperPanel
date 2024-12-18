import React from "react";

export default function KycTable({
  users,
  title,
  tempStatus,
  handleStatusChange,
  handleSave,
}) {
  const headers = [
    "S/N",
    "Name",
    "DOB",
    "Email",
    "Contact",
    "Proof Type",
    "Proof Number",
    "Front Image",
    "Back Image",
    "Status",
    "Action",
  ];

  return (
    <div className="bg-white relative rounded-t-md">
      <h2 className="text-2xl p-4">{title}</h2>
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="text-left py-3 px-4 border-b border-slate-300 bg-slate-200 text-sm font-medium text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const {
                _id,
                user: userInfo,
                frontSideImage,
                backSideImage,
                status,
              } = user;

              const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
              const dob = new Date(userInfo.dob).toLocaleDateString();
              const mobile = `${userInfo.contact.countryCode} ${userInfo.contact.mobile}`;

              return (
                <tr
                  key={_id}
                  className="hover:bg-slate-50 transition-colors duration-200 text-nowrap"
                >
                  <td className="p-3 border-b border-slate-200">{index + 1}</td>
                  <td className="p-3 border-b border-slate-200">{fullName}</td>
                  <td className="p-3 border-b border-slate-200">{dob}</td>
                  <td className="p-3 border-b border-slate-200">
                    {userInfo.email}
                  </td>
                  <td className="p-3 border-b border-slate-200">{mobile}</td>
                  <td className="p-3 border-b border-slate-200">
                    {user.idProof}
                  </td>
                  <td className="p-3 border-b border-slate-200">
                    {userInfo.uniqueId}
                  </td>
                  <td className="p-3 border-b border-slate-200">
                    <img
                      src={frontSideImage}
                      alt="Front ID"
                      className="w-24 h-16 object-cover rounded border"
                    />
                  </td>
                  <td className="p-3 border-b border-slate-200">
                    <img
                      src={backSideImage}
                      alt="Back ID"
                      className="w-24 h-16 object-cover rounded border"
                    />
                  </td>
                  <td className="p-3 border-b border-slate-200">
                    <select
                      name="status"
                      value={tempStatus[_id] || status}
                      onChange={(e) => handleStatusChange(_id, e.target.value)}
                      className={`${
                        (tempStatus[_id] || status) === "verified"
                          ? "bg-green-100 text-green-600"
                          : (tempStatus[_id] || status) === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : (tempStatus[_id] || status) === "unverified"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-900"
                      } text-md text-center rounded-full cursor-pointer appearance-none focus:outline-none w-24 px-2 py-1`}
                    >
                      <option
                        value="verified"
                        className="bg-green-100 text-green-600"
                      >
                        Verified
                      </option>
                      <option
                        value="pending"
                        className="bg-yellow-100 text-yellow-600"
                      >
                        Pending
                      </option>
                      <option
                        value="unverified"
                        className="bg-red-100 text-red-600"
                      >
                        Unverified
                      </option>
                    </select>
                  </td>
                  <td className="p-3 border-b border-slate-200">
                    <button
                      onClick={() => handleSave(user)}
                      className="px-6 py-1 min-w-[100px] border border-violet-600 rounded hover:bg-violet-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-300 active:bg-violet- 800 transition-colors duration-300"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
