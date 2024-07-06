'use client';
import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CATEGORY } from '@/constants/enums';

ChartJS.register(ArcElement, Tooltip, Legend);

function AnalyticsPage() {
  const [categories, setCategories] = React.useState<Array<string>>([]);
  const [counts, setCounts] = React.useState<Array<number>>([]);

  const data = {
    labels: categories,
    datasets: [
      {
        data: counts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const query = await getDocs(collection(db, 'category_redeem_data'));
      const categoryData: Array<string> = [];
      const countData: Array<number> = [];
      query.forEach((doc) => {
        const { category, redemption_count } = doc.data();
        categoryData.push(category);
        countData.push(redemption_count);
      });

      Object.values(CATEGORY).forEach((category) => {
        if (!categoryData.includes(category)) {
          categoryData.push(category);
          countData.push(0);
        }
      });

      setCategories(categoryData);
      setCounts(countData);
    };
    fetchData();
  }, []);

  return (
    <div className="my-8 flex flex-col items-center">
      <h2 className="text-8xl mb-4 font-bold">Coupon Redemptions by Category</h2>
      <div className="h-[30%] w-[30%]">
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default AnalyticsPage;
