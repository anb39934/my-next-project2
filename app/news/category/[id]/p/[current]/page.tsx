import { notFound } from "next/navigation";
import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagination from '@/app/_components/Pagination';
import Category from "@/app/_components/Category";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    id: string;
    current: string;
  };
};

export default async function Page({ params }: Props) {
  const { id, current } = params; // ← これを追加

  const category = await getCategoryDetail(id).catch(notFound);
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
  });

  return (
    <>
      <p>
        <Category category={category} /> の一覧
      </p>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
  current={parseInt(current, 10)} // ← ここを数値に変換
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}