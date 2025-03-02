/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  webpack(config) {
    // Agregar una regla para manejar archivos de imagen
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/images/',
              publicPath: '/_next/static/images/',
            },
          },
        ],
      },
      // Mantener las reglas existentes para SVG
      {
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
        use: ['file-loader'],
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack'],
      }
    );

    // Excluir archivos .svg de la regla existente
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
