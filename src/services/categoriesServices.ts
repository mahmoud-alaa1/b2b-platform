import api from '@/lib/axios'
import { CATEGORIES_PAGE_SIZE } from '@/lib/constants'
import { isAxiosError } from 'axios'

export async function getCategories(params: ICategoryFilters) {
    try {
        const response = await api.get<IPaginatedResponse<ICategory>>('/categories', {
            params: {
                ...params,
                pageSize: CATEGORIES_PAGE_SIZE,
            }
        })
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.data?.message || 'فشل في تحميل الفئات')
        }
        throw new Error('فشل في تحميل الفئات بسبب خطأ غير متوقع')
    }
}

