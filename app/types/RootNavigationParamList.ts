import RootNavigationScreens from './RootNavigationScreens';

type Screen = (typeof RootNavigationScreens)[keyof typeof RootNavigationScreens];

type RootNavigationParamList = { [S in Screen]: any };

export default RootNavigationParamList;
