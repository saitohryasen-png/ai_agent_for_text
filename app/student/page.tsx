// app/student/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs"
import { evaluateAnswer } from "../actions/evaluate"

export default function StudentPage() {
  const { userId, isLoaded } = useAuth()
  const [unit, setUnit] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [result, setResult] = useState<{
    id: string
    aiResponse: string | null
    understanding: string | null
    aiComment: string | null
    nextTask: string | null
    createdAt: Date
  } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setResult(null)
  }, [unit, question, answer])

  const handleSubmit = async () => {
    if (!unit.trim() || !question.trim() || !answer.trim()) {
      alert("すべての項目を入力してください。")
      return
    }

    setLoading(true)
    setResult(null)

    if (!userId) {
      alert("ログインが必要です。")
      setLoading(false)
      return
    }

    try {
      const res = await evaluateAnswer({
        clerk_user_id: userId,
        unit,
        question,
        answer,
      })

      setResult(res)
    } catch (error) {
      console.error(error)
      alert("評価の取得に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">ログインが必要です。</p>
          <Link
            href="/sign-in"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            サインイン
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* ナビゲーションバー */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              学習コーチ
            </Link>
            <div className="flex items-center gap-4">
              <h2 className="text-gray-600 font-medium">学生向けページ</h2>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">今日の学習</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              授業科目
            </label>
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              問題
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              自分の解答
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? "AIが確認中..." : "AIに確認してもらう"}
          </button>

          {result && (
            <div className="mt-8 rounded-xl bg-gray-50 p-5 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">AIからのアドバイス</h2>

              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {result.aiResponse}
              </pre>

              {result.understanding && (
                <div className="mt-4">
                  <strong>理解度:</strong> {result.understanding}
                </div>
              )}

              {result.nextTask && (
                <div className="mt-4">
                  <strong>次の課題:</strong> {result.nextTask}
                </div>
              )}

              <div className="mt-4 text-sm text-gray-500">
                保存日時: {new Date(result.createdAt).toLocaleString("ja-JP")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}