import EditUserInfo from '@/app/(default)/mypage/EditUserInfo';
import { signOut } from '@/auth';
import LoginModal from '@/components/LoginModal';
import QuizList from '@/components/QuizList';
import { db } from '@/database';
import { getSession } from '@/libs/auth';
import Image from 'next/image';

export default async function MyPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return <LoginModal force />;
  }

  const quizzes = await db
    .selectFrom('quizzes')
    .where('created_by', '=', session.user?.user_id!)
    .selectAll()
    .orderBy('created_at', 'desc')
    .execute();

  return (
    <>
      <h1 className="font-bold mt-4 text-center text-3xl">マイページ</h1>

      <div className="bg-gray-100 items-center gap-5 mx-auto mt-5 flex py-5 px-6 rounded-lg">
        <Image
          src={session.user?.avatar!}
          alt={`${session.user?.name} のプロフィール画像`}
          width={80}
          height={80}
          className="rounded-full size-20"
        />
        <div className="w-full">
          <p className="font-bold text-2xl">{session.user?.name}</p>
          <p className="text-gray-700">{session.user?.email}</p>
        </div>
        <EditUserInfo session={session} />
      </div>
      <p className="text-sm mb-10 text-gray-700 text-center mt-2">
        ※メールアドレスは公開されません
      </p>

      <h2 className="text-center font-bold mb-5 text-2xl">作成したクイズ</h2>
      <QuizList data={quizzes} hideCreatedBy />

      <form
        action={async () => {
          'use server';
          await signOut();
        }}
        className="mx-auto w-fit mt-10"
      >
        <button type="submit" className="btn btn-error w-64">
          ログアウト
        </button>
      </form>
    </>
  );
}
