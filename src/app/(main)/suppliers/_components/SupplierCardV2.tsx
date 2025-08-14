import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Crown,
  Shield,
  Building2,
  Verified,
  Check,
  User
} from 'lucide-react';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface SupplierCardProps {
  supplier: ISupplier;
}

const SupplierCardV2: React.FC<SupplierCardProps> = ({ supplier }) => {
  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'premium':
        return <Crown className="w-4 h-4" />;
      case 'pro':
        return <Star className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'premium':
        return 'bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white shadow-lg shadow-amber-500/25';
      case 'pro':
        return 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/25';
      default:
        return 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white shadow-lg shadow-blue-500/25';
    }
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200/50 shadow-sm',
      'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50 shadow-sm',
      'bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border border-purple-200/50 shadow-sm',
      'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200/50 shadow-sm',
      'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200/50 shadow-sm',
    ];
    return colors[index % colors.length];
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `منذ  ${diffDays} يوم`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50  hover:shadow-2xl hover:shadow-gray-900/10 hover:border-gray-300/50 transition-all duration-500 transform  h-full">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Plan Badge */}
      <div className={`absolute z-100 -top-4 -right-4 px-4 py-2 rounded-2xl text-xs font-bold ${getPlanColor(supplier.companyName)} flex items-center gap-1.5 backdrop-blur-sm border border-white/20`}>
        {getPlanIcon(supplier.companyName)}
        {supplier.companyName}
      </div>

      {/* Header Section */}
      <div className="relative flex  flex-wrap flex-col justify-center items-center gap-5 mb-3">
        <div className="relative w-full bg-gradient-to-br from-indigo-50 via-purple-100 to-blue-200 rounded-t-2xl p-5">
          <div className="size-30 relative bg-indigo-50 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center  shadow-lg border border-gray-200/50 group-hover:shadow-xl transition-all duration-300 mx-auto">
            {/* {supplier?.logo ? (
              <Image
                src={supplier.logo}
                alt={`${supplier.companyName} شعار`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) :
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16  rounded-xl flex items-center justify-center">
                  <Building2 className="size-20 text-indigo-600" />
                </div>
              </div>
            } */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16  rounded-xl flex items-center justify-center">
                <Building2 className="size-20 text-indigo-600" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full  shadow-lg flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger type='button' >
                  <Verified className="w-3 h-3 text-white" />
                </TooltipTrigger>
                <TooltipContent className='text-xs! flex gap-2 items-center font-semibold'>
                  <span>موثق</span>
                  <Check />
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

        </div>

      </div>
      <div className='p-5 pt-0 space-y-2 relative'>
        <div className="flex-1 space-y-1 self-start">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 truncate group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            اسم الشركة
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>انضم {formatJoinDate(supplier.joinDate)}</span>
          </div>
          <div className='flex items-center gap-2 text-gray-500 '>
            <Mail className="size-4 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
            {supplier.email}
          </div>
        </div>
        {/* Categories */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-3">
            {supplier.categoryNames.slice(0, 5).map((category, index) => (
              <Badge
                key={index}
                className={`rounded-xl text-sm font-semibold ${getCategoryColor(index)} backdrop-blur-sm transition shadow-lg`}
              >
                {category}
              </Badge>
            ))}
            {supplier.categoryNames.length > 5 && (
              <Badge className="shadow-lg rounded-xl text-sm font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border border-gray-300/50  transition-transform duration-200">
                +{supplier.categoryNames.length - 5} more
              </Badge>
            )}
          </div>
        </div>

        {/* Locations */}
        <div className="mb-3 relative">
          {supplier.locations.map((location, index) => (
            <div key={index} className="flex items-center gap-1 text-base text-gray-600">
              <MapPin className="size-4 flex-shrink-0 text-gray-500" />
              <span className="truncate">
                {location}
              </span>
            </div>
          ))}
        </div>



        {/* Contact Actions */}
        <div className="relative flex flex-col gap-4 mt-auto">
          <Link
            href={`tel:${supplier.phoneNumber}`}
            className="flex-1 bg-gradient-to-r from-green-50  to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 px-2 py-2 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 border border-green-200/50 hover:border-green-300/50 shadow-lg hover:shadow-xl hover:shadow-green-500/20 group/btn backdrop-blur-sm"
          >
            <Phone className="size-4 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
            {supplier.phoneNumber}
          </Link>
          <Button type='button' variant="gradient-indigo" className='mt-auto'>
            <Link href={`/suppliers/${supplier.userId}/profile`} className="flex items-center gap-2">
              <User className="size-4 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
              عرض الملف الشخصي
            </Link>
          </Button>
        </div>
      </div>



    </div >
  );
};

export default SupplierCardV2;