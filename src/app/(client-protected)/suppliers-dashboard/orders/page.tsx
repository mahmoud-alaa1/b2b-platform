import { Calendar, Package } from "lucide-react";


const deliveredOrders = [
  {
    id: "ORD-001",
    client: "فندق النيل",
    deliveryDate: "2024-01-15",
    status: "تم التسليم",
  },
  {
    id: "ORD-002",
    client: "مطعم الأندلس",
    deliveryDate: "2024-01-14",
    status: "تم التسليم",
  },
  {
    id: "ORD-003",
    client: "كافيه الكورنيش",
    deliveryDate: "2024-01-13",
    status: "تم التسليم",
  },
];

const pendingOrders = [
  {
    id: "ORD-004",
    client: "فندق الشيراتون",
    product: "أطباق سيراميك",
    dueDate: "2024-01-20",
    image: "/placeholder.jpg",
  },
  {
    id: "ORD-005",
    client: "مطعم الأسكندرية",
    product: "أكواب زجاجية",
    dueDate: "2024-01-22",
    image: "/placeholder.jpg",
  },
];

export default function page() {
  return (
    <div className="space-y-8">
      {/* Delivered Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          الأوردرات اللي استلمها
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  رقم الطلب
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  اسم العميل
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  تاريخ التسليم
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody>
              {deliveredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-indigo-600">
                    {order.id}
                  </td>
                  <td className="py-4 px-4 text-gray-800">{order.client}</td>
                  <td className="py-4 px-4 text-gray-600">
                    {order.deliveryDate}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          الأوردرات المعلقة
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {order.product}
                  </h4>
                  <p className="text-gray-600 text-sm">{order.client}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      استحقاق: {order.dueDate}
                    </span>
                  </div>
                  <button className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    تأكيد التسليم
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
