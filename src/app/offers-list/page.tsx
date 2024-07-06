'use client';

import { DataTable } from '@/components/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import { usePagination } from '@/components/DataTable/usePagination';
import { ColumnDef } from '@tanstack/react-table';
import PageSection from '@/components/PageSection';
import { ROUTES } from '@/constants/enums';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import React from 'react';
import { BrandDataType } from '@/constants/types';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const getTheExpiry = (date: string) => {
  if (new Date(date) < new Date()) {
    return 'Expired';
  } else {
    return 'Active';
  }
};

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'brandName',
    header: 'Brand Name',
    cell: ({ row }) => <div className="capitalize">{row.original.brandName}</div>,
  },
  {
    accessorKey: 'location',
    header: 'Offer Name',
    cell: ({ row }) => <div className="capitalize">{row.original.location.join(',')}</div>,
  },
  {
    accessorKey: 'liveFrom',
    header: 'Live from',
    cell: ({ row }) => (
      <div className="capitalize">{format(row.original.liveFrom || new Date(), 'LLL dd, y')}</div>
    ),
  },
  {
    accessorKey: 'coupon',
    header: 'Coupon Code',
    cell: ({ row }) => <div className="capitalize">{row.original.coupon}</div>,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div className="capitalize">{row.original.category}</div>,
  },
  {
    accessorKey: 'location',
    header: 'Locations',
    cell: ({ row }) => <div className="capitalize">{row.original.location.join(',')}</div>,
  },
  {
    accessorKey: 'redemption_count',
    header: 'Redemption Count',
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.redemption_count || 0}</div>
    ),
  },
  {
    accessorKey: 'Expiry Date',
    header: 'Expiry Date',
    cell: ({ row }) => (
      <div className="capitalize">{format(row.original.validity || new Date(), 'LLL dd, y')}</div>
    ),
  },
  {
    accessorKey: 'validity',
    header: 'Expiry',
    cell: ({ row }) => (
      <div className="capitalize">{getTheExpiry(row.original.validity) || ''}</div>
    ),
  },
];

export default function OffersListPage() {
  const router = useRouter();
  const { onPagination, pagination } = usePagination();
  const [data, setData] = React.useState<BrandDataType[]>([]);
  const [loading, setLoding] = React.useState(false);
  console.log('🚀 ~ OffersListPage ~ data:', data);

  const { createOffers } = ROUTES;

  React.useEffect(() => {
    const fetchData = async () => {
      setLoding(true);
      const query = await getDocs(collection(db, 'brand_data'));
      const data: BrandDataType[] = [];
      query.forEach((doc) => {
        data.push(doc.data() as BrandDataType);
      });
      setData(data as BrandDataType[]);
      setLoding(false);
    };
    fetchData();
  }, []);

  return (
    <PageSection title="Offers List">
      {loading ? (
        <Skeleton />
      ) : (
        <DataTable
          columns={columns}
          data={data || []}
          ctas={<Button onClick={() => router.push(createOffers)}>Create offers</Button>}
          searchProps={{
            show: true,
            placeholder: 'Search by brand name',
          }}
          paginationProps={{
            show: true,
            onPagination: onPagination,
            pagination: pagination,
            meta: {},
          }}
        />
      )}
    </PageSection>
  );
}
