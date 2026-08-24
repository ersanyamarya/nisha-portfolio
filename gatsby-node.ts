import { CreateWebpackConfigArgs } from 'gatsby';
import path from 'path';

export const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs): void => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};
