import { CSSProperties } from 'react';

/**
 * 设置Transform
 * @param style
 * @param value
 */
export function setTransform(style: CSSProperties, value) {
  style.transform = value;
  style['webkitTransform'] = value;
  style['mozTransform'] = value;
}

/**
 *
 * @param style
 */
export function isTransform3dSupported(style: CSSProperties) {
  return (
    ('transform' in style || 'webkitTransform' in style || 'MozTransform' in style) && window.atob
  );
}
