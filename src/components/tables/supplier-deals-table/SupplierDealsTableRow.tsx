"use client";

import SupplierReview from "@/app/(client-protected)/suppliers-dashboard/orders/_components/SupplierReview";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building2,
  Phone,
  Mail,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  UserCheck,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

const getOrderStatusConfig = (status: string) => {
  const configs: Record<string, any> = {
    Active: {
      label: "نشط",
      icon: <AlertCircle className="w-3 h-3" />,
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    InProgress: {
      label: "قيد التنفيذ",
      icon: <Package className="w-3 h-3" />,
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    Completed: {
      label: "مكتمل",
      icon: <CheckCircle className="w-3 h-3" />,
      color: "bg-green-100 text-green-800 border-green-200",
    },
    Canceled: {
      label: "ملغي",
      icon: <XCircle className="w-3 h-3" />,
      color: "bg-red-100 text-red-800 border-red-200",
    },
  };
  return configs[status] || configs["Active"];
};

const getDealStatusConfig = (status: string) => {
  const configs: Record<string, any> = {
    Pending: {
      label: "قيد الانتظار",
      icon: <Clock className="w-3 h-3" />,
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    ClientInitiated: {
      label: "اكد العميل",
      icon: <UserCheck className="w-3 h-3" />,
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    SupplierConfirmed: {
      label: "اكد المورد",
      icon: <ShieldCheck className="w-3 h-3" />,
      color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
    Confirmed: {
      label: "مؤكدة",
      icon: <CheckCircle className="w-3 h-3" />,
      color: "bg-green-100 text-green-800 border-green-200",
    },
    Refused: {
      label: "مرفوضة",
      icon: <XCircle className="w-3 h-3" />,
      color: "bg-red-100 text-red-800 border-red-200",
    },
  };
  return configs[status] || configs["Pending"];
};

export default function SupplierDealsTableRow({
  deal,
}: {
  deal: ISupplierDeal;
}) {
  const dealStatusConfig = getDealStatusConfig(deal.dealStatus);
  const orderStatusConfig = getOrderStatusConfig(deal.OrderStatus);

  return (
    <TableRow className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-300 group">
      {/* Deal ID */}
      <TableCell className=" py-4">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
          <span className="text-white text-sm font-bold">
            {String(deal.dealId).slice(-2)}
          </span>
        </div>
      </TableCell>

      {/* Company Info */}
      <TableCell className=" py-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-gray-900">
              {deal.CompanyName}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer">
                    <Mail className="w-3 h-3" />
                    <span className="truncate max-w-[120px]">
                      {deal.CompanyEmail}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{deal.CompanyEmail}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Phone className="w-3 h-3" />
              <span>{deal.CompanyPhone}</span>
            </div>
          </div>
        </div>
      </TableCell>

      {/* Description */}
      <TableCell className=" py-4 max-w-64">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-gray-900 line-clamp-2 leading-relaxed font-medium">
                {deal.description}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="whitespace-normal break-all">{deal.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      {/* Contact Person */}
      <TableCell className=" py-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-green-600" />
            <span className="font-medium text-gray-900 text-sm">
              {deal.contactPersonName}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Phone className="w-3 h-3" />
            <span>{deal.contactPersonPhone}</span>
          </div>
        </div>
      </TableCell>

      {/* Deal Status */}
      <TableCell className=" py-4">
        <Badge
          className={`${dealStatusConfig.color} border font-medium shadow-sm`}
          variant="outline">
          {dealStatusConfig.icon}
          <span className="mr-1">{dealStatusConfig.label}</span>
        </Badge>
        {deal.dealStatus === "ClientInitiated" && (
          <SupplierReview id={deal.dealId} />
        )}
      </TableCell>

      {/* Order Status */}
      <TableCell className=" py-4">
        <Badge
          className={`${orderStatusConfig.color} border font-medium shadow-sm`}
          variant="outline">
          {orderStatusConfig.icon}
          <span className="mr-1">{orderStatusConfig.label}</span>
        </Badge>
      </TableCell>
    </TableRow>
  );
}
