import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

// {
//   "_id": "675d3518fff5647a76c3ec6f",
//   "userId": "67449564d3bb3f91992ad03d",
//   "feedback": "dataa",
//   "isDeleted": false,
//   "isBlocked": false,
//   "createdBy": "67449564d3bb3f91992ad03d",
//   "updatedBy": "67449564d3bb3f91992ad03d",
//   "createdAt": "2024-12-14T13:04:48.837+05:30",
//   "updatedAt": "2024-12-14T13:04:48.837+05:30",
//   "user": {
//       "_id": "67449564d3bb3f91992ad03d",
//       "firstName": "Pramit",
//       "lastName": "patel",
//       "email": "Pramit67@gmail.com",
//       "gender": "female",
//       "contact": {
//           "countryCode": "string",
//           "mobile": "TextEditingController#ef1c0(TextEditingValue(text: ┤9725097885├, selection: TextSelection.invalid, composing: TextRange(start: -1, end: -1)))"
//       },
//       "walletBalance": 780,
//       "profileImage": "/data/user/0/com.app.bharat_exam_fest/cache/image_cropper_1734331766558.jpg"
//   }
// }

export default function FeedBackTable({
  users,
  title,
  tempStatus,
  handleStatusChange,
  deleteAction,
}) {
  const headers = [
    "S/N",
    "Name",
    "Feedback",
    "DOB",
    "Email",
    "Contact",
    "Front Image",
    "Back Image",
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
            {users[0].feedBackData.map((value, index) => {
              const user = users[0]?.userData.find(
                (user) => user._id === value.userId
              );

              const fullName = `${user.firstName} ${user.lastName}`;
              const dob = new Date(user.dob).toLocaleDateString();
              {
                /* const mobile = `${user.contact.countryCode} ${user.contact.mobile}`; */
              }

              return (
                <tr
                  key={value._id}
                  className="hover:bg-slate-50 transition-colors duration-200 text-nowrap"
                >
                  <td className="p-3 border-b border-slate-200">{index + 1}</td>
                  <td className="p-3 border-b border-slate-200">{fullName}</td>
                  <td className="p-3 border-b border-slate-200">
                    {value.feedback}
                  </td>
                  <td className="p-3 border-b border-slate-200">{dob}</td>
                  <td className="p-3 border-b border-slate-200">
                    {user.email}
                  </td>
                  <td className="p-3 border-b border-slate-200">
                    {9725097885}
                  </td>

                  <td className="p-3 border-b border-slate-200">
                    <img
                      src={value.frontSideImage}
                      alt="Front ID"
                      className="w-24 h-16 object-cover rounded border"
                    />
                  </td>
                  <td className="p-3 border-b border-slate-200">
                    <img
                      src={value.backSideImage}
                      alt="Back ID"
                      className="w-24 h-16 object-cover rounded border"
                    />
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg align-middle font-sans font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={() => deleteAction(value._id)}
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                        <AiOutlineDelete className="w-6 h-6" />
                      </span>
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
