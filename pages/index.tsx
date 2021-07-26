import tw from 'twin.macro'

const Title = tw.h1`text-4xl`

export default function Home() {
  return (
    <div tw="min-h-screen bg-gray-900 text-white">
      <div tw="max-w-5xl mx-auto py-6">
        <div tw="bg-purple-500 px-4 py-2 text-center">
          <Title>Hello</Title>
        </div>
      </div>
    </div>
  )
}
