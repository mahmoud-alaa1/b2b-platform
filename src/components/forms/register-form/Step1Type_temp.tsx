import FormRadioGroup from "@/components/forms-fields/FormRadioGroup";
import { conditionalRegisterSchemaType } from "@/schemas/authSchema";
import { useFormContext } from "react-hook-form";
import { Users, Building2, CheckCircle, Star } from "lucide-react";
import { motion } from "motion/react";

export function Step1Type() {
    const { control, watch } = useFormContext<conditionalRegisterSchemaType>();
    const selectedType = watch("accountType");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {  
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-full space-y-8 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="text-center space-y-4" variants={itemVariants}>
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    اختر نوع الحساب
                </h2>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                    من فضلك حدد نوع الحساب الذي يناسب احتياجاتك
                </p>
            </motion.div>

            <motion.div className="w-full max-w-md" variants={itemVariants}>
                <FormRadioGroup<conditionalRegisterSchemaType>
                    control={control}
                    name="accountType"
                    direction="vertical"
                    itemClassName={`group relative p-6 border-2 rounded-2xl transition-all duration-300 cursor-pointer bg-white hover:shadow-xl hover:-translate-y-1 ${selectedType === "Clients" ? "border-blue-400 bg-blue-50 shadow-lg" :
                            selectedType === "Suppliers" ? "border-green-400 bg-green-50 shadow-lg" :
                                "border-gray-200 hover:border-gray-300"
                        }`}
                    options={[
                        {
                            label: "عميل",
                            value: "Clients",
                            icon: <Users className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform" />
                        },
                        {
                            label: "مورد",
                            value: "Suppliers",
                            icon: <Building2 className="w-10 h-10 text-green-600 group-hover:scale-110 transition-transform" />
                        },
                    ]}
                />
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl text-sm"
                variants={containerVariants}
            >
                <motion.div
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-blue-900 text-lg">العملاء</h3>
                    </div>
                    <p className="text-blue-800 leading-relaxed">
                        احصل على خدمات متنوعة من موردين معتمدين وموثوقين مع ضمان الجودة
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 text-sm">وصول سريع للخدمات</span>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-green-900 text-lg">الموردين</h3>
                    </div>
                    <p className="text-green-800 leading-relaxed">
                        قدم خدماتك ومنتجاتك لعملاء جدد وطور أعمالك مع أدوات تسويق متقدمة
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 text-sm">نمو مستدام للأعمال</span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
