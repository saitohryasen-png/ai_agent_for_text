import { SignIn, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

export default async function SignInPage() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col p-4">
      {/* アカウントアイコンを右上に配置 */}
      <div className="flex justify-end mb-4">
        {userId ? (
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        ) : null}
      </div>

      {/* サインインフォーム */}
      <div className="flex justify-center items-center flex-1">
        <SignIn />
      </div>
    </div>
  )
}
