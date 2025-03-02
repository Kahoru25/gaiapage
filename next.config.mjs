const nextConfig = {
  output: 'export', // Asegúrate de que esto esté configurado correctamente
  webpack(config) {
    // Configuración para manejar importaciones de SVG
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reaplica la regla existente, pero solo para importaciones de svg que terminen en ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convierte todas las demás importaciones de *.svg en componentes React
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // excluye si *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modifica la regla del cargador de archivos para ignorar *.svg, ya que ahora se maneja
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;