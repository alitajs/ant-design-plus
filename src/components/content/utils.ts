import { IMainContentProps } from './main-content';
import { IMenuDataItem } from './interface';

export function getModuleDataWithProps(
  props: IMainContentProps
): IMenuDataItem[] {
  const moduleData = props.menus;

  return moduleData.filter(({ filename }) => {
    return !!filename;
  });
}

export function getMenuItems(
  moduleData: IMenuDataItem[]
) {
  const menuMeta = moduleData.map((item => item.meta));
  const menuItems: {
    [key: string]: any;
  } = {};
  menuMeta
    .sort((a: { order: number }, b: { order: number }) => (a.order || 0) - (b.order || 0))
    .forEach((meta) => {
      const { type } = meta;

      if (!menuItems[type]) {
        menuItems[type] = [];
      }

      menuItems[type].push(meta);
    });
  return menuItems;
}
