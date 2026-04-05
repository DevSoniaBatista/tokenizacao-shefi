import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#12153D] text-white p-4">
      <h2 className="text-4xl font-bold mb-4 text-[#F5A623]">404 - Página não encontrada</h2>
      <p className="text-[#8899BB] mb-8">A página que você está procurando não existe.</p>
      <Link 
        href="/"
        className="px-6 py-3 bg-[#2E3A8C] hover:bg-[#F5A623] hover:text-[#12153D] transition-colors rounded-full font-bold uppercase tracking-wider text-sm"
      >
        Voltar para o Início
      </Link>
    </div>
  )
}
