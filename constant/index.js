export const statusOptions = [
  { value: "All", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Suspended", label: "Suspended" },
];

export const tripStatusOptions = [
  { value: "All", label: "All Trips" },
  { value: "Completed", label: "Completed" },
  { value: "Ongoing", label: "Ongoing" },
  { value: "Cancelled", label: "Cancelled" },
];

export const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-rose-50 text-rose-600 border-rose-200",
  Suspended: "bg-amber-50 text-amber-700 border-amber-200",
  Blocked: "bg-rose-50 text-rose-600 border-rose-200",
  "Pending Approval": "bg-amber-50 text-amber-700 border-amber-200",
  "Not Started": "bg-slate-200 text-slate-700 border-slate-200",
  "N/A": "bg-gray-50 text-gray-700 border-gray-200",
  Available: "bg-blue-50 text-blue-700 border-blue-200",
  "In Ride": "bg-emerald-50 text-emerald-700 border-emerald-200",
  Maintenance: "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Ongoing: "bg-blue-50 text-blue-700 border-blue-200",
  Cancelled: "bg-rose-50 text-rose-600 border-rose-200",
};