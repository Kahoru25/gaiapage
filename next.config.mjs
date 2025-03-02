/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  webpack(config) {
    // Mover la inicialización de fileLoaderRule al principio
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    // Asegúrate de que fileLoaderRule exista antes de usarlo
    if (fileLoaderRule) {
      config.module.rules.push(
        // Reaplicar la regla existente, pero solo para importaciones de SVG que terminen en ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convertir todas las demás importaciones de *.svg a componentes de React
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...(fileLoaderRule.resourceQuery.not || []), /url/] }, // excluir si *.svg?url
          use: ["@svgr/webpack"],
        },
        // Agregar una regla para manejar archivos PNG
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "static/images/",
                publicPath: "/_next/static/images/",
              },
            },
          ],
        }
      );

      // Modificar la regla de carga de archivos para ignorar *.svg
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
