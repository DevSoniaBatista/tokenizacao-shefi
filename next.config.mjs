/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Melhora a compatibilidade com o Vercel
  trailingSlash: false, // Evita problemas com barras no final da URL
};

export default nextConfig;
