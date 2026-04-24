import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">📚 学習コーチ</div>
          <div className="flex gap-4">
            <Link
              href="/student"
              className="px-6 py-2 rounded-lg font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
            >
              学生ページ
            </Link>
          </div>
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* ヒーロー */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            AI個別学習コーチで<br className="hidden sm:inline" />
            <span className="text-blue-600">継続的な成長をサポート</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            過去の学習履歴を考慮した個別フィードバック。
            生徒の理解度に合わせた次の学習課題を提案します。
          </p>
          <Link
            href="/student"
            className="inline-block btn-primary text-lg px-8 py-3"
          >
            学習を開始
          </Link>
        </section>

        {/* 機能紹介 */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="card p-8 hover:shadow-lg transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">個別学習支援</h3>
            <p className="text-slate-600 dark:text-slate-400">
              生徒の理解度に合わせたカスタマイズされたフィードバックを提供します。
            </p>
          </div>
          <div className="card p-8 hover:shadow-lg transition">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">学習履歴の追跡</h3>
            <p className="text-slate-600 dark:text-slate-400">
              過去の学習内容を記録し、成長過程を可視化します。
            </p>
          </div>
          <div className="card p-8 hover:shadow-lg transition">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">励ましのコメント</h3>
            <p className="text-slate-600 dark:text-slate-400">
              常に前向きな姿勢で、生徒の学習意欲を引き出します。
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">今日から学習を始めましょう</h2>
          <p className="text-lg opacity-90 mb-8">AIコーチがあなたの学習成長をサポートします</p>
          <Link href="/student" className="inline-block btn-primary bg-white text-blue-600 hover:bg-slate-100">
            学習ページへ
          </Link>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-slate-600 dark:text-slate-400">
          <p>&copy; 2026 学習コーチ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
