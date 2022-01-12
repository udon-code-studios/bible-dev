import Head from 'next/head'

export default function SubPage() {
  return (
    <div>
      <Head>
        <title>Sub Page</title>
      </Head>

      <main>
        <h1 className="text-4xl">
          You are in Leo&apos;s Books.
        </h1>
      </main>
    </div>
  )
}
