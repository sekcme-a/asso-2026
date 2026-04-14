export const revalidate = 0; // 최상단에 추가 (캐시 무효화)

import { createServerSupabaseClient } from "@/utils/supabase/server";
import GroupList from "../GroupList";
import { createMetadata } from "@/utils/metadata";

// ... metadata 부분 생략 ...

export default async function Nation() {
  const supabase = await createServerSupabaseClient();

  // 1. 실제 단체 테이블에서 'sports' 타입인 데이터만 필터링하여 가져옵니다.
  const { data: groups, error } = await supabase
    .from("organizations") 
    .select("*")
    .eq("type", "sports") // ⭐ 'type' 컬럼의 값이 'sports'인 데이터만 가져옴
    .order("name", { ascending: true }); // 이름 가나다순 정렬

  if (error) {
    console.error("데이터 로드 실패:", error.message);
  }

  // 2. 필터링된 groups 데이터를 GroupList 컴포넌트에 전달합니다.
  return <GroupList type="sports" groups={groups || []} />;
}