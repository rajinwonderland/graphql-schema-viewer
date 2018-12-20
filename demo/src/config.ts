import { styled } from './styled';

export interface Config {
	name: string;
	endpoint: string;
	logo?: string;
	playgroundUrl: string;
}

const config: Config = {
	name: 'MarvelQL',
	endpoint: 'https://api.marvelql.com',
	logo: 'https://s3-us-west-1.amazonaws.com/marvelql/logos/marvelQL_RAW.png',
	playgroundUrl: 'https://api.marvelql.com'
};

export const Logo = styled<any>('div')`
  width: 30px;
  height: 30px;
  background-image: url('${p => p.logo || config.logo}');
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 4000;
`;

export default config;
