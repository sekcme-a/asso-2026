import SubHero from "@/app/(homepage)/(korean)/info/components/SubHero";
import PhotoList from "@/app/(homepage)/(korean)/notice/photo/PhotoList";
import { createMetadata } from "@/utils/metadata";

// 1. 캐시 무효화 설정 (페이지 최상단에 위치)
// 이 설정이 있으면 Vercel이 해당 페이지를 캐싱하지 않고 접속할 때마다 새로 빌드합니다.
export const revalidate = 0; 

export const metadata = createMetadata({
  title: "Photo Gallery",
  description: "Photo Gallery - View the activity photos and event galleries of KSFAA.",
  url: "/en/notice/photo",
});

export default async function Photo({ params, searchParams }) {
  // 2. Next.js 15 대응: params와 searchParams 모두 await 처리
  const { lang } = await params;
  const sParams = await searchParams; 
  
  const isEnglish = lang === "en";
  const t = (ko, en) => (isEnglish ? en : ko);

  return (
    <>
      <SubHero
        breadcrumb={[
          t("알림마당", "News & Media"),
          t("포토갤러리", "Photo Gallery"),
        ]}
        title={t("포토갤러리", "Photo Gallery")}
        subTitle={
          <>
            {t(
              "대한생활체육회의 활기찬 활동 현장과 주요 행사의 소중한 순간들을 사진으로 만나보세요.",
              "Experience the vibrant scenes and precious moments of the Korea Sports Council for All through our photo collection.",
            )}
            <br />
          </>
        }
      />
      {/* 3. await 완료된 sParams를 PhotoList에 전달 */}
      <PhotoList searchParams={sParams} lang={lang} />
    </>
  );
}