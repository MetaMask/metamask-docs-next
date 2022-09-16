import { type QuickAction } from '../components/CmdK';
import { NavigationItem } from './navigation';

export function isNavigationItem(item: any): item is NavigationItem {
  return (
    (item as NavigationItem).href !== undefined &&
    (item as NavigationItem).pageName !== undefined
  );
}

export function isQuickAction(item: any): item is QuickAction {
  return (
    (item as QuickAction).name !== undefined &&
    (item as QuickAction).icon !== undefined &&
    (item as QuickAction).shortcut !== undefined &&
    (item as QuickAction).url !== undefined
  );
}
