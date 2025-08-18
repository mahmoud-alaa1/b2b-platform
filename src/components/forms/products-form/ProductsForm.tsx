"use client";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function ProductsForm() {
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    isFeatured: false,
    discountedPrice: "",
  });
  return (
    <div>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          إضافة منتج جديد
        </h3>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم المنتج
            </label>
            <input
              type="text"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="أدخل اسم المنتج"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              value={productForm.description}
              onChange={(e) =>
                setProductForm({ ...productForm, description: e.target.value })
              }
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="أدخل وصف المنتج"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              السعر (ج.م)
            </label>
            <input
              type="number"
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة المنتج
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                اسحب وأفلت الصورة هنا أو انقر للتحديد
              </p>
              <input type="file" className="hidden" accept="image/*" />
              <button
                type="button"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium">
                اختر صورة
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={productForm.isFeatured}
              onChange={(e) =>
                setProductForm({ ...productForm, isFeatured: e.target.checked })
              }
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="featured"
              className="text-sm font-medium text-gray-700">
              منتج مميز
            </label>
          </div>

          {productForm.isFeatured && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                السعر بعد الخصم (ج.م)
              </label>
              <input
                type="number"
                value={productForm.discountedPrice}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    discountedPrice: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
            إضافة المنتج
          </button>
        </form>
      </div>
    </div>
  );
}
